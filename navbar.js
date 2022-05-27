// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

name = localStorage.getItem("name");
pass = localStorage.getItem("pass");

if (name == null || pass == null) {
  $(".navbar")[0].insertAdjacentHTML("beforeEnd", `
<div style="display:inline-block;float:right;margin-right:10px;padding:10px"></div>
<a href="index.html#login" class="account">Log in</a>
<div style="display:inline-block;float:right;margin-right:1px;padding:10px"></div>
<a href="index.html#signup" class="account">Sign up</a>
`);
}else{
    $(".navbar")[0].insertAdjacentHTML("beforeEnd", `
<div style="display:inline-block;float:right;margin-right:10px;padding:10px"></div>
<a href="#" class="account" id="xname">${name}</a>
`);
  postData('https://bundleapi.lankybox02.repl.co/account/session', { username: name, password: pass })
.then(data => {
  if (data.success) {
    if (data.admin) {
      document.body.insertAdjacentHTML("beforeEnd", `<button class="button" style="left:25px;right:0" onclick="this.innerText=(parseInt(this.innerText)+1).toString();">${Math.floor(Math.random() * 15)}</button>`);
    }

    if (data.banned) {
      if (localStorage.getItem("bannedmsg") == null) {
        openModal("You have been banned!");
        localStorage.setItem("bannedmsg", true);
      }
      $(".account")[0].innerText = $(".account")[0].innerText + " (banned)";
    }
  }else{
    $("#xname")[0].remove();
  }
});
}

$(".navbar")[0].insertAdjacentHTML("beforeEnd", ` <a href="workspace.html">Create</a> <a href="index.html#about">About</a>`);

function signUp() {
  nam_ = $("#uname")[0].value;
  pas_ = $("#passw")[0].value;
  displayPage("join", "Join", "Please wait...")
  postData('https://bundleapi.lankybox02.repl.co/account/new', { username: nam_, password: pas_ })
  .then(data => {
      if (data.success) {
          localStorage.setItem("name", nam_);
          localStorage.setItem("pass", pas_);
        window.location.href = "index.html";
      }else{
          openModal("Something went wrong while creating this account!");
      }
  });
}