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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM membership";
    $result = $conn->query($sql);

    if ($result->num_rows >= 0) {
        $memberships = [];
        while ($row = $result->fetch_assoc()) {
            $memberships[] = [
                "name" => $row["name"],
                "ft1" => $row["ft1"],
                "ft2" => $row["ft2"],
                "ft3" => $row["ft3"],
                "ft4" => $row["ft4"],
                "ft5" => $row["ft5"],
                "price" => $row["price"],
            ];
        }
        header("Content-Type: application/json");
        echo json_encode($memberships);
    } else {
        echo json_encode([]);
    }
    $conn->close();
}
?>