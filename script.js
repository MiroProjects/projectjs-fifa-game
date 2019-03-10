//Get the needed HTML elements
var btnTeams = document.getElementById("teams");
var btnMatches = document.getElementById("matches");
var btnGroups = document.getElementById("groups");
var content = document.getElementById("mainContent");
var title = document.getElementById("paragraph");

//Cache the data
var matchData = null;
var teamData = null;
var groupData = null;

var getData = () => {
    Ajax.get("https://worldcup.sfg.io/matches", (data) => {
        matchData = data;
        Match.createTable(matchData, content, title);
        Ajax.get("https://worldcup.sfg.io/teams/", (data) => {
            teamData = data;
            Ajax.get("https://worldcup.sfg.io/teams/group_results", (data) => {
                groupData = data;
            })
        });
    });
};

var addEventListenersToNavButtons = function(){
    btnTeams.addEventListener("click", () => {
        Team.createTable(teamData, content, title);
    });

    btnMatches.addEventListener("click", () => {
        Match.createTable(matchData, content, title);
    });

    btnGroups.addEventListener("click", () => {
        Group.createTables(groupData, content, title);
    });
};

window.onload = () => {
    getData();
    addEventListenersToNavButtons();
};