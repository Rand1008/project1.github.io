<?php
// Establish a connection to the database
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve new username and password from the form
$newUsername = filter_var($_POST['newUsername'], FILTER_SANITIZE_STRING);
$newPassword = filter_var($_POST['newPassword'], FILTER_SANITIZE_STRING);

// Hash the password using a secure algorithm
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Prepare the INSERT statement
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");

// Bind parameters and execute the statement
$stmt->bind_param("ss", $newUsername, $hashedPassword);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the prepared statement and the connection
$stmt->close();
$conn->close();