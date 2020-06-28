/**
 * 四种判断类型的方法
 * 1.typeof 对于原始类型除了null外都好用，对于引用类型除了function外都判定为object
 * 2.instanceof 判断实例的原型链上是否在右侧构造函数的原型 原型可以被重写
 * 3.constructor 判断是否是构造函数  constructor可以被重写
 * 4.Object.prototype.toString() 最靠谱
 */

//纯对象 obj.__prop__=Object.prototype
var classType2 = {};
var toString = classType2.toString;
var hasOwn = classType2.hasOwnProperty;
var fnToString = hasOwn.toString;
var objectFuncToString = fnToString.call(Object); //"function Object() { [native code] }"
var getProto = Object.getPrototypeOf;

var isPlainObject = function (obj) {
    var proto, ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }
    proto = getProto(obj);
    if (proto == null) {
        return true; //object.create(null) 这种情况
    }

    //({}).constructor==Function.prototype.toString.call(Object) =>true (都是function Object（）{[native code]})
    ctor = hasOwn.call(proto, "constructor") && proto.constructor; //构造函数Object
    console.log(ctor);
    return typeof ctor === "function" && fnToString.call(ctor) === objectFuncToString;
}

var isEmptyObject = function (obj) {
    for (var prop in obj) {
        if (!hasOwn.call(ob, prop)) break; //遍历到原型元素直接break是空对象
        return false;
    }
    return true;
}
//Reflect.ownKeys().length==0

//封装检查type方法v
var types = ["Boolean", "Number", "String", "Symbol", "Object", "Date", "RegExp", "Error","Map","Set"];
types.forEach(type => {
    classType2[`[object ${type}]`] = type.toLowerCase();
})
var toType = function (obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" ? classType2[toString.call(obj)] : typeof obj;
}


var isArrayLike = function (obj) {
    var length = !!obj && ("length" in obj) && obj.length;
    var type=toType(obj);
    return type==="array" || length===0 || (length-1 in obj);
}

//手写instanceof
var hasInstance=function(obj,right){
    if(!obj || !right){
        return false;
    }
    var prop=obj.__proto__;
    while(prop){
        if(prop===right.prototype){
            return true;
        }
        prop=prop.__proto__;
    }
    return false;
}