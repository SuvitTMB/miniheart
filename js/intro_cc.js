var cleararray = "";
//var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
//var sLineName = "Website";
//var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
//var sTypeDep = "Contact Center";
var sSurvey2 = 0;
var sQStatus = 0;
var Eid = 0;

//sessionStorage.setItem("LineID", sLineID);
//sessionStorage.setItem("LineName", sLineName);
//sessionStorage.setItem("LinePicture", sLinePicture);
//sessionStorage.setItem("Survey2", sSurvey2);


document.getElementById("btn1").style.display = "none";
document.getElementById("btn2").style.display = "none";

$(document).ready(function () {
  //alert(sessionStorage.getItem("LineID"));
  CheckLogin();
  CheckLineID();
  LoadID();
});


function CheckLogin() {
  if(sessionStorage.getItem("LineID")==null) {
    window.location.href = 'index.html';
  }
}


var firebaseConfig = {
  apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
  authDomain: "retailproject-6f4fc.firebaseapp.com",
  projectId: "retailproject-6f4fc",
  storageBucket: "retailproject-6f4fc.appspot.com",
  messagingSenderId: "653667385625",
  appId: "1:653667385625:web:a5aed08500de80839f0588",
  measurementId: "G-9SKTRHHSW9"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore().collection("QuizCC");



function LoadID() {
  var str = "";
  str = '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="imgprofile"></div>';
  $("#DisplayLinePicture").html(str);
  $("#DisplayLineName").html(sessionStorage.getItem("LineName"));
}



function CheckLineID() {
  db.where('LineID','==',sessionStorage.getItem("LineID")).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      //alert(doc.id+"---"+doc.data().QRatio+"---"+doc.data().QDateTime);
      //sQStatus = doc.QStatus;
      sessionStorage.setItem("Eid", doc.id);
      sessionStorage.setItem("QStatus", doc.data().QStatus);
      sessionStorage.setItem("QRatio2", doc.data().QRatio);
      sessionStorage.setItem("QDateTime2", doc.data().QDateTime);
      $("#DisplayQRatio2").html(doc.data().QRatio);
      $("#DisplayQDateTime2").html("เมื่อวันที่ "+doc.data().QDateTime);
      //alert(Eid);
    });
  });
  db.where('LineID','==',sessionStorage.getItem("LineID")).get().then(function(doc) {
    if (!doc.empty) {
      //alert("มีข้อมูลอยู่แล้ว");
      sQStatus = 1;     
      sessionStorage.setItem("QStatus", sQStatus);
      //document.getElementById("btn1").style.display = "none";
      document.getElementById("btn2").style.display = "block";
      console.log("Document data:", doc[0].data());
      //SaveNewData();
    } else {
      //alert("ยังไม่มีข้อมูล");
      sQStatus = 9;     
      sessionStorage.setItem("QStatus", sQStatus);
      document.getElementById("btn1").style.display = "block";
      //document.getElementById("btn2").style.display = "none";
      console.log("No such document!");
      //SaveNewData();
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });  
}


function SaveNewData() {
  var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  var ssQStatus = 1;
  var sValue = 0;
    //if(CheckUserID=="1") {
  //  db.doc(Eid).update({
    //    lastcheckin : dateString
    //  });
    //} else {
    db.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      QStatus : ssQStatus,
      TypeDep : sTypeDep,
      Q1 : sValue,
      Q2 : sValue,
      Q3 : sValue,
      Q4 : sValue,
      Q5 : sValue,
      QDateTime : dateString
    });  
    //}
}
