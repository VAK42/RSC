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

$data = json_decode(file_get_contents("php://input"), true);
$id = $conn->real_escape_string($data["id"]);
$sql_delete = "DELETE FROM feedback WHERE id = ?";
$stmt_delete = $conn->prepare($sql_delete);
$stmt_delete->bind_param("i", $id);
$stmt_delete->execute();

$sql_select = "SELECT * FROM feedback";
$result_select = $conn->query($sql_select);

$feedbacks = [];
if ($result_select->num_rows > 0) {
    while ($row = $result_select->fetch_assoc()) {
        $feedbacks[] = $row;
    }
}

header("Content-Type: application/json");
echo json_encode($feedbacks);
$conn->close();
?>