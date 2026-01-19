const URL: string =
  'https://corsproxy.io/?https://www.colourlovers.com/api/colors/top?format=json&numResults=365';

// --- Types

interface Color {
  title: string;
  hex: string;
}

// --- Get color of the day

function getColorOfTheDay(colors: Color[]): Color {
  const today: Date = new Date();

  const seed: number =
    today.getFullYear() * 1000 +
    (today.getMonth() + 1) +
    today.getDate();

  return colors[seed % colors.length];
}

// --- Text color (dark / light)

const textColor = (hex: string): string => {
  const r: number = parseInt(hex.slice(1, 3), 16);
  const g: number = parseInt(hex.slice(3, 5), 16);
  const b: number = parseInt(hex.slice(5, 7), 16);

  const brightness: number = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128 ? '#FFFFFF' : '#000000';
};

// --- Card

function printColor(color: Color): void {
  const cardColor = document.querySelector<HTMLDivElement>('#card');

  if (!cardColor) return;

  const divColor: HTMLDivElement = document.createElement('div');
  divColor.className = 'cardColor';

  // --- Print card
  cardColor.innerHTML = `
    <h1>Color of the day</h1>
    <p>${color.title}</p>
    <h2>#${color.hex}</h2>
  `;

  cardColor.appendChild(divColor);

  divColor.style.backgroundColor = `#${color.hex}`;
  cardColor.style.background = 'whitesmoke';

  // Ejemplo de uso de textColor (opcional)
  cardColor.style.color = textColor(`#${color.hex}`);
}

// --- Call API

fetch(URL)
  .then((res: Response) => res.json())
  .then((colors: Color[]) => {
    const color: Color = getColorOfTheDay(colors);
    console.log(color);
    printColor(color);
  })
  .catch((err: unknown) => console.error(err));
