const URL = 'https://corsproxy.io/?https://www.colourlovers.com/api/colors/top?format=json&numResults=365';

function getColorOfTheDay (colors){
  const today = new Date();
  const seed = 
    today.getFullYear() * 1000 +
    today.getMonth() + 1 + 
    today.getDate();

    return colors[seed % colors.length]
}

function printColor(color){
    document.body.style.background = `#${color.hex}`;
    document.body.innerHTML = `
      <h1>Color of the Day</h1>
      <p>${color.title}</p>
      <strong>#${color.hex}</strong>
    `;
}

fetch(URL)
  .then(res => res.json())
  .then(colors => {

    const color = getColorOfTheDay(colors);
    console.log(color)
    printColor(color)

  })
  .catch(err => console.error(err));



