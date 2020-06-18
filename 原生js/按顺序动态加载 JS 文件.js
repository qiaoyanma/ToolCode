/** 根据给定的 url ，加载 js 文件 **/
const loadScript = function(url) {
    /** 返回 promise 对象，当加载完毕后才会 resolve **/
    return new Promise(function(resolve, reject) {
    
        /** 动态创建 script 标签 **/
        const script = document.createElement('script');
        
        /** 给标签 src 属性赋值 **/
        script.src = url;

        /** 监听 load 事件 **/
        script.addEventListener('load', function() {
            /** 完毕后调用 resolve 方法 **/
            resolve(true);
        });
        document.head.appendChild(script);
    });
};

/** 根据给定的 promise 数组，按顺序执行这些 promise **/
const waterfall = function(promises) {
    /** 调用数组的 reduce 方法 **/
    return promises.reduce(
        function(p, c) {
            /** 等前一个 promise 执行完 **/
            return p.then(function() {
                 /** 然后执行当前 promise **/
                return c.then(function(result) {
                    return true;
                });
            });
        },
        /** promise 初始值，立即执行 **/
        Promise.resolve([])
    );
};

/** 按顺序动态加载 js 文件 **/
const loadScriptsInOrder = function(arrayOfJs) {
    /** 将 string 数组转换成 promise 数组 **/
    const promises = arrayOfJs.map(function(url) {
        return loadScript(url);
    });
    
    /** 按顺序串接 promise 数组内元素 **/
    return waterfall(promises);
};

loadScriptsInOrder([
    '/path/to/file.js',
    '/path/to/another-file.js',
    '/yet/another/file.js',
]).then(function() {
    /** 等上述 3 个 js 都加载完，再做一些操作 **/
})