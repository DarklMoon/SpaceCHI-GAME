const rocket = document.getElementById("container");
const rocket_landing = document.getElementById("rocket");
function fadeOutEffect(id, time) {
  target = document.getElementById(id);
  alpha = 100;
  timer = time * 2;
  var i = setInterval(function () {
    if (alpha <= 0) {
      clearInterval(i);
      rocket.style.display = "none";
      rocket_landing.classList.add('animate')
    }

    // me.style.zIndex = 1000;
    setAlpha(target, alpha);
    alpha -= 1;
  }, timer);
}
function setAlpha(target, alpha) {
  target.style.opacity = alpha / 100;
}


var i = 0;
var txt =
  "เพื่อนที่ออกจากโลกมาก่อนหน้าได้ทิ้งเทคโนโลยีไว้บนดาวอังคาร เพราะงั้นเราจึงต้องตามหาเทคโนโลยีนั้นโดยต้องคอยถอดรหัสเพื่อให้ปลดล็อคของ ซึ่งการถอดรหัสนั้นจะต้องใช้ภาษาในการถอดรหัส เพราะภาษานั้นเป็นอารยธรรมขั้นสูงของมนุษย์";
var speed = 50;

window.onload = typeWriter;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

var playBtn = document.getElementById('play'),
  resetBtn = document.getElementById('reset'),
  hearbeat = document.getElementById('hov')
	audios = document.querySelectorAll('audio');
console.log(audios);


playBtn.addEventListener('mouseover', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.volume = 0.1;
  audio.play();
});
}, false);

playBtn.addEventListener('mouseleave', function() {
  heartbeat.pause();
  heartbeat.currentTime = 0;
}, false);

resetBtn.addEventListener('mouseover', function() {
    heartbeat.play();
}, false);

resetBtn.addEventListener('mouseleave', function() {
  heartbeat.pause();
  heartbeat.currentTime = 0;
}, false);
 