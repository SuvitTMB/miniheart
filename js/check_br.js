var cleararray = "";
$(document).ready(function () {
  LoadLineID();
});



function LoadLineID() {
  var i = 0;
  var str = "";
  var Nub_end = 80 ;
  $("#DisplayImg").val(cleararray);
  str+='<div class="box-showimg">';
  for (i = 0; i < Nub_end; i++) {
    str+='<div class="box-list" data-title="website"><img src="./img/profile.png" style="width:100%;"></div>';
  }
  str+='</div>';
  $("#DisplayImg").html(str);

}

