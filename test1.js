
var a=0;
if(true){
    console.log(a,this.a);
    a=1;
    console.log(a,this.a);
    function a(){}
    console.log(a,this.a);
    a=21;
    console.log(a,this.a);
    console.log(`里面${a}`);
}
console.log(`外面面${a}`);
