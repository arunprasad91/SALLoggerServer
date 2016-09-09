<?php

function getUserDetails($id) {
    include 'db/db.php';
    $data = array();

    $getData = "SELECT
                    *
                    FROM user_table
                    WHERE user_id = '$id' AND enabled='1'";
    $resultGetData = mysqli_query($db_conn, $getData);

    while ($rowGetData = mysql_fetch_array($resultGetData)) {
        $name = $rowGetData['user_firstname'] + " " + $rowGetData['user_lastname'];
        $email = $rowGetData['user_email'];
        array_push($data, $name);
        array_push($data, $email);
    }

    return $data;
}

function getGoalsForUser($id, $date) {
    include 'db/db.php';
    $data = array();

    $getData = "SELECT goals.*, COUNT(tasks.task_id) AS count
                    FROM goals_table AS goals
                    LEFT JOIN 
                        ( SELECT * 
                                FROM task_table 
                                WHERE enabled ='1'
                                AND DATE(timestamp) = '$date') as tasks
                        ON goals.goal_id = tasks.goal_id
                    WHERE 
                        goals.user_id = '$id' 
                        AND goals.enabled = '1'
                    GROUP BY goals.goal_id";
    $resultGetData = mysqli_query($db_conn, $getData);

    while ($rowGetData = mysqli_fetch_array($resultGetData)) {
        $goalId = $rowGetData['goal_id'];
        $goalTitle = strtolower($rowGetData['goal_title']);
        $expectedCount = $rowGetData['expected_number'];

        if (is_null($rowGetData['count']))
            $actualCount = '0';
        else
            $actualCount = $rowGetData['count'];

        $data[] = array('goalId' => $goalId, 'goalTitle' => $goalTitle, 'expectedCount' => $expectedCount, 'actualCount' => $actualCount);
    }

    return $data;
}

function getHistory($userId, $goalId) {
    include 'db/db.php';
    $data = array();
    $allDates = array();

    for ($i = 29; $i >= 0; $i--) {
        $timestamp = time();
        $tm = 86400 * $i; // 60 * 60 * 24 = 86400 = 1 day in seconds
        $tm = $timestamp - $tm;

        array_push($allDates, date("Y-m-d", $tm));
//        print_r($the_date);
    }

    foreach ($allDates as $date) {
        $getData = "SELECT goals.goal_id, goals.goal_title, COUNT(tasks.task_id) AS count
                        FROM goals_table AS goals
                        LEFT JOIN 
                            ( SELECT * 
                                    FROM task_table 
                                    WHERE enabled ='1'
                                    AND DATE(timestamp) = '$date') as tasks
                            ON goals.goal_id = tasks.goal_id
                        WHERE 
                            goals.user_id = '$userId' 
                            AND goals.enabled = '1'
                            AND goals.goal_id = '$goalId'";
        $resultGetData = mysqli_query($db_conn, $getData);

        while ($rowGetData = mysqli_fetch_array($resultGetData)) {
            $goalId = $rowGetData['goal_id'];
            $goalTitle = strtolower($rowGetData['goal_title']);
            $count = $rowGetData['count'];
            $currentDate = $date;

            $data[] = array('goalId' => $goalId, 'goalTitle' => $goalTitle, 'date' => $currentDate, 'count' => $count);
        }
    }

    return $data;
}
