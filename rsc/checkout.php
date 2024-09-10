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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (
        isset($data["cart"]) &&
        is_array($data["cart"]) &&
        isset($data["user_id"])
    ) {
        foreach ($data["cart"] as $item) {
            $pd_name = $item["name"];
            $price = $item["price"];
            $qtt = $item["quantity"];
            $total = $item["total"];
            $user_id = $data["user_id"];

            $stmt_check = $conn->prepare(
                "SELECT COUNT(*) AS count FROM users2 WHERE pd_name = ? AND user_id = ?"
            );
            $stmt_check->bind_param("si", $pd_name, $user_id);
            $stmt_check->execute();
            $stmt_check->bind_result($count);
            $stmt_check->fetch();
            $stmt_check->close();

            if ($count > 0) {
                $stmt_update = $conn->prepare(
                    "UPDATE users2 SET qtt = qtt + ?, total = total + ? WHERE pd_name = ? AND user_id = ?"
                );
                $stmt_update->bind_param(
                    "iisi",
                    $qtt,
                    $total,
                    $pd_name,
                    $user_id
                );
                $stmt_update->execute();
                $stmt_update->close();
            } else {
                $stmt_insert = $conn->prepare(
                    "INSERT INTO users2 (pd_name, price, qtt, total, user_id) VALUES (?, ?, ?, ?, ?)"
                );
                $stmt_insert->bind_param(
                    "siiii",
                    $pd_name,
                    $price,
                    $qtt,
                    $total,
                    $user_id
                );
                $stmt_insert->execute();
                $stmt_insert->close();
            }
        }

        $sql = "SELECT u.user_id, u.username, u.fullname, u.email, u.phone, ud.pd_name, ud.price, ud.qtt, ud.total 
                FROM users u
                LEFT JOIN users2 ud ON u.user_id = ud.user_id
                WHERE u.user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $userData = [];
        while ($row = $result->fetch_assoc()) {
            $userData[] = [
                "user_id" => $row["user_id"],
                "username" => $row["username"],
                "fullname" => $row["fullname"],
                "email" => $row["email"],
                "phone" => $row["phone"],
                "pd_name" => $row["pd_name"],
                "price" => $row["price"],
                "qtt" => $row["qtt"],
                "total" => $row["total"],
            ];
        }
        echo json_encode($userData);
        $stmt->close();
    } else {
        echo "Error: 'cart' Or 'user_id' Is Missing Or Not In Expected Format";
    }

    $conn->close();
} else {
    echo "Error: POST Request Expected";
}
?>