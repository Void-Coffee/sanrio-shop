<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$db     = get_db();
$action = $_GET['action'] ?? 'list';

if ($action === 'list') {
    $category_slug = $_GET['category'] ?? '';
    $search        = trim($_GET['search'] ?? '');

    $sql = 'SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url,
                   c.name AS category_name, c.slug AS category_slug, c.color, c.emoji
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE 1=1';
    $params = [];
    $types  = '';

    if ($category_slug) {
        $sql    .= ' AND c.slug = ?';
        $types  .= 's';
        $params[] = $category_slug;
    }
    if ($search) {
        $like     = "%$search%";
        $sql     .= ' AND (p.name LIKE ? OR p.description LIKE ?)';
        $types   .= 'ss';
        $params[] = $like;
        $params[] = $like;
    }

    $sql .= ' ORDER BY c.id, p.id';
    $stmt = $db->prepare($sql);
    if ($params) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result   = $stmt->get_result();
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);

} elseif ($action === 'single') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) { echo json_encode(null); exit; }

    $stmt = $db->prepare(
        'SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.color, c.emoji
         FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?'
    );
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_assoc());

} elseif ($action === 'categories') {
    $result = $db->query('SELECT * FROM categories ORDER BY id');
    $cats   = [];
    while ($row = $result->fetch_assoc()) { $cats[] = $row; }
    echo json_encode($cats);

} else {
    echo json_encode([]);
}
