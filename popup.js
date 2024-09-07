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
