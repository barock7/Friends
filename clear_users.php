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

// Clear users
$sql = "DELETE FROM friends";
if ($conn->query($sql) === TRUE) {
    http_response_code(200);
    echo json_encode(["message" => "All users cleared"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>