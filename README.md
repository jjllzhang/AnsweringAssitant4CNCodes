# AnsweringAssitant4CNCodes

A browser extension to help you answer the questions in [中国密码技术竞赛](https://chinacodes.com.cn). This tool can automatically recognize single-choice, multiple-choice, and true/false questions, offering automatic filling capabilities to enhance the efficiency of answering questions.

## Features

- **Question Type Recognition**: Capable of recognizing single-choice, multiple-choice, and true/false questions.
- **Answer Auto-Filling**: Once the user confirms, it automatically fills the answer into the corresponding answer box.

## Installation

1. Visit the [GitHub Repository](https://github.com/jjllzhang/AnsweringAssitant4CNCodes).
2. Download or clone the repository.
3. Open your browser's extension page (e.g., in Chrome, go to `chrome://extensions/`).
4. Enable "Developer mode."
5. Click "Load unpacked," and select the downloaded or cloned folder.

## Usage

- Open a web page for "中国密码技术竞赛" in your browser.
- Click on the plugin icon in the browser toolbar to activate the answer assistant.
- Provide the answers of some kinds of formats.
- Users can select an answer and click "Confirm," after which the plugin will fill in the answer automatically.

## Combine this extension with LLM

For a better user experience, we recommend using a GPT that supports file uploads to get answers. Below is a usage example of kimi chat:

1. Upload the knowledge base and tell the GPT to read the questions carefully and answer the questions based on the content and existing knowledge (see attachments for details on the content of the questions).
   Prompt example:

   ```
   仔细阅读题库，之后我会向你提问，请你根据题库内容和已有知识回答我的问题。

   (tips: dont forget to upload the knowledge base)
   ```

2. Provide multiple choice questions and have GPT return answers in the given format.
   Prompt example:

   ```
   回答下列单选题，并按如下格式返回：
   1. A
   2. C
   ...

   <single questions>
   ```

3. Provide multiple choice questions and have GPT return answers in the given format.
   Prompt example:

   ```
   回答下列多选题，并按如下格式返回：
   1. A, C
   2. A, B, C
   ...

   <multiple questions>
   ```

4. Provide true/false questions and have GPT return answers in the given format.
   Prompt example:

   ```
   回答下列判断题，并按如下格式返回：
   1. 正确
   2. 错误
   ...

   <true/false questions>
   ```

## License

This plugin is licensed under the [MIT License](LICENSE). You are free to use, copy, modify, and distribute this plugin, but please retain the author information and license statement.
