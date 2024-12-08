let currentIndex = 0;
const images = document.querySelectorAll('.slider img');

setInterval(() => {
    images[currentIndex].style.transform = 'translateX(-100%)';
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.transform = 'translateX(0)';
}, 3000);