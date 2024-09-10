<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 3600");
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    exit;
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");

session_start();
require_once "config.php";

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection Failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$icon = $conn->real_escape_string($data["icon"]);
$text = $conn->real_escape_string($data["text"]);
$sql = "UPDATE cts SET text = ? WHERE icon = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $text, $icon);

if ($stmt->execute()) {
    echo json_encode(["message" => "Text Updated Successfully"]);
} else {
    echo json_encode(["error" => "Error Updating Text: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>