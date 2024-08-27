chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateIcon') {
        let iconPath;

        if (request.score < 40) {
            iconPath = 'icon-red.png'; 
            console.log('Setting icon to red');
        } else if (request.score >= 40 && request.score <= 70) {
            iconPath = 'icon-yellow.png';
            console.log('Setting icon to yellow');
        } else {
            iconPath = 'icon-green.png'; 
            console.log('Setting icon to green');
        }

        chrome.action.setIcon({ path: iconPath }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error setting icon:', chrome.runtime.lastError);
            } else {
                console.log('Icon set successfully');
            }
        });
    }
});
