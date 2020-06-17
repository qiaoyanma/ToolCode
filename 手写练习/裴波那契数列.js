function* fabonacci() {
    let [pre, cur] = [0, 1];
    while(true){
        yield cur;
        [pre,cur]=[cur,pre+cur];
    }
}

/*
1. 0 1
2. 1 1
3. 1 2
4.2  3
5.3  5
*/
for(let i of fabonacci()){
    console.log(i);
    if(i>100){
        break;
    }
}