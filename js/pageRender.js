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
        imgContainer.style.display = 'flex'; // Ensure horizontal layout for dragging
        imgContainer.style.overflow = 'hidden'; // Hide overflow

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `/assets/images/${image}`;
            img.alt = 'Dynamic Image';
            img.className = 'carousel-image'; // Optional: Add a class for styling
            img.style.width = '100%'; // Ensure the image fills the container

            imgContainer.appendChild(img);
        });
        
        container.appendChild(imgContainer);
        // Initialize the carousel after images are added
        initializeCarousel(imgContainer);
    } else {
        console.error('Image container element not found.');
    }
}

// Function to initialize carousel with dragging functionality
function initializeCarousel(container) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Mouse events for desktop
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.classList.add('active'); // Add active class for styling if needed
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return; // Only run if dragging
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Multiply for faster scroll
        container.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Initialize carousel navigation buttons
    initializeCarouselNav();
}

// Function to initialize carousel navigation buttons
function initializeCarouselNav() {
    document.querySelectorAll("#projects-section").forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-image');
        const buttonsHtml = Array.from(items, () => {
            return `<span class="carousel-button"></span>`;
        });

        carousel.insertAdjacentHTML("beforeend", `
            <div class="carousel-nav">
                ${buttonsHtml.join("")}
            </div>
        `);

        const buttons = carousel.querySelectorAll('.carousel-button');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                items.forEach(item => item.classList.remove("carousel-image-selected"));
                buttons.forEach(button => button.classList.remove("carousel-button-selected"))
                const imgContainer = carousel.querySelector('.carousel-slides');
                const imgWidth = imgContainer.querySelector('.carousel-image').clientWidth;
                imgContainer.scrollLeft = imgWidth * index;
                updateActiveButton(buttons, index);
            });
        });

        // Set the first button as active by default
        updateActiveButton(buttons, 0);
    });
}

// Function to update active button styling
function updateActiveButton(buttons, activeIndex) {
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
    });
}

// Call the function to add images when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addImages();
});
