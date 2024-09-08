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

function fetchSingleChoiceQuestions() {
    const singleChoiceSection = document.getElementById('single_test');
    if (!singleChoiceSection) {
        console.error('Single choice section not found');
        return '';
    }

    const questions = singleChoiceSection.querySelectorAll('div.des');
    let questionText = "回答下列单选题，并按如下格式返回：\n1. A\n2. C\n...\n\n";

    questions.forEach((question) => {
        const questionContent = question.querySelector('p').textContent.trim();
        const options = Array.from(question.querySelectorAll('li')).map(li => {
            const input = li.querySelector('input[type="radio"]');
            if (input) {
                return `${input.value}. ${li.textContent.trim().replace(/^[A-D]\.\s*/, '')}`;
            }
            return null;
        }).filter(option => option !== null);

        // 直接使用题目中的序号，不再添加额外的序号
        questionText += `${questionContent}\n`;
        options.forEach(option => {
            questionText += `   ${option}\n`;
        });
        questionText += '\n';
    });

    console.log('Fetched questions:', questionText);
    return questionText.trim();
}

function fetchMultipleChoiceQuestions() {
    const multipleChoiceSection = document.getElementById('multiple_test');
    if (!multipleChoiceSection) {
        console.error('Multiple choice section not found');
        return '';
    }

    const questions = multipleChoiceSection.querySelectorAll('div.des');
    let questionText = "回答下列多选题，并按如下格式返回：\n1. A, C\n2. A, B, C\n...\n\n";

    questions.forEach((question) => {
        const questionContent = question.querySelector('p').textContent.trim();
        const options = Array.from(question.querySelectorAll('li')).map(li => {
            const input = li.querySelector('input[type="checkbox"]');
            if (input) {
                return `${input.value}. ${li.textContent.trim().replace(/^[A-D]\.\s*/, '')}`;
            }
            return null;
        }).filter(option => option !== null);

        questionText += `${questionContent}\n`;
        options.forEach(option => {
            questionText += `   ${option}\n`;
        });
        questionText += '\n';
    });

    console.log('Fetched multiple choice questions:', questionText);
    return questionText.trim();
}

function fetchTrueFalseQuestions() {
    const trueFalseSection = document.getElementById('trueorfalse_test');
    if (!trueFalseSection) {
        console.error('True/false section not found');
        return '';
    }

    const questions = trueFalseSection.querySelectorAll('div.des_2');
    let questionText = "回答下列判断题，并按如下格式返回：\n1. 正确\n2. 错误\n...\n\n";

    questions.forEach((question) => {
        const questionContent = question.querySelector('p').textContent.trim();
        const options = Array.from(question.querySelectorAll('input[type="radio"]')).map(input => {
            return `${input.value === 'T' ? '正确' : '错误'}`;
        });

        questionText += `${questionContent}\n`;
        questionText += `   ${options.join('    ')}\n`;
        questionText += '\n';
    });

    console.log('Fetched true/false questions:', questionText);
    return questionText.trim();
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
    } else if (request.action === 'fetchSingleChoiceQuestions') {
        const questions = fetchSingleChoiceQuestions();
        sendResponse({ questions: questions });
    } else if (request.action === 'fetchMultipleChoiceQuestions') {
        const questions = fetchMultipleChoiceQuestions();
        sendResponse({ questions: questions });
    } else if (request.action === 'fetchTrueFalseQuestions') {
        const questions = fetchTrueFalseQuestions();
        sendResponse({ questions: questions });
    }
    return true; // 保持消息通道开放
});
