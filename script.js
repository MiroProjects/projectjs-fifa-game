//Get the needed HTML elements
var btnTeams = document.getElementById("teams");
var btnMatches = document.getElementById("matches");
var btnGroups = document.getElementById("groups");
var btnSearch = document.getElementById("search");
var btnHistory = document.getElementById("history");
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
        LocalStorage.addElementToHistory({action: "click", name: "Teams", path: "Teams"});
        Team.createTable(teamData, content, title);
    });

    btnMatches.addEventListener("click", () => {
        LocalStorage.addElementToHistory({action: "click", name: "Matches", path: "Matches"});
        Match.createTable(matchData, content, title);
    });

    btnGroups.addEventListener("click", () => {
        LocalStorage.addElementToHistory({action: "click", name: "Groups", path: "Groups"});
        Group.createTables(groupData, content, title);
    });

    btnSearch.addEventListener("click", () => {
        LocalStorage.addElementToHistory({action: "click", name: "Search", path: "Search"});
        Search.createSearchWindow(popUp, teamData, content, title);
    });

    btnHistory.addEventListener("click", () => {
        LocalStorage.printHistory(content, title);
    });

    logoImage.addEventListener("click", () => {
        LocalStorage.addElementToHistory({action: "click", name: "Logo", path: "Image"});
        Match.createTable(matchData, content, title);
    });

    textLogo.addEventListener("click", () => {
        LocalStorage.addElementToHistory({action: "click", name: "Text Logo", path: "Main Title"});
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
    var textHeader = document.createElement("h2");
    textHeader.appendChild(document.createTextNode("Hello user"));
    textHeader.setAttribute("id", "popUpHeader");
    var textParagraph = document.createElement("p");
    textParagraph.setAttribute("id", "popUpParagraph");
    var text = document.createTextNode("To see the statistics click on the buttons in the navigation bar and then scroll down the page.");
    textParagraph.appendChild(text);
    div.appendChild(textHeader);
    div.appendChild(textParagraph);
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