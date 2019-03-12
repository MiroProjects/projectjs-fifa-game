var LocalStorage = {};

//Array for the history
LocalStorage.history = [];

//Counts the elements
LocalStorage.counter = 0;

//Stores the history
LocalStorage.addElementToHistory = function(element){
    localStorage.setItem(`${this.counter++}`, JSON.stringify(element));
    //Store counter
    localStorage.setItem("counter", `${this.counter}`);
};

LocalStorage.printHistory = function(content, title){
    //Clears the field
    this.clear(content, title);

    //Gets all elemets
    this.getAllStoredElements();

    //Checks if there is history stored
    if (this.history.length == 0) {
        var errorText = document.createTextNode("NO HISTORY TO SHOW!");
        paragraph.appendChild(errorText);
        return;
    }

    //Creates the history table
    var titleText = document.createTextNode("View history");
    title.appendChild(titleText);
    var table = document.createElement("table");
    table.setAttribute("id", "infoTable");
    var headRow = document.createElement("tr");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headers = ["Action", "Name", "Path"];
    for (let index = 0; index < headers.length; index++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(headers[index]));
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    for (let index = 0; index < this.history.length; index++) {
        var element = this.history[index];
        var tr = document.createElement("tr");
        var tdAction = document.createElement("td");
        var tdName = document.createElement("td");
        var tdPath = document.createElement("td");
        tdAction.appendChild(document.createTextNode(element.action));
        tdName.appendChild(document.createTextNode(element.name));
        tdPath.appendChild(document.createTextNode(element.path));
        tr.appendChild(tdAction);
        tr.appendChild(tdName);
        tr.appendChild(tdPath);
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    content.appendChild(table);
};

//Clears the field
LocalStorage.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};

//Get all stored items
LocalStorage.getAllStoredElements = function(){
    this.history = [];
    for (let index = 0; index < localStorage.length - 1; index++) {
        var item = localStorage.getItem(index);
        this.history.push(JSON.parse(item));   
    }
    this.counter = localStorage.getItem("counter");
};