// import { runInterval } from "./downloadButton";

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
        imgContainer.style.display = 'flex'; // Ensure horizontal layout
        imgContainer.style.overflowX = 'auto'; // Enable horizontal scrolling
        imgContainer.style.scrollBehavior = 'smooth'; // Smooth scrolling effect

        // Add original images
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `/assets/images/${image}`;
            img.alt = 'Dynamic Image';
            img.className = 'carousel-image'; // Optional: Add a class for styling
            img.loading = 'lazy'; // Lazy loading
            imgContainer.appendChild(img);
        });

        container.appendChild(imgContainer);
        
        // Initialize the carousel after images are added
        initializeCarousel(imgContainer);
    } else {
        console.error('Image container element not found.');
    }
}

// Function to initialize carousel with scroll, mousewheel, and drag functionality
function initializeCarousel(container) {
    let scrollTimeout;

    // Mouse dragging functionality variables
    let isDragging = false;
    let startX, scrollLeft;

    // Event to handle mousewheel scrolling
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY > 0 ? container.clientWidth : -container.clientWidth;
    });

    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCarouselOnScroll(container);
        }, 100); // Adjust timing if necessary for smoother navigation
    });

    // Mouse dragging functionality
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; // Adjust scroll speed
        container.scrollLeft = scrollLeft - walk;
    });

    // Initialize carousel navigation buttons
    initializeCarouselNav(container);
}

// Function to initialize carousel navigation buttons
function initializeCarouselNav(container) {
    const items = container.querySelectorAll('.carousel-image');
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel-button"></span>`;
    });

    const carousel = document.querySelector("#projects-section");
    carousel.insertAdjacentHTML("beforeend", `
        <div class="carousel-nav">
            <button class="carousel-arrow left-arrow">&lt;</button>
            ${buttonsHtml.join("")}
            <button class="carousel-arrow right-arrow">&gt;</button>
        </div>
    `);

    const buttons = carousel.querySelectorAll('.carousel-button');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            items.forEach(item => item.classList.remove("carousel-image-selected"));
            buttons.forEach(button => button.classList.remove("carousel-button-selected"));

            const imgWidth = container.querySelector('.carousel-image').clientWidth;
            container.scrollLeft = imgWidth * index;
            updateActiveButton(buttons, index);
        });
    });

    leftArrow.addEventListener('click', () => {
        const imgWidth = container.querySelector('.carousel-image').clientWidth;
        container.scrollLeft -= imgWidth;
    });

    rightArrow.addEventListener('click', () => {
        const imgWidth = container.querySelector('.carousel-image').clientWidth;
        container.scrollLeft += imgWidth;
    });

    // Set the first button as active by default
    updateActiveButton(buttons, 0);
}


// Function to update active button styling based on the current scroll position
function updateCarouselOnScroll(container) {
    const items = container.querySelectorAll('.carousel-image');
    const buttons = document.querySelectorAll('.carousel-button');
    const imgWidth = container.querySelector('.carousel-image').clientWidth;
    const index = Math.round(container.scrollLeft / imgWidth);

    updateActiveButton(buttons, index);
}

// Function to update active button styling
function updateActiveButton(buttons, activeIndex) {
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Add images to carousel
    addImages();

    // Set up email copy functionality
    const emailElement = document.getElementById('emailAddress');
    if (emailElement) {
        emailElement.addEventListener('click', () => {
            const email = emailElement.textContent;
            navigator.clipboard.writeText(email).then(() => {
                alert('Email address copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    } else {
        console.error('Email address element not found.');
    }
});