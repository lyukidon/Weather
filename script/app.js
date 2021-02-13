// 위도 경도
let lon;
let lat;
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        lon = position.coords.longitude;
        lat = position.coords.latitude;
    })
}

async function loadNow(apiNow){ 
    const responseNow = await fetch(apiNow);
    const dataNow = await responseNow.json();
    console.log(dataNow)
    //위치
    if (dataNow.name != undefined){
        writeElement(dataNow);
    }else{
        alert('검색어를 잘못 입력하셨습니다.');
    }
}

function writeElement(dataNow){
    Location.innerHTML = dataNow.name;
    Country.innerHTML = dataNow.sys.country;
    document.querySelector('#mapButton').addEventListener('click', function(){
        window.location.href=`https://satellites.pro/${dataNow.name}_map`
    })
    //아이콘
    let iconcode = dataNow.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById('wicon').src = iconurl;
    iconDescription.innerHTML = dataNow.weather[0].description[0].toUpperCase() + dataNow.weather[0].description.slice(1,dataNow.weather[0].description.length);
    //온도
    tempDegree.innerHTML = `현재: ${Math.round(dataNow.main.temp-273.15)} °C`;
    feelLike.innerHTML = `체감: ${Math.round(dataNow.main.feels_like-273.15)} °C`;
    tempMax.innerHTML = `최고: ${Math.round(dataNow.main.temp_max-273.15)} °C`;
    tempMin.innerHTML = `최저: ${Math.round(dataNow.main.temp_min-273.15)} °C`;
}

async function loadHourly(apiHourly){
    const responseHourly = await fetch(apiHourly)
    const dataHourly = await responseHourly.json();
    console.log(dataHourly);
    currentHour(dataHourly);
}



function currentHour(dataHourly){
    const time = new Date();
    const hour = time.getHours();

    writeHourly(hour,dataHourly);
    //그래프
    let graphData = {
        type: 'line',
        data: {
        labels: hourforGraph,
        datasets: [{
                label: '온도',
                data: hourlyTempforGraph,
                borderColor: "white",
                backgroundColor: "white",
                fill: false,
                lineTension: 0
                }]
        },
        options:{
            legend:{
                labels:{
                    fontColor: 'white'
                }
            },
            scales: {
                xAxes:[{
                    ticks: {
                        fontColor: 'white'
                    }
                }],
                yAxes:[{
                    ticks: {
                        fontColor: 'white'
                    }
                }]
            }
        }
    }
    createGraph(graphData);
}

function writeHourly(hour,dataHourly){
    for (let i=hour;i<hour+7;i++){
        const newDiv = document.createElement('div');
        newDiv.className = 'inlineBlock hourlyTemperatureClass'
        //시간
        const hourDiv = document.createElement('div');
        hourDiv.className = 'hourDiv'
        let hourText;
        if (i>=24){
            hourText = document.createTextNode(i-24 +'시');
            hourforGraph.push(i-24);
        }else{
            hourText = document.createTextNode(i +'시');
            hourforGraph.push(i);
        }
        hourDiv.appendChild(hourText);
        //온도
        const temperature = document.createElement('div');
        temperature.className = 'hourlyTemperatureDiv'
        const hourlyTemp = document.createTextNode( Math.round(dataHourly.hourly[i].temp - 273.15) + '°C' )
        hourlyTempforGraph.push( Math.round(dataHourly.hourly[i].temp - 273.15) );

        temperature.appendChild(hourlyTemp);
        
        newDiv.appendChild(hourDiv);
        newDiv.appendChild(temperature);

        Hourly.appendChild(newDiv);
    }
}

function createGraph(graphData){

    new Chart(document.querySelector('#temperatureGraph'), graphData);
}

function loadAPI(e){
    const locationInput = document.querySelector('#locationInput').value;
    let apiNow;
    let apiHourly;
    if (e.target.id === 'search'){
        apiNow = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=c0eb657b1620478cc82c72581f8128ba`;
    }else{
        apiNow = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0eb657b1620478cc82c72581f8128ba`;
        apiHourly = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=c0eb657b1620478cc82c72581f8128ba`;
    }
    loadNow(apiNow);
    loadHourly(apiHourly)
    apiHourly = ``;
}

window.addEventListener('load', loadAPI);
document.querySelector('#inputBox').addEventListener('click', function(){
    while(Hourly.hasChildNodes()){
        Hourly.removeChild(Hourly.firstChild);
    }
    hourlyTempforGraph = [];
    hourforGraph = [];
})
document.querySelector('#inputBox').addEventListener('click', loadAPI)