(()=>{"use strict";var e,o;document.body.appendChild((e=document.createElement("div"),o=document.createElement("button"),e.innerHTML=_.join(["Hello","webpack","你好","22"]," "),e.classList.add("hello"),o.innerHTML="Click me and check the console!",o.onclick=function(){console.log("I get called from print.js"),console.log("change"),console.error("I get called from print.js"),console.log(34)},e.appendChild(o),e))})();