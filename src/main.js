import './style.css'
import './variables.css'
import './global.css'
import './fonts/font.css'

const API_KEY = 'M1V71VT-3CHM4HW-GY6NDP6-Y5VMZDR'
const API_URL = 'https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=description&notNullFields=poster.url'
const main = document.querySelector('.main')
const button =  document.querySelector('.button_main')
const buttonText = document.querySelector('.button_text')
const containerTemplate = document.querySelector('#card-template').content


function removeCard() {
  const deleteCard = document.querySelector('.card-template')
  if(deleteCard) {
    deleteCard.remove()
  }
}

function createCardElement() {
  return containerTemplate.querySelector('.card-template').cloneNode(true)
}

function renderCard(render) {
  removeCard()

  const containerElement = createCardElement()
  const containerImg = containerElement.querySelector('.img-card')
  const containerTitle = containerElement.querySelector('.card-title')
  const containerGenre = containerElement.querySelector('.card-genre')
  const containerYear = containerElement.querySelector('.card-year')
  const containerRaiting = containerElement.querySelector('.card-raiting')
  const containerDesc = containerElement.querySelector('.card-text')
  
  containerImg.src = render.poster?.url || 'no-poster'
  containerTitle.textContent = render.name || render.alternativeName || 'Без названия'
  containerGenre.textContent = `Жанр: ${render.genres.map(genres => genres.name)}`
  containerYear.textContent = `Год: ${render.year || '-'}`
  containerRaiting.textContent = `Рейтинг КиноПоиск: ${render.rating.kp || '-'}`
  containerElement.querySelector('.imdb').textContent = `Рейтинг IMDB: ${render.rating.imdb}`
  containerDesc.textContent = render.description || 'Описание недоступно'
  buttonText.textContent = 'Найти другой фильм'
  main.append(containerElement)
  

containerElement.addEventListener('click', () => {
  openKinopoiskPage(render.id, render.name)
})

  setTimeout(() => {
    containerElement.classList.add('show')
    setTimeout(() => animateCardContent(containerElement), 300)
  },10) 
}

function openKinopoiskPage(movieId, movieName) {
  const kinopoiskUrl = `https://www.kinopoisk.ru/film/${movieId}/`
  window.open(kinopoiskUrl, '_blank')
  console.log(`Открываем фильм: ${movieName} (ID: ${movieId})`)
}

function animateCardContent(cardElement) {
  const elementsToAnimate = [
    cardElement.querySelector('.img-card'),
    cardElement.querySelector('.card-title'),
    cardElement.querySelector('.card-genre'),
    cardElement.querySelector('.card-year'),
    cardElement.querySelector('.kp'),
    cardElement.querySelector('.imdb'),
    cardElement.querySelector('.card-text')
  ]
  
  elementsToAnimate.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease'
        element.style.opacity = '1'
      }, index * 100) 
    }
  })
}

document.querySelector('.header-reload').addEventListener('click', function(evt){
  evt.preventDefault()
  window.location.reload()
})

function renderApi() {
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
}

button.addEventListener('click', renderApi)