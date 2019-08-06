var members = data_senate.results[0].members;
var table = document.getElementById("senate");

i = 0;
while (i < members.length) {
  if (members[i].middle_name === null) {
    fullname = members[i].first_name + " " + members[i].last_name;
  } else {
    fullname =
      members[i].first_name +
      " " +
      members[i].middle_name +
      " " +
      members[i].last_name;
  }
  result = fullname.link(members[i].url);
  var row = table.insertRow(i);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = result;
  cell2.innerHTML = members[i].party;
  cell3.innerHTML = members[i].state;
  cell4.innerHTML = members[i].seniority;
  cell5.innerHTML = members[i].votes_with_party_pct;
  i++;
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
