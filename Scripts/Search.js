Search = {};

//Saves the selected country's matches
Search.searchMatches = null;

Search.createTable = function(data, content, paragraph){
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
    var headers = ["№", "Player"];
    var titleText = document.createTextNode("Players' statistics");
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
        var tdIndex = document.createElement("td");
        var tdPlayer =  document.createElement("td");
        tdIndex.appendChild(document.createTextNode(index + 1));
        tdPlayer.appendChild(document.createTextNode(element));
        tr.appendChild(tdIndex);
        tr.appendChild(tdPlayer);
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    content.appendChild(table);
};

Search.clear = function(content, title){
    content.innerHTML = "";
    title.innerHTML = "";
};

//Creates the search window
Search.createSearchWindow = function (elementToAppendTo, countryData, content, paragraph) {
    //Create search window
    //Create the container div
    var div = document.createElement("div");
    div.setAttribute("id", "popUpSearch");
    //Create the title
    var textParagraph = document.createElement("p");
    textParagraph.setAttribute("class", "popUpInfoParagraph");
    var text = document.createTextNode("Search players here...");
    textParagraph.appendChild(text);
    div.appendChild(textParagraph);

    //Create the dropdowns
    createDropDownFilters(div, countryData, content, paragraph);

    //Create the button
    var closeBtn = document.createElement("Input");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("value", "Close");
    closeBtn.setAttribute("id", "closeBtn");
    closeBtn.addEventListener("click", () => {
        elementToAppendTo.removeChild(div);
    });

    div.appendChild(closeBtn);
    elementToAppendTo.appendChild(div);
};

//Creates all dropdows for the select
var createDropDownFilters = function (div, countryData, content, paragraph) {
    //Create dropdowns
    var selectLetter = document.createElement("select");
    var selectCountry = document.createElement("select");
    var selectMatch = document.createElement("select");
    //Add ids
    selectLetter.setAttribute("id", "selectLetter");
    selectCountry.setAttribute("id", "selectCountry");
    selectMatch.setAttribute("id", "selectMatch");

    //Add titles
    selectLetter.setAttribute("title", "Select a letter");
    selectCountry.setAttribute("title", "Select a country");
    selectMatch.setAttribute("title", "Select a match");

    //Add default select option
    createDefaultOption(selectLetter);
    createDefaultOption(selectCountry);
    createDefaultOption(selectMatch);

    //Create options for the first letter dropdown
    for (let index = 0; index < 26; index++) {
        var option = document.createElement("option");
        option.value = String.fromCharCode(65 + index);
        option.text = String.fromCharCode(65 + index);
        selectLetter.appendChild(option);
    }

    //Add listener for the letter select
    selectLetter.addEventListener("change", () => {
        var value = selectLetter.options[selectLetter.selectedIndex].value;
        if (value) {
            selectCountry.innerHTML = "";
            selectMatch.innerHTML = "";
            createDefaultOption(selectCountry);
            //Create options for the second country dropdown
            for (let index = 0; index < countryData.length; index++) {
                var option = document.createElement("option");
                if (countryData[index].country.charAt(0) == value) {
                    option.value = countryData[index].fifa_code;
                    option.text = countryData[index].country;
                    selectCountry.appendChild(option);
                }
            }
        }
    });

    //Add listener for the country select
    selectCountry.addEventListener("change", () => {
        var value = selectCountry.options[selectCountry.selectedIndex].value;
        if (value) {
            //Get the country
            selectMatch.innerHTML = "";
            createDefaultOption(selectMatch);
            Ajax.get(`http://worldcup.sfg.io/matches/country?fifa_code=${value}`, (data) => {
                //Add all the matches of this country
                for (let i = 0; i < data.length; i++) {
                    var option = document.createElement("option");
                    option.value = data[i].venue;
                    option.text = data[i].venue;
                    selectMatch.appendChild(option);
                    Search.searchMatches = data;
                }
            });
        }
    });

    //List all the players of the current match
    selectMatch.addEventListener("change", () => {
        var value = selectMatch.options[selectMatch.selectedIndex].value;
        if (value) {
            for (let index = 0; index < Search.searchMatches.length; index++) {
                if (Search.searchMatches[index].venue == value) {
                    Search.createTable(Search.searchMatches[index].officials, content, paragraph);
                    break;
                }
            }
        }
    });

    //Append all selects
    div.appendChild(selectLetter);
    div.appendChild(selectCountry);
    div.appendChild(selectMatch);
};

//Creates default option for a select
var createDefaultOption = function(select){
    var defaultOption = document.createElement("option");
    defaultOption.value = null;
    defaultOption.text = "--Select--";
    select.appendChild(defaultOption);
};