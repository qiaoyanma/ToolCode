function flush(arr=[]){
    return arr.sort((a,b)=>{
        return Math.random()>0.5?-1:1;
    })
}

console.log(flush([2,3,4,5,6,7,8]));