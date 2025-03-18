<?php
$servername = "localhost";
$username = "sakila1";
$password = "pass";
$database = "sakila";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Znajdź ID rekordu do zaktualizowania (np. ostatnio dodany rekord)
$sql = "SELECT actor_id FROM actor WHERE first_name = 'Test' AND last_name = 'User' ORDER BY actor_id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $actor_id = $row["actor_id"];

    // Zapytanie SQL do aktualizacji rekordu
    $new_first_name = "UpdatedTest";
    $new_last_name = "UpdatedUser";
    $update_sql = "UPDATE actor SET first_name = '$new_first_name', last_name = '$new_last_name' WHERE actor_id = $actor_id";

    if ($conn->query($update_sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error: " . $update_sql . "<br>" . $conn->error;
    }
} else {
    echo "No record found to update";
}

$conn->close();
?>
