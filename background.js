chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'submitAnswers') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'fillAnswers',
                answers: request.answers
            });
        });
    }
});
