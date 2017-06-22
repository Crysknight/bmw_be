<?php
$data = json_decode($_POST['data']);

if($data->phone || $data->confirmCode){
    echo json_encode(['status'=>true]);
} else{
    echo json_encode(['status'=>false]);
}