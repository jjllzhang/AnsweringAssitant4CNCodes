function extractSingleChoiceAnswers(input) {
    const answerLines = input.split('\n');
    return answerLines.map(line => {
        const match = line.match(/^\d+\.\s+([A-D])/);
        return match ? match[1] : null;
    }).filter(answer => answer !== null);
}

function extractMultipleChoiceAnswers(input) {
    const answerLines = input.split('\n');
    return answerLines.map(line => {
        const match = line.match(/^\d+\.\s+([A-D],\s*)+([A-D])/);
        return match ? line.split('.')[1].trim().split(', ') : null;
    }).filter(answer => answer !== null);
}

function sendAnswers(type, answers) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error('Error querying tabs:', chrome.runtime.lastError);
            return;
        }
        if (tabs.length === 0) {
            console.error('No active tab found');
            return;
        }
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'fillAnswers',
            type: type,
            answers: answers
        }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else {
                console.log('Message sent successfully');
                let messageText;
                switch (type) {
                    case 'single':
                        messageText = '单选题答案已提交';
                        break;
                    case 'multiple':
                        messageText = '多选题答案已提交';
                        break;
                    case 'truefalse':
                        messageText = '判断题答案已提交';
                        break;
                    default:
                        messageText = '答案已提交';
                }
                showMessage(messageText);
            }
        });
    });
}

function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

document.getElementById('submitSingle').addEventListener('click', () => {
    const input = document.getElementById('singleChoiceAnswers').value;
    const answers = extractSingleChoiceAnswers(input);
    console.log('Extracted single choice answers:', answers);
    sendAnswers('single', answers);
});

document.getElementById('submitMultiple').addEventListener('click', () => {
    const input = document.getElementById('multipleChoiceAnswers').value;
    const answers = extractMultipleChoiceAnswers(input);
    console.log('Extracted multiple choice answers:', answers);
    sendAnswers('multiple', answers);
});

document.getElementById('submitTrueFalse').addEventListener('click', () => {
    const input = document.getElementById('trueFalseAnswers').value;
    const answers = input.split('\n').map(line => {
        const match = line.match(/^\d+\.\s*(正确|错误)/);
        return match ? match[1] : null;
    }).filter(answer => answer !== null);

    console.log('Extracted true/false answers:', answers);
    sendAnswers('truefalse', answers);
});

document.getElementById('fetchSingle').addEventListener('click', () => {
    console.log('Fetch Single button clicked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error('Error querying tabs:', chrome.runtime.lastError);
            return;
        }
        if (tabs.length === 0) {
            console.error('No active tab found');
            return;
        }
        console.log('Sending message to content script');
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'fetchSingleChoiceQuestions'
        }, async response => {
            console.log('Received response from content script:', response);
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else if (response && response.questions) {
                await copyToClipboard(response.questions);
                showMessage('单选题已复制到剪贴板');
            } else {
                console.error('Unexpected response:', response);
            }
        });
    });
});

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

document.getElementById('fetchMultiple').addEventListener('click', () => {
    console.log('Fetch Multiple button clicked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error('Error querying tabs:', chrome.runtime.lastError);
            return;
        }
        if (tabs.length === 0) {
            console.error('No active tab found');
            return;
        }
        console.log('Sending message to content script');
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'fetchMultipleChoiceQuestions'
        }, async response => {
            console.log('Received response from content script:', response);
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else if (response && response.questions) {
                await copyToClipboard(response.questions);
                showMessage('多选题已复制到剪贴板');
            } else {
                console.error('Unexpected response:', response);
            }
        });
    });
});

document.getElementById('fetchTrueFalse').addEventListener('click', () => {
    console.log('Fetch True/False button clicked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error('Error querying tabs:', chrome.runtime.lastError);
            return;
        }
        if (tabs.length === 0) {
            console.error('No active tab found');
            return;
        }
        console.log('Sending message to content script');
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'fetchTrueFalseQuestions'
        }, async response => {
            console.log('Received response from content script:', response);
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else if (response && response.questions) {
                await copyToClipboard(response.questions);
                showMessage('判断题已复制到剪贴板');
            } else {
                console.error('Unexpected response:', response);
            }
        });
    });
});
