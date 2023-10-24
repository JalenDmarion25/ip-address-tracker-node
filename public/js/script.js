const button = document.getElementById('btn_submit');
const ipAddress = document.getElementById('ip_input');

const ipData = document.getElementById('ip_data');
const locData = document.getElementById('loc_data');
const zoneData = document.getElementById('zone_data');
const ispData = document.getElementById('isp_data');



// IP address validation.
const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;


var map = L.map('map').setView([32.69922, -117.11281], 13);
var x = window.matchMedia("(max-width: 1300px)");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);



button.addEventListener('click', async (e) => {

    e.preventDefault();
    // This code will execute when the button is clicked
    const message = ipAddress.value;

    // Check if the message is not empty
    if (ipRegex.test(message)) {
        // findIP(message);

        fetch('/sendString', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stringData: message }),
          })
            .then((response) => response.json())
            .then((data) => {

              var ip = message;
              var location = data.message.location.region + ', ' + data.message.location.city;
              var isp = data.message.isp;
              var timezone = "UTC " + data.message.location.timezone;
              var lat = data.message.location.lat;
              var lng = data.message.location.lng;
              

                if(x.matches){
                map.setView([lat, lng], 30); 
                var marker = L.marker([lat, lng]).addTo(map);
                }else{
                map.setView([lat, lng], 13); 
                var marker = L.marker([lat, lng]).addTo(map);
                }

                $(ipData).text(ip);
                $(locData).text(location);
                $(ispData).text(isp);
                $(zoneData).text(timezone);
            })
            .catch((error) => {
              console.error('Error:', error);
          });

        ipAddress.classList.remove('active');
    }else{
        ipAddress.placeholder = "Enter a valid IP Address!";
        ipAddress.value = "";
        ipAddress.classList.add('active');
        
    }
});


