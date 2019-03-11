Team = {};

Team.buttons = [];

//Caches the current table and the title
Team.table = null;
Team.title = null;

//Caches the countries which are clicked
Team.countries = {};

//Caches them for the country
Team.content = null;
Team.paragraph = null;

Team.createTable = function(data, content, paragraph){
    this.content = content;
    this.paragraph = paragraph;

    //Clear the previous field
    this.clear(content, paragraph);
    //Get table from cache
    if (this.table) {
        content.appendChild(this.table);
        paragraph.appendChild(this.title);
        return;
    }

    //Check if response is ok
    if (!data) {
        var errorText = document.createTextNode("AN ERROR OCCURED WITH THE RESPONSE FROM THE SERVER. PLEASE TRY AGAIN LATER.");
        paragraph.appendChild(errorText);
        return;
    }

    var table = document.createElement("table");
    table.setAttribute("id", "infoTable");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    var headers = ["№", "Country", "Group", "FIFA Code", "Info"];
    var info = ["", "country", "group_letter", "fifa_code", ""];
    var titleText = document.createTextNode("Teams' statistics");
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
                btn.setAttribute("id", element["fifa_code"]);
                this.buttons.push(btn);
                td.appendChild(btn);
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

    //Add event listeners to buttons
    this.addEventListenersToButtons();
    //Cache table and title
    this.table = table;
    this.title = titleText;
};

Team.addEventListenersToButtons = function () {
    for (let index = 0; index < this.buttons.length; index++) {
        this.buttons[index].addEventListener("click", () => {
            var countryId = this.buttons[index].id;
            //Get the cache and create table with this cache
            if (this.countries[countryId]) {
                Country.createTable(this.countries[countryId], this.content, this.paragraph);
                return;
            }

            Ajax.get(`http://worldcup.sfg.io/matches/country?fifa_code=${countryId}`, (data) => {
                Country.createTable(data, this.content, this.paragraph);
                //Cache the result for the country
                this.countries[countryId] = data;
            });
        });
    }
};

Team.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};