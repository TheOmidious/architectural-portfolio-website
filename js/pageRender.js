const container = document.getElementById('container');

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


// Function to create and add images
function addImages() {
    // Get the container element where images will be appended
    const container = document.getElementById('image-container');

    // Check if container exists
    if (container) {
        images.forEach(image => {
            // Create an img element
            const img = document.createElement('img');
            img.src = `/assets/images/${image}`;
            img.alt = 'Dynamic Image'; // Optional: Add an alt text

            // Append the img element to the container
            container.appendChild(img);
        });
    } else {
        console.error('Image container element not found.');
    }
}

// Call the function to add images when the page loads
document.addEventListener('DOMContentLoaded', addImages);
 
// When the user scrolls the page, execute myFunction 
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function moveSlide(step) {
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initialize the carousel
showSlide(currentSlide);

