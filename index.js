// const API_KEY="0133cc5316757ac730cc46ae342334e4"
// const form=document.querySelector('#form')
// const weatherDetail=document.querySelector('.info')
// const searchHistory=document.querySelector('.historyBtn')

// let cityHistory =JSON.parse(localStorage.getItem("cityHistory")) || []


// form.addEventListener('submit',async function(event){
//     event.preventDefault()
//     const searchCity=city.value
//     console.log(searchCity)
//     getData(searchCity)

// })

// async function getData(searchCity) {
//     if (searchCity){
//         try{
//             const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`)
//             const data=await res.json()
//             if(data.cod===200){
//                 weatherDetail.innerHTML=`
//                 <p>City: ${data.name}</p>
//                 <p>Temp: ${(data.main.temp-273).toFixed(1)}C</p>
//                 <p>Weather: ${data.weather[0].main}</p>
//                 <p>Humidity: ${data.main.humidity}</p>
//                 <p>Wind: ${data.wind.speed}m/s</p>
//                 `
//                 if(!cityHistory.includes(searchCity)){
//                     cityHistory.push(searchCity)
//                     localStorage.setItem("cityHistory",JSON.stringify(cityHistory))
//                     displayHistory()
//                 }
//             }else{
//                 weatherDetail.innerHTML=`<p>City not found</p>`
//             }
//         }catch(e){
//             console.log(e)
//         }
//     }
// }

// function displayHistory(){
//    searchHistory.innerHTML=""
//    const history=JSON.parse(localStorage.getItem("cityHistory"))
//    console.log(history)
//    if(history){
//       history.forEach((city) => {
//          const btn=document.createElement("button")
//          btn.innerText=city
//          btn.addEventListener("click",function(){
//             getData(city)
//          })
//          searchHistory.appendChild(btn)
//       });
//    }
// }

// displayHistory()

const API_KEY = "0133cc5316757ac730cc46ae342334e4"

const form = document.querySelector('#form')
const cityInput = document.querySelector('#city')
const weatherDetail = document.querySelector('.info')
const searchHistory = document.querySelector('.historyBtn')
const logBox = document.querySelector('#logs')

let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []

function addLog(message){
    const p = document.createElement("p")
    p.textContent = message
    logBox.appendChild(p)
}

form.addEventListener('submit', async function(event){

    event.preventDefault()

    const searchCity = cityInput.value.trim()

    addLog("Sync: Form Submitted")

    if(searchCity){
        getData(searchCity)
    }

})

async function getData(searchCity){

    addLog("Async: Start fetching")

    try{

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`)

        addLog("Promise resolved (microtask)")

        const data = await res.json()

        if(data.cod === 200){

            weatherDetail.innerHTML = `
            <h3>Weather Info</h3>
            <p>City: ${data.name}</p>
            <p>Temp: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
            `

            if(!cityHistory.includes(searchCity)){

                cityHistory.push(searchCity)

                localStorage.setItem("cityHistory", JSON.stringify(cityHistory))

                displayHistory()
            }

        }else{

            weatherDetail.innerHTML = `<p style="color:red">City not found</p>`

        }

    }catch(error){

        addLog("Error occurred")

        weatherDetail.innerHTML = `<p style="color:red">Network error</p>`

        console.log(error)

    }

    setTimeout(()=>{
        addLog("setTimeout executed (macrotask)")
    },0)

}

function displayHistory(){

    searchHistory.innerHTML = ""

    const history = JSON.parse(localStorage.getItem("cityHistory"))

    if(history){

        history.forEach((city) => {

            const btn = document.createElement("button")

            btn.innerText = city

            btn.addEventListener("click", function(){

                addLog("History city clicked")

                getData(city)

            })

            searchHistory.appendChild(btn)

        })

    }

}

displayHistory()