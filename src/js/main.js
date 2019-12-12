
/* 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF' */
/* https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solChoose}&camera=fhaz&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF*/

const curiosityFirstTest = document.getElementById('curiosityTest');


var request = new XMLHttpRequest()

function getCuriosityPictures() {
    let earthDateSelect = document.getElementById('earthDateChooser').value;
    let cameraChooser = document.getElementById('cameraChooser').value;
    console.log(earthDateSelect);
    request.open('GET', `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDateSelect}&camera=${cameraChooser}&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF`, true)

    request.onload = function () {
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            console.log(data.photos[0]);
            console.log(data.photos.length);
            let newInnerHTML = '';
            
            if(data.photos.length === 0 ) {
                newInnerHTML = `
                <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>
                `
            }

            data.photos.forEach(photo => {
                console.log(photo.img_src)

                newInnerHTML += `
            
            <img src="${photo.img_src}" class="camera-photos d-block"> 
            <p class="text-left"    >
            Number of photos taken this sol from <i>${photo.camera.full_name}</i>: <strong>${data.photos.length}</strong><br>
            Earth date: <strong>${photo.earth_date}</strong> <br>
            Sol: <strong>${photo.sol}</strong> <br>
            </p>
            `;

            })
            curiosityFirstTest.innerHTML = newInnerHTML;
        } else {
            console.log('error')
        }
    }
    request.send()
}


$( "#earthDateChooser" ).datepicker({ minDate: new Date(2012, 7, 6), maxDate: new Date(2019, 9, 28) , dateFormat: 'yy-m-d', changeYear: true});