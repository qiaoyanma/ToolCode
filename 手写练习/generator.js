function *gen(){
    yield 1;
    try{
        yield 2;
        yield 3;
    }catch{

    }finally{
        yield 4;
        return 5;
    }  

}

var g=gen();
console.log(g.next());
console.log(g.next());
console.log(g.return(7));
console.log(g.next());
console.log(g.next());