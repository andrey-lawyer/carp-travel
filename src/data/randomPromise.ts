export function randomPromise() {
    return new Promise((resolve, reject) => {   
      const randomValue = Math.random();      
      setTimeout(() => {       
        if (randomValue >= 0.5) {
          resolve("The form was successfully sent!");
        } else {        
          reject("Something went wrong...");
        }
      }, 1000); 
    });
  }