const URL = 'https://corsproxy.io/?https://www.colourlovers.com/api/colors/top?format=json&numResults=365';

// Get color 

function getColorOfTheDay(colors) {
  const today = new Date();
  const seed =
    today.getFullYear() * 1000 +
    today.getMonth() + 1 +
    today.getDate();

  return colors[seed % colors.length]
}

// Text color --ark mode or --Light mode

const textColor = (hex) => {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128 ? '#FFFFFF' : '#000000';
}

// --  Card

function printColor(color) {

  const cardColor = document.querySelector('#card')
  const divColor = document.createElement('div')
  divColor.classList = 'cardColor'

  // -- Print card

  cardColor.innerHTML = `
                        <h1>Color of the day</h1>
                        <p>${color.title}</p>
                        <h2>#${color.hex}</h2>
                        `
  cardColor.appendChild(divColor)

  divColor.style.backgroundColor = `#${color.hex}`;

  cardColor.style.background = `whitesmoke`


}


// --Call API
fetch(URL)
  .then(res => res.json())
  .then(colors => {

    const color = getColorOfTheDay(colors);
    console.log(color)
    printColor(color)

  })
  .catch(err => console.error(err));



