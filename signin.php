<?php
// Assuming you have set up your database connection
include 'db_connection.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

// Process the login logic here
// Example:
if ($email == 'test@example.com' && $password == 'password') {
    // On successful sign-in
    http_response_code(200);
    echo json_encode(["message" => "Sign-in successful"]);
} else {
    // On failure
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
}
?>
