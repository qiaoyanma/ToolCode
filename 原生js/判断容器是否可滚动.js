const isScrollable = function(ele) {
    /** 对比元素的 scrollHeight 和 clientHeight 数值（如果容器不可滚动，这两个值相等） **/
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

    /** 以上操作还不充分，还得判断 `overflow-y` 样式没有被用户设置成 `hidden` 或 `hidden !important`  **/
    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
};

//获取当前元素的首个可滚动父容器 能力
const getFirstScrollableParent = function(ele) {
    return (!ele || ele === document.body)
        ? document.body
        : (isScrollable(ele) ? ele : getScrollableParent(ele.parentNode));
};