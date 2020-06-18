/** 该变量保存用户的当前光标位置 **/
const selection = {};

/** 监听 keydown 事件 **/
ele.addEventListener('keydown', function(e) {
    const target = e.target;
    selection = {
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
    };
});

let currentValue = '';
ele.addEventListener('input', function(e) {
    const target = e.target;

    if (/^[0-9s]*$/.test(target.value)) {
        currentValue = target.value;
    } else {
        /** 恢复原 input 内容 **/
        target.value = currentValue;
        
        /** 恢复光标位置 **/
        target.setSelectionRange(
            selection.selectionStart,
            selection.selectionEnd
        );
    }
});