<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";
require "config.php";

function sendResetEmail($userEmail, $resetToken)
{
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->setFrom("kiet.va.2383@aptechlearning.edu.vn", "RSC");
        $mail->addAddress($userEmail);
        $mail->isHTML(true);
        $mail->Subject = "RSC: Reset Password";
        $mail->Body = "Reset Password Code: $resetToken";

        $mail->send();
        echo json_encode(["success" => "Reset Password Mail Has Been Sent"]);
    } catch (Exception $e) {
        echo json_encode([
            "error" => "Something Went Wrong! Error: {$mail->ErrorInfo}",
        ]);
    }
}