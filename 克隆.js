/*
方法一
*/
function Clone(target, map = new WeakMap()) {
    if (typeof target === "object") {
        let targetObj = Array.isArray(targetObj) ? [] : {};
        if (map.has(target)) {
            return map.get(targetObj);
        }
        map.set(target, targetObj);
        for (let key in target) {
            targetObj[key] = Clone(targetObj[key], map);
        }
        return targetObj;
    } else {
        return target;
    }
}

/*
方法二
*/

function CheckType(obj){
    return Object.prototype.toString.call(obj).slice(8,-1);
}

function Clone2(target){
    if(typeof target==="object"){
        let targetObj=Array.isArray(target)?[]:{};
        for(let key in target){
            targetObj[key]=Clone2(target[key]);
        }
        return targetObj;
    }else{
        return target;
    }
}