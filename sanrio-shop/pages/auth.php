<?php
session_start();
header('Content-Type: application/json');
require_once '../includes/db.php';

$action = $_POST['action'] ?? '';

if ($action === 'register') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        echo json_encode(['success' => false, 'message' => 'All fields are required. / Wszystkie pola są wymagane.']);
        exit;
    }
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters. / Hasło musi mieć co najmniej 6 znaków.']);
        exit;
    }

    $db = get_db();
    $stmt = $db->prepare('SELECT id FROM users WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Username already taken. / Nazwa użytkownika jest zajęta.']);
        exit;
    }
    $stmt->close();

    $hash  = password_hash($password, PASSWORD_DEFAULT);
    $email = $username . '@kawaiicorner.local'; // placeholder email to satisfy unique constraint
    $stmt  = $db->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $username, $email, $hash);
    if ($stmt->execute()) {
        // Do NOT auto-login — user must log in manually
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration error. / Błąd rejestracji.']);
    }
    $stmt->close();

} elseif ($action === 'login') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password   = $_POST['password'] ?? '';

    if (!$identifier || !$password) {
        echo json_encode(['success' => false, 'message' => 'Please enter username and password. / Podaj login i hasło.']);
        exit;
    }

    $db   = get_db();
    $stmt = $db->prepare('SELECT id, username, password_hash FROM users WHERE username = ? OR email = ?');
    $stmt->bind_param('ss', $identifier, $identifier);
    $stmt->execute();
    $stmt->bind_result($id, $username, $hash);
    if ($stmt->fetch() && password_verify($password, $hash)) {
        $_SESSION['user_id']  = $id;
        $_SESSION['username'] = $username;
        echo json_encode(['success' => true, 'username' => $username]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password. / Nieprawidłowy login lub hasło.']);
    }
    $stmt->close();

} elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);

} elseif ($action === 'status') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode(['logged_in' => true, 'username' => $_SESSION['username']]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Unknown action.']);
}
