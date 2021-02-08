const tempDescription = document.querySelector('.temperature-description');
const tempDegree = document.querySelector('.degree');
const Location = document.querySelector('.location');
const Country = document.querySelector('#country');
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
    //위치
    if (dataNow.name != undefined){

        Location.innerHTML = dataNow.name;
        Country.innerHTML = dataNow.sys.country;
        //아이콘
        let iconcode = dataNow.weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        document.getElementById('wicon').src = iconurl;
        //온도
        tempDegree.innerHTML = Math.round(dataNow.main.temp-273.15)+' °C';
    }else{
        alert('검색어를 잘못 입력하셨습니다.');
    }
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
    console.log(hour);
    const Hourly = document.querySelector('#hourly');
    for (let i=hour-1;i<=hour+7;i++){
        const temperature = document.createElement('div');
        temperature.className = 'inlineBlock' 
        const hourlyTemp = document.createTextNode( Math.round(dataHourly.hourly[i].temp  -273.15) + ' °C' )
        temperature.appendChild(hourlyTemp);
        Hourly.appendChild(newDiv);
    }
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
document.querySelector('#inputBox').addEventListener('click', loadAPI)