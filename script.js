const URL = 'https://corsproxy.io/?https://www.colourlovers.com/api/colors/top?format=json&numResults=365';

fetch(URL)
  .then(res => res.json())
  .then(colors => console.log(colors))
  .catch(err => console.error(err));
