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

    $conn->begin_transaction();

    try {
        $conn->query("TRUNCATE TABLE membership");

        $stmt = $conn->prepare(
            "INSERT INTO membership (name, ft1, ft2, ft3, ft4, ft5, price) VALUES (?, ?, ?, ?, ?, ?, ?)"
        );

        foreach ($data as $product) {
            $name = $product["name"];
            $ft1 = $product["ft1"];
            $ft2 = $product["ft2"];
            $ft3 = $product["ft3"];
            $ft4 = $product["ft4"];
            $ft5 = $product["ft5"];
            $price = $product["price"];

            $stmt->bind_param(
                "ssssssi",
                $name,
                $ft1,
                $ft2,
                $ft3,
                $ft4,
                $ft5,
                $price
            );
            $stmt->execute();
        }

        $conn->commit();
        echo json_encode([
            "message" => "All Membership Replaced Successfully!",
        ]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode([
            "error" => "Failed To Replace Membership: " . $e->getMessage(),
        ]);
    }

    $stmt->close();
}

$conn->close();

?>