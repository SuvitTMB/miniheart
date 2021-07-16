var vLineID = "";
var vLineName = "";
var vLinePicture = "";



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
var db = firebase.firestore().collection("CheckProfile");


async function main() {
	await liff.init({ liffId: "1655966947-5rJYErwX" });
	document.getElementById("isLoggedIn").append(liff.isLoggedIn());
	if(liff.isLoggedIn()) {
	getUserProfile();
	} else {
	liff.login();
	}
}
main();


function openWindow() {
	liff.openWindow({
	url: "https://line.me",
	external: true     
	})
}


async function getUserProfile() {
	const profile = await liff.getProfile();
	//document.getElementById("DisplayLineID").src = profile.pictureUrl;
	//document.getElementById("displayName").append(profile.displayName);
	vLineID = profile.userId;
	vLineName = profile.displayName;
	vLinePicture = profile.pictureUrl;
	document.getElementById("pictureUrl1").src = profile.pictureUrl;
	//alert(vLinePicture);
	//alert(profile.userId+"---"+profile.displayName+"---"+profile.pictureUrl);
	//var ShowImg = '<div><img src="'+profile.pictureUrl+'" style="width:130px;"></div>';
	//document.getElementById("DisplayURL").src = profile.pictureUrl;
	document.getElementById("DisplayLineID").append(profile.userId);
	document.getElementById("DisplayName").append(profile.displayName);
	sessionStorage.setItem("LineID", profile.userId);
	sessionStorage.setItem("LineName", profile.displayName);
	sessionStorage.setItem("LinePicture", profile.pictureUrl);
	FindID(profile.userId);
	//CheckLineID(profile.userId);
    //sessionStorage.setItem("LineID", profile.userId);
}



var CheckUserID = "0";
/*
function CheckLineID(gLineID) {
	db.where('lineID','==',gLineID).get().then((snapshot)=> {
	  snapshot.forEach(doc=> {
	    var aStatusConfirm = doc.data().statusconfirm;
	    Eid = doc.id;
	    CheckUserID = "1"
	  });
	});
}
*/


function FindID(gLineID) {
	db.where('lineID','==',gLineID).get().then(function(doc) {
	    if (!doc.empty) {
	    	alert("มีข้อมูลอยู่แล้ว");
	        console.log("Document data:", doc[0].data());
	    } else {
			alert("ยังไม่มีข้อมูล");
	        console.log("No such document!");
			SaveProfile();
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});
}





function check1(gLineID) {
	alert("Gid : "+gLineID);
	db.where('lineID','==',gLineID).get().then((doc) => {
    if (doc.exists){
		//alert(doc.exists);
		//var city = doc.data();
		console.log(db.toString());
    	//alert(doc.exists);
	    alert("มีข้อมูลอยู่แล้ว");
    } else {
		alert("ยังไม่มีข้อมูล");
        console.log("No such document!");
		SaveProfile();
    }}).catch((error) => {
      console.log("Error getting document:", error);
    });
}
/*


	} else {
	});
*/


function SaveProfile() {
 	var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    if(CheckUserID=="1") {
		db.doc(Eid).update({
        lastcheckin : dateString
      });
    } else {
      db.add({
        lineID : vLineID,
        linename : vLineName,
        empPicture : vLinePicture,
        lastcheckin : dateString
      });       
    }
}






