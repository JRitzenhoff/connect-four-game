
/*
 function create a counter elements and set them on the screen 
*/

function createCounters(quantity = 1,className,prefix) {
    let location = document.querySelector(".counters ."+prefix);
    for (let i = 1; i < quantity + 1; i++) {
      let element = document.createElement("div");
      element.id = prefix+"#"+i;
      element.className = className;
      element.draggable = true;
      location.appendChild(element);
    }
  }
  
  createCounters(20,"counter-red-large","desktop");
  createCounters(20,"counter-red-large","tablet");
  createCounters(20,"counter-red-small","mobile");

  /*
 function create a counter elements and set them on the screen 
*/