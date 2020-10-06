var rowNum = 0;

// TODO: Modify to listen for valid tags in input field
var button = document.getElementById('submit-button').addEventListener('click', createDashboard);

function createDashboard() {
    var dash = document.getElementsByClassName("dashboard");
    if (dash.length != 0) {
        return;
    }
    dash = document.createElement('div');
    dash.className = "dashboard";
    dash.style.cssText = 'opacity:0;';

    var title = document.createElement('h3');
    title.appendChild(document.createTextNode("Dashboard"));
    dash.appendChild(title);
    

    console.log("Dashboard created");
    $(".content").append(dash);
    
    var row1 = createDashRow();
    var row2 = createDashRow();
    
    $(".dashboard").append(row1);
    $(".dashboard").append(row2);

    $(".dashboard").fadeTo("slow", 1.0);
}

function createDashRow() {
    var row = document.createElement('div');
    rowNum += 1;
    row.className = "row row"+rowNum;
    
    var rowSize = ["col-sm-6", "col-sm-6"];
    for (var i = 0; i < rowSize.length; i++) {
        card = createDashCard(rowSize[i])
        row.appendChild(card);
    }
    console.log("Row "+rowNum+" generated");
    return row;
}


// TODO: Modify to include type of visualisation id to target visualisation
function createDashCard(bootstrapSize) {
    var div = document.createElement('div');
    div.className = bootstrapSize;
    
    var card = document.createElement('div');
    card.className = "card";

    var body = document.createElement('div');
    body.className = "card-body";
    
    var h5 = document.createElement('h5');
    h5.className = "card-title";
    var title = "Skill recommendations"; // TODO: Modification method
    h5.appendChild(document.createTextNode(title));

    var p = document.createElement('p');
    p.className = "card-text";
    var text = "Some text here"; // TODO: Modification method
    p.appendChild(document.createTextNode(text));

    // TODO: Add Visualisation

    body.appendChild(h5);
    body.appendChild(p);
    card.appendChild(body);
    div.appendChild(card);

    return div;
}