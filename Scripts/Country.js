Country = {};

Country.createTable = function(data, content, paragraph){
    //Clear the previous field
    this.clear(content, paragraph);

    var table = document.createElement("table");
    table.setAttribute("id", "infoTable");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    var headers = ["№", "Venue", "Location", "Home team", "Away Team", "Winner"];
    var info = ["", "venue", "location", "home_team_country", "away_team_country", "winner"];
    var titleText = document.createTextNode("Country's all matches");
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
            else {
                td.appendChild(document.createTextNode(element[info[i]]));
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    content.appendChild(table);
};

Country.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};
