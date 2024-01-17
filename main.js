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

    function f2(year, month, date) {
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            let data_json = data[year][month][date];

            // Update the logbook content
            document.getElementById('date').textContent = date;
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

            // Update media visibility
            if (data_json.video_url === '') {
                ytVideo.classList.add('hide');
                ytVideo.src = '';
            } else {
                ytVideo.classList.remove('hide');
                ytVideo.src = data_json.video_url;
            }

            if (data_json.image === '') {
                image.classList.add('hide');
            } else {
                image.classList.remove('hide');
                image.src = data_json.image; // Update the image source
            }

            if (data_json.image === '' && data_json.video_url === '') {
                media.classList.add('hide');
            } else {
                media.classList.remove('hide');
            }
            
            if (data_json.image != '' || data_json.video_url != '') {
                media.classList.remove('hide');
            }

            // Update the agenda section
            if (data_json.agenda.length > 0) {
                agenda_div.classList.remove('hide');
                populateAgenda(data_json.agenda);
            } else {
                agenda_div.classList.add('hide');
            }

            // Highlight the current selected day link
            if (currentSelectedLink) {
                currentSelectedLink.classList.remove('selected');
            }
            let dayLinks = document.getElementById('days').getElementsByTagName('a');
            for (let link of dayLinks) {
                if (link.textContent === date) {
                    link.classList.add('selected');
                    currentSelectedLink = link;
                    break;
                        }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }


    function highlightLink(link, type) {
    let currentSelected = document.getElementsByClassName('selected-' + type);
    if (currentSelected.length > 0) {
        currentSelected[0].classList.remove('selected-' + type);
    }
    link.classList.add('selected-' + type);
}

function generateMonthLinks(year, data, monthsDiv, daysDiv, latestMonth) {
    monthsDiv.innerHTML = ''; // Clear existing months
    Object.keys(data[year]).sort().reverse().forEach(month => {
        let monthLink = document.createElement('a');
        monthLink.href = '#';
        monthLink.textContent = month;
        monthLink.addEventListener('click', function(event) {
            event.preventDefault();
            generateDayLinks(year, month, data, daysDiv);
            highlightLink(monthLink, 'month');
        });
        monthsDiv.appendChild(monthLink);
        if (month === latestMonth) {
            highlightLink(monthLink, 'month');
        }
    });
}

function generateDayLinks(year, month, data, daysDiv, latestDate) {
    daysDiv.innerHTML = ''; // Clear existing days
    Object.keys(data[year][month]).sort().reverse().forEach(date => {
        let dateLink = document.createElement('a');
        dateLink.href = '#';
        dateLink.textContent = date;
        dateLink.addEventListener('click', function(event) {
            event.preventDefault();
            f2(year, month, date);
            highlightLink(dateLink, 'day');
        });
        daysDiv.appendChild(dateLink);
        if (date === latestDate) {
            highlightLink(dateLink, 'day');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('./logbook/logbook.json')
        .then(response => response.json())
        .then(data => {
            let yearsDiv = document.getElementById('years');
            let monthsDiv = document.getElementById('months');
            let daysDiv = document.getElementById('days');

            let latestYear = Object.keys(data).sort().reverse()[0];
            let latestMonth = Object.keys(data[latestYear]).sort().reverse()[0];
            let latestDate = Object.keys(data[latestYear][latestMonth]).sort().reverse()[0];
            f2(latestYear, latestMonth, latestDate);

            Object.keys(data).sort().reverse().forEach(year => {
                let yearLink = document.createElement('a');
                yearLink.href = '#';
                yearLink.textContent = year;
                yearLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    monthsDiv.innerHTML = ''; // Clear months
                    daysDiv.innerHTML = ''; // Clear days
                    highlightLink(yearLink, 'year');
                    generateMonthLinks(year, data, monthsDiv, daysDiv);
                });
                yearsDiv.appendChild(yearLink);
                if(year === latestYear){
                    highlightLink(yearLink, 'year');
                }
            });

            generateMonthLinks(latestYear, data, monthsDiv, daysDiv, latestMonth);
            generateDayLinks(latestYear, latestMonth, data, daysDiv, latestDate);
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