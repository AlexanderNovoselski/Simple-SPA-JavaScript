function attachEvents() {
    const locationUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const forecast = document.getElementById('forecast');
    const currentForecast = document.getElementById('current');
    const upcomingForecast = document.getElementById('upcoming');
    const locationInput = document.getElementById('location');

    let code = '';
    let codeWeatherSymbol = '';

    document.getElementById('submit').addEventListener('click', getWeather);

    async function getWeather() {
        try {
            if (locationInput.value === '') throw new Error();

            const data = await fetchData(locationUrl);
            const foundLocation = data.find(x => x.name === locationInput.value);
            if (!foundLocation) {
                throw new Error();
            }
            code = foundLocation.code;

            const weatherUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
            const upcomingWeatherUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

            const weatherData = await fetchData(weatherUrl);
            const upcomingWeatherData = await fetchData(upcomingWeatherUrl);

            codeWeatherSymbol = getWeatherSymbol(weatherData.forecast.condition);

            const currentWeatherDiv = createCurrentWeatherStructure(
                codeWeatherSymbol,
                weatherData.name,
                `${weatherData.forecast.low}\u00B0/${weatherData.forecast.high}\u00B0`,
                weatherData.forecast.condition
            );

            const arrOfSpans = upcomingWeatherData.forecast.map(x => createUpcomingSpan(
                getWeatherSymbol(x.condition),
                `${x.low}\u00B0/${x.high}\u00B0`,
                x.condition
            ));

            const upcomingDiv = createDivElementWithUpcomingSpan(arrOfSpans);

            currentForecast.appendChild(currentWeatherDiv);
            upcomingForecast.appendChild(upcomingDiv);

            forecast.style.display = 'inline-block';
        } catch (error) {
            console.log(error);
        }
    }

    function fetchData(url) {
        return fetch(url).then(response => response.json());
    }

    function getWeatherSymbol(weather) {
        const symbols = {
            "Sunny": "\u2600",
            "Partly sunny": "\u26C5",
            "Overcast": "\u2601",
            "Rain": "\u2614"
        };
        return symbols[weather] || '';
    }

    function createDivElementWithUpcomingSpan(spans) {
        const div = createDiv('forecasts');
        div.append(...spans);
        return div;
    }

    function createUpcomingSpan(codeSymbol, degrees, weather) {
        return createSpan('upcoming', [
            createSpan('symbol', codeSymbol),
            createSpan('forecast-data', degrees),
            createSpan('forecast-data', weather)
        ]);
    }

    function createCurrentWeatherStructure(codeSymbol, location, degrees, weather) {
        const div = createDiv('forecasts');
        div.append(
            createSpan(['condition', 'symbol'], codeSymbol),
            createSpan('condition', [
                createSpan('forecast-data', location),
                createSpan('forecast-data', degrees),
                createSpan('forecast-data', weather)
            ])
        );
        return div;
    }

    function createDiv(className) {
        const div = document.createElement('div');
        div.classList.add(className);
        return div;
    }

    function createSpan(classNames, children) {
        const span = document.createElement('span');
        span.classList.add(...(Array.isArray(classNames) ? classNames : [classNames]));
        span.append(...children);
        return span;
    }
}

attachEvents();
