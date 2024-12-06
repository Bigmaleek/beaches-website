
document.addEventListener('DOMContentLoaded', function () {
    var dropdownTriggerList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownTriggerList.map(function (dropdownTriggerEl) {
        return new bootstrap.Dropdown(dropdownTriggerEl);
    });
});


  function toggleMenu() {
        const menu = document.querySelector('.floating-menu');
        menu.classList.toggle('active'); // Toggle 'active' class to show/hide menu
    }
  function updateTicker() {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const locationElement = document.getElementById("location");
  
  // Get current date and time
  const currentDate = new Date();
  const dateString = currentDate.toDateString();
  const timeString = currentDate.toLocaleTimeString();
  
  // Check if the location has not been fetched before
  if (!localStorage.getItem("location")) 
  {
    // Get geolocation (latitude and longitude)
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation);
    }
  
        function updateLocation(position) {
        const latitude = position.coords.latitude.toFixed(2);
        const longitude = position.coords.longitude.toFixed(2);
  
  
            // Save location to local storage
            localStorage.setItem("location", "Location: " + latitude + ", " + longitude);
        };
    }
  
    // Retrieve and update location from local storage to your website
    const locationString = localStorage.getItem("location");
  
    // Update ticker content
    dateElement.innerHTML = "Date: " + dateString;
    timeElement.innerHTML = "Time: " + timeString;
    locationElement.innerHTML = locationString;
        }
  
    // Update the ticker every second
    setInterval(updateTicker, 1000);
  
    // Initial update
    updateTicker();
    // Visitor counter
    const counterElement = document.getElementById("visitor-counter");
    let count = localStorage.getItem("page_view");
    count = count === null ? 0 : parseInt(count, 10);
    count += 1;
    localStorage.setItem("page_view", count);
    counterElement.innerText = `Visitors: ${count}`;

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    // Function to get and display location
    function updateLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = "984be0628744348386e9cdba278040";
                    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
                    fetch(apiUrl)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.results && data.results.length > 0) {
                                const components = data.results[0].components;
                                const city =
                                    components.city ||
                                    components.town ||
                                    components.village ||
                                    "Unknown city";
                                const country = components.country || "Unknown country";
                                const location = `${city}, ${country}`;
                                const tickerElement = document.getElementById("ticker");
                                tickerElement.dataset.location = location;
                                updateTicker();
                            } else {
                                document.getElementById("ticker").innerText +=
                                    " | Location: Unavailable";
                            }
                        })
                        .catch((error) => {
                            console.error("Error getting location:", error);
                            document.getElementById("ticker").innerText +=
                                " | Location: Unavailable";
                        });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    document.getElementById("ticker").innerText +=
                        " | Location: Unavailable";
                }
            );
        } else {
            document.getElementById("ticker").innerText +=
                " | Location: Unavailable";
        }
    }

    setInterval(updateTicker, 1000);
    updateTicker();
    updateLocation();
