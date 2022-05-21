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
