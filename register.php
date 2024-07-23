<?php
$servername = "localhost";
$username = "root";
$password = "@eyoelbarockfitsum2024"; // Replace with your MySQL password
$dbname = "friends1_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $postData = json_decode(file_get_contents('php://input'), true);
    $email = $conn->real_escape_string($postData['email']);
    $password = password_hash($conn->real_escape_string($postData['password']), PASSWORD_DEFAULT);

    // Insert the data into the database
    $sql = "INSERT INTO friends (email, password) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}

$conn->close();
?>