// Array of image file names
const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
    'image9.jpg',
    'image10.jpg',
    'image11.jpg',
    'image12.jpg',
    'image13.jpg',
    'image14.jpg',
    'image15.jpg',
    'image16.jpg',
    'image17.jpg',
    'image18.jpg',
];

// Function to create and add images to the carousel
function addImages() {
    const container = document.getElementById('image-container');
    
    if (container) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'carousel-slides'; // Container for all images

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `/assets/images/${image}`;
            img.alt = 'Dynamic Image';
            img.className = 'carousel-image'; // Optional: Add a class for styling

            imgContainer.appendChild(img);
        });
        
        container.appendChild(imgContainer);
        // Initialize the carousel after images are added
        initializeCarousel();
    } else {
        console.error('Image container element not found.');
    }
}

// Function to initialize carousel and setup event listeners
function initializeCarousel() {
    slides = document.querySelectorAll('.carousel-slides img'); // Update slides after images are added
    showSlide(currentSlide);

    // Setup event listeners for carousel controls
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
}

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Function to move to the next or previous slide
function moveSlide(step) {
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initialize variables
let currentSlide = 0;
let slides;

// Call the function to add images when the page loads
document.addEventListener('DOMContentLoaded', addImages);
