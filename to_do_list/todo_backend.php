<?php
require_once("database.php");

function insertTask($conn) {
    
    $task_text = $_POST["text"] ?? "";
    $task_date = $_POST["date"] ?? "";
    $state = $_POST["state"] ?? "";

    $sql = "INSERT INTO tasks(task_text, task_date, states) VALUES ('$task_text', '$task_date', '$state')";
    $result = mysqli_query($conn, $sql);

    if($result) {
        header("Content-Type: application/json");
        $data = [
            "task" => $task_text,
            "date" => $task_date,
            "state" => $state,
        ];
        echo json_encode($data);
    }
    else {
        http_response_code(500);
        $error = ["error" => mysqli_error($conn)];
        echo json_encode($error);
    }
    
}

function listTasks($conn) {
    $sql = "SELECT * FROM `tasks`";
    $result = mysqli_query($conn, $sql);

    if($result) {
        $tasks = [];
        while($row = mysqli_fetch_assoc($result)) {
            $tasks[] = $row;
        }

        header("Content-Type: application/json");
        echo json_encode($tasks);
    }
    else {
        $error = ["error" => "Error loading tasks"];
        echo json_encode($error);
    }
}
function deleteTask($conn) {
    $msg = $_POST["msg"];
    $date = $_POST["date"];

    $sql = "DELETE FROM `tasks` WHERE task_text = '$msg' AND task_date = '$date'";
    $result = mysqli_query($conn, $sql);

    if($result) {
        header("Content-Type: application/json");
        $data = [
            "task" => "Task " . $msg . " deleted successfully!"
        ];
        echo json_encode($data);
    }
    else {
        http_response_code(500);
        $error = ["error" => mysqli_error($conn)];
        echo json_encode($error);
    }
}

function updateTask($conn) {
    $old_msg = $_POST["old_msg"];
    $old_date = $_POST["old_date"];

    $new_msg = $_POST["text"];
    $new_date = $_POST["date"];

    $sql = "UPDATE `tasks` SET task_text = '$new_msg', task_date = '$new_date' WHERE task_text = '$old_msg' AND task_date = '$old_date'";
    $result = mysqli_query($conn, $sql);
    if($result) {
        header("Content-Type: application/json");
        $data = [
            "task" => "Task  . $old_msg . updated successfully!"
        ];
        echo json_encode($data);
    }
    else {
        http_response_code(500);
        $error = ["error" => mysqli_error($conn)];
        echo json_encode($error);
    }
}

function checkTask($conn) {
    $task_text = $_POST["task_text"];
    $task_date = $_POST["task_date"];
    $state = $_POST["state"];
    $sql = "UPDATE `tasks` SET states = '$state' WHERE task_text = '$task_text' AND task_date = '$task_date'";
    $result = mysqli_query($conn, $sql);
    
    if($result) {
        header("Content-Type: application/json");
        $data = [
            "task" => "Task . $task_text . checked successfully!"
        ];
        echo json_encode($data);
    }
    else {
        http_response_code(500);
        $error = ["error" => mysqli_error($conn)];
        echo json_encode($error);
    }
    
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"];

    if($action === "insert") {
        insertTask($conn);
    }
    else if($action === "delete") {
        deleteTask($conn);
    }
    else if($action === "select") {
        listTasks($conn);
    }
    else if($action === "update") {
        updateTask($conn);
    }
    else if($action === "checkTask") {
        checkTask($conn);
    }
}
else {
    echo "You must do a request method";
}


?>