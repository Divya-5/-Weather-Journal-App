// http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&APPID={APIKEY}
const APIKEY = 'f4d34e2aa725c440a9130979517fc274';
const apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';


const fetchDataWeather = async function (url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Err:", error)
  }
}

const handlingDataGeneration = async function () {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${apiBaseUrl}${zip}&APPID=${APIKEY}`;

  if (zip.length === 0 || feelings.length === 0) {
    alert("Please fill up all values !");
    return
  }

  let weatherData = await fetchDataWeather(url);
  // console.log("weatherData=",weatherData);

  let temp = weatherData.main.temp;

  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

  const data = {
    date: date,
    temp: temp,
    content: content,
  }

  //Post data to owr own server
  await postData("http://localhost:4040/projectData", data);

  //Update UI
  updatingUI();
}


const updatingUI = async function () {
  const dateDiv = document.getElementById('date');
  const tempDiv = document.getElementById('temp');
  const contentDiv = document.getElementById('content');

  //Get data from owr own server
  let UI_Data = await getData("http://localhost:4040/projectData");

  //Updating the UI
  dateDiv.innerText = UI_Data.date;
  tempDiv.innerText = UI_Data.temp;
  contentDiv.innerText = UI_Data.content;
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

const getData = async function (url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }

}



const generateDataBtn = document.querySelector('#generate');
generateDataBtn.addEventListener('click', handlingDataGeneration);