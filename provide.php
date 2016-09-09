<?php
error_reporting(0);
include 'getData.php';
include 'db/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$function = $data['function'];

if($function=='getGoalsForUser') {
    date_default_timezone_set('Australia/Sydney');

    $date = date('Y-m-d');
    
    $userId = $data['userId'];
    
    $jsonData = getGoalsForUser($userId, $date);
    echo json_encode($jsonData);
} else if($function=='getHistory') {
    
    $userId = $data['userId'];
    $goalId = $data['goalId'];
    
    $jsonData = getHistory($userId, $goalId);
    echo json_encode($jsonData);
}  

?>


