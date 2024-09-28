// downloadButton.js

export const downloadButtons = {
    portfolio: {
        buttonDiv: document.getElementById('myDownloadDiv'),
        buttonText: document.getElementById('myText'),
        downloadLink: '/assets/documents/Design Portfolio_Omid Pournejati 2024.pdf'
    },
    resume: {
        buttonDiv: document.getElementById('myResumeDiv'),
        buttonText: document.getElementById('resumeText'),
        downloadLink: '/assets/documents/CV-Omid Pournejati.pdf'
    }
};

export function setupDownloadButtons() {
    downloadButtons.portfolio.buttonDiv.addEventListener('click', () => runInterval('portfolio'));
    downloadButtons.resume.buttonDiv.addEventListener('click', () => runInterval('resume'));
}

function runInterval(buttonKey) {
    let counter = 3;
    let downloadState = false;

    if (!downloadState) {
        downloadState = true;
        const { buttonDiv, buttonText, downloadLink } = downloadButtons[buttonKey];

        const downloadButton = document.createElement('a');
        downloadButton.href = downloadLink;
        downloadButton.download = downloadLink;

        let localCounter = counter;

        const interval = setInterval(() => {
            if (localCounter >= 0) {
                buttonText.innerText = "Please Wait: " + localCounter;
                localCounter--;
            } else {
                clearInterval(interval);
                buttonText.innerText = "Downloading";
                downloadButton.click(); // Trigger download
                setTimeout(() => buttonText.innerText = "Download Again", 2000);
                downloadState = false;
            }
        }, 1000);
    }
}

