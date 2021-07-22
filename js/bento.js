// Creating questionss and answers
//*****************************************************************************
var i = 0;
var Eid = "";
var cleararray = "";
var arrayIN = [];
var arrayNEW = [];


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



//$(document).ready(function () {
//  main()
//  DisplayChat();
  //alert("Array IN : "+arrayIN.length);
  //LoadID();
//});



async function main() {
  await liff.init({ liffId: "1655966947-4ZO0rDBV" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}
main()


async function getUserProfile() {
  const profile = await liff.getProfile();
  document.getElementById("userId").append(profile.userId);
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



DisplayChat();

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



var table = document.querySelector('#tbresult');
var arrayIN = [];
function DisplayChat() {
  str = "";
  //$("#DisplayMemo").remove();
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   
  //db.orderBy("state").orderBy("PostTimeStamp", "desc").limit(3).get().then((snapshot)=> {
  db.collection("Bento").orderBy("PostTimeStamp", "desc").get().then((snapshot)=> {
  //db.orderBy("state").orderBy("PostTimeStamp", "desc").get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      //arrayIN.push(doc.id);
      //console.log(doc);
      ShowChat(doc);
    });
    //alert(i);
  });
  //alert(arrayIN.length);
  //console.log(doc);
  $("#DisplayMemo").html(str);    
  console.log(arrayIN);
  //var ShowResults = arrayIN.length;
  //alert(ShowResults);

  
}
/*
        <div class="message-feed media"><div class="pull-left">
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="img-avatar"></div>
        <div class="media-body"><div class="mf-content">memo</div>
        <small class="mf-date"><i class="fa fa-clock-o"></i> datetime</small></div></div>
*/
var str = "";
function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(sLineID==doc.data().LineID) {
    str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostTimeStamp +'</small></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostTimeStamp +'</small></div></div></div>';
  }
    $("#DisplayMemo").html(str); 
  //console.log(arrayIN.length);
}




function CheckMemo() {
  var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่ข้อความก่อนกดส่งกำลังใจ");
    return
  }
  db.collection("Bento").add({
    LineID : sLineID,
    LineName : sLineName,
    LinePicture : sLinePicture,
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : dateString
  });  
  i = i+1;
  var str1 = "";  

  str1+='<div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sLinePicture +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="mf-content">'+ document.getElementById("TextMamo").value +'</div>';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div>';

  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}




