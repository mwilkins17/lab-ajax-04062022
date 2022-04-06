'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  const button = document.querySelector('#get-fortune-button');

  button.addEventListener('click', () => {
    fetch('/fortune')
      .then(response => response.text())
      .then(responseData => {
        document.querySelector('#fortune-text').innerHTML = responseData;
      });
    });
  // TODO: get the fortune and show it in the #fortune-text div
  //get the id of button
  //listen for a click on button
  //fetch - ajax call
  //populate #fortune-text div with response
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  //const url = `/status?${queryString}`;
  // document.querySelector('#order-form').addEventListener('submit', evt => {
  //   evt.preventDefault();
  fetch(`/weather.json?zipcode=${zipcode}`)
  .then(response => response.json())
  .then(responseData => {
    document.querySelector('#weather-info').innerHTML = responseData.forecast;
  });
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  console.log(formInputs);

  const orderStatusDiv = document.querySelector('#order-status');

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.code === "ERROR"){
        orderStatusDiv.classList.add('order-error');
        orderStatusDiv.innerHTML = responseJson.msg;
      } else {
        orderStatusDiv.innerHTML = responseJson.msg;
      }
  });

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

//https://dog.ceo/api/breeds/image/random
const button = document.querySelector('#get-dog-image');

button.addEventListener('click', (evt) => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(responseData => {
      document.querySelector('#dog').setAttribute('src', responseData.message);
      console.log(responseData.message);
    });
});
