var skillsRecommendation;
var myChart2;
var myChart3;
var myChart1;

$(".dashboard").fadeTo("slow", 1.0);

document.getElementById('submit-button').addEventListener('click', function() {
    console.log($("#skillsRecommendationForm"));
    if ($("#skillsRecommendationForm").serialize() != "") {
        updateSkillsRecommendation();
    } 
});

function createSkillsRecommendation() {
    var ctx = document.getElementById("skillsRecommendationChart").getContext('2d');
    //get json data from get_json()
    skillsRecommendation = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)'],
                borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)', 'rgba(0, 51, 102, 1)', 'rgba(255, 128, 0, 1)', 'rgba(255, 102, 178, 1)', 'rgba(178, 255, 102, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Top 10 recommended skills based on your current skill set'
            },
            scales: { xAxes: [{ ticks: { max: 1, min: 0 } }] }
        }
    });
}

function updateSkillsRecommendation() {
    console.log("Ye");
    $.ajax({
        type: "POST",
        url: "/get_json",
        data: $("#skillsRecommendationForm").serialize(),
        success: function (data) {
            console.log(data)
            skillsRecommendation.data.labels = data.labels;
            skillsRecommendation.data.datasets[0].data = data.data;
            skillsRecommendation.update();
        }
    });
};

function createRoleSkills() {
    var ctx1 = document.getElementById("role_skills_chart").getContext('2d');
    //get json data from get_json()
    var getData = $.get('/role_skills');

    getData.done(function(results){
        myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: results.skills,
            datasets: [{
                data: results.ratings,
                label: results.role,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)','rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)'],
                borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)','rgba(0, 51, 102, 1)','rgba(255, 128, 0, 1)','rgba(255, 102, 178, 1)','rgba(178, 255, 102, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)','rgba(0, 51, 102, 1)','rgba(255, 128, 0, 1)','rgba(255, 102, 178, 1)','rgba(178, 255, 102, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Recommended skills based on role'},
            scales: {yAxes: [{ ticks: {max: 5, min: 0}}],
                    xAxes: [{ticks: {autoSkip: false}}]}}});
    })
}

function update_role_skills_chart(){
    $.ajax({
        type: "POST",
        url: "/role_skills",
        data: $("#role_skill_form").serialize(),
        success: function(data)
        {
            myChart1.data.datasets[0].label = data.role;
            myChart1.data.labels = data.skills;
            myChart1.data.datasets[0].data = data.ratings;
            myChart1.update();
        }
    });
};


function createJobType() {
    var ctx3 = document.getElementById("jobtype_chart").getContext('2d');

    var getData = $.get('/job_type');

    getData.done(function(results){
        myChart3 = new Chart(ctx3, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
            labels: results.job_type,
            datasets: [{
            data: results.frequency,
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
            }]
        },
        options: {
            responsive: true,
            legend: {
            position: 'right',
            labels: {
                padding: 20,
                boxWidth: 10
            }
            },
            plugins: {
            datalabels: {
                formatter: (value, ctx3) => {
                let sum = 0;
                let dataArr = ctx3.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                let percentage = (value * 100 / sum).toFixed(2) + "%";
                return percentage;
                },
                color: 'white',
                labels: {
                title: {
                    font: {
                    size: '16'
                    }
                }
                }
            }
            }
        }
        });
    })
}

function update_jobtype(){
    $.ajax({
        type: "POST",
        url: "/job_type",
        data: $("#jobtype_form").serialize(),
        success: function(data)
        {
            myChart3.data.labels = data.job_type;
            myChart3.data.datasets[0].data = data.frequency;
            myChart3.update();
        }
    });
};


function createCategoryChart() {
    var ctx2 = document.getElementById("location_category_chart").getContext('2d');
    //get json data from get_json()
    var getData = $.get('/location_category');

    getData.done(function(results){
        myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: results.categories,
            datasets: [{
                data: results.frequency,
                label: results.location,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)','rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',
                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 51, 102, 0.5)', 'rgba(255, 128, 0, 0.5)', 'rgba(255, 102, 178, 0.5)', 'rgba(178, 255, 102, 0.5)'],
                borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)','rgba(0, 51, 102, 1)','rgba(255, 128, 0, 1)','rgba(255, 102, 178, 1)','rgba(178, 255, 102, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
                    'rgba(0, 0, 255, 1)','rgba(0, 51, 102, 1)','rgba(255, 128, 0, 1)','rgba(255, 102, 178, 1)','rgba(178, 255, 102, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Job Markets based on location'},
            scales: {xAxes: [{ticks: {autoSkip: false}}]}}});
    })
}

function update_category_chart(){
    $.ajax({
        type: "POST",
        url: "/location_category",
        data: $("#location_form").serialize(),
        success: function(data)
        {
            myChart2.data.datasets[0].label = data.location;
            myChart2.data.labels = data.categories;
            myChart2.data.datasets[0].data = data.frequency;
            myChart2.update();
        }
    });
};

$('#update_role_skill').on('click', update_role_skills_chart);
$('#update_job_type').on('click', update_jobtype);
$('#update_location_jobmarket').on('click', update_category_chart);

