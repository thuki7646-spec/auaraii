const apiKey = "a624721f5ac51fbe51589472fac68765";

// Қазақша → Ағылшынша қалалар
const cities = [
    { kz: "Алматы", en: "Almaty" },
    { kz: "Астана", en: "Astana" },
    { kz: "Шымкент", en: "Shymkent" },
    { kz: "Қарағанды", en: "Karaganda" },
    { kz: "Ақтөбе", en: "Aktobe" },
    { kz: "Атырау", en: "Atyrau" },
    { kz: "Тараз", en: "Taraz" },
    { kz: "Семей", en: "Semey" },
    { kz: "Өскемен", en: "Oskemen" },
    { kz: "Қостанай", en: "Kostanay" },
    { kz: "Павлодар", en: "Pavlodar" },
    { kz: "Қызылорда", en: "Kyzylorda" },
    { kz: "Орал", en: "Oral" },
    { kz: "Петропавл", en: "Petropavl" }
];

let selectedCityEn = "";

function showCities() {
    const input = document.getElementById("cityInput").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";

    if (!input) return;

    cities.forEach(city => {
        if (city.kz.toLowerCase().startsWith(input)) {
            const div = document.createElement("div");
            div.className = "suggestion";
            div.innerText = city.kz;

            div.onclick = () => {
                document.getElementById("cityInput").value = city.kz;
                selectedCityEn = city.en;
                suggestions.innerHTML = "";
            };

            suggestions.appendChild(div);
        }
    });
}

async function getWeather() {
    const result = document.getElementById("result");

    if (!selectedCityEn) {
        result.innerHTML = "Тізімнен қаланы таңдаңыз!";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCityEn}&appid=${apiKey}&units=metric&lang=kk`
        );

        if (!response.ok) throw new Error("Қала табылмады");

        const data = await response.json();

        result.innerHTML = `
            <p><b>Қала:</b> ${data.name}</p>
            <p><b>Температура:</b> ${data.main.temp} °C</p>
            <p><b>Сипаттама:</b> ${data.weather[0].description}</p>
            <p><b>Ылғалдылық:</b> ${data.main.humidity}%</p>
        `;
    } catch (error) {
        result.innerHTML = error.message;
    }
}
