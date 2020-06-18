//用 emoji 做为网站图标
const setFavicon = function (url) {
    /** 找到 favicon 元素，有些网站的图标的 rel 值是 'shortcut icon' **/
    const favicon = document.querySelector('link[rel="shortcut icon"]') || document.querySelector('link[rel="icon"]');
    if (favicon) {
        /** 如果能找到元素，将其值更新入参 url **/
        favicon.href = url;
    } else {
        /** 如果找不到元素，自己创建 favicon 的 link 元素 **/
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = url;

        /** 将创建 link 元素加到文档中 **/
        document.head.appendChild(link);
    }
};
const emojiFavicon = function (emoji) {
    /** 将创建 canvas 元素，尺寸 64x64 **/
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;

    /** 获取 canvas 元素的 context 对象 **/
    const context = canvas.getContext('2d');
    context.font = '64px serif';

    /** 将 emoji 元素放到画布中 **/
    context.fillText(emoji, 0, 64);

    /** 调用 canvas.toDataURL 获取 base64 格式的 URL **/
    const url = canvas.toDataURL();

    /** 更新网站 favicon **/
    setFavicon(url);
};
emojiFavicon('😂')