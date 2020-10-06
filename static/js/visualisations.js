var skillsRecommendation;

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