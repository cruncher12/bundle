let pages = {
  "": {
    "redirect": "#"
  },
  "#": {
    "heading": "Home",
    "title": "home",
    "content": "Oh, well this page seems a bit blank! <a href='#about'>About?</a>"
  },
  "about": {
    "heading": "About Bundle",
    "title": "about",
    "content": "Bundle is a simple and offline coding platform focused on community and friends. Effortlessly snap blocks together to create your own code - then share your masterpiece to everyone!"
  },
  "workspace": {
    "heading": "Workspace",
    "title": "workspace",
    "content": `<textarea id='code'></textarea> <button onclick="runbundle($('#code')[0].value)">Run!</button>`
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

function runbundle(algorithm) {
let commands = ["start", "end"];

algorithm = algorithm.split("\n"); // .slice(1, -1)

if (algorithm[0] != "start") {
    throwErr();
}else{
    if (algorithm[algorithm.length-1] != "end") {
        throwErr();
    }else{
        algorithm.slice(1, -1)
        for (let i = 0;i < algorithm.length;i++) {
            if (commands.includes(algorithm[i])) {

            }else{
                if (algorithm[i].startsWith("write ")) {
                    message(algorithm[i].slice(6));
                }else{
                    throwErr();
                }
            }
        }
    }
}
}

function throwErr() {
    alert("bad command");
}

function message(x) {
    alert(x);
}