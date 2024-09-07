function fillSingleChoiceAnswers(answers) {
    console.log('Filling single choice answers:', answers);
    // 找到单选题部分
    const singleChoiceSection = document.getElementById('single_test');
    if (!singleChoiceSection) {
        console.error('Single choice section not found');
        return;
    }

    // 在单选题部分内查找所有问题
    const questions = singleChoiceSection.querySelectorAll('div.des');
    console.log(`Found ${questions.length} single choice questions`);

    questions.forEach((question, index) => {
        if (answers[index]) {
            const radio = question.querySelector(`input[type="radio"][value="${answers[index]}"]`);
            console.log(`Single Choice Question ${index + 1}: Looking for answer ${answers[index]}, found radio:`, radio);
            if (radio) {
                radio.click();
                console.log(`Clicked radio for single choice question ${index + 1}`);
            } else {
                console.error(`Radio button not found for question ${index + 1}, answer ${answers[index]}`);
            }
        } else {
            console.log(`No answer provided for question ${index + 1}`);
        }
    });
}



function fillMultipleChoiceAnswers(answers) {
    console.log('Filling multiple choice answers:', answers);
    const multipleChoiceSection = document.getElementById('multiple_test');
    if (!multipleChoiceSection) {
        console.error('Multiple choice section not found');
        return;
    }

    const questions = multipleChoiceSection.querySelectorAll('div.des');
    questions.forEach((question, index) => {
        if (answers[index]) {
            // 首先，取消选中所有选项
            question.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.checked) {
                    checkbox.click();
                }
            });

            // 然后，选中正确的选项
            answers[index].forEach(choice => {
                const checkbox = question.querySelector(`input[type="checkbox"][value="${choice}"]`);
                console.log(`Multiple Choice Question ${index + 1}: Looking for answer ${choice}, found checkbox:`, checkbox);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                    console.log(`Clicked checkbox for multiple choice question ${index + 1}, choice ${choice}`);
                }
            });
        }
    });
}

function fillTrueFalseAnswers(answers) {
    console.log('Filling true/false answers:', answers);
    const trueFalseSection = document.getElementById('trueorfalse_test');
    if (!trueFalseSection) {
        console.error('True/false section not found');
        return;
    }

    const questions = trueFalseSection.querySelectorAll('div.des_2');
    console.log(`Found ${questions.length} true/false questions`);

    questions.forEach((question, index) => {
        if (answers[index]) {
            const value = answers[index] === '正确' ? 'T' : 'F';
            const radio = question.querySelector(`input[type="radio"][value="${value}"]`);
            console.log(`True/False Question ${index + 1}: Looking for answer ${answers[index]} (${value}), found radio:`, radio);
            if (radio) {
                radio.click();
                console.log(`Clicked radio for true/false question ${index + 1}`);
            } else {
                console.error(`Radio button not found for question ${index + 1}, answer ${answers[index]}`);
            }
        } else {
            console.log(`No answer provided for question ${index + 1}`);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === 'fillAnswers') {
        switch (request.type) {
            case 'single':
                fillSingleChoiceAnswers(request.answers);
                break;
            case 'multiple':
                fillMultipleChoiceAnswers(request.answers);
                break;
            case 'truefalse':
                fillTrueFalseAnswers(request.answers);
                break;
            default:
                console.error('Unknown answer type:', request.type);
        }
        sendResponse({ status: 'Answers filled' });
    }
});
