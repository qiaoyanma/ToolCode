//自定义下载的内容

function download() {
    /** 将 Hello World 塞给 Blob 对象，同时设置 MIME 类型为 文本文件 **/
    const blob = new Blob(["Hello World"], {
        type: 'text/plain'
    });

    /** 根据 blob 内容创建对象 URL（不了解该知识点，就可以理解成类似音视频这样的 url ） **/
    const url = window.URL.createObjectURL(blob);

    /** 创建 a 表情 **/
    const link = document.createElement('a');

    /** 下载时显示的文件名 **/
    link.download = '下载文件名';

    /** 将对象 URL 赋值链接给 href 属性 **/
    link.href = url;

    /** 加载到文档末尾 **/
    document.body.appendChild(link);

    /** 模拟点击刚动态创建是 a 标签，触发浏览器下载动作 **/
    link.click();

    /** 此时 a 标签失去利用价值，从 body 中移除 **/
    document.body.removeChild(link);

    /** 同样 URL 对象也失去价值，从内存中释放~ **/
    window.URL.revokeObjectURL(url);
}