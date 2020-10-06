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
    var canvas = document.createElement('canvas');
    canvas.id = "tester-chart";
    createChart();

    body.appendChild(h5);
    body.appendChild(p);
    body.appendChild(canvas);
    card.appendChild(body);
    div.appendChild(card);

    return div;
}



function createChart() {
    var myChart;
    var ctx = document.getElementById("tester-chart").getContext('2d');
    //get json data from get_json()
    var getData = $.get('/get_json');

    getData.done(function(results){
        myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: results.labels,
            datasets: [{
                data: results.data,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)'],
                borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)','rgba(0, 51, 102, 1)','rgba(255, 128, 0, 1)','rgba(255, 102, 178, 1)','rgba(178, 255, 102, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Top 10 recommended skills based on your current skill set'},
            scales: {xAxes: [{ ticks: {max: 1, min: 0}}]}
        }});
    })
}


function updateChart(myChart){
    $.ajax({
        type: "POST",
        url: "/get_json",
        data: $("#myForm").serialize(),
        success: function(data)
        {
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.data;
            myChart.update();
        }
    });
};

$('#submit-button').on('click', updateChart);