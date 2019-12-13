
/* 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF' */
/* https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solChoose}&camera=fhaz&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF*/

const curiosityCameraResults = document.getElementById('curiosityCameraResults');

var request = new XMLHttpRequest()

function getCuriosityPictures() {
    let earthDateSelect = document.getElementById('earthDateChooser').value;
    let cameraChooser = document.getElementById('cameraChooser').value;
    request.open('GET', `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDateSelect}&camera=${cameraChooser}&api_key=5zMcBFNZ1QzwPfh9jYjtczvCmMrH2K5Rx3GzvjJF`, true)
    request.onload = function () {
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            let curiosityPhotos = '';
            let details = '';
            let detailsDiv = document.getElementById('detailsDiv');

            if (data.photos.length === 0) {
                details = `
                <div class="alert alert-warning" role="alert">
                <p>Sorry, there is not any photo here. Try other cameras or days.</p>
                <p>For example, try out my favourites:
                <ul class="text-left">
                <li>2014, Feb. 19. - Navigation camera</li>
                <li>2015, Apr. 7. - Mast camera</li>
                <li>2019, Aug. 6. - Front Hazard Avoidance Camera: <strong>first photos</strong></li>
                </ul>
                </div>
                `
            }

            data.photos.forEach(photo => {
                console.log(photo.img_src)
                details = `<div class="alert alert-info" role="alert">
                <p class="text-left"    >
                Number of photos taken this sol from <i>${photo.camera.full_name}</i>: <strong>${data.photos.length}</strong><br>
                Earth date: <strong>${photo.earth_date}</strong> <br>
                Sol: <strong>${photo.sol}</strong> <br>
                </p>
                </div>
                `;
                curiosityPhotos += `
            
            <img src="${photo.img_src}" class="camera-photos d-block"> <br> `;

            })
            curiosityCameraResults.innerHTML = curiosityPhotos;
            detailsDiv.innerHTML = details;
        } else {
            console.log('error')
        }
    }
    request.send()
}

$('[data-toggle="tooltip"]').tooltip();

$("#earthDateChooser").datepicker({ minDate: new Date(2012, 7, 6), maxDate: new Date(2019, 9, 28), dateFormat: 'yy-m-d', changeYear: true });