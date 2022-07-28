window.addEventListener("scroll", scrollFunction);
const btnUpEl = document.querySelector('#upBtn')

btnUpEl.addEventListener('click', topFunction)

function scrollFunction() {
    if (window.pageYOffset > 150) {
        btnUpEl.style.display = "block";
    } else {
        btnUpEl.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
