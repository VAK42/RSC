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

require "pwd.php";
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection Failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));
    if (
        isset($data->email) &&
        isset($data->password) &&
        isset($data->rpassword)
    ) {
        $email = $data->email;
        $password = $data->password;
        $rpassword = $data->rpassword;
        if ($password !== $rpassword) {
            $response = [
                "error" => "Passwords Do Not match!",
            ];
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare(
                "UPDATE users SET password = ? WHERE email = ?"
            );
            $stmt->bind_param("ss", $hashedPassword, $email);

            if ($stmt->execute()) {
                $deleteStmt = $conn->prepare(
                    "DELETE FROM rspwd WHERE email = ?"
                );
                $deleteStmt->bind_param("s", $email);

                if ($deleteStmt->execute()) {
                    $response = [
                        "success" => true,
                    ];
                } else {
                    $response = [
                        "error" => "Something Went Wrong: " . $conn->error,
                    ];
                }
            } else {
                $response = [
                    "error" => "Failed To Update Password: " . $conn->error,
                ];
            }

            $stmt->close();
        }
    } else {
        $response = [
            "error" => "Something Went Wrong!",
        ];
    }
    header("Content-Type: application/json");
    echo json_encode($response);
    $conn->close();
}
?>