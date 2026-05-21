<?php
session_start();
header('Content-Type: application/json');
require_once '../includes/db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Musisz być zalogowany.', 'auth_required' => true]);
    exit;
}

$user_id = $_SESSION['user_id'];
$db      = get_db();
$action  = $_POST['action'] ?? $_GET['action'] ?? 'get';

if ($action === 'get') {
    $stmt = $db->prepare(
        'SELECT b.id, b.quantity, p.id AS product_id, p.name, p.price, p.image_url, p.stock,
                c.name AS category_name, c.color, c.emoji
         FROM basket b
         JOIN products p ON b.product_id = p.id
         JOIN categories c ON p.category_id = c.id
         WHERE b.user_id = ?
         ORDER BY b.added_at DESC'
    );
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $items  = [];
    while ($row = $result->fetch_assoc()) { $items[] = $row; }
    echo json_encode(['success' => true, 'items' => $items]);

} elseif ($action === 'add') {
    $product_id = intval($_POST['product_id'] ?? 0);
    $qty        = max(1, intval($_POST['quantity'] ?? 1));
    if (!$product_id) { echo json_encode(['success' => false, 'message' => 'Brak produktu.']); exit; }

    // Check stock
    $stmt = $db->prepare('SELECT stock FROM products WHERE id = ?');
    $stmt->bind_param('i', $product_id);
    $stmt->execute();
    $stmt->bind_result($stock);
    $stmt->fetch();
    $stmt->close();
    if ($stock < 1) { echo json_encode(['success' => false, 'message' => 'Produkt niedostępny.']); exit; }

    $stmt = $db->prepare(
        'INSERT INTO basket (user_id, product_id, quantity) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = quantity + ?'
    );
    $stmt->bind_param('iiii', $user_id, $product_id, $qty, $qty);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Dodano do koszyka!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Błąd dodawania.']);
    }

} elseif ($action === 'update') {
    $product_id = intval($_POST['product_id'] ?? 0);
    $qty        = intval($_POST['quantity'] ?? 1);
    if ($qty < 1) {
        $stmt = $db->prepare('DELETE FROM basket WHERE user_id = ? AND product_id = ?');
        $stmt->bind_param('ii', $user_id, $product_id);
    } else {
        $stmt = $db->prepare('UPDATE basket SET quantity = ? WHERE user_id = ? AND product_id = ?');
        $stmt->bind_param('iii', $qty, $user_id, $product_id);
    }
    $stmt->execute();
    echo json_encode(['success' => true]);

} elseif ($action === 'remove') {
    $product_id = intval($_POST['product_id'] ?? 0);
    $stmt = $db->prepare('DELETE FROM basket WHERE user_id = ? AND product_id = ?');
    $stmt->bind_param('ii', $user_id, $product_id);
    $stmt->execute();
    echo json_encode(['success' => true]);

} elseif ($action === 'count') {
    $stmt = $db->prepare('SELECT COALESCE(SUM(quantity),0) FROM basket WHERE user_id = ?');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    echo json_encode(['count' => intval($count)]);

} elseif ($action === 'checkout') {
    // Get basket items
    $stmt = $db->prepare(
        'SELECT b.quantity, p.id AS product_id, p.price, p.stock
         FROM basket b JOIN products p ON b.product_id = p.id WHERE b.user_id = ?'
    );
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $items  = [];
    $total  = 0;
    while ($row = $result->fetch_assoc()) {
        if ($row['stock'] < $row['quantity']) {
            echo json_encode(['success' => false, 'message' => 'Niewystarczający stan magazynowy dla jednego z produktów.']);
            exit;
        }
        $items[] = $row;
        $total  += $row['price'] * $row['quantity'];
    }
    if (empty($items)) { echo json_encode(['success' => false, 'message' => 'Koszyk jest pusty.']); exit; }

    // Create order
    $stmt = $db->prepare('INSERT INTO orders (user_id, total_price) VALUES (?, ?)');
    $stmt->bind_param('id', $user_id, $total);
    $stmt->execute();
    $order_id = $stmt->insert_id;

    foreach ($items as $item) {
        $stmt = $db->prepare('INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('iiid', $order_id, $item['product_id'], $item['quantity'], $item['price']);
        $stmt->execute();
        // Reduce stock
        $stmt2 = $db->prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
        $stmt2->bind_param('ii', $item['quantity'], $item['product_id']);
        $stmt2->execute();
    }

    // Clear basket
    $stmt = $db->prepare('DELETE FROM basket WHERE user_id = ?');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();

    echo json_encode(['success' => true, 'order_id' => $order_id, 'total' => $total]);
} else {
    echo json_encode(['success' => false, 'message' => 'Nieznana akcja.']);
}
