// Store current miku info for resize handling
let currentMiku = null;

// Define custom margin-bottom values for each miku
const mikuMargins = {
    0: { desktop: '-55px', mobile: '-69px' }, // mikutop0.png
    1: { desktop: '-83px', mobile: '-83px' }, // mikutop1.png
    2: { desktop: '-55px', mobile: '-69px' }, // mikutop2.png
    3: { desktop: '-112px', mobile: '-127px' } // mikutop3.png
};

// Function to update margins based on current screen size
function updateMikuMargins() {
    if (!currentMiku) return;
    
    const gridItems = document.querySelectorAll('.content-row.top-row .grid-item');
    const isMobile = window.innerWidth <= 767;
    
    // Reset all margins first
    gridItems.forEach(item => {
        item.style.marginBottom = '';
    });
    
    // Apply margin to the item with the miku
    const itemWithMiku = Array.from(gridItems).find(item => item.querySelector('img'));
    if (itemWithMiku) {
        const margins = mikuMargins[currentMiku.number];
        itemWithMiku.style.marginBottom = isMobile ? margins.mobile : margins.desktop;
    }
}

// Random miku image selection and placement
function randomlyPlaceMiku() {
    // Generate random number between 0 and 3 (inclusive) for miku image
    const randomMikuNumber = Math.floor(Math.random() * 4);
    
    // Generate random number between 0 and 2 (inclusive) for grid column
    const randomColumnIndex = Math.floor(Math.random() * 3);
    
    // Store current miku info
    currentMiku = {
        number: randomMikuNumber,
        columnIndex: randomColumnIndex
    };
    
    // Create image element
    const mikuImg = document.createElement('img');
    mikuImg.src = `img/mikus/mikutop${randomMikuNumber}.png`;
    mikuImg.alt = `Miku ${randomMikuNumber}`;
    mikuImg.style.height = '200px';
    
    // Find all grid items in the top row
    const gridItems = document.querySelectorAll('.content-row.top-row .grid-item');
    
    // Clear all grid items first and reset margins
    gridItems.forEach(item => {
        item.innerHTML = '';
        item.style.marginBottom = ''; // Reset any custom margins
    });
    
    // Place the miku image in the randomly selected column
    if (gridItems[randomColumnIndex]) {
        gridItems[randomColumnIndex].appendChild(mikuImg);
    }
    
    // Apply initial margins
    updateMikuMargins();
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
    
    // Add resize event listener to update miku margins
    window.addEventListener('resize', function() {
        updateMikuMargins();
    });
});