var vLoginStatus = "0";

if (typeof(Storage) !== "undefined") {
  // Store
  //sessionStorage.setItem("LineID", vLineID);
  //sessionStorage.setItem("LineName", vLineName);
  //sessionStorage.setItem("LinePicture", vLinePicture);
  sessionStorage.setItem("LoginStatus", vLoginStatus);

  sessionStorage.setItem("Survey1", "0");

  sessionStorage.setItem("Survey2", "0");
  sessionStorage.setItem("Survey2Result", "34.58%");
  sessionStorage.setItem("Survey2Score", "ตอบถูก 5 ข้อ จาก 7 ข้อ");
  sessionStorage.setItem("Survey2Date", "12 กรกฎาคม 2564");

  //Console.log(vLinePicture);
  //var ShowImg = '<div><img src="'+sessionStorage.getItem("LinePicture")+'" style="width:130px;"></div>';
  //document.getElementById("DisplayURL").append(sessionStorage.getItem("LinePicture"));
  //$("#DisplayURL").html(ShowImg);
  //alert(sessionStorage.getItem("LinePicture"));

/*
  sessionStorage.setItem("LineID", "Ua6b6bf745bd9bfd01a180de1a05c23b3");
  sessionStorage.setItem("LineName", "Website");
  sessionStorage.setItem("LinePicture", "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8");
  sessionStorage.setItem("LoginStatus", "0");

  sessionStorage.setItem("Survey1", "0");

  sessionStorage.setItem("Survey2", "0");
  sessionStorage.setItem("Survey2Result", "34.58%");
  sessionStorage.setItem("Survey2Score", "ตอบถูก 5 ข้อ จาก 7 ข้อ");
  sessionStorage.setItem("Survey2Date", "12 กรกฎาคม 2564");
*/



} else {
  alert("กรุณาติดต่อผู้ดูแลระบบ");
  //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}

//sessionStorage.clear();