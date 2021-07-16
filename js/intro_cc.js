var cleararray = "";

$(document).ready(function () {
  LoadID();
});


function LoadID() {
  var str = "";
  str = '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" style="width:130px;"></div>';
  $("#DisplayLinePicture").html(str);
  $("#DisplayLineName").html(sessionStorage.getItem("LineName"));
/*
  if(sessionStorage.getItem("Survey2")=="0") {
      document.getElementById("btn1").style.display = "block";
      document.getElementById("btn2").style.display = "none";
  } else {
      document.getElementById("btn1").style.display = "none";
      document.getElementById("btn2").style.display = "block";
  }
*/

  $("#DisplaySurvey2Result").html(sessionStorage.getItem("Survey2Result"));
  $("#DisplaySurvey2Date").html("เมื่อวันที่ "+sessionStorage.getItem("Survey2Date"));
}
