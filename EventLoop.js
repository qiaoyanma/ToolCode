console.log('script start');
async function asyn1(){
    await asyn2();
    console.log('asyn1 end');
}
async function asyn2(){
    console.log('asyn2 end');
}
asyn1();
setTimeout(() => {
    console.log('settimeout');
}, 0);

new Promise((resolve,reject)=>{
    console.log('promise');
    resolve();
}).then(()=>{
    console.log('promise1');
}).then(()=>{
    console.log('promise2');
});

console.log('srcript end');