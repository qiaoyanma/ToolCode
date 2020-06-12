let p1=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("p1");
        resolve("p1");
    }, 1000);
});
let p2=new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("p2");
        resolve("p2");
    }, 2000);
});
// let p3=new Promise((resolve,reject)=>{
//     reject(new Error("oh no1"));
// });

// Promise.all([p1,p2,p3]).then(arr=>{
//     console.log(111);
// }).catch(err=>console.log(err))

Promise.race([p1,p2])
.then(result=>console.log(result))
.catch(err=>console.log(err))