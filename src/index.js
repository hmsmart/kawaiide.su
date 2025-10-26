// Random miku image selection and placement
function randomlyPlaceMiku() {
    // Generate random number between 0 and 2 (inclusive) for miku image
    const randomMikuNumber = Math.floor(Math.random() * 3);
    
    // Generate random number between 0 and 2 (inclusive) for grid column
    const randomColumnIndex = Math.floor(Math.random() * 3);
    
    // Create image element
    const mikuImg = document.createElement('img');
    mikuImg.src = `img/mikus/mikutop${randomMikuNumber}.png`;
    mikuImg.alt = `Miku ${randomMikuNumber}`;
    mikuImg.style.height = '200px';
    
    // Find all grid items in the top row
    const gridItems = document.querySelectorAll('.content-row.top-row .grid-item');
    
    // Clear all grid items first
    gridItems.forEach(item => {
        item.innerHTML = '';
    });
    
    // Place the miku image in the randomly selected column
    if (gridItems[randomColumnIndex]) {
        gridItems[randomColumnIndex].appendChild(mikuImg);
    }
}

// Random henfree image selection for footer
function randomlyPlaceHenfree() {
    // Array of available henfree images
    const henfreeImages = [
        { src: 'img/henfree/hf0.png', alt: 'This site is hentai free, looking for it? Leave' },
        { src: 'img/henfree/hf1.jpg', alt: 'We\'re keeping it hentai free' },
        { src: 'img/henfree/hf2.jpg', alt: 'Safe to look! This site is hentai free' },
    ];
    
    // Generate random index
    const randomIndex = Math.floor(Math.random() * henfreeImages.length);
    const selectedImage = henfreeImages[randomIndex];
    
    // Create image element
    const henfreeImg = document.createElement('img');
    henfreeImg.src = selectedImage.src;
    henfreeImg.alt = selectedImage.alt;
    
    // Find the footer image container and add the image
    const footerImageContainer = document.querySelector('.footer-image');
    if (footerImageContainer) {
        footerImageContainer.appendChild(henfreeImg);
    }
}

// Random header image selection
document.addEventListener('DOMContentLoaded', function() {
    // Run the random miku placement
    randomlyPlaceMiku();
    
    // Run the random henfree placement
    randomlyPlaceHenfree();
    
    // Generate random number between 0 and 10 (inclusive)
    const randomHeaderNumber = Math.floor(Math.random() * 11);
    
    // Create image element
    const headerImg = document.createElement('img');
    headerImg.src = `img/header/header${randomHeaderNumber}.png`;
    headerImg.alt = `Header ${randomHeaderNumber}`;
    headerImg.style.width = '100%';
    headerImg.style.height = 'auto';
    
    // Find the bottom section and replace the placeholder text
    const bottomSection = document.querySelector('.content-row.bottom-row .unstyled-item');
    if (bottomSection) {
        bottomSection.innerHTML = '';
        bottomSection.appendChild(headerImg);
    }
});