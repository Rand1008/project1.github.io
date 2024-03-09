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

// Retrieve username and password from the form
$username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
$password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);

// Prepare the SELECT statement
$stmt = $conn->prepare("SELECT * FROM users WHERE username=?");

// Bind the parameter and execute the statement
$stmt->bind_param("s", $username);
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo "Login successful!";
    } else {
        echo "Invalid password.";
    }
} else {
    echo "Invalid username.";
}

// Close the prepared statement and the connection
$stmt->close();
$conn->close();
