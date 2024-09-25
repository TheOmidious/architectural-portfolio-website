// downloadButton.js

// Variables for download buttons
let counter = 3;
let downloadState = false;
const downloadButtons = {
    portfolio: {
        buttonDiv: document.getElementById('myDownloadDiv'),
        buttonText: document.getElementById('myText'),
        // icon: document.getElementById('myIcon'),
        downloadLink: '/assets/documents/Design Portfolio_Omid Pournejati 2024.pdf'
    },
    resume: {
        buttonDiv: document.getElementById('myResumeDiv'),
        buttonText: document.getElementById('resumeText'),
        // icon: document.getElementById('resumeIcon'),
        downloadLink: '/assets/documents/CV-Omid Pournejati.pdf'
    }
};

// Function to create and return a download button element
function createDownloadButton(link) {
    const button = document.createElement('a');
    button.href = link;
    button.download = link;
    return button;
}

// Function to handle button click with countdown and download
function runInterval(buttonKey) {
    if (!downloadState) {
        downloadState = true;
        const { buttonDiv, buttonText, downloadLink } = downloadButtons[buttonKey];
        const downloadButton = createDownloadButton(downloadLink);

        let localCounter = counter; // Use a local counter for each button

        const myInterval = setInterval(function() {
            if (localCounter >= 0) {
                buttonText.innerText = "Please Wait: " + localCounter;
                localCounter--;
            } else {
                clearInterval(myInterval);
                downloadState = false;
                buttonText.innerText = "Downloading";
                setTimeout(function() {
                    buttonText.innerText = "Download Again";
                }, 2000);
                console.log(`Triggering download for: ${downloadLink}`);
                downloadButton.click(); // Trigger the download
            }
        }, 1000);
    }
}

// Attach the click event to the custom buttons
downloadButtons.portfolio.buttonDiv.addEventListener('click', () => runInterval('portfolio'));
downloadButtons.resume.buttonDiv.addEventListener('click', () => runInterval('resume'));