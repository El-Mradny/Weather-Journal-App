/* Global Variables */
const apiOpenWeatherKey = "279f49cc33912d780c3c777e20fe60f5";
const apiUrl= `https://api.openweathermap.org/data/2.5/weather?zip=`;
const genterateButton = document.getElementById('generate');
const recentDate =document.getElementById('date');
const recentTemp =document.getElementById('temp');
const recentContent =document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();




// event handdeler 
genterateButton.addEventListener('click', ()=>collectData())

const collectData = async ()=> {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Validate data entered by user before continu in process
    validData(zipCode, feelings);

    const temp = await getWeather(apiUrl, zipCode, apiOpenWeatherKey);
    
    postData({
        date: newDate,
        temp: temp,
        content: feelings
    })

    temp && dynamicUI({
        date: newDate,
        temp: temp,
        content: feelings
    })


}
// Validate date 
const validData= (zip, feel)=>{
    var zipReg = new RegExp(/^\d{5}$/);
    var feelReg = new RegExp(/^[a-zA-Z]{3,}$/);
    if (!zipReg.test(zip) || !feelReg.test(feel)){
        alert('Please enter correct USA Zip only& Feeling\nFeelings contains letters\nZip contains 5 digit only')
    }
}
// GET Route II: Client Side
const getWeather = async (url, zip, apiKey)=>{
    const apiWeatherUrl = url+ zip+'&appid='+ apiKey
    const res = await fetch(apiWeatherUrl);
    const apiCallData = await res.json();
    const temp = apiCallData.main.temp
    
    return temp
}


// POST Route

const postData = async (data = {})=>{
    console.log(data);
    const response = await fetch('/collectData', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
    });
    
    try {
    const newData = await response.json();
    console.log(newData);
    return newData;
    }catch(error) {
    console.log("error", error);
    }
}


// Assigning Element Properties Dynamically
const dynamicUI = (data)=>{
    console.log('here',data.date)
    recentDate.appendChild(document.createElement('span')).innerHTML=  `Date: ${data.date}`;
    recentTemp.appendChild(document.createElement('span')).innerHTML=  `Temp: ${data.temp}`;
    recentContent.appendChild(document.createElement('span')).innerHTML=  `Content: ${data.content}`;
}