/** 关键是监听 'paste' 事件 **/
document.addEventListener('paste', function(evt) {
    /** 获取粘贴板上的数据 **/
    const clipboardItems = evt.clipboardData.items;
    
    /** 过滤筛选获得图片列表 **/
    const items = [].slice
        .call(clipboardItems)
        .filter(function(item) {
            /**  过滤条件是 type 为 image **/
            return item.type.indexOf('image') !== -1;
        });
    if (items.length === 0) {
        return;
    }

    /** “弱水三千，只取一瓢”，咱们只用第一个 **/
    const item = items[0];
    
    /** 将图片数据转换成 blob 对象 **/
    const blob = item.getAsFile();

    /** 动态创建 image 标签（假设 id 为 preivew） **/
    const imageEle = document.getElementById('preview');
    
    /** 将图片 blob 对象转换成 URL 对象，赋值 **/
    /** 打完！收工！ **/
    imageEle.src = URL.createObjectURL(blob);
});