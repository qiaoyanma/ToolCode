class ExtendArray extends Array{
    static get [Symbol.species](){
        return Array;
    }
}

var arr=new ExtendArray(1,2,3);
var aMap=arr.map(v=>v*v);

// console.log(arr instanceof ExtendArray);
// console.log(arr instanceof Array);

// console.log(aMap instanceof ExtendArray);
// console.log(aMap instanceof Array);

ExtendArray.prototype.myMap=function(callback,thisArg){
    let Species=this.constructor[Symbol.species];
    let result=new Species();
    this.forEach((item,index,arr)=>{
        result.push(callback.apply(thisArg,[item,index,arr]));
    })
    return result;
}
var obj={name:"jiafei"};
var result=arr.myMap(function(item){
    return this.name+item;
},obj)

console.log(result);