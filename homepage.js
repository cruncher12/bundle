window.location.href = "#";
window.addEventListener('hashchange', function() {
if (home) {
  fetch("https://bundleapi.lankybox02.repl.co/project/all")
      .then(response => response.json())
      .then(data => loadCodeInit(data))

  function loadCodeInit(data) {
    if (Object.keys(data).length == 0) {
      $(".row")[0].insertAdjacentHTML("beforeEnd", "<i>✧･ﾟ: *✧･ﾟ This row seems to be a bit empty...</i>");
    }
    for (let i = 0;i < Object.keys(data).length;i++) {
      if (i > 6) break;
      loadCode(data[Object.keys(data)[i]], i);
    }
  }
  
  function loadCode(data, i) {
      $(".row")[0].insertAdjacentHTML("beforeEnd", `<div style="
      text-align: center;
      width: 160px;
      display: inline-block;
      cursor: pointer;
  " onclick="window.location.href = 'view.html#${i+1}'">
  <svg data-jdenticon-value="${data.jdenticon}" width="100" height="100" style="background-color: white" id="jdenticon${i}"></svg>
  <br>
  <span>${data.title}</span>
  <span style="
      width: 100%;
      text-align: left;
      display: block;
      margin-left: 10px;
  ">by ${data.author}</span></div>
  </div>`);
      // console.log($(".jdenticon")[i]);
      // document.querySelector("#jdenticon" + i).setAttribute("data-jdenticon-value", Math.floor(Math.random() * 20000).toString(36));
      jdenticon.update(document.querySelector("#jdenticon" + i));
  }
}
});