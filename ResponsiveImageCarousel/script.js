const slider = document.querySelector('.slider');

console.log(slider)

function activate(e) {
    const items = document.querySelectorAll('.item');
    e.target.matches('.next') && slider.append(items[0])
    e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
    console.log(slider)
}

document.addEventListener('click', activate, false)