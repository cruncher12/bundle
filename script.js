let pages = {
  "": {
    "redirect": "#"
  },
  "#": {
    "heading": "Home",
    "title": "home",
    "content": "<div class='row'>Featured Bundles</div><div class='row'>Recent Bundles</div>Oh, well this page seems a bit blank! <a href='#about'>About?</a> <a href='workspace.html'>Workspace?</a>"
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
  }
}

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
  $("#title")[0].innerText = heading;
   $(".content")[0].innerHTML = content;
}

loadPage(location.hash);