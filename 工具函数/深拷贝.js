/**
 * 
 * @param {*} obj 被拷贝的源对象
 * @param {*} map  缓存对象
 */
function deepClone(obj,map=new Map()){
    if(map.has(obj)){
        return map.get(obj);
    }
    //null undefined function 直接返回
    if(obj===null || typeof obj!=="object"){
        return obj;
    }
    //判断正则和日期 函数没必要新建直接copy
    if(/^(RegExp|Date)$/.test(obj.constructor.name)){
        return new obj.constructor(obj);
    }

    let result=new obj.constructor();
    for(var prop in obj){
        //属性先遍历自身的，然后遍历继承的属性
        if(!obj.hasOwnProperty(prop)) break;
        result[prop]=deepClone(obj[prop]);
    }
    map.set(obj,result);
    return result;
}
//test
var aa={
    x:1,
    y:{
        a:1,
        b:2,
        c:3
    },
    z: new Date(),
    r: /^d+$/

}
var bb=deepClone(aa);