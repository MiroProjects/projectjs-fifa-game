Group = {};

//Caches the current table and the title
Group.table = null;
Group.title = null;

Group.createTable = function(data){
    var table = document.createElement("table");
    table.setAttribute("id", "infoTable");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    var headers = ["№", "Country", "Wins", "Draws", "Losses", "Games played", "Points", "Goal Difference"];
    var info = ["", "country", "wins", "draws", "losses", "games_played", "points", "goal_differential"];

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
    return table;
};

Group.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};

Group.createTables = function(data, content, paragraph){
    this.clear(content, paragraph);
    paragraph.appendChild(document.createTextNode("Groups' statistics"));
    var groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (let index = 0; index < data.length; index++) {
        var div = document.createElement("div");
        div.setAttribute("class", "groupContainer");
        var groupParagraph = document.createElement("p");
        groupParagraph.setAttribute("class", "groupTitle");
        var groupTitle = document.createTextNode(`Group ${groups[index]}`);
        groupParagraph.appendChild(groupTitle);
        div.appendChild(groupParagraph);
        var table = this.createTable(data[index].ordered_teams);
        div.appendChild(table);
        content.appendChild(div);
    }
};