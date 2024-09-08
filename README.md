# 密码技术竞赛智能答题助手

## 简介

密码技术竞赛智能答题助手是一款Chrome浏览器扩展，旨在帮助参加[中国密码技术竞赛](https://chinacodes.com.cn)的用户更高效地完成在线答题。本扩展支持单选题、多选题和判断题的自动抓取和填充功能。

## 主要功能

1. **题目抓取**：自动抓取页面上的单选题、多选题和判断题，并复制到剪贴板。
2. **答案填充**：根据用户输入的答案，自动填充到相应的题目中。
3. **侧边栏界面**：采用侧边栏设计，方便用户随时调用和隐藏。

## 使用方法

1. 安装扩展后，在竞赛页面的右侧会出现一个固定的logo按钮。
2. 点击logo按钮，侧边栏会滑出，显示操作界面。
3. 
   - 打开任一支持基于知识库对话的GPT（如kimi chat），上传相应题库（题库参考[attachments](./attachments)或以下在线文档：[1](https://notes.sjtu.edu.cn/9GP6lZNgSp6xY9-azlv4eg),[2](https://notes.sjtu.edu.cn/s/byv9okec4),[3](https://notes.sjtu.edu.cn/s/SzxZknezu),[4](https://notes.sjtu.edu.cn/s/UKMHmRJoU)），调用GPT阅读知识库，提示词如下：
   ```
   仔细阅读题库，之后我会向你提问，请你根据题库内容和已有知识回答我的问题
   ```
   - 点击"抓取题目"按钮，将相应类型的题目复制到剪贴板。
   - 根据刚才抓取的题目向GPT提问,获取对应题目答案。
   - 在文本框中输入答案，然后点击"提交答案"按钮，自动填充到页面中。
4. 使用完毕后，点击侧边栏右上角的关闭按钮，侧边栏会收起。

## 答案格式

- 单选题：每行一个答案，格式为 "1. A"
- 多选题：每行一个答案，格式为 "1. A, B, C"
- 判断题：每行一个答案，格式为 "1. 正确" 或 "1. 错误"

## 注意事项

- 使用本扩展时请遵守考试规则和相关法律法规。
- 本扩展仅作为辅助工具，不保证答案的正确性。
- 使用过程中如遇到任何问题，请及时反馈。

## 隐私声明

本扩展不会收集或上传任何用户数据。所有操作均在本地完成。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 贡献

欢迎提交 Issue 或 Pull Request 来帮助改进这个项目。
