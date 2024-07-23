<?php
$servername = "localhost";
$username = "root";
$password = "your_password"; // Replace with your MySQL password
$dbname = "friends_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$postData = json_decode(file_get_contents('php://input'), true);
$email = $conn->real_escape_string($postData['email']);
$password = $conn->real_escape_string($postData['password']);

// Retrieve the user data from the database
$sql = "SELECT * FROM friends WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        http_response_code(200);
        echo json_encode(["message" => "Sign-in successful"]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid password"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "User not found"]);
}

$conn->close();
?>