// carousel.js

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

export function addImages() {
    const container = document.getElementById('image-container');

    if (container) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'carousel-slides';
        imgContainer.style.display = 'flex';
        imgContainer.style.overflowX = 'auto';
        imgContainer.style.scrollBehavior = 'smooth';

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `/assets/images/${image}`;
            img.alt = 'Dynamic Image';
            img.className = 'carousel-image';
            img.loading = 'lazy';
            imgContainer.appendChild(img);
        });

        container.appendChild(imgContainer);

        // Initialize carousel with scroll and mouse dragging functionality
        initializeCarousel(imgContainer);
    } else {
        console.error('Image container element not found.');
    }
}

export function initializeCarousel(container) {
    let scrollTimeout;
    let isDragging = false;
    let startX, scrollLeft;

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY > 0 ? container.clientWidth : -container.clientWidth;
    });

    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateCarouselOnScroll(container);
        }, 100);
    });

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => isDragging = false);
    container.addEventListener('mouseup', () => isDragging = false);

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3;
        container.scrollLeft = scrollLeft - walk;
    });

    initializeCarouselNav(container);
}

function initializeCarouselNav(container) {
    // Carousel navigation logic
}

function updateCarouselOnScroll(container) {
    // Logic to update carousel scroll and navigation state
}
