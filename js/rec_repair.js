function RecRepair (content,id=null) {
$.getJSON('JsonData/repair_Data.php',{data: id.data},function (data) {
        $(content).empty().append("<h2 style='color: blue'>บันทึกงานซ่อมคอมพิวเตอร์(ครุภัณฑ์คอมพิวเตอร์)</h2>"+
                                    "<ol class='breadcrumb'>"+
                                    "<li><a href='index.php'><i class='fa fa-home'></i> หน้าหลัก</a></li>"+
                                    "<li class='active'><i class='fa fa-envelope'></i> บันทึกงานซ่อมคอมพิวเตอร์</li>"+
                                    "</ol><form name='frmresult' id='frmresult'>"+
                                    "<div class='row'>"+
                                    "<div class='col-md-12'>"+
                                    "<div class='box box-primary box-solid'>"+
                                    "<div class='box-header with-border'>"+
                                    "<h4 class='box-title'> บันทึกงานซ่อมครุภัณฑ์คอมพิวเตอร์ </h4></div>"+
                                    "<div class='box-body'><div class='col-md-12' id='add_repair'>"+
                                    "ผู้แจ้งซ่อม : "+data.inform+"  &nbsp;&nbsp;งาน : "+data.depName+"<br>"
                            +"เลขครุภัณฑ์ : "+data.pd_number+"  &nbsp;&nbsp;หมายเหตุ : "+data.note+"<br>"
                            +"อาการ : "+data.symptom+" <br>วันที่แจ้ง : "+data.repair_date+"  &nbsp;&nbsp;<b style='color: red;'>"+data.vital+"</b>  &nbsp;&nbsp;วันที่รับใบแจ้ง : "+data.receive_date+
                                    "<div class='box box-primary box-solid'><div class='box-header with-border'>"+
                                    "<h4 class='box-title'> รายละเอียดการซ่อม </h4></div><div class='box-body'><div id='Rr_content'></div></div></div></div>"+
                                    "</div></div></div></form>"
                            ///////////////// Accessories Modal ////////////////////
                                    +"<div class='modal' id='accModal' role='dialog' aria-labelledby='exampleModalLabel'>"
                                    +"<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'>"
                                    +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
                                    +"<h4 class='modal-title' id='accModalLabel'>เปลี่ยนอุกรณ์</h4></div><div class='modal-body' id='modelacc-body'></div>"
                                    +"<div class='modal-footer'><button type='button' class='btn btn-danger' data-dismiss='modal'>ปิด</button><button type='button' class='btn btn-success' id='submacc'>บันทึกอุปกรณ์</button></div></div></div></div>");
                            ///////////////// End Accessories Modal ////////////////////   
        $('div#Rr_content').append($("<div class='form-group'><label for='datepicker1' class='control-label'>วันที่เริ่มซ่อม </label><input type='text' name='datepicker1' id='datepicker1' class='form-control' readonly required></div>")
                                    ,$("<div class='form-group'><label for='datepicker1' class='control-label'>วันที่ซ่อมเสร็จ </label><input type='text' name='datepicker2' id='datepicker2' class='form-control' readonly required></div>")
                                    ,$("<div class='form-group'><input type='radio' value='1' name='result' id='result1' checked='checked' required> : ซ่อมได้  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='radio' value='0' name='result' id='result0' required> : ซ่อมไม่ได้</div><hr>")
                                    ,$("<div class='form-group' id='do_repair'></div>")
                                    ,$("<div class='form-group' id='dont_repair'></div>")
                                    ,$("<div class='form-group' id='cause_sel'></div>")
                                    ,$("<div class='form-group'><label for='repair_detail' class='control-label'>รายละเอียดการซ่อม</label><textarea class='form-control' style='width: 100%' COLS='100%' rows='2' placeholder='อธิบายรายละเอียดการซ่อม' name='repair_detail' id='repair_detail' required></textarea></div>")
                                    ,$("<div class='form-group' id='rece_pd_sel'></div>")
                                    ,$("<input type='hidden' class='form-control' id='repair_id' name='repair_id'>")
                                    ,$("<input type='hidden' class='form-control' id='method' name='method'>"));
                    
                        $('div#do_repair').append($("<div class='form-group'><input type='radio' value='1' name='accessories' id='accessories1' required> : เปลี่ยนอุปกรณ์  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='radio' value='0' name='accessories' id='accessories0' checked='checked' required> : ไม่ได้เปลี่ยนอุปกรณ์</div>"));
                        $('div#dont_repair').append($("<div class='form-group'><label for='datepicker1' class='control-label'>วันที่เริ่มซ่อม2 </label><input type='text' name='datepicker' id='datepicker1' class='form-control' readonly required>"));
    
    ///////////////// Add Item Accessories Modal ////////////////////
    $('div.modal-body#modelacc-body').append("<form name='frmacc' id='frmacc'></form>");
            $('#frmacc').empty().append($("<div class='form-group' id='accpart_sel'></div>")
                                        ,$("<div class='form-group'><label for='acc_detail' class='control-label'>รายละเอียดอุปกรณ์</label><textarea class='form-control' style='width: 100%' COLS='100%' rows='2' placeholder='อธิบายรายละเอียดของอุปกรณ์' name='acc_detail' id='acc_detail' required></textarea></div>")
                                        ,$("<div class='form-group'><label for='acc_price' class='control-label'>ราคา </label><input type='number' name='acc_price' id='acc_price' class='form-control' required></div>")
                                        ,$("<input type='hidden' class='form-control' id='repair_id' name='repair_id'>")
                                        ,$("<input type='hidden' class='form-control' id='method' name='method'>"));
                            $("#acc_price").attr("onKeyUp","javascript:inputDigits(this);");            
                            $('#accpart_sel').empty().append("<label for='acc_part' class='control-label'>อุปกรณ์</label><select name='acc_part' id='acc_part' class='form-control'></select>");          
                            $("select#acc_part").addClass("select2");
                    $("select#acc_part").append($("<option value=''> เลือกอุปกรณ์ </option>"));
                    $.getJSON('JsonData/acc_part.php', function (GD) {
                                    for (var key in GD) {
                                        //if(GD[key].pd_id==data.pd_id){var select='selected';}else{var select='';}
                                              $("select#acc_part").append($("<option value='"+GD[key].accp_id+"'> "+GD[key].accp_name+"</option>"));
                                    }$(".select2").select2();
                                });
                    $("#accModal").find('.modal-title').text('เปลี่ยนอุกรณ์ใบแจ้งซ่อม : ลำดับที่ ' + data.repair_id);
                    $("#accModal").find('.modal-body input#repair_id').val(data.repair_id);
                    $("#accModal").find('.modal-body input#method').val('add_acc');   
                    $("button#submacc").click(function(e) {
                                        e.preventDefault();
                                        //modal.modal('hide');
        				$.ajax({
					   type: "POST",
					   url: "process/prcacc.php",
                                           data: $("#frmacc").serialize(),
					   success: function(result) {
                                               alert(result);
                                                //$("#index_content").empty().load('content/list_repair_order.html');
                                                 //return false;
					   }
					 });
        });
    ///////////////// End Add Item Accessories Modal ////////////////////
           //$("#do_repair").hide(0);
           $("#dont_repair").hide(0);
       $("#result1").click(function (){
                    $("#do_repair").show("fast"); 
                    $("#dont_repair").hide(0);
       }); 
       $("#result0").click(function (){
                   $("#dont_repair").show("fast"); 
                    $("#do_repair").hide(0);      
       });
       
       $("#accessories1").click(function(){
        $("#accModal").modal();
    });
    
                    $('#cause_sel').empty().append("<label for='cause' class='control-label'>สรุปอาการเสีย</label><select name='cause' id='cause' class='form-control'></select>");
                    $('#rece_pd_sel').empty().append("<label for='repairer' class='control-label'>ผู้รับการซ่อม</label><select name='rece_pd' id='rece_pd' class='form-control select2'></select>");
                                $("select#cause").addClass("select2");
                    $("select#cause").append($("<option value=''> เลือกสรุปอาการเสีย </option>"));
                    $.getJSON('JsonData/symmptom_category.php', function (GD) {
                                    for (var key in GD) {
                                        //if(GD[key].pd_id==data.pd_id){var select='selected';}else{var select='';}
                                              $("select#cause").append($("<option value='"+GD[key].symmptom_cid+"'> "+GD[key].symmptom_name+"</option>"));
                                    }
                                });
                    $("select#rece_pd").append($("<option value=''> เลือกผู้รับการซ่อม </option>"));
                    $.getJSON('JsonData/emp_Data.php', function (GD) {
                                    for (var key in GD) {
                                        //if(GD[key].pd_id==data.pd_id){var select='selected';}else{var select='';}
                                              $("select#rece_pd").append($("<option value='"+GD[key].empno+"'> "+GD[key].fullname+"</option>"));
                                    }
                                });
                                $(".select2").select2();
                                var DP = new DatepickerThai();
                                DP.GetDatepicker('#datepicker1');
                                DP.GetDatepicker('#datepicker2');
                
                                $("div#add_repair").append("<button type='submit' class='btn btn-primary' id='submresult'>บันทึกใบแจ้งซ่อม</button>");
                                $("button#submresult").click(function(e) {
                                        e.preventDefault();
                                        modal.modal('hide');
        				$.ajax({
					   type: "POST",
					   url: "process/prcrepair.php",
                                           data: $("#frmresult").serialize(),
					   success: function(result) {
                                               alert(result);
                                                $("#index_content").empty().load('content/list_repair_order.html');
                                                 return false;
					   }
					 });
        });

        });
        }