<?php

error_reporting(0);
include 'insert.php';
include 'db/db.php';
date_default_timezone_set('Australia/Sydney');


$data = json_decode(file_get_contents('php://input'), true);
//print_r($data);

if($data["function"] == 'insertTask') {
    $goalId = $data['goalId'];
    
    $jsonData = insertTask($goalId);
    echo json_encode($jsonData);
} else if($data["function"] == 'undoTask') {
    $goalId = $data['goalId'];
    
    $jsonData = undoTask($goalId);
    echo json_encode($jsonData);
}

