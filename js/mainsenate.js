// var members = data_senate.results[0].members;

let members;

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
  method: "GET",
  headers: {
    "X-API-Key": "23GbzkahRNlVD6hWwI4xSr6qjCawOxflUjePfRzx"
  }
})
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(patata) {
    console.log(patata);
    members = patata.results[0].members;

    printTable(members);
    dropDownMenu("senate", members);
  })
  .catch(function(jamon) {});

function printTable(array) {
  var table = document.getElementById("senate");
  console.log(array);
  i = 0;
  while (i < array.length) {
    if (array[i].middle_name === null) {
      fullname = array[i].first_name + " " + array[i].last_name;
    } else {
      fullname =
        array[i].first_name +
        " " +
        array[i].middle_name +
        " " +
        array[i].last_name;
    }
    result = fullname.link(array[i].url);
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = result;
    cell2.innerHTML = array[i].party;
    cell3.innerHTML = array[i].state;
    cell4.innerHTML = array[i].seniority;
    cell5.innerHTML = array[i].votes_with_party_pct + "%";
    i++;
  }
  document.getElementById("loader").style.display = "none";
}

// checkboxes

document.getElementById("dscheckbox").addEventListener("click", function() {
  showfilters("senate");
});
document.getElementById("rscheckbox").addEventListener("click", function() {
  showfilters("senate");
});
document.getElementById("ischeckbox").addEventListener("click", function() {
  showfilters("senate");
});
document.getElementById("filter").addEventListener("change", function() {
  showfilters("senate");
});

function showfilters(id) {
  dchecked = document.getElementById("dscheckbox").checked;
  rchecked = document.getElementById("rscheckbox").checked;
  ichecked = document.getElementById("ischeckbox").checked;
  table = document.getElementById(id);
  rows = table.getElementsByTagName("tr");
  var noresults = false;
  console.log(rows);
  for (i = 0; i < rows.length - 1; i++) {
    var whichstate = document.getElementById("filter").value;
    var states = rows[i].getElementsByTagName("td")[2].innerHTML;
    var whatparties = rows[i].getElementsByTagName("td")[1].innerText;
    rows[i].style.display = "none";

    if (
      dchecked == false &&
      rchecked == false &&
      ichecked == false &&
      whichstate == "ALL"
    ) {
      rows[i].style.display = "";
      noresults = true;
    } else if (
      dchecked == false &&
      rchecked == false &&
      ichecked == false &&
      whichstate == states
    ) {
      rows[i].style.display = "";
      noresults = true;
    }
    if (whatparties == "D" && dchecked == true && whichstate == "ALL") {
      rows[i].style.display = "";
      noresults = true;
    } else if (whatparties == "D" && dchecked == true && whichstate == states) {
      rows[i].style.display = "";
      noresults = true;
    }

    if (whatparties == "R" && rchecked == true && whichstate == "ALL") {
      rows[i].style.display = "";
      noresults = true;
    } else if (whatparties == "R" && rchecked == true && whichstate == states) {
      rows[i].style.display = "";
      noresults = true;
    }
    if (whatparties == "I" && ichecked == true && whichstate == "ALL") {
      rows[i].style.display = "";
      noresults = true;
    } else if (whatparties == "I" && ichecked == true && whichstate == states) {
      rows[i].style.display = "";
      noresults = true;
    }
    console.log(noresults);
  }
  if (noresults == false) {
    document.getElementById("resultsMessage").style.display = "block";
  } else if (noresults == true) {
    document.getElementById("resultsMessage").style.display = "none";
  }
}

// dropdownmenu

function dropDownMenu(id, members) {
  let statearray = ["ALL"];
  for (let i = 0; i < members.length; i++) {
    let newstate = true;
    var states = members[i].state;

    for (j = 0; j < statearray.length; j++) {
      if (states == statearray[j]) {
        newstate = false;
      }
    }
    if (newstate == true) {
      statearray.push(states);
    }
  }
  statearray.sort();
  statearray.unshift("ALL");
  select = document.getElementById("filter");

  select = document.getElementById("filter");

  for (state in statearray) {
    select.add(new Option(statearray[state], statearray[state]));
  }
}
