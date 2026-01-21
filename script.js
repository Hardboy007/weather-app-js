const searchEl = document.getElementById("search");
const btn = document.getElementById("btn");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");

function getWeather(city) {
    // 🔹 Show loading first
    cityEl.textContent = "Loading...";
    tempEl.textContent = "";
    conditionEl.textContent = "";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&contentType=json&key=APH2L8NUUTQV5KY7XWEHZB6WQ`)
        .then(res => {
            if (!res.ok) throw new Error("City not found!");
            return res.json();
        })
        .then(data => {
            const conditions = data.days[0].conditions;
            cityEl.textContent = data.resolvedAddress;
            tempEl.textContent = `Temperature: ${data.days[0].temp} °C`;
            conditionEl.textContent = conditions;

            // 🔹 Background based on condition
            if (conditions.toLowerCase().includes("rain")) {
                document.body.style.background = "linear-gradient(135deg, #616161, #9bc5c3)";
            } else if (conditions.toLowerCase().includes("clear")) {
                document.body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
            } else {
                document.body.style.background = "linear-gradient(135deg, #74ebd5, #9face6)";
            }
        })
        .catch(err => {
            cityEl.textContent = "City not found!";
            tempEl.textContent = "";
            conditionEl.textContent = "Please try another city";
        });
}
getWeather("Mumbai");

btn.addEventListener("click", () => {
    const city = searchEl.value.trim();
    if (!city) return alert("Enter a city!");
    getWeather(city);
    searchEl.value = "";
});
// 🔹 Enter key press support
searchEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});