const button = document.getElementById('change_color');

function random_color() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

button.addEventListener('click', () => {
    document.body.style.backgroundColor = random_color()});