const queueObservers = new Set();
const observe = fn => queueObservers.add(fn);
const observable = obj => new Proxy(obj, {
    set
})

function set(target, property, value, receiver) {
    const result = Reflect.set(target, property, value, receiver);
    queueObservers.forEach(fn => fn());
    return result;
}

const person={
    name:"jiafei",
    age:20
}
function print(){
    console.log(`${person.name},${person.age}`);
}
observe(print);
const proxy=observable(obj);
proxy.name="jiafeimao";


async function foo(){
    try{
        await Promise.reject(11)
    }catch(err){
        console.log(err);
    }
}
foo().then(value=>{
    console.log('resolve'+value);
}).catch(err=>{
    console.log('err'+err);
})


async function FooAsync(){
    var arr=Array.of(1,2,3,4,5);
    var time1=Date.now();
    return arr.map(async (item,index,arr)=>{
        var result= await new Promise(resolve=>{
            setTimeout(() => {
                resolve(index);
            }, index*3000);
        });
        return result;
    })
}

    console.log(FooAsync().then(v=>Promise.all(v).then(v=>console.log(v))))
