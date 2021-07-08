var cleararray = "";
$(document).ready(function () {
	/*
	var currURL = window.location.href;
	if (document.location.protocol == "https:")
	{
	   currURL = currURL.replace("https:", "http:");
	   window.location = currURL ; 
	   return;
	} 
	TTVBanner();
    document.getElementById("id01").style.display = "block";
	*/
	//BoxNumber();
	//StartNumber();
  document.getElementById('click2').style.display='none';
});


/*
function test() {
    document.getElementById("id01").style.display = "block";
}
*/


function OpenHeart(n) {
	if(n==1) {
		document.getElementById("id01").style.display = "block";
	} else if(n==2) {
		document.getElementById("id02").style.display = "block";
	} else if(n==3) {
		document.getElementById("id03").style.display = "block";
	} else if(n==4) {
		document.getElementById("id04").style.display = "block";
	}
}




function CloseAll() {
	document.getElementById('id01').style.display='none';
	document.getElementById('id02').style.display='none';
	document.getElementById('id03').style.display='none';
	document.getElementById('id04').style.display='none';
}
