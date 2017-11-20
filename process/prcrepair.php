<?php

session_save_path("../session/");
session_start();

function __autoload($class_name) {
    include '../class/' . $class_name . '.php';
}

set_time_limit(0);
$connDB = new EnDeCode();
$read = "../connection/conn_DB.txt";
$connDB->para_read($read);
$connDB->Read_Text();
$connDB->conn_PDO();

function insert_date($take_date_conv) {
    $take_date = explode("-", $take_date_conv);
    $take_date_year = @$take_date[2] - 543;
    $take_date = "$take_date_year-" . @$take_date[1] . "-" . @$take_date[0] . "";
    return $take_date;
}

$method = isset($_POST['method']) ? $_POST['method'] : $_GET['method'];
if ($method == 'add_repair') {
    //$informer = $_SESSION[''];
    $informer = 30;
    //$repair_date =insert_date($_POST['repair_date']);
    $repair_date = date('Y-m-d H:i:s');
    $record_date = date('Y-m-d H:i:s');
    $pd_id = $_POST['pd_id'];
    $vital = $_POST['vital'];
    $repair_status = 0;
    $symptom = $_POST['symptom'];
    
    $data = array($informer, $repair_date, $record_date, $pd_id,$vital, $repair_status,$symptom);
    $table = "m_repair_pd";
    $add_repair = $connDB->insert($table, $data);
    $connDB->close_PDO();
    if ($add_repair == false) {
        echo "Insert not complete " .$add_repair->errorInfo();
    } else {
        echo "Insert complete!!!!";
    }
}elseif ($method == 'edit_prods') {
    $pd_id = $_POST['pd_id'];
    $pdgroup = $_POST['pdgroup'];
    $pdcate = $_POST['pdcate'];
    $pd_number = $_POST['pd_number'];
    $number = explode("-", $pd_number);
    $lnumber = explode("/", $number[3]);
    $name = $_POST['name'];
    $brand = $_POST['brand'];
    $serial = $_POST['serial'];
    $pd_status = $_POST['pd_status'];
    $com_id = $_POST['com_id'];
    $price = $_POST['price'];
    $montype_id = $_POST['montype_id'];
    $mon_id = $_POST['mon_id'];
    $yearbuy = $_POST['yearbuy'];
    $regis_date = insert_date($_POST['datepicker1']);
    $date_stinsur = insert_date($_POST['datepicker2']);
    $ct_number = $_POST['ct_number'];
    $nbmoth_insur = $_POST['nbmoth_insur'];
    $dep_id = $_POST['dep_id'];
    $lnstalldate = insert_date($_POST['datepicker3']);
    $movingdate = insert_date($_POST['datepicker4']);
    $rp_person = $_POST['rp_person'];
    $note = $_POST['note'];
    
    $data = array($pd_number, $number[0], $lnumber[1], $pd_status,$name, $brand,'', $com_id, $price, $montype_id
        , $yearbuy, $mon_id, $ct_number, $pdgroup, $pdcate, $date_stinsur, $regis_date, $nbmoth_insur, $serial);
    //$field=array("pd_number","head_no","number","status","name","brand","size","com_id","price","montype_id"
        //,"yearbuy","mon_id","ct_number","group_id","category_id","date_stinsur","regis_date","nbmoth_insur","serial");
    $table = "pd_product";
    $where="pd_id=:pd_id";
    $execute=array(':pd_id' => $pd_id);
    $edit_prods=$connDB->update($table, $data, $where, null, $execute);
    
    $data2 = array($pd_id,$dep_id,$lnstalldate,$movingdate,$rp_person,$note);
    //$field2=array("pd_id","depId","lnstalldate","movingdate","rp_person","note");
    $table2 = 'pd_place';
    $where2="pd_id=:pd_id";
    $execute2=array(':pd_id' => $pd_id);
    $edit_place=$connDB->update($table2, $data2, $where2, null, $execute2);
    $connDB->close_PDO();
    if ($edit_place == false) {
        echo "Update not complete " .$add_place->errorInfo();
    } else {
        echo "Update complete!!!!";
    }
}