var pos = [];
var click = { "startPos": "", "endPos": ""};
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
			   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var words = [ { "word": "NANOBOT", 
                "direction": "N",
                "start": 132 },
                { "word": "TECHNOLOGY", "direction": "SW", "start": 12 },
                { "word": "ROBOTS", "direction": "E", "start": 15},
                { "word": "NANOTECH", "direction": "E", "start": 92 },
                { "word": "BODY", "direction": "SE", "start": 133 },
                { "word": "INTELLIGENT", "direction": "E", "start": 2 },
			];
			
$(document).ready(function() {
	var size = 200;

	for (var i = 0; i < size; i++) {
		$(".letters").append("<span class='" + (i + 1) + "'>" + 
							getRandomLetter() + "</span>");
	}

	for (var i = 0; i < words.length; i++) {
		words[i].end = words[i].start;
		displayWord(words[i]);
		pos[i] = { "start": words[i].start, "end": words[i].end };
		$(".words").append("<span class='" + (i) + "'>" +  
							words[i].word + "</span>");	
	}

	$("#menu").on("mouseup", function() {
		$(this).css( {"display": "none"})
		$("#main").slideDown("slow", function() {
		})
	});
})

function getRandomLetter() {
	return letters[Math.floor(Math.random() * letters.length)];
}

function displayWord(w) {
	for (var j = 0; j < w.word.length; j++){
		if (w.direction == "N") {
        
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= 20;
		}
		if (w.direction == "NE") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= 19;
		}
		if (w.direction == "E") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += 1;
		}
		if (w.direction == "SE") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += 21;
		}
		if (w.direction == "S") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += 20;
		}
		if (w.direction == "SW") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end += 19;
		}
		if (w.direction == "W") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= 1;
		}
		if (w.direction == "NW") {
			$(".letters").find("." + w.end).text(w.word[j]);
			if (j + 1 != w.word.length) w.end -= 21;
		}
	}
}

// start of x & y, end of x & y.  
var sX, sY, eX, eY, canvas, ctx, height, width, diff;
var r = 14;
var n = Math.sqrt((r * r) / 2);
var strokeColor = "white";
var isMouseDown = false;
var mouseMoved = false;

$(document).ready(function() {
	$("#c").on("mousedown mouseup mousemove mouseleave", function(e) {
		e.preventDefault();
		if (e.type == "mousedown") {
			setCanvas("c");			
			isMouseDown = true;
      
			sX = e.offsetX || e.clientX - $(e.target).offset().left;
			sY = e.offsetY || e.clientY - $(e.target).offset().top;
			sX -= (sX % 20);
			sY -= (sY % 20);
			if (!(sX % 40)) sX += 20;
			if (!(sY % 40)) sY += 20;

			setPos(sX, sY, "start");
			draw(e.type);
		} 
		else if (e.type == "mousemove") {
			if (isMouseDown) {
				mouseMoved = true;
				eX = e.offsetX || e.clientX - $(e.target).offset().left;
				eY = e.offsetY || e.clientY - $(e.target).offset().top;
				draw(e.type);
			}
		} 
		else if (e.type == "mouseup") {
			isMouseDown = false;
			ctx.clearRect(0, 0, width, height);
			if (mouseMoved) {
				mouseMoved = false;

				eX -= eX % 20;
				eY -= eY % 20;
				if (!(eX % 40)) eX += 20;
				if (!(eY % 40)) eY += 20;

				draw(e.type);
				ctx.clearRect(0, 0, width, height);
				if (checkWord()) {
					setCanvas("a");
					draw(e.type);
					scratchWord();
					// Check if the game is over
					if(isEndOfGame()) {
					   goToMenu();
					
					}
				}

			}
		} 
		else if (e.type == "mouseleave") {
			isMouseDown = false;
			draw(e.type);
		}

	});
})

function goToMenu(){
	const container = document.getElementById("container");
	container.classList.add('show');

}

