<?php
header('Content-type: text/json; charset=utf-8');

function __autoload($class_name) {
    include '../class/' . $class_name . '.php';
}
$conn_DB = new EnDeCode();
$read = "../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_db = $conn_DB->Read_Text();
$conn_DB->conn_PDO();
$data = isset($_GET['data'])?$_GET['data']:''; 
if(!empty($data)){
    $code = "inner join m_symptom_group sg on sg.symp_gid=sc.symmptom_gid where symmptom_cid = $data";
} else {
    $code = "";
}
$sql = "SELECT * FROM m_symmptom_category sc $code";

    $conn_DB->imp_sql($sql);
    $dep = $conn_DB->select();
    print json_encode($dep);
$conn_DB->close_PDO();
?>