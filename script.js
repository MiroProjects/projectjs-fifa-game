//Get the needed HTML elements
var btnTeams = document.getElementById("teams");
var btnMatches = document.getElementById("matches");
var btnGroups = document.getElementById("groups");
var btnSearch = document.getElementById("search");
var content = document.getElementById("mainContent");
var title = document.getElementById("paragraph");
var popUp = document.getElementById("popUpWindow");
var logoImage = document.getElementById("logo");
var textLogo = document.getElementById("textLogo");

//Cache the data
var matchData = null;
var teamData = null;
var groupData = null;

var getData = () => {
    Ajax.get("http://worldcup.sfg.io/matches", (data) => {
        matchData = data;
        Ajax.get("http://worldcup.sfg.io/teams/", (data) => {
            teamData = data;
            Ajax.get("http://worldcup.sfg.io/teams/group_results", (data) => {
                groupData = data;
            })
        });
    });
};

var addEventListenersToButtons = function(){
    btnTeams.addEventListener("click", () => {
        Team.createTable(teamData, content, title);
    });

    btnMatches.addEventListener("click", () => {
        Match.createTable(matchData, content, title);
    });

    btnGroups.addEventListener("click", () => {
        Group.createTables(groupData, content, title);
    });

    btnSearch.addEventListener("click", () => {
        Search.createSearchWindow(popUp, teamData, content, title);
    });

    logoImage.addEventListener("click", () => {
        Match.createTable(matchData, content, title);
    });

    textLogo.addEventListener("click", () => {
        Match.createTable(matchData, content, title);
    });
};

window.onload = () => {
    getData();
    addEventListenersToButtons();
    createPopUpWindow();
};

var createPopUpWindow = function(){
    var div = document.createElement("div");
    div.setAttribute("id", "popUp");
    var text = document.createTextNode("Hello to see the statistics click on the buttons in the navigation bar and then scroll down the page.");
    div.appendChild(text);
    var closeBtn = document.createElement("Input");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("value", "Close");
    closeBtn.setAttribute("id", "closeBtn");
    closeBtn.addEventListener("click", () => {
        popUp.removeChild(div);
    });
    div.appendChild(closeBtn);
    popUp.appendChild(div);
};