function checkType(obj){
    return Object.prototype.toString.call(8,-1);
}

function deepClone(obj) {
    if (checkType(obj) != "Object" && checkType(obj)!="Array") {
        return obj;
    }
    let result = Array.isArray(obj) ? [] : {};
    for (let item in obj) {
        let value = obj[item];
        if (checkType(value) === "Object" || checkType(value)==="Array") {
            result[item] = deepClone(value);
        } else {
            result[item] = value;
        }
    }
    return result;
}

//手写instance
function instance (left,right){
    let prop=left.__prop__;
    let prototype=right.prototype;
   while(true){
       if(prop==null) return false;
      if(prop==prototype){
          return true;
      }
      prop=prop.__prop__;
   }
}