import './style.css'
import './variables.css'
import './global.css'
import './fonts/font.css'

const API_KEY = 'M1V71VT-3CHM4HW-GY6NDP6-Y5VMZDR'
const API_URL = 'https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=description&notNullFields=poster.url'
const main = document.querySelector('.main')
const button =  document.querySelector('.button_main')
const buttonText = document.querySelector('.button_text')
const buttonTemplate = document.querySelector('#button-template').content 
const containerTemplate = document.querySelector('#card-template').content
const containerElement = containerTemplate.querySelector('.card-template').cloneNode(true)
const containerImg = containerElement.querySelector('.img-card')
const containerTitle = containerElement.querySelector('.card-title')
const containerYear = containerElement.querySelector('.card-year')
const containerRaiting = containerElement.querySelector('.card-raiting')
const containerDesc = containerElement.querySelector('.card-text')

function renderCard(render) {
  containerImg.src = render.poster?.url || 'no-poster'
  // containerImg.src = render.posterUrl
  containerTitle.textContent = render.name || render.alternativeName || 'Без названия'
  containerYear.textContent = `Год: ${render.year}`
  containerRaiting.textContent = `Рейтинг КиноПоиск: ${render.rating.kp || '-'}`
  containerElement.querySelector('.imdb').textContent = `Рейтинг IMDB: ${render.rating.imdb}`
  containerDesc.textContent = render.description || 'Описание недоступно'
  buttonText.textContent = 'Найти другой фильм'
  containerElement.classList.add('show') 
  main.append(containerElement)
}

document.querySelector('.header-reload').addEventListener('click', function(evt){
  evt.preventDefault()
  window.location.reload()
})

button.addEventListener('click', function() {
 fetch(API_URL, {
    method: 'GET',
    headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then((render) => {
      renderCard(render)
      console.log(render)
    })
    .catch(err => console.log(err))
// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': '241abf13-9c76-4e3e-9842-ec7c0fc994a0',
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then((render) => {
//              renderCard(render)
//              console.log(render)
//      })
//     .catch(err => console.log(err))
})

