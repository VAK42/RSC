<?php
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 3600");
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit();
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header(
    "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
);

session_start();
require_once "config.php";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection Failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $fullname = $conn->real_escape_string($data["fullname"]);
    $username = $conn->real_escape_string($data["username"]);
    $email = $conn->real_escape_string($data["email"]);
    $phone = $conn->real_escape_string($data["phone"]);
    $password = $conn->real_escape_string($data["password"]);
    $rpassword = $conn->real_escape_string($data["rpassword"]);

    if ($password !== $rpassword) {
        echo json_encode(["error" => "Passwords Do Not Match!"]);
        exit();
    }

    $checkSql = "SELECT user_id FROM users WHERE email = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode(["error" => "Email Already Exists!"]);
        exit();
    }
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql =
        "INSERT INTO users (email, fullname, username, password, phone) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssss",
        $email,
        $fullname,
        $username,
        $hashedPassword,
        $phone
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "An Error Occurred!"]);
    }
    $stmt->close();
    $checkStmt->close();
}

$conn->close();
?>