<?php

$servername = "localhost";
$username = "root";
$password = "Youaremine_3";
$database = "ajax";

$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn) {
    die("Error to connect to database: " . mysqli_connect_Error());
}




?>