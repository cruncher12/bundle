let templates = {
"template1": `start
randomise 5
ask Guess the number between 1 and 5!
break
if {ans}={random}
write Congrats, you got it!
if {ans}!={random}
write Oof, you didn't get it.
end`,
"template2": `start
randomise 100
write I ate 
throw random
write  sandwhices.
end`,
"template3": `start
write You smell nice 👀
break
loop
end`,
"template4": `start
ask what's your name?
break
write hello there, 
throw ans
write !
break
write you've got a nice name :)
end`
}

function template(x) {
$("#code").effect("shake");
$("#code")[0].value = templates[x];
}