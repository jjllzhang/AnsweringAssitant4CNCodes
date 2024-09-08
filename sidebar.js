// 创建侧边栏容器
const sidebar = document.createElement('div');
sidebar.id = 'crypto-contest-helper-sidebar';
sidebar.style.cssText = `
    position: fixed;
    top: 0;
    right: -320px;
    width: 320px;
    height: 100%;
    background: white;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 10000;
`;

// 创建logo按钮
const logo = document.createElement('div');
logo.id = 'crypto-contest-helper-logo';
logo.style.cssText = `
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: url(${chrome.runtime.getURL('icon.png')}) center/cover;
    cursor: pointer;
    z-index: 10001;
    border-radius: 5px 0 0 5px;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
`;

// 创建iframe来加载popup.html
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('popup.html');
iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
`;

// 添加关闭按钮
const closeButton = document.createElement('div');
closeButton.textContent = '×';
closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #333;
`;

// 将元素添加到页面
sidebar.appendChild(iframe);
sidebar.appendChild(closeButton);
document.body.appendChild(sidebar);
document.body.appendChild(logo);

// 添加事件监听器
logo.addEventListener('click', () => {
    sidebar.style.right = '0';
    logo.style.right = '320px';
});

closeButton.addEventListener('click', () => {
    sidebar.style.right = '-320px';
    logo.style.right = '0';
});

// 移除滚动事件监听器，因为我们不再需要它
// window.addEventListener('scroll', () => { ... });