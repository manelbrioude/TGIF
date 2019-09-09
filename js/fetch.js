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
    printMembers(members);
  })
  .catch(function(jamon) {
    console.log(err);
  });

function printMembers(membersToPrint) {
  for (let i = 0; i < membersToPrint.length; i++) {
    console.log("N" + i, membersToPrint[i].first_name);
  }
}
