let pages = {
  "": {
    "redirect": "#"
  },
  "#": {
    "heading": "Home",
    "title": "Home",
    "content": "Oh, well this page seems a bit blank! <a href='#about'>About?</a>"
  },
  "about": {
    "heading": "About Bundle",
    "title": "about",
    "content": "Bundle is a simple and offline coding platform focused on community and friends. Effortlessly snap blocks together to create your own code - then share your masterpiece to everyone!"
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
  document.title = title;
  $("#title")[0].innerText = heading;
   $(".content")[0].innerHTML = content;
}

loadPage(location.hash);