let currentSelectedLink = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            let episodesDiv = document.getElementById('logbook_nav');
            let data_json = data["2023"]["december"];
            let dates = Object.keys(data_json); // Get all dates

            // Sort dates in descending order and pick the first one (latest date)
            let latestDate = dates.sort().reverse()[0];

            // Call f2 with the latest date
            f2(latestDate);

            // Loop through each date in json

            dates.forEach(date => {
                let episodeLink = document.createElement('a');
                episodeLink.href = '#'; // Using '#' to prevent page reload
                episodeLink.textContent = date;
                episodeLink.style.display = "block"; // Display links in block style

                episodeLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    if (currentSelectedLink) {
                        currentSelectedLink.classList.remove('selected');
                    }
                    currentSelectedLink = episodeLink;
                    episodeLink.classList.add('selected');
                    f2(date);
                });
        
                episodesDiv.appendChild(episodeLink);
                if (date === latestDate) {
                    currentSelectedLink = episodeLink;
                    episodeLink.classList.add('selected');
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function f2(date_str) {
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            // Accessing data for November 2023
            let data_json = data["2023"]["december"][date_str];

            // Assuming you have HTML elements with IDs 'abstraction', 'improvements', and 'deterioration'
            document.getElementById('date').textContent = date_str;
            document.getElementById('project').textContent = data_json.project;
            document.getElementById('weekday').textContent = data_json.weekday;
            document.getElementById('objective').textContent = data_json.objective;
            document.getElementById('methods').textContent = data_json.methods;
            document.getElementById('insights').textContent = data_json.insights;
            document.getElementById('conclusions').textContent = data_json.conclusions;
            document.getElementById('image').src = data_json.image;
            document.getElementById('yt_video').src = data_json.episode_url;
            document.getElementById('episode-url').textContent = data_json.episode_title;
            // document.getElementById('episode-url').href = data_json.episode_url;
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('logbook_nav');

    burger.addEventListener('click', function() {
        nav.classList.toggle('is-active');
    });
});