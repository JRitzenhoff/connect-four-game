class Event {
    constructor() {
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    trigger(params) {
       
        this.listeners.forEach(listener => {
            listener(params);
        });
    }
    showListener()
    {
        return this.listeners;
    }
   
  
}

export default Event;