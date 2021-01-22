function loadAPI (){
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.degree')
    let location = document.querySelector('.location');
    let locationInput = document.querySelector('.locationInput').value;
    console.log(locationInput)
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=c0eb657b1620478cc82c72581f8128ba`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //위치
                    location.innerHTML = data.name;
                    country.innerHTML = data.sys.country;
                    //아이콘!!
                    let iconcode = data.weather[0].icon;
                    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    document.getElementById('wicon').src = iconurl;
                    //온도
                    tempDegree.innerHTML = Math.round(data.main.temp-273.15)+' °C'
                })
        })
    }
}

window.addEventListener('load',loadAPI);
document.querySelector('.locationInput').addEventListener('keydown',(e)=>{
    if (e.keyCode === 13){
        loadAPI();
    }
})
