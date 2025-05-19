const audio = new Audio('assets/HAPPYPIANO.mp3');
audio.loop = true;
audio.volume = 0.2;

document.addEventListener('click', () => audio.play(), { once: true });