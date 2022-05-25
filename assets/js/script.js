document.addEventListener("mousemove", parallax)

function parallax(e){
    this.querySelectorAll("#a").forEach((shift) => {
        const position = shift.getAttribute("value");
        const x = (window.innerWidth - e.pageX * position) / 100;
        const y = (window.innerHeight - e.pageY * position) / 100;
        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
}

window.onscroll = function (){
  console.log(window.scrollY)
}

function sound() {
	var sound = new Audio('/sound-design/background/main.mp3');
	sound.volume = 0.5;
	sound.loop = true;
	sound.play();
}

// function sound2() {
// 	var sound = new Audio('/sound-design/background/Hold-button.mp3');
// 	sound.volume = 0.2;
// 	sound.loop = true;
// 	sound.play();
// }

// var playBtn = document.getElementById('play'),
//   resetBtn = document.getElementById('reset'),
//   hearbeat = document.getElementById('hov')
// 	audios = document.querySelectorAll('audio');
// console.log(audios);


// playBtn.addEventListener('mouseover', function() {
// [].forEach.call(audios, function(audio) {
//   // do whatever
//   audio.volume = 0.1;
//   audio.play();
// });
// }, false);

// playBtn.addEventListener('mouseleave', function() {
//   heartbeat.pause();
//   heartbeat.currentTime = 0;
// }, false);

// resetBtn.addEventListener('mouseover', function() {
//     heartbeat.play();
// }, false);
  
// resetBtn.addEventListener('mouseleave', function() {
//   heartbeat.pause();
//   heartbeat.currentTime = 0;
// }, false);