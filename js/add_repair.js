function AddRepair (content,id=null) {
$.getJSON('JsonData/head_repair.php',function (data) {
        $(content).empty().append("<h2 style='color: blue'>แจ้งซ่อมงานคอมพิวเตอร์(ครุภัณฑ์คอมพิวเตอร์)</h2>"+
                                    "<ol class='breadcrumb'>"+
                                    "<li><a href='index.php'><i class='fa fa-home'></i> หน้าหลัก</a></li>"+
                                    "<li class='active'><i class='fa fa-envelope'></i> แจ้งซ่อมงานคอมพิวเตอร์</li>"+
                                    "</ol><form action='' name='frmaddrepair' id='frmaddrepair' method='post'>"+
                                    "<div class='row'>"+
                                    "<div class='col-md-12'>"+
                                    "<div class='box box-primary box-solid'>"+
                                    "<div class='box-header with-border'>"+
                                    "<h4 class='box-title'> แจ้งซ่อมครุภัณฑ์คอมพิวเตอร์ </h4></div>"+
                                    "<div class='box-body'><div class='col-md-12' id='add_repair'>"+
                                    "ชื่อ : <b>"+data.fullname+"</b>&nbsp;&nbsp; ตำแหน่ง : <b>"+data.posi+"</b>&nbsp;&nbsp; งาน : <b>"+data.dep+"</b><p>"+
                                    "<div class='box box-primary box-solid'><div class='box-header with-border'>"+
                                    "<h4 class='box-title'> รายละเอียดอาการเสีย </h4></div><div class='box-body'><div id='Dr_content'></div></div></div></div>"+
                                    "</div></div></div></form>");
                               
    var idrepair = id;
            if(idrepair == null){
        $("#Dr_content").append($("<div class='form-group'>เครื่องที่เสีย : <select name='pd_id' class='form-control select2' id='pd_id' required></select></div>")
                        ,$("<div class='form-group'>อาการเสีย : <textarea class='form-control' style='width: 100%' COLS='100%' rows='2' placeholder='ระบุอาการเสีย' name='symptom' id='symptom' required></textarea></div>")
                        ,$("<div class='form-group'><input type='radio' value='1' name='vital' id='vital' required> : เร่งด่วน  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='radio' value='0' name='vital' id='vital' required> : ไม่เร่งด่วน</div>"));
                $("select#pd_id").append($("<option value=''> เลือกครุภัณฑ์ </option>"));
                                $.getJSON('JsonData/dep_prods.php',{data: 28}, function (GD) {
                                    for (var key in GD) {
                                        //if(LR[key].group_id==data.detail.group_id){var select='selected';}else{var select='';}
                                              $("select#pd_id").append($("<option value='"+GD[key].pd_id+"'> "+GD[key].pd_number+" : "+GD[key].name+" ("+GD[key].note+") </option>"));
                                    }$(".select2").select2();
                                });    
     
            $("div#add_repair").append("<input type='hidden' id='method' name='method' value='add_repair'>");                
            $("div#add_repair").append("<button type='submit' class='btn btn-primary' id='ARsubmit'>บันทึกใบแจ้งซ่อม</button>");
            $("button#ARsubmit").click(function () {
        				$.ajax({
					   type: "POST",
					   url: "process/prcrepair.php",
                                           data: $("#frmaddrepair").serialize(),
					   success: function(result) {
						alert(result);
                                                $("#index_content").empty().load('content/add_repair.html');
					   }
					 });
        });
            }else{ 
                $.getJSON('JsonData/detail_prods.php',{data: idrepair.data}, function (data) {
                     $("#DP_content").append($("<div class='form-group'>หมวดครุภัณฑ์ : <select name='pdgroup' class='form-control select2' id='pdgroup' required></select>")
                        ,$("<div class='form-group'>ประเภทครุภัณฑ์ : <select name='pdcate' class='form-control select2' id='pdcate' required></select>")
                        //,$("<div class='form-group'>เลขครุภัณฑ์ : <INPUT TYPE='text' NAME='head_no' id='head_no' style='width: 100px'> <b id='cate_no'></b> <INPUT TYPE='text' NAME='num' id='num' style='width: 50px'></div>")
                        ,$("<div class='form-group'>เลขครุภัณฑ์ : <INPUT TYPE='text' NAME='pd_number' id='pd_number' class='form-control'></div>")
                        ,$("<div class='form-group'>ชื่อครุภัณฑ์ : <INPUT TYPE='text' NAME='name' id='name' class='form-control' placeholder='เช่น printer brother MFC-J5910DW'></div>")
                        ,$("<div class='form-group'>ยี่ห้อ : <INPUT TYPE='text' NAME='brand' id='brand' class='form-control'></div>")
                        ,$("<div class='form-group'>หมายเลขเครื่อง : <INPUT TYPE='text' NAME='serial' id='serial' class='form-control'></div>")
                        ,$("<div class='form-group'>สถานะการใช้งาน : <select name='pd_status' class='form-control select2' id='pd_status' required></select>"));
                $("select#pdgroup").append($("<option value=''> เลือกหมวดครุภัณฑ์ </option>"));
                                $.getJSON('JsonData/group_Data.php', function (GD) {
                                    for (var key in GD) {
                                        if(GD[key].group_id==data.group_id){var select='selected';}else{var select='';}
                                              $("select#pdgroup").append($("<option value='"+GD[key].group_id+"' "+select+"> "+GD[key].group_name+" </option>"));
                                    }$(".select2").select2();
                                });    
                $("select#pdcate").append($("<option value=''> เลือกประเภทครุภัณฑ์ </option>"));
                                $.getJSON('JsonData/cate_Data.php',{data: data.group_id}, function (CD) {
                                    for (var key in CD) {
                                        if(CD[key].category_id==data.category_id){var select='selected';}else{var select='';}
                                              $("select#pdcate").append($("<option value='"+CD[key].category_id+"' "+select+"> "+CD[key].category_name+" </option>"));
                                        }
                                        $(".select2").select2();
                                }); 
                                   
                                    /*$("select#pdcate").change(function () {
                                        cate_no = $("#pdcate").val();
                                        cate = cate_no.split('_');
                                    $("#cate_no").text(cate[1]);
                                     });*/
                
                $("select#pd_status").append($("<option value=''> เลือกสถานะครุภัณฑ์ </option>"));
                                $.getJSON('JsonData/pdstatus_Data.php', function (SD) {
                                    for (var key in SD) {
                                        if(SD[key].pd_status_id==data.status){var select='selected';}else{var select='';}
                                              $("select#pd_status").append($("<option value='"+SD[key].pd_status_id+"' "+select+"> "+SD[key].pd_status+" </option>"));
                                        }
                                        $(".select2").select2();
                            });
                            
        $("#DSP_content").append($("<div class='form-group'>ผู้ขาย : <select name='com_id' class='form-control select2' id='com_id' required></select>")
                        ,$("<div class='form-group'>ราคาซื้อ : <INPUT TYPE='text' NAME='price' id='price' class='form-control'>")
                        ,$("<div class='form-group'>ชนิดเงิน : <select name='montype_id' class='form-control select2' id='montype_id' required></select>")
                        ,$("<div class='form-group'>วิธีซื้อ : <select name='mon_id' class='form-control select2' id='mon_id' required></select>")
                        ,$("<div class='form-group'>ปีที่ซื้อ : <select name='yearbuy' class='form-control select2' id='yearbuy' required></select>"));      
                $("select#com_id").append($("<option value=''> เลือกผู้ขาย </option>"));
                                $.getJSON('JsonData/comp_Data.php', function (CmD) {
                                    for (var key in CmD) {
                                        if(CmD[key].comp_id==data.com_id){var select='selected';}else{var select='';}
                                              $("select#com_id").append($("<option value='"+CmD[key].comp_id+"' "+select+"> "+CmD[key].comp_name+" </option>"));
                                    }$(".select2").select2();
                                });  
                $("select#montype_id").append($("<option value=''> เลือกชนิดเงินงบ </option>"));
                                $.getJSON('JsonData/montype_Data.php', function (CmD) {
                                    for (var key in CmD) {
                                        if(CmD[key].id==data.montype_id){var select='selected';}else{var select='';}
                                              $("select#montype_id").append($("<option value='"+CmD[key].id+"' "+select+"> "+CmD[key].name+" </option>"));
                                    }$(".select2").select2();
                                });  
                $("select#mon_id").append($("<option value=''> เลือกวิธีซื้อ </option>"));
                                $.getJSON('JsonData/methodsale_Data.php', function (MD) {
                                    for (var key in MD) {
                                        if(MD[key].mon_id==data.mon_id){var select='selected';}else{var select='';}
                                              $("select#mon_id").append($("<option value='"+MD[key].mon_id+"' "+select+"> "+MD[key].mon_name+" </option>"));
                                    }$(".select2").select2();
                                });   
                $("select#yearbuy").append($("<option value=''> เลือกปีที่ซื้อ </option>"));
                                var d = new Date();
                                var yearT = (d.getFullYear()+543);
                                     for (var i = yearT;i >= yearT-15;i--) {
                                        if(i==data.yearbuy){var select='selected';}else{var select='';}
                                              $("select#yearbuy").append($("<option value='"+i+"' "+select+"> "+i+" </option>"));
                                    }$(".select2").select2();
                                    
        $("#DWP_content").append($("<div class='form-group'>วันที่ลงทะเบียน : <input type='text' name='datepicker1' id='datepicker1' class='form-control' readonly required>")
                        ,$("<div class='form-group'>วันที่เริ่มประกัน : <input type='text' name='datepicker2' id='datepicker2' class='form-control' readonly required>")
                        ,$("<div class='form-group'>เลขที่สัญญา : <input type='text' name='ct_number' id='ct_number' class='form-control'>")
                        ,$("<div class='form-group'>จำนวนเดือนที่รับประกัน : <input type='text' name='nbmoth_insur' id='nbmoth_insur' class='form-control'>"));
                        
        $("#DPP_content").append($("<div class='form-group'>งาน : <select name='dep_id' class='form-control select2' id='dep_id' required></select>")
                        ,$("<div class='form-group'>วันที่ติดตั้ง : <input type='text' name='datepicker3' id='datepicker3' class='form-control' readonly required>")
                        ,$("<div class='form-group'>วันที่เคลื่อนย้าย : <input type='text' name='datepicker4' id='datepicker4' class='form-control' readonly required>")
                        ,$("<div class='form-group'>ผู้รับผิดชอบ : <select name='rp_person' class='form-control select2' id='rp_person' required></select>")
                        ,$("<div class='form-group'>หมายเหตุ : <textarea class='form-control' style='width: 100%' COLS='100%' rows='2' placeholder='หมายเหตุ' name='note' id='note'></textarea>"));                
                        
                $("select#dep_id").append($("<option value=''> เลือกงาน </option>"));
                                $.getJSON('JsonData/Dep_Data.php', function (CmD) {
                                    for (var key in CmD) {
                                        if(CmD[key].depId==data.depId){var select='selected';}else{var select='';}
                                              $("select#dep_id").append($("<option value='"+CmD[key].depId+"' "+select+"> "+CmD[key].depName+" </option>"));
                                    }$(".select2").select2();
                                }); 
                $("select#rp_person").append($("<option value=''> เลือกผู้รับผิดชอบ </option>"));
                                $.getJSON('JsonData/emp_Data.php', function (CmD) {
                                    for (var key in CmD) {
                                        if(CmD[key].empno==data.rp_person){var select='selected';}else{var select='';}
                                              $("select#rp_person").append($("<option value='"+CmD[key].empno+"' "+select+"> "+CmD[key].fullname+" </option>"));
                                    }$(".select2").select2();
                                });
                                
                        var DP = new DatepickerThai();
                            DP.GetDatepicker('#datepicker1');
                            DP.GetDatepicker('#datepicker2');
                            DP.GetDatepicker('#datepicker3');
                            DP.GetDatepicker('#datepicker4');
                            $("#datepicker1").datepicker("setDate",new Date(data.regis_date));
                            $("#datepicker2").datepicker("setDate",new Date(data.date_stinsur));
                            $("#datepicker3").datepicker("setDate",new Date(data.lnstalldate));
                            $("#datepicker4").datepicker("setDate",new Date(data.movingdate));
                            
                            $("#pd_number").val(data.pd_number);
                            $("#name").val(data.name);
                            $("#brand").val(data.brand);
                            $("#serial").val(data.serial);
                            $("#price").val(data.price);
                            $("#ct_number").val(data.ct_number);
                            $("#nbmoth_insur").val(data.nbmoth_insur);
                            $("#note").val(data.note);
                            
            $("div#add_pd").append($("<input type='hidden' id='method' name='method' value='edit_prods'>")
                                    ,$("<input type='hidden' id='pd_id' name='pd_id' value='"+data.pd_id+"'>"));                
            $("div#add_pd").append("<button type='submit' class='btn btn-primary' id='APsubmit'>แก้ไข</button>");
            $("button#APsubmit").click(function () {
        				$.ajax({
					   type: "POST",
					   url: "process/prcprods.php",
                                            data: $("#frmaddprods").serialize(),
					   success: function(result) {
						alert(result);
                                                $("#index_content").empty().load('content/list_prods.html');
					   }
					 });
                });
                });
            }
        });
        }