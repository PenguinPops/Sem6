<?php
$servername = "localhost";
$username = "sakila1";
$password = "pass";
$database = "sakila";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Zapytanie SQL do tworzenia nowego rekordu
$first_name = "Test";
$last_name = "User";
$sql = "INSERT INTO actor (first_name, last_name) VALUES ('$first_name', '$last_name')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
