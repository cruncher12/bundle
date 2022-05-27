let pages = {
  "": {
    "redirect": "#"
  },
  "#": {
    "heading": "",
    "title": "home",
    "content": `<div class='row'>Recently Shared<br></div>`
  },
  "about": {
    "heading": "About Bundle",
    "title": "about",
    "content": "Bundle is a simple coding platform focused on community and friends. Effortlessly snap lines of code together to create your app and share your talent with everyone!"
  },
  "feedback": {
    "heading": "Feedback",
    "title": "feedback",
    "content": "Bundle is a simple coding platform focused on community and friends. <hr> Thank you for using Bundle! Our app is still in developement. If you find any bugs, glitches, or have a suggestion, please go to <a href='https://github.com/lankybox02/bundle'>our github page</a>!"
  },
  "templates": {
    "heading": "Bundle Templates",
    "title": "templates",
    "content": `<p>Welcome to Bundle! Why don't you click on a template to get you started?</p><button onclick="template('template2')">Randomised variable example</button><br><br><button onclick="template('template3')">Simple "loop" example</button><br><br><button onclick="template('template4')">Simple "ask" example</button><br><br><button onclick="template('template1')">Guess the number game</button>`
  },
  "login": {
    "heading": "Log In",
    "title": "login",
    "content": `Logging in has not been added yet. Please check back in the next update to see if it's added!`
  },
  "signup": {
    "heading": "Join",
    "title": "join",
    "content": `<input id="uname" type="username" autocomplete="off" placeholder="Username..." /><br><br><input id="passw" type="password" autocomplete="off" placeholder="Password..." /><br><br><button onclick="signUp()">Sign up!</button>`
  }
}
let home;

window.addEventListener('hashchange', function() {
  loadPage(location.hash);
});

function loadPage(pagename) {
  pagename = pagename.slice(1);
  if (!Object.keys(pages).includes(pagename)) {
    displayPage("404", "Whoopsies!", "We couldn't find the page you're looking for. If you typed in a URL, make sure you wrote it correctly! <a href='#'>Home?</a>");
  }else{
    if (pages[pagename].redirect != null) pagename = pages[pagename].redirect;
    displayPage(pages[pagename].title, pages[pagename].heading, pages[pagename].content);
  }
}

function displayPage(title, heading, content) {
  document.title = title.charAt(0).toUpperCase() + title.slice(1);
  if (heading != "") {
    $(".title-banner")[0].style.display = null;
    $("#title")[0].innerText = heading;
  }else{
    $(".title-banner")[0].style.display = "none";
  }
  $(".content")[0].innerHTML = content;
  if (title == "home") {
    home = true;
  }else{
    home = false;
  }
}

function template(x) {
  window.location.href = "workspace.html#" + x;
}

loadPage(location.hash);