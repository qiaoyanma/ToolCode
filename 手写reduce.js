function Reduce(arr, callbackFn, initValue) {
    if (!Array.isArray(arr) || !arr.length || typeof callbackFn != "function") {
        return arr;
    } else {
        let value = initValue === undefined ? arr[0] : initValue;
        for (let i = initValue === undefined ? 1 : 0; i < arr.length; i++) {
            value = callbackFn(value, arr[i], i, arr);
        }
        return value;
    }
}

console.log(Reduce([1,2,3],(pre,next,index,arr)=>pre+next,1));