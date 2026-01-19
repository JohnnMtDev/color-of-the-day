var URL = 'https://corsproxy.io/?https://www.colourlovers.com/api/colors/top?format=json&numResults=365';
// --- Get color of the day
function getColorOfTheDay(colors) {
    var today = new Date();
    var seed = today.getFullYear() * 1000 +
        (today.getMonth() + 1) +
        today.getDate();
    return colors[seed % colors.length];
}
// --- Text color (dark / light)
var textColor = function (hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128 ? '#FFFFFF' : '#000000';
};
// --- Card
function printColor(color) {
    var cardColor = document.querySelector('#card');
    if (!cardColor)
        return;
    var divColor = document.createElement('div');
    divColor.className = 'cardColor';
    // --- Print card
    cardColor.innerHTML = "\n    <h1>Color of the day</h1>\n    <p>".concat(color.title, "</p>\n    <h2>#").concat(color.hex, "</h2>\n  ");
    cardColor.appendChild(divColor);
    divColor.style.backgroundColor = "#".concat(color.hex);
    cardColor.style.background = 'whitesmoke';
    // Ejemplo de uso de textColor (opcional)
    cardColor.style.color = textColor("#".concat(color.hex));
}
// --- Call API
fetch(URL)
    .then(function (res) { return res.json(); })
    .then(function (colors) {
    var color = getColorOfTheDay(colors);
    console.log(color);
    printColor(color);
})
    .catch(function (err) { return console.error(err); });
