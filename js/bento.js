// Creating questionss and answers
//*****************************************************************************
var i = 0;
var Eid = "";
var cleararray = "";
var arrayIN = [];
var arrayNEW = [];
var arrayIN = [];
var CountIN = 0;
var MaxTime = 0;
var qInterval;
var CheckLastTime = "";
var CheckLastTimeUpdate = "";
var dateString = "";
var sGroupChart = "Bento";


var sLineID = "";
var sLineName = "";
var sLinePicture = "";

//var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
//var sLineName = "Website";
//var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
//sessionStorage.setItem("LineID", sLineID);
//sessionStorage.setItem("LineName", sLineName);
//sessionStorage.setItem("LinePicture", sLinePicture);
//sessionStorage.setItem("Survey1", sSurvey1);


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
//var db = firebase.firestore().collection("Bento");

var db = firebase.firestore();


$(document).ready(function () {
  main();
  DisplayChat();
});


async function main() {
  await liff.init({ liffId: "1655966947-4ZO0rDBV" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  const profile = await liff.getProfile();
  //document.getElementById("userId").append(profile.userId);
  sLineID = profile.userId;
  sLineName = profile.displayName;
  sLinePicture = profile.pictureUrl;
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}



const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;
    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})



//var table = document.querySelector('#tbresult');
var str = "";
var arrayIN = [];

function DisplayChat() {
  str = "";
  //$("#DisplayMemo").remove();
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   



  db.collection('Bento')
    .where('GroupChart','==',sGroupChart)
    .orderBy('PostTimeStamp','desc')
    .limit(100).get().then( snapshot => {
      snapshot.forEach(doc=> {
        //doc.data().orderBy('PostTimeStamp','asc');
        ShowChat(doc);
      });
  })
  DisplayLog();



//  db.collection("Bento").orderBy("PostTimeStamp", "desc").get().then((snapshot)=> {
//    snapshot.forEach(doc=>{
//      ShowChat(doc);
//    });
//  });
//  DisplayLog();
}



function DisplayLog() {
  timecountdown();
  console.log(arrayIN.length);
  $("#DisplayMemo").html(str);    
}



function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(CheckLastTime=="") { CheckLastTime = doc.data().PostTimeStamp; }
  if(sLineID==doc.data().LineID) {
    str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="LineName">'+doc.data().LineName +'</div><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="LineName">'+doc.data().LineName +'</div><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  }
    $("#DisplayMemo").html(str); 
  //console.log(arrayIN.length);
}




function CheckMemo() {
  //var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  NewDate();
  var Sortdate = Math.round(Date.now() / 1000);
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่ข้อความก่อนกดส่งกำลังใจ");
    return
  }
  db.collection("Bento").add({
    GroupChart : sGroupChart,
    LineID : sLineID,
    LineName : sLineName,
    LinePicture : sLinePicture,
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : Sortdate
  });  
  i = i+1;
  var str1 = "";  

  str1+='<div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sLinePicture +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="LineName">'+ sLineName +'</div><div class="mf-content">'+ document.getElementById("TextMamo").value +'</div>';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div>';

  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}




function CheckUpdate() {
  CheckLastTimeUpdate = "";
  //alert("stoptime : "+CheckLastTime);
  console.log(CheckLastTime);
  //db.collection("Bento").where('PostTimeStamp','>',CheckLastTime).get().then((snapshot)=> {
  db.collection("Bento")
  .where('GroupChart','==',sGroupChart)
  .where('PostTimeStamp','>',CheckLastTime)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      NewChat(doc);
    });
  });
  timecountdown();
}




var str = "";
function NewChat(doc) {
  var str1 = "";
  if(CheckLastTimeUpdate=="") { 
    CheckLastTimeUpdate = "1";
    CheckLastTime = doc.data().PostTimeStamp; 
    if(sLineID!=doc.data().LineID) {
      $(".notify").toggleClass("active");
      $("#notifyType").toggleClass("success");
      setTimeout(function() {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("success");
      }, 3000);
    }
  }
  if(sLineID!=doc.data().LineID) {
    str1+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="LineName">'+doc.data().LineName +'</div><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  }
  str = str1+str;
  $("#DisplayMemo").html(str); 
  //console.log(arrayIN.length);
}


function timecountdown() {
  var timeleft = MaxTime;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      //alert("Load");
      stopcountdown();
      CheckUpdate();
      //DisplayHeart();
    }
    },12000);
}



function stopcountdown() { 
    clearInterval(qInterval);
}



function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  //alert(GetNewDate);
  console.log(day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm);
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
