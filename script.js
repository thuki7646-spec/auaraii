const apiKey = "a624721f5ac51fbe51589472fac68765";

// Қазақша → Ағылшынша
const cities = {
    "алматы": "Almaty",
    "астана": "Astana",
    "шымкент": "Shymkent",
    "қарағанды": "Karaganda",
    "ақтөбе": "Aktobe",
    "атырау": "Atyrau",
    "тараз": "Taraz",
    "семей": "Semey",
    "өскемен": "Oskemen",
    "қостанай": "Kostanay",
    "павлодар": "Pavlodar",
    "қызылорда": "Kyzylorda",
    "орал": "Oral",
    "петропавл": "Petropavl"
};

function showCities() {
    const input = document.getElementById("cityInput").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";

    if (!input) return;

    Object.keys(cities).forEach(kzCity => {
        if (kzCity.startsWith(input)) {
            const div = document.createElement("div");
            div.className = "suggestion";
            div.innerText = kzCity.charAt(0).toUpperCase() + kzCity.slice(1);
            div.onclick = () => {
                document.getElementById("cityInput").value = div.innerText;
                suggestions.innerHTML = "";
            };
            suggestions.appendChild(div);
        }
    });
}

async function getWeather() {
    const input = document.getElementById("cityInput").value.toLowerCase().trim();
    const result = document.getElementById("result");

    const cityEn = cities[input];

    if (!cityEn) {
        result.innerHTML = "❌ Мұндай қала тізімде жоқ";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityEn}&appid=${apiKey}&units=metric&lang=kk`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        result.innerHTML = `
            <p><b>Қала:</b> ${data.name}</p>
            <p><b>🌡 Температура:</b> ${data.main.temp} °C</p>
            <p><b>🌥 Сипаттама:</b> ${data.weather[0].description}</p>
            <p><b>💧 Ылғалдылық:</b> ${data.main.humidity}%</p>
        `;
    } catch {
        result.innerHTML = "❌ API қате қайтарды";
    }
}
