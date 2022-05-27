document.body.insertAdjacentHTML("beforeEnd", `<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">Bundle Modal</div><p id="modalcontent">Hello world!</p><button onclick="closeModal()">Dismiss</button></div></div>`);

var modal = document.getElementById("myModal");

function openModal(text) {
  if (text == null) text = "Hello world!";
  $("#myModal").show("fade");
  $("#modalcontent")[0].innerText = text;
}

function closeModal() {
  $("#myModal").hide("clip");
}