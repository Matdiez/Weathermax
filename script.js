const body = document.getElementsByTagName('body')[0]
const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')
const msg = document.querySelector('.not-found p')

search.addEventListener('click', () => {
    const API_KEY = '4e273c75d77ef26369ff0520e047289d'
    const city = document.querySelector('.search-box input').value
    const place = document.querySelector('.search-box input')
    const icon = document.querySelector('.search-box i')

    if (city === '') {
        body.style.backgroundImage = 'none'
        container.style.height = '105px'
        weatherBox.style.display = 'none'
        weatherDetails.style.display = 'none'
        return
    }
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            body.style.backgroundImage = 'url(./src/img/background-404.jpg)'
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            place.style.color = 'white'
            icon.style.color = 'white'
            msg.style.color = 'white'
            error404.style.display = 'block'
            error404.classList.add('fadeIn')
            return
        }
        error404.style.display = 'none'
        error404.classList.remove('fadeIn')
        place.style.color = '#06283D'
        icon.style.color = '#06283D'

        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')

        switch (json.weather[0].main) {
            case 'Clear':
                body.style.backgroundImage = 'url(./src/img/background-clear.jpg)'
                image.src = './src/img/clear.png'
                break
            case 'Rain':
                body.style.backgroundImage = 'url(./src/img/background-rain.jpg)'
                image.src = './src/img/rain.png'
                break
            case 'Snow':
                body.style.backgroundImage = 'url(./src/img/background-snow.jpg)'
                image.src = './src/img/snow.png'
                break
            case 'Clouds':
                body.style.backgroundImage = 'url(./src/img/background-cloud.jpg)'
                image.src = './src/img/cloud.png'
                break
            case 'Haze':
                body.style.backgroundImage = 'url(./src/img/background-mist.jpg)'
                image.src = './src/img/mist.png'
                break
            case 'Thunderstorm':
                body.style.backgroundImage = 'url(./src/img/background-thunderstorm.jpg)'
                image.src = './src/img/thunderstorm.png'
                break
            default:
                image.src = ''
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`

        weatherBox.style.display = ''
        weatherDetails.style.display = ''
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        container.style.height = '590px'
    })
})