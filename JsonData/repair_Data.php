<?php session_save_path("../session/");
session_start(); 
header('Content-type: text/json; charset=utf-8');
function __autoload($class_name) {
    include '../class/' . $class_name . '.php';
}
include_once ('../template/plugins/funcDateThai.php');
set_time_limit(0);
$conn_DB= new EnDeCode();
$read="../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_DB->Read_Text();
$conn_DB->conn_PDO();
$rslt=array();
$result=array();
$repair_id = isset($_GET['data'])?$_GET['data']:'';
$sql="SELECT re.repair_id,re.repair_date,pp.pd_number,ppl.note,re.symptom
,depName
,CASE re.vital
WHEN '0' THEN 'ไม่เร่งด่วน'
WHEN '1' THEN 'เร่งด่วน'
ELSE NULL END as vital,re.receive_date
,(SELECT CONCAT(e.firstname,' ',e.lastname) FROM emppersonal e WHERE e.empno=re.informer) inform
FROM m_repair_pd re
INNER JOIN pd_product pp on pp.pd_id=re.pd_id
INNER JOIN pd_place ppl on ppl.pd_id=pp.pd_id
INNER JOIN department d on d.depId=ppl.depId
WHERE repair_id=:repair_id";
$execute = array(':repair_id' => $repair_id);
$conn_DB->imp_sql($sql);
$result=$conn_DB->select_a($execute);
$data= array();
$data['repair_id'] = $result['repair_id'];
$data['repair_date'] = DateThai1($result['repair_date']);
$data['pd_number'] = $result['pd_number'];
$data['note'] = $result['note'];
$data['symptom'] = $result['symptom'];
$data['depName'] = $result['depName'];
$data['vital'] = $result['vital'];
$data['inform'] = $result['inform'];
$data['receive_date'] = isset($result['receive_date'])?DateThai1($result['receive_date']):'';
print json_encode($data);
$conn_DB->close_PDO();
?>