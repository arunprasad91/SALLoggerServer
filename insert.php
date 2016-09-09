<?php

error_reporting(0);

function insertUser($firstname, $lastname, $email) {
    
    include 'db/db.php';
    date_default_timezone_set('Australia/Sydney');

    $insertData = "INSERT INTO `user_table`(user_firstname,user_lastname,user_email,enabled) VALUES('$firstname','$lastname','$email','1')";
    $resultData = mysqli_query($db_conn, $insertData);

    $msg = "Data inserted";

//    $jsonData[] = array('message'=>$msg);
//    echo json_encode($jsonData);
    return $msg;
}

function insertGoal($goalTitle, $user, $expected) {
    
    include 'db/db.php';
    date_default_timezone_set('Australia/Sydney');

    $insertData = "INSERT INTO `goals_table`(goal_title,user_id,expected_number,enabled) VALUES('$goalTitle','$user','$expected','1')";
    $resultData = mysqli_query($db_conn, $insertData);

    $msg = "Data inserted";

    return $msg;
}

function insertTask($goal) {
    
    include 'db/db.php';
    date_default_timezone_set('Australia/Sydney');

    $data = array();
    $date = date('Y-m-d H:i:s');
    
    $date2 = date('Y-m-d');
    
    $insertData = "INSERT INTO `task_table`(timestamp,goal_id,enabled) VALUES('$date','$goal','1')";
    $resultData = mysqli_query($db_conn, $insertData);
    
    
    $getUserId = "SELECT user_id FROM goals_table WHERE goal_id = '$goal'";
    $resultGetUserId = mysqli_query($db_conn, $getUserId);
    while($rowGetUserId = mysqli_fetch_array($resultGetUserId)) {
        $userId = $rowGetUserId['user_id'];
    }
    

    $getData = "SELECT goals.*, COUNT(tasks.task_id) AS count
                    FROM goals_table AS goals
                LEFT JOIN 
                    ( SELECT * 
                            FROM task_table 
                            WHERE enabled ='1'
                            AND DATE(timestamp) = '$date2') as tasks
                    ON goals.goal_id = tasks.goal_id
                WHERE 
                    goals.user_id = '$userId' 
                    AND goals.enabled = '1'
                    AND goals.goal_id = '$goal'
                GROUP BY goals.goal_id";
    $resultGetData = mysqli_query($db_conn, $getData);
    while($rowGetData = mysqli_fetch_array($resultGetData)) {
         $goalId = $rowGetData['goal_id'];
         $goalTitle = strtolower($rowGetData['goal_title']);         
         $expectedCount = $rowGetData['expected_number'];
         
         if(is_null($rowGetData['count']))
            $actualCount = '0';
         else
            $actualCount = $rowGetData['count'];
                  
         $data[] = array('goalId' => $goalId, 'goalTitle' => $goalTitle, 'expectedCount' => $expectedCount, 'actualCount' => $actualCount);     
    }
    
    return $data;  
    
}


function undoTask($goal) {
    
    include 'db/db.php';
    date_default_timezone_set('Australia/Sydney');

    $data = array();
    $date = date('Y-m-d H:i:s');
    
    $date2 = date('Y-m-d');
    
    $receiveData = "SELECT * 
                    FROM `task_table` 
                    WHERE goal_id = '$goal' 
                    AND enabled = '1'    
                    ORDER BY timestamp DESC
                    LIMIT 1";
    $resultReceiveData = mysqli_query($db_conn, $receiveData);
    while($rowGetTaskId = mysqli_fetch_array($resultReceiveData)) {
        $taskId = $rowGetTaskId['task_id'];
    }
    
    if(!empty($taskId)) {
        $updateData = "UPDATE `task_table` 
                        SET enabled = '0'
                        WHERE task_id = '$taskId'";
        $resultupdateData = mysqli_query($db_conn, $updateData);
    }
    
    
    
    $getUserId = "SELECT user_id FROM goals_table WHERE goal_id = '$goal'";
    $resultGetUserId = mysqli_query($db_conn, $getUserId);
    while($rowGetUserId = mysqli_fetch_array($resultGetUserId)) {
        $userId = $rowGetUserId['user_id'];
    }
    

    $getData = "SELECT goals.*, COUNT(tasks.task_id) AS count
                    FROM goals_table AS goals
                LEFT JOIN 
                    ( SELECT * 
                            FROM task_table 
                            WHERE enabled ='1'
                            AND DATE(timestamp) = '$date2') as tasks
                    ON goals.goal_id = tasks.goal_id
                WHERE 
                    goals.user_id = '$userId' 
                    AND goals.enabled = '1'
                    AND goals.goal_id = '$goal'
                GROUP BY goals.goal_id";
    $resultGetData = mysqli_query($db_conn, $getData);
    while($rowGetData = mysqli_fetch_array($resultGetData)) {
         $goalId = $rowGetData['goal_id'];
         $goalTitle = strtolower($rowGetData['goal_title']);         
         $expectedCount = $rowGetData['expected_number'];
         
         if(is_null($rowGetData['count']))
            $actualCount = '0';
         else
            $actualCount = $rowGetData['count'];
                  
         $data[] = array('goalId' => $goalId, 'goalTitle' => $goalTitle, 'expectedCount' => $expectedCount, 'actualCount' => $actualCount);     
    }
    
    return $data;  
    
}
