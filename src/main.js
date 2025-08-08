import './style.css'
import './variables.css'
import './global.css'

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

function cardTemplate(img,title,year,raiting,desc) {

}

document.querySelector('.header-reload').addEventListener('click', function(evt){
  evt.preventDefault()
  window.location.reload()
})

button.addEventListener('click', function(evt) {
  if(evt) {
    buttonText.textContent = 'Найти другой фильм'
  }
  main.append(containerTemplate)
})

fetch('https://api.kinopoisk.dev/v1.4/movie/random', {
    method: 'GET',
    headers: {
        'X-API-KEY': 'M1V71VT-3CHM4HW-GY6NDP6-Y5VMZDR',
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))