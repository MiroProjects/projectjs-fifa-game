Match = {};

Match.buttons = [];

//Caches the table and the title
Match.table = null;
Match.title = null;

//Stores the current pop up
Match.popUp = null;

Match.createTable = function(data, content, paragraph){
    //Clear the previous field
    this.clear(content, paragraph);
    //Get table from cache
    if (this.table) {
        content.appendChild(this.table);
        paragraph.appendChild(this.title);
        return;
    }

    var table = document.createElement("table");
    table.setAttribute("id", "infoTable");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    var headers = ["№", "Venue", "Location", "Home team", "Away Team", "Home's Team Goals", "Away's team goals", "Winner", "Info"];
    var info = ["", "venue", "location", "home_team_country", "away_team_country", "home_team", "away_team", "winner", ""];
    var titleText = document.createTextNode("Matches' statistics");
    paragraph.appendChild(titleText);

    for (let index = 0; index < headers.length; index++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(headers[index]));
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        var tr = document.createElement("tr");
        for (let i = 0; i < info.length; i++) {
            var td = document.createElement("td");
            if (i == 0) {
                td.appendChild(document.createTextNode(index + 1));
            }
            else if(i == info.length - 1){
                var btn = document.createElement("Input");
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "infoButtons");
                btn.setAttribute("value", "More info");
                btn.setAttribute("id", element["fifa_id"]);
                this.buttons.push(btn);
                td.appendChild(btn);
            }
            else{
                if (typeof element[info[i]] === 'object') {
                    td.appendChild(document.createTextNode(element[info[i]].goals));
                }
                else{
                    td.appendChild(document.createTextNode(element[info[i]]));
                }
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    content.appendChild(table);

    //Add event listeners to buttons
    this.addEventListenersToButtons(matchData);
    //Cache table and title
    this.table = table;
    this.title = titleText;
};

Match.addEventListenersToButtons = function(matchData){
    for (let index = 0; index < this.buttons.length; index++) {
        this.buttons[index].addEventListener("click", () => {
            var id = this.buttons[index].id;
            var match;
            for (let index = 0; index < matchData.length; index++) {
                if (matchData[index].fifa_id == id) {
                    match = matchData[index];
                    break;
                }          
            }
            var dataWeather = match.weather;
            text = [`Weather: ${dataWeather.description}`, 
            `Temperature: ${dataWeather.temp_celsius}`,
            ` Wind Speed: ${dataWeather.wind_speed}`,
            `Humidity: ${dataWeather.humidity}`];

            popUpInfoWindow(text)
        });
    }
};

Match.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};

var popUpInfoWindow = function(textArray){
    //If there is a pop up when you click for new info remove the old one
    if (Match.popUp) {
        Match.table.removeChild(Match.popUp);
    }
    //Create pop up
    var div = document.createElement("div");
    div.setAttribute("id", "popUpInfoMatch");
    for (let index = 0; index < textArray.length; index++) {
        var textParagraph = document.createElement("p");
        textParagraph.setAttribute("class", "popUpInfoParagraph");
        var text = document.createTextNode(textArray[index]);
        textParagraph.appendChild(text);
        div.appendChild(textParagraph);
    }
    var closeBtn = document.createElement("Input");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("value", "Close");
    closeBtn.setAttribute("id", "closeBtn");
    closeBtn.addEventListener("click", () => {
        Match.table.removeChild(div);
        Match.popUp = null;
    });
    div.appendChild(closeBtn);
    Match.table.appendChild(div);
    Match.popUp = div;
};