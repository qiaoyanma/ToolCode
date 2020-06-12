Array.prototype.myMap=function(fn,thisValue=null){
    let arr=this;
    let result=[];
    for(var i=0;i<arr.length;i++){
        result.push(fn.call(thisValue,arr[i],i,arr));
    }
    return result;
}


Array.prototype.myMap=function(fn,thisValue=null){
    let arr=this;
    let result=[];
    this.forEach(function(val,index,arr){
        result.push(fn.call(thisValue,val,index,arr));
    },obj);
    
    return result;
}

var obj={name:"jiafei"}
var arr=[1,2,3].myMap(function(item){
    return this.name+item*item;
},obj);
console.dir(arr);