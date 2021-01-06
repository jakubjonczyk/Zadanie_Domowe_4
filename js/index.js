const btn = document.querySelector('#btn');
const sb = document.querySelector('#mySelect')
btn.onclick = (event) => {
    event.preventDefault();
    city = (sb.selectedIndex);
    const expr = city;
    switch (expr) {
        case 0:
            city = "Katowice"
            break;
        case 1:
            city = "Bochnia"
            break;
        case 2:
            city = "Warszawa"
            break;
    }
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=cff54392609650f604500218080453ce")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            var theDate = new Date(data.dt * 1000);
            dateString = theDate.toLocaleDateString();
            var array = [data.main.temp + " °C", " - " + dateString];
            document.getElementById("output").innerText = array;
            array[2] = new Image();
            array[2].src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            document.getElementById("output").appendChild(array[2]);
        })

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=cff54392609650f604500218080453ce")
        .then((resp) => resp.json())
        .then((data) => {
            outputParameter = 2;
            for (i = 5; i < 30;) {
                var theDate = new Date(data.list[i].dt * 1000);
                dateString = theDate.toLocaleDateString();
                var array = [data.list[i].main.temp + " °C", " - " + dateString];
                document.getElementById("output" + outputParameter).innerText = array;
                array[2] = new Image();
                array[2].src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                document.getElementById("output" + outputParameter).appendChild(array[2]);
                outputParameter++;
                i = i + 8;
            }
        })
};