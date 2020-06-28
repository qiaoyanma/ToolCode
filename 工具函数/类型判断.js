let typeObj={};
let hasProp=typeObj.hasOwnProperty;
let toStringFn=typeObj.toString;

function isFunction(obj){
    return typeof obj==="function"
}

function isWindow(obj){
    return obj.window=window;
}
console.log(1)