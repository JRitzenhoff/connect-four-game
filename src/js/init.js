
/*
 function create a counter elements and set them on the screen 
*/

function createCounters(quantity = 1,className,prefix,color) {
    let location = document.querySelector(".counters ."+prefix);
    for (let i = 1; i < quantity + 1; i++) {
      let element = document.createElement("div");
      element.id = prefix+"#"+i+"-"+color;
      element.className = className;
      element.draggable = true;
      location.appendChild(element);
    }
  }
  
  createCounters(20,"counter-red-large","desktop","red");
  createCounters(20,"counter-red-large","tablet","red");
  createCounters(20,"counter-red-small","mobile","red");
  createCounters(20,"counter-yellow-large","desktop","yellow");
  createCounters(20,"counter-yellow-large","tablet","yellow");
  createCounters(20,"counter-yellow-small","mobile","yellow");

  /*
 function create a counter elements and set them on the screen 
*/