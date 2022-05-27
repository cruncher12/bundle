if (location.hash.slice(1) != '') {
      if (Object.keys(templates).includes(location.hash.slice(1))) {
        template(location.hash.slice(1));
      }
    }
    
    let loop = false;
    let shared = false;
    let variables = {
      "null": " "
    };
    function runbundle(algorithmorigin, clear) {
    if (clear) clearConsole();
    let commands = ["start", "end", "debug", "break", "randomise", "rasterize"];
    let disableDebug = true;
    let nextif = false;
    
    algorithm = algorithmorigin.split("\n"); // .slice(1, -1)
    let xlength = algorithm.length;
    if (algorithm[0] != "start") {
    }else{
        if (algorithm[algorithm.length-1] != "end") {
            throwErr("bad end");
        }else{
            algorithm.slice(1, -1)
            for (let i = 0;i < xlength;i++) {
              if (nextif == false) {
                nextif = true;
                continue;
              }
                if (commands.includes(algorithm[i])) {
                  if (algorithm[i] == "debug") {
                    disableDebug = false;
                  }
                  if (algorithm[i] == "break") {
                    message("\n");
                  }
                  if (algorithm[i] == "rasterize") {
                    variables.res = algorithmorigin;
                  }
                }else{
                    if (algorithm[i].startsWith("write ")) {
                      message(algorithm[i].slice(6));
                        debug("Wrote", disableDebug);
                        debug("", disableDebug);
                    }else{
                      if (algorithm[i].startsWith("ask ")) {
                        variables.ans = prompt(algorithm[i].slice(4));
                        message(algorithm[i].slice(4));
                        // message("[" + (i+1).toString() + "] " + variables.ans);
                        debug("Asked: " + algorithm[i].slice(4), disableDebug);
                        debug("sent request to set \"ans\" as response", disableDebug);
                        debug("ans: " + variables.ans, disableDebug);
                        debug("", disableDebug);
                      }else{
                        if (algorithm[i].startsWith("def ")) {
                            if (algorithm[i].split("=").length != 2) {
                              debug("Failed to create variable, incorrect number of arguments!", disableDebug);
                              debug("", disableDebug);
                              throwErr("bad command");
                            }else{
                              debug("created variable", disableDebug);
                              debug("name: " + algorithm[i].split("=")[0].slice(4), disableDebug);
                              debug("value: " + algorithm[i].split("=")[1], disableDebug);
                              debug("", disableDebug);
                              variables[algorithm[i].split("=")[0].slice(4)] = algorithm[i].split("=")[1];
                            }
                        }else{
                          if (algorithm[i].startsWith("throw ")) {
                            if (variables[algorithm[i].slice(6)] == null) {
                              throwErr("bad variable")
                              break;
                              debug("Failed to throw variable since it doesn't exist", disableDebug);
                              debug("", disableDebug);
                            }else{
                              message(variables[algorithm[i].slice(6)]);
                              debug("Threw variable", disableDebug);
                              debug("", disableDebug);
                            }
                          }else{
                            if (algorithm[i].startsWith("if ")) {
                              if (algorithm[i].split("!=").length != 2) {
                                if (algorithm[i].split("=").length != 2) {
                                  throwErr("bad command");
                                  debug("invalid amount of arguments!");
                                  break;
                                }
                                if (replaec(algorithm[i].split("=")[0].slice(3)) != replaec(algorithm[i].split("=")[1])) {
                                  nextif = false;
                                }
                              }else{
                                if (replaec(algorithm[i].split("!=")[0].slice(3)) == replaec(algorithm[i].split("!=")[1])) {
                                  nextif = false;
                                }
                              }
                            }else{
                              if (algorithm[i].startsWith("randomise")) {
                                randomnum = 10;
                                if (algorithm[i].slice(10) != '') randomnum = parseInt(algorithm[i].slice(10));
                                variables.random = Math.ceil(Math.random() * randomnum);
                                debug("Set randomised number to: " + variables.random, disableDebug);
                                debug("", disableDebug);
                              }else{
                                if (algorithm[i] == "loop") {
                                  if (loop == false) {
                                    loop = setInterval(function() {
                                        runbundle($('#code')[0].value);
                                    }, 500);
                                    document.querySelector("#code").setAttribute("disabled", "");
                                   
                    document.querySelector("#stopbutton").removeAttribute("disabled");
                                  }
                                }else{
                                debug("Failed to run command; it does not exist", disableDebug);
                                debug("at: " + i.toString(), disableDebug);
                                debug("trying: " + algorithm[i], disableDebug);
                                debug("", disableDebug);
                                throwErr("bad command");
                                break;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
            }
          if (algorithm.length == 0) {
            throwErr("bad commands list");
          }
        }
    }
    }
    
    function throwErr(x) {
      $("#output")[0].innerText = $("#output")[0].innerText + "\n" + x;
    }
    
    function message(x) {
      $("#output")[0].innerText = $("#output")[0].innerText + x;
    }
    
    function debug(x, y) {
      if (y == true) return;
      $("#output")[0].innerText = $("#output")[0].innerText + "\n[debug] " + x;
    }

    function replaec(str) {
        for (let w = 0;w < Object.keys(variables).length + 1;w++) {
            if (w == Object.keys(variables).length) {
                str = str.replaceAll(`{${Object.keys(variables)[w]}}`, variables[Object.keys(variables)[w]]);
                return str;
            }else{
                str = str.replaceAll(`{${Object.keys(variables)[w]}}`, variables[Object.keys(variables)[w]]);
            }
        }
    }

    if (!location.pathname.includes("view")) {
      window.addEventListener('beforeunload', (w) => {
        if (shared) return;
        w.preventDefault();
        w.returnValue = '';
      });
    }

    function clearConsole() {
      $("#output")[0].innerText = "";
    }

    function disableLoop(e) {
      clearInterval(loop);
      loop = false;
      e.setAttribute('disabled', '');
      if (location.pathname.includes("workspace")) {
        document.querySelector('#code').removeAttribute('disabled');
      }
    }