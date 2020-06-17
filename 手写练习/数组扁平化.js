function flat(arr = []) {
    let result = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flat(item));
        } else {
            result.push(item);
        }
    })
    return result;
}


let result=flat([1,[3,[4,5,6]],[9,[10]]]);
console.log(result);

//reduce递归

function flat(arr=[]){
    return arr.reduce((pre,next)=>{
        return Array.isArray(next)?pre.concat(flat(next)):pre.push(next);
    },[])
}

//利用展开运算符
function flat(arr){
    while(arr.some(Array.isArray)){
        arr=[].concat(...arr)
    }
}


function flat(arr=[]){
    let rusult=[];
   let fn=(ary)=> ary.forEach(item => {
        if(Array.isArray(item)){
            fn(item);
        }else{
            result.push(item);
        }
    });
    fn(arr);
    return result;
}