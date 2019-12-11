
/* 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF' */
/* https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solChoose}&camera=fhaz&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF*/

const curiosityFirstTest = document.getElementById('curiosityTest');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
let solChoose = 1300;
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solChoose}&camera=fhaz&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF`, true)

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        console.log(data);
        console.log(data.photos[0]);
        console.log(data.photos.length);
        
        let newInnerHTML = '';

        data.photos.forEach(photo => {
            console.log(photo.img_src) 
            newInnerHTML = `
            <img src="${photo.img_src}" >
            `;

          })

        
        
              
        curiosityFirstTest.innerHTML = newInnerHTML;

    } else {
        console.log('error')
    }
}

request.send()