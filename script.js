
let btn = document.getElementById('searc-weather');
let icon= document.querySelector('img.img-fluid');
let temp= document.getElementById('temp');
let weather_state= document.getElementById('state');
let Location= document.getElementById('location');
let wind_speed= document.getElementById('Wind Speed');
let Humidity=  document.getElementById('Humidity');
let Visibility=  document.getElementById('Visibility');
let Air_pressure= document.getElementById('Airpressure');


const main=()=>{
  var ApiUrl="https://ipgeolocation.abstractapi.com/v1/?api_key=93d7555d5deb4c4b97e3efb1573e8d51";
  fetch(ApiUrl)
  .then(response=>response.json())
  .then(data=>{
    console.log(data);
     locate(data)
  })
};
main();
function locate(data){
  const city=data.city
  console.log(city);
  weatherCurrent(city);
}
// Function To get API data on page load based on users locations
const weatherCurrent=(city)=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b8c2e729f507d99e0772b13434330b2`)
  .then(response=>response.json())
  .then(data=>{
    console.log(data);
    details(data);
  })
}        
// Rendering Weather data on dom
const details=(data)=>{
const{main:{temp_min},weather,name,wind:{speed},main:{humidity},visibility,main:{pressure}}= data;
  const { main } = weather[0];
//Adding values to HTML
temp.innerHTML=Math.floor(temp_min-273.15);
  weather_state.innerHTML=main;
  wind_speed.innerHTML=speed;
  Humidity.innerHTML=humidity;
  Visibility.innerHTML=visibility;
  Air_pressure.innerHTML=pressure;
  Location.innerHTML=name;
  updateImage(main);
}

// Function to add Search functionlaity 
const Searchweather=()=>{
  var search=document.getElementById('search');
  const Value= search.value;
  weatherCurrent(Value);
    updateImage(main);
      details(data);
}
btn.addEventListener('click',Searchweather)


 const updateImage = (main) => {
  const imgSrcMap = {
    'Clear': 'https://i.postimg.cc/qqWSm5Zn/831682.png',
    'Clouds': 'https://i.postimg.cc/vBsN6nx7/clouds.png',
    'Shower': 'https://i.postimg.cc/qBsf1bMc/Shower.png',
    'Snow': 'https://i.postimg.cc/SNpn5xFX/Snow.png',
    'Haze': 'https://i.postimg.cc/PxDdd1sm/drizzle.png',
    'Rain': 'https://i.postimg.cc/cLn5Jhkk/Heavy-Rain.png',
    'Thunderstorm': 'https://i.postimg.cc/m2Nypnqs/Thunderstorm.png',
    'Mist': 'https://i.postimg.cc/nr5r3nJk/mist.png',
  };

  if (main in imgSrcMap) {
    icon.setAttribute('src', imgSrcMap[main]);
  }
};