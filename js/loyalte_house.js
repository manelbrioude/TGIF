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
    leastLoyal(members);
    mostLoyal(members);
  })
  .catch(function(jamon) {});
/*glance tabel*/
document.getElementById("nonLoaderr").style.display = "none";
document.getElementById("nonLoaderi").style.display = "none";
document.getElementById("nonLoaderd").style.display = "none";
document.getElementById("nonLoadert").style.display = "none";
function fillTabelGlance(array) {
  var table = document.getElementById("houseatt");
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
/*least loyal*/

function leastLoyal(array) {
  table = document.getElementById("LeastLoyalHouse");
  function compare2(a, b) {
    for (var i = 0; i < array.length; i++) {
      if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1;
      }
      if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1;
      }
      return 0;
    }
  }

  array.sort(compare2);

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
    cell2.innerHTML = Math.round(
      ((array[j].total_votes - array[j].missed_votes) *
        array[j].votes_with_party_pct) /
        100
    );
    cell3.innerHTML = array[j].votes_with_party_pct + "%";
    if (j == x - 1) {
      if (array[j].votes_with_party_pct == array[x].votes_with_party_pct) {
        x++;
      }
    }
  }
  document.getElementById("loaderll").style.display = "none";
}

/*most loyal*/

function mostLoyal(array) {
  table = document.getElementById("MostLoyalHouse");
  function compare(a, b) {
    for (var i = 0; i < array.length; i++) {
      if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return -1;
      }
      if (a.votes_with_party_pct < b.votes_with_party_pct) {
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
    cell2.innerHTML = Math.round(
      ((array[j].total_votes - array[j].missed_votes) *
        array[j].votes_with_party_pct) /
        100
    );
    cell3.innerHTML = array[j].votes_with_party_pct + "%";
    if (j == x - 1) {
      if (array[j].votes_with_party_pct == array[x].votes_with_party_pct) {
        x++;
      }
    }
  }
  document.getElementById("loaderml").style.display = "none";
}
