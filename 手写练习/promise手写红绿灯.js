function red(){
    console.log('red');
}
function yellow(){
    console.log('yellow');
}
function green(){
    console.log('green');
}

function light(timer,cb){
    return new Promise(resolve=>{
        setTimeout(()=>{
            cb();
            resolve();
        },timer);     
    })
}

function step(){
    Promise.resolve().then(()=>{
        return light(3000,red);
    }).then(()=>{
        return light(2000,yellow);
    }).then(()=>{
        return light(1000,green);
    }).then(()=>{
        step();
    })
}

step();