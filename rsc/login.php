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

    $username = $conn->real_escape_string($data["username"]);
    $pwd = $conn->real_escape_string($data["password"]);
    $sql = "SELECT u.user_id, u.username, u.password, u.fullname, u.email, u.phone, ud.pd_name, ud.price, ud.qtt, ud.total 
        FROM users u
        LEFT JOIN users2 ud ON u.user_id = ud.user_id
        WHERE u.username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result(
            $user_id,
            $username,
            $password,
            $fullname,
            $email,
            $phone,
            $pd_name,
            $price,
            $qtt,
            $total
        );
        $userData = [];
        while ($stmt->fetch()) {
            $userData[] = [
                "user_id" => $user_id,
                "username" => $username,
                "fullname" => $fullname,
                "email" => $email,
                "phone" => $phone,
                "pd_name" => $pd_name,
                "price" => $price,
                "qtt" => $qtt,
                "total" => $total,
            ];
        }
        if (password_verify($pwd, $password)) {
            if ($username === "admin") {
                $token = generateToken();
                $sql = "SELECT * FROM admin";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    $insertTokenSql = "UPDATE admin SET token = ?";
                } else {
                    $insertTokenSql = "INSERT INTO admin (token) VALUES (?)";
                }
                $insertTokenStmt = $conn->prepare($insertTokenSql);
                $insertTokenStmt->bind_param("s", $token);
                $insertTokenStmt->execute();
                $insertTokenStmt->close();
                echo json_encode($token);
            } else {
                echo json_encode($userData);
            }
        } else {
            echo json_encode(["error" => "Invalid Password!"]);
        }
    } else {
        echo json_encode(["error" => "User Not Found!"]);
    }
    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}

$conn->close();

function generateToken()
{
    return bin2hex(random_bytes(32));
}
?>