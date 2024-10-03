
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

    // --------------------------------------------
    const speedometerNeedle = document.querySelector('.speedometer-needle');
const statusText = document.getElementById("status-txt");
const background = document.getElementById("speedometer-background");

function setSpeedometerValue(degrees) {
  if(degrees==-72){
    speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
    statusText.innerHTML="Critical";
    statusText.style.color="#f44336";
    background.style.backgroundImage="radial-gradient(#f4433600,#f443361c, #f443365b)";


  }else if(degrees==-36){
    speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
    statusText.innerHTML="Dangerous";
    statusText.style.color="#d33a2f";
    background.style.backgroundImage="radial-gradient(#d33a2f00,#d33a2f0c, #d33a2f5b)";


  }else if(degrees==0){
    speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
    statusText.innerHTML="Uncertain";
    statusText.style.color="#787B86";
    background.style.backgroundImage="radial-gradient(#787B8600,#787B860c, #787B865b)";


  }else if(degrees==36){
    speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
    statusText.innerHTML="Moderate";
    statusText.style.color="#2457e6";
    background.style.backgroundImage="radial-gradient(#2457e600,#2457e60c, #2457e65b)";


  }else if(degrees==72){
    speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
    statusText.innerHTML="Secure";
    statusText.style.color="#2962ff";
    background.style.backgroundImage="radial-gradient(#2962ff00,#2962ff1c, #2962ff5b)";

  }else{
    alert("Invalid Value");
  }
  speedometerNeedle.style.transform = `rotate(${degrees}deg) translateX(-50%)`;
}

export function setScore(score){
  var degrees;
  if(score>=0 && score<20){
    degrees=-72;
  }else if(score>=20 && score<40){
    degrees=-36;
  }else if(score>=40 && score<60){
    degrees=0;
  }else if(score>=60 && score<80){
    degrees=36;
  }else if(score>=80 && score<=100){
    degrees=72;
  }else{
    alert("Invalid Score");
  }
setSpeedometerValue(degrees);
}

setScore(80)