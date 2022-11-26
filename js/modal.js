
let modal = document.getElementById("modal");

let btn = document.getElementById("btnOpenModal");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function (event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const position = { x: 0, y: 0 };

interact(".draggable").draggable({
  listeners: {
    start(event) {
    //    console.log(event.type, event.target);
    //    console.log(event);
    },
    move(event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.parentNode.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
});
