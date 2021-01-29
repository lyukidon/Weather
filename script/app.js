//     //현재 위치

// function loadAPI (){
//     if (navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position=>{
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c0eb657b1620478cc82c72581f8128ba`
//             fetch(api)
//                 .then(response => {
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log(data);
//                     //위치
//                     location.innerHTML = data.name;
//                     country.innerHTML = data.sys.country;
//                     //아이콘!!
//                     let iconcode = data.weather[0].icon;
//                     let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//                     document.getElementById('wicon').src = iconurl;
//                     //온도
//                     tempDegree.innerHTML = Math.round(data.main.temp-273.15)+' °C'
//                 })
//         })
//     }
// }

//     //검색한 위치

// function loadSearchAPI(){
//     const locationInput = document.querySelector('#locationInput').value;
//     const api = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=c0eb657b1620478cc82c72581f8128ba`
//     fetch(api)
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             //위치
//             location.innerHTML = data.name;
//             country.innerHTML = data.sys.country;
//             //아이콘!!
//             let iconcode = data.weather[0].icon;
//             let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//             document.getElementById('wicon').src = iconurl;
//             //온도
//             tempDegree.innerHTML = Math.round(data.main.temp-273.15)+' °C'
//         })
// }
// window.addEventListener('load',loadAPI);

// document.querySelector('#locationInput').addEventListener('keydown',(e)=>{
//     if (e.keyCode === 13){
//         loadSearchAPI();
//         document.querySelector('#locationInput').value = '';
//     }
// });
// document.querySelector('#search').addEventListener('click', loadSearchAPI);
// document.querySelector('#currentPosition').addEventListener('click', loadAPI);

document.querySelector('#inputBox').addEventListener('click', function(e){
    const tempDescription = document.querySelector('.temperature-description');
    const tempDegree = document.querySelector('.degree');
    const location = document.querySelector('.location');
    const locationInput = document.querySelector('#locationInput').value;
    let api;
    console.log(e.target.id)
    if (e.target.id === 'search'){
        api = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=c0eb657b1620478cc82c72581f8128ba`
    }else{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                long = position.coords.longitude;
                lat = position.coords.latitude;
    
                api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c0eb657b1620478cc82c72581f8128ba`
            })
        }
    }
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