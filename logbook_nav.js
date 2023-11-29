document.addEventListener('DOMContentLoaded', function() {
    fetch('logbook.json')
        .then(response => response.json())
        .then(data => {
            let episodesDiv = document.getElementById('logbook_nav');
            let novemberData = data["2023"]["november"];
            let dates = Object.keys(novemberData); // Get all dates

            // Sort dates in descending order and pick the first one (latest date)
            let latestDate = dates.sort().reverse()[0];

            // Call f2 with the latest date
            f2(latestDate);

            // Loop through each date in 'november' of '2023'
            dates.forEach(date => {
                let episodeLink = document.createElement('a');
                episodeLink.href = '#'; // Using '#' to prevent page reload
                episodeLink.textContent = date;
                episodeLink.style.display = "block"; // Display links in block style

                // Add click event listener to call f2 with the date
                episodeLink.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    f2(date);
                });

                episodesDiv.appendChild(episodeLink);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function f2(date_str) {
    fetch('logbook.json')
        .then(response => response.json())
        .then(data => {
            // Accessing data for November 2023
            let novemberData = data["2023"]["november"][date_str];

            // Assuming you have HTML elements with IDs 'abstraction', 'improvements', and 'deterioration'
            document.getElementById('date').textContent = date_str;
            document.getElementById('weekday').textContent = novemberData.weekday;
            document.getElementById('abstract').textContent = novemberData.abstract;
            document.getElementById('improvements').textContent = novemberData.improvements;
            document.getElementById('deterioration').textContent = novemberData.deterioration;
            document.getElementById('episode-url').textContent = novemberData.episode_title;
            document.getElementById('episode-url').href = novemberData.episode_url;
        })
        .catch(error => console.error('Error fetching data:', error));
}
