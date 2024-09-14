import { myFunction } from "./stickyHeader";

const container = document.getElementById('container');

// Create an img element
const img = document.createElement('img');

// Set the src attribute for the image
img.src = '/assets/images/Test.jpeg';

// Append the image to the container
container.appendChild(img);

 
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()}; 
console.log('hello')


