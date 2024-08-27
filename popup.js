document.getElementById('screen2').style.display = 'none';

document.getElementById('spamCheckButton').addEventListener('click', function() {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'block';
    document.getElementById('screen2').style.animation = 'fadeIn 2.5s ease-in';
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen1').style.display = 'block';
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let currentUrl = tabs[0].url;
    document.getElementById('current-url').innerText = currentUrl;
    updateSafetyScore(tabs[0].id);
  });

  const countdownTime = 60; 
    let countdown; 
    let lastUpdateTime = localStorage.getItem('lastUpdateTime'); 
    let startTime;

    if (lastUpdateTime) {
        
        const elapsedTime = Math.floor((Date.now() - lastUpdateTime) / 1000);
        countdown = Math.max(countdownTime - elapsedTime, 0); 
        startTime = localStorage.getItem('startTime') ? Number(localStorage.getItem('startTime')) : Date.now();
    } else {
        countdown = countdownTime;
        startTime = Date.now();
        localStorage.setItem('startTime', startTime); 
    }

    function updateTimer() {
        const now = Date.now();
        const elapsedTime = Math.floor((now - startTime) / 1000);

        countdown = countdownTime - elapsedTime;

        if (countdown <= 0) {
            // Network log analysis function to be executed here. 
            countdown = countdownTime; 
            startTime = Date.now();
            localStorage.setItem('startTime', startTime); 
        }

        document.getElementById('timer').textContent = `(Checking again in ${countdown} s)`;
        localStorage.setItem('lastUpdateTime', now); 
        requestAnimationFrame(updateTimer);
    }
    requestAnimationFrame(updateTimer);

    document.getElementById('checkButton').addEventListener('click', function() {
        let userInput = document.querySelector('.textarea').value;
        let isSpam = false;    
        let resultText = isSpam ? 'Result: Spam detected!' : 'Result: No spam detected';    
        document.querySelector('.result').textContent = resultText;
    });
    
    function generateRandomScore() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    function updateScore() {
        const score = generateRandomScore();
        document.querySelector('.score').textContent = score;
        console.log('Generated score:', score);
    
        chrome.runtime.sendMessage({ action: 'updateIcon', score: score }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else {
                console.log('Message sent successfully');
            }
        });
    }
    
    document.getElementById('current-url').addEventListener('DOMSubtreeModified', function() {
        updateScore();
    });
    
    updateScore();