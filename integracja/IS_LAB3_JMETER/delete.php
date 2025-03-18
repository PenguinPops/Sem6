<?php
$servername = "localhost";
$username = "sakila1";
$password = "pass";
$database = "sakila";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Znajdź ID rekordu do usunięcia (np. ostatnio dodany rekord)
$sql = "SELECT actor_id FROM actor WHERE first_name = 'UpdatedTest' AND last_name = 'UpdatedUser' ORDER BY actor_id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $actor_id = $row["actor_id"];

    // Zapytanie SQL do usunięcia rekordu
    $delete_sql = "DELETE FROM actor WHERE actor_id = $actor_id";

    if ($conn->query($delete_sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $delete_sql . "<br>" . $conn->error;
    }
} else {
    echo "No record found to delete";
}

$conn->close();
?>