function draw(f) {

	function drawArc(xArc, yArc, num1, num2) {
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(xArc, yArc, r, num1 * Math.PI, num2 * Math.PI);
		ctx.strokeStyle = strokeColor;
		ctx.stroke();
	}

	function drawLines(mX1, mY1, lX1, lY1, mX2, mY2, lX2, lY2) {
		ctx.beginPath();
		ctx.moveTo(mX1, mY1);
		ctx.lineTo(lX1, lY1);
		ctx.moveTo(mX2, mY2);
		ctx.lineTo(lX2, lY2);
		ctx.stroke();
	}
	if (f == "mousedown"){
		ctx.clearRect(0, 0, width, height);
		drawArc(sX, sY, 0, 2);
	}
	else if (f == "mousemove" || f == "mouseup") {
		limit = ((sY - eY) * Math.sqrt(6)) / (sX - eX);
		// UP
		if ((limit > 6 || limit < -6) && eY < sY) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 0, 1); // draw bottom arc
			drawArc(sX, eY, 1, 2); // draw top arc
			drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX -r, eY);	

			if (f == "mouseup") setPos(sX, eY, "end");	
		}
		// DOWN
		if ((limit < -6 || limit > 6) && eY > sY) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 1, 2); 
			drawArc(sX, eY, 0, 1); 
			drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX -r, eY);
			if (f == "mouseup") setPos(sX, eY, "end");		
		}				
		// LEFT
		if ((limit < 1 && limit > -1) && eX < sX) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 1.5, 0.5);
			drawArc(eX, sY, 0.5, 1.5);
			drawLines(sX, sY - r, eX, sY -r, sX, sY + r, eX, sY + r);
			if (f == "mouseup") setPos(eX, sY, "end");
		}	
		// RIGHT
		if ((limit < 1 && limit > -1) && eX > sX) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			drawArc(sX, sY, 0.5, 1.5);
			drawArc(eX, sY, 1.5, 0.5);
			drawLines(sX, sY - r, eX, sY -r, sX, sY + r, eX, sY + r);
			if (f == "mouseup") setPos(eX, sY, "end");
		}
		
		// NW
		if ((limit > 1 && limit < 6) && (eX < sX && eY < sY)) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 1.75, 0.75);
			drawArc(sX - diff, sY - diff, 0.75, 1.75);
			drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff, 
					  sX - n, sY + n, sX - n - diff, sY + n - diff);
			if (f == "mouseup") setPos(sX - diff, sY - diff, "end");
		} 

		// NE
		if ((limit < -1 && limit > -6) && (eX > sX && eY < sY)) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 0.25, 1.25);
			drawArc(sX - diff, sY + diff, 1.25, 0.25);
			drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff, 
					  sX - n, sY - n, sX - n - diff, sY - n + diff);
			if (f == "mouseup") setPos(sX - diff, sY + diff, "end");
		} 
		// SW
		if ((limit < -1 && limit > -6) && (eX < sX && eY > sY)) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 1.25, 0.25);
			drawArc(sX - diff, sY + diff, 0.25, 1.25);
			drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff, 
					  sX - n, sY - n, sX - n - diff, sY - n + diff);
			if (f == "mouseup") setPos(sX - diff, sY + diff, "end");
		} 
		// SE
		if ((limit > 1 && limit < 6) && (eX > sX && eY > sY)) {
			if (f == "mousemove") ctx.clearRect(0, 0, width, height);
			diff = sX - eX;
			drawArc(sX, sY, 0.75, 1.75);
			drawArc(sX - diff, sY - diff, 1.75, 0.75);
			drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff, 
					  sX - n, sY + n, sX - n - diff, sY + n - diff);
			if (f == "mouseup") setPos(sX - diff, sY - diff, "end");
		} 
	}

	else if (f == "mouseleave") {
		setCanvas("c");
		ctx.clearRect(0,0,width,height);
	}
}

function setCanvas(id) {
	canvas = document.getElementById(id);
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
}

function setPos(x, y, loc) {
	tX = Math.floor((x / 8) / 5 ) + 1;
	tY = Math.floor((y / 8) / 5 ) + 1;
	if (loc == "start") click.startPos = (tY - 1) * 20 + tX;
	else click.endPos = (tY - 1) * 20 + tX;
}

function checkWord() {
	function clearPos(p) {
		p.start = p.end = 0;
		return true;
	}

	if (pos.some(function(o) { return o.start === click.startPos &&
							   o.end === click.endPos && clearPos(o); })) {
		return true;
	}
	else if (pos.some(function(o) { return o.start === click.endPos &&
									o.end === click.startPos && clearPos(o); })) {
		return true;
	}
	else return false;
}

function scratchWord() {
	for (var i = 0; i < words.length; i++) {
		if ((click.startPos === words[i].start && click.endPos === words[i].end) ||
			(click.startPos === words[i].end && click.endPos === words[i].start)) {
			$(".words").find("." + i).addClass("strike");

			popWord(words[i].word)
		}
	}
}

function isEndOfGame(){
	return pos.every(function(o) { return o.start === 0 && o.end === 0; });
}

function sound() {
	var sound = new Audio('/sound-design/background/main.mp3');
	sound.volume = 0.2;
	sound.loop = true;
	sound.play();
}

var meaning = {
  NANOBOT:
    "คือ หุ่นยนต์ที่มีขนาดนาโนเมตร ที่ใช้เพื่อการบำรุงรักษาและปกป้องร่างกายมนุษย์จากเชื้อโรค",
  TECHNOLOGY:
    "คือ สิ่งที่มนุษย์สร้างเพื่อใช้แก้ปัญหา หรือเพื่อตอบสนองความต้องการของมนุษย์",
  ROBOTS:
    "คือ เครื่องจักรกลหรือหุ่นที่มีเครื่องกลไกอยู่ภายใน สามารถทำงานได้หลายอย่างร่วมกันกับมนุษย์หรือแทนมนุษย์ และสามารถตั้งลำดับแผนการทำงานก่อนหลังได้",
  NANOTECH:
    "คือ วิทยาการในการประกอบและผลิตสิ่งต่างๆ ขึ้นมาจากการจัดเรียงอะตอม  หรือโมเลกุลเข้าด้วยกันในระดับนาโนเมตร",
  BODY: "ร่างกาย",
  INTELLIGENT: "ฉลาด",
};

function popWord(whatword) {
    var wordmeaning = meaning[whatword];
	$('#nongWord').addClass('show');
	$('#nongWord #word').text(whatword);
	$('#nongWord #desc').text(wordmeaning);
}

function closeNongWord() {
	$('#nongWord').removeClass('show')
}
