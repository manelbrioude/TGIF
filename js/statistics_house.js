var statistics = {
  number_of_democrats: 0,
  votes_democrats: 0,
  number_of_republicans: 0,
  votes_republicans: 0,
  number_of_independents: 0,
  votes_independents: 0,
  total_number: 0,
  total_average: 0
};

let members;
fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
    fillTabelGlance(members);
    leastEngaged(members);
    mostEngaged(members);
  })
  .catch(function(jamon) {
    console.log(err);
  });

/*glance table*/
document.getElementById("nonLoaderr").style.display = "none";
document.getElementById("nonLoaderi").style.display = "none";
document.getElementById("nonLoaderd").style.display = "none";
document.getElementById("nonLoadert").style.display = "none";
function fillTabelGlance(array) {
  var r = 0;
  var d = 0;
  var i = 0;
  for (var j = 0; j < array.length; j++) {
    if (array[j].party == "R") {
      statistics.number_of_republicans++;
      statistics.votes_republicans =
        statistics.votes_republicans + array[j].votes_with_party_pct;
      r++;
    } else if (array[j].party == "I") {
      statistics.number_of_independents++;
      statistics.votes_independents =
        statistics.votes_independents + array[j].votes_with_party_pct;
      i++;
    } else if (array[j].party == "D") {
      statistics.number_of_democrats++;
      statistics.votes_democrats =
        statistics.votes_democrats + array[j].votes_with_party_pct;
      d++;
    }
  }

  statistics.votes_republicans = statistics.votes_republicans / r;
  statistics.votes_democrats = statistics.votes_democrats / d;
  statistics.votes_independents = statistics.votes_independents / i;
  for (const key in statistics) {
    if (isNaN(statistics[key])) {
      statistics[key] = 0;
    }
  }
  statistics.total_number = r + d + i;
  statistics.total_average =
    (statistics.votes_republicans +
      statistics.votes_democrats +
      statistics.votes_independents) /
    3;

  hrnumb.innerHTML = statistics.number_of_republicans;
  hratt.innerHTML = statistics.votes_republicans.toFixed(2) + "%";
  hdnumb.innerHTML = statistics.number_of_democrats;
  hdatt.innerHTML = statistics.votes_democrats.toFixed(2) + "%";
  hinumb.innerHTML = statistics.number_of_independents;
  hiatt.innerHTML = statistics.votes_independents.toFixed(2) + "%";
  htnumb.innerHTML = statistics.total_number;
  htatt.innerHTML = statistics.total_average.toFixed(2) + "%";

  document.getElementById("loader").style.display = "none";
  document.getElementById("nonLoaderr").style.display = "";
  document.getElementById("nonLoaderi").style.display = "";
  document.getElementById("nonLoaderd").style.display = "";
  document.getElementById("nonLoadert").style.display = "";
}
/*least engaged*/

function leastEngaged(array) {
  table = document.getElementById("LeastEngagedHouse");
  function compare(a, b) {
    for (var i = 0; i < array.length; i++) {
      if (a.missed_votes_pct > b.missed_votes_pct) {
        return -1;
      }
      if (a.missed_votes_pct < b.missed_votes_pct) {
        return 1;
      }
      return 0;
    }
  }

  array.sort(compare);

  var x = Math.round(array.length * 0.1);
  for (j = 0; j < x; j++) {
    if (array[j].middle_name === null) {
      fullname = array[j].first_name + " " + array[j].last_name;
    } else {
      fullname =
        array[j].first_name +
        " " +
        array[j].middle_name +
        " " +
        array[j].last_name;
    }
    var row = table.insertRow(j);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = fullname;
    cell2.innerHTML = array[j].missed_votes;
    cell3.innerHTML = array[j].missed_votes_pct + "%";
    if (j == x - 1) {
      if (array[j].missed_votes_pct == array[x].missed_votes_pct) {
        x++;
      }
    }
  }
  document.getElementById("loaderle").style.display = "none";
}

/*most engaged*/
function mostEngaged(array) {
  var z = 1;
  var i = 0;
  var j = 0;
  var x = Math.round(array.length * 0.1);
  var table = document.getElementById("mostEngagedHouse");
  while (z < array.length) {
    if (array[z].missed_votes_pct < array[i].missed_votes_pct) {
      i = z;
    }
    z++;
  }
  z = 0;
  var p = array[i].missed_votes_pct;

  while (z < array.length) {
    if (p == array[z].missed_votes_pct) {
      if (array[z].middle_name === null) {
        fullname = array[z].first_name + " " + array[z].last_name;
      } else {
        fullname =
          array[z].first_name +
          " " +
          array[z].middle_name +
          " " +
          array[z].last_name;
      }
      var row = table.insertRow(j);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = fullname;
      cell2.innerHTML = array[z].missed_votes;
      cell3.innerHTML = array[z].missed_votes_pct + "%";

      j++;
    }
    z++;
  }
  var n = 0;
  z = 0;
  l = array[0].missed_votes_pct;
  while (j < x) {
    z = 0;

    while (z < array.length) {
      if (array[z].missed_votes_pct < l && array[z].missed_votes_pct > p) {
        l = array[z].missed_votes_pct;
      }

      z++;
    }
    z = 0;
    while (z < array.length) {
      if (l == array[z].missed_votes_pct) {
        if (array[z].middle_name === null) {
          fullname = array[z].first_name + " " + array[z].last_name;
        } else {
          fullname =
            array[z].first_name +
            " " +
            array[z].middle_name +
            " " +
            array[z].last_name;
        }
        var row = table.insertRow(j);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = fullname;
        cell2.innerHTML = array[z].missed_votes;
        cell3.innerHTML = array[z].missed_votes_pct;
        j++;
      }
      z++;
    }
    p = l;
    l = array[0].missed_votes_pct;
  }
  document.getElementById("loaderme").style.display = "none";
}
