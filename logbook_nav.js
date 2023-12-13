let currentSelectedLink = null;

// Function to populate the agenda section
function populateAgenda(agendaItems) {
    let agendaSection = document.getElementById('agenda');
    let agenda_div = document.getElementById('agenda_div');
    // Clear existing content
    agendaSection.innerHTML = '';
    let ul = document.createElement('ul');
    agendaItems.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    agendaSection.appendChild(ul);
    
}

// Function to load and display logbook data for a given date
function f2(date_str) {
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            let data_json = data["2023"]["december"][date_str];

            document.getElementById('date').textContent = date_str;
            document.getElementById('project').textContent = data_json.project;
            document.getElementById('weekday').textContent = data_json.weekday;
            document.getElementById('objective').textContent = data_json.objective;
            document.getElementById('methods').textContent = data_json.methods;
            document.getElementById('insights').textContent = data_json.insights;
            document.getElementById('conclusions').textContent = data_json.conclusions;
            document.getElementById('image').src = data_json.image;
            document.getElementById('image').alt = data_json.alt_text;
            document.getElementById('yt_video').src = data_json.video_url;

            let ytVideo = document.getElementById('yt_video');
            let media = document.getElementById('media');

            if (data_json.video_url === '') {
                ytVideo.classList.add('hide');
                ytVideo.src = '';

                if (data_json.image === '') {
                    media.classList.add('hide');
                }
            } else {
                ytVideo.classList.remove('hide');
                ytVideo.src = data_json.video_url;
            }
            if (data_json.image != '' || data_json.video_url != '') {
                media.classList.remove('hide');
            }

            // Populate the agenda section
            if (data_json.agenda.length > 0) {
                agenda_div.classList.remove('hide');
                populateAgenda(data_json.agenda);
            } else {
                agenda_div.classList.add('hide');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fetching logbook data
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            let episodesDiv = document.getElementById('logbook_nav');
            let data_json = data["2023"]["december"];
            let dates = Object.keys(data_json);

            let latestDate = dates.sort().reverse()[0];
            f2(latestDate);

            dates.forEach(date => {
                let episodeLink = document.createElement('a');
                episodeLink.href = '#';
                episodeLink.textContent = date;
                episodeLink.style.display = "block";

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

    // Burger menu functionality
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('logbook_nav');

    burger.addEventListener('click', function() {
        nav.classList.toggle('is-active');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !burger.contains(event.target)) {
            if (nav.classList.contains('is-active')) {
                nav.classList.remove('is-active');
            }
        }
    });
});
