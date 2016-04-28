var buttons = document.querySelectorAll("button")

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    alert("Pressed " + this.id + "!");
  };
}
