const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];
// let isInitialLoad = true;

// Unsplash API
const apiUrl = 'https://api.unsplash.com/photos/random?client_id=G29QglWeeJw8UqTrbtjELjOo8b48lY0wpMy-ojrF6FQ&count=5&content_filter=high';

// function updateAPIUrlWithNewCount() {
//     apiUrl = 'https://api.unsplash.com/photos/random?client_id=G29QglWeeJw8UqTrbtjELjOo8b48lY0wpMy-ojrF6FQ&count=30&content_filter=high';
// }

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        //console.log('ready =', ready);
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // console.log('total images', totalImages);
    // Run function for each object in photoArray
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <image> for photo 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <image> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        // if (isInitialLoad) {
        //     updateAPIUrlWithNewCount();
        //     isInitialLoad = false;
        //     console.log('new count', updateAPIUrlWithNewCount);
        // }
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromAPI();
    }
})

// On Load
getPhotosFromAPI();