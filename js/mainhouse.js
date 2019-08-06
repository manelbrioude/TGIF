var members = data_house.results[0].members;
var table = document.getElementById("house");

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
  var row = table.insertRow(i);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = fullname;
  cell2.innerHTML = members[i].party;
  cell3.innerHTML = members[i].state;
  cell4.innerHTML = members[i].seniority;
  cell5.innerHTML = members[i].votes_with_party_pct;
  i++;
}
