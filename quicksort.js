function quicksort(arr=[]){
    if(arr.length<=1){
        return arr;
    }
    let privotValue=arr.splice(0,1);
    let left=[];
    let right=[];
    arr.forEach(item=>{
        item>privotValue?right.push(item):left.push(item);
    })
    return quicksort(left).concat(privotValue.concat(quicksort(right)));

}

 console.log(quicksort([78,32,12,3,90,56]))