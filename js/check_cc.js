
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
//firebase.analytics();
//var db = firebase.firestore().collection("CheckProfile");


//var timenow = moment().format('YYYY-MM-DD HH:m:s');
var db = firebase.firestore();
var table = document.querySelector('#tbresult');

db.collection("QuizCC").orderBy("QDateTime", "desc").get().then((snapshot)=> {
  snapshot.forEach(doc=>{
    showData(doc);
    //console.log(doc.data());
  });
});
var i = 0;


function showData(doc) {
  i = i+1;
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = i;
  cell2.innerHTML = doc.data().LineName;
  cell3.innerHTML = doc.data().QDateTime;
  cell4.innerHTML = doc.data().QRatio;
}


function export2csv() {
  let data = "";
  const tableData = [];
  const rows = document.querySelectorAll("table tr");
  for (const row of rows) {
    const rowData = [];
    for (const [index, column] of row.querySelectorAll("th, td").entries()) {
      // To retain the commas in the "Description" column, we can enclose those fields in quotation marks.
      if ((index + 1) % 3 === 0) {
        rowData.push('"' + column.innerText + '"');
      } else {
        rowData.push(column.innerText);
      }
    }
    tableData.push(rowData.join(","));
  }
  data += tableData.join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  a.setAttribute("download", "data.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
