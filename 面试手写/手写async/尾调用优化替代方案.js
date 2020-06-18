

let testFn=(function (){
    let genFn=function(res){
        while(typeof res==="function"){
            res=res();
        }
        console.log(res);
        return res;
    }
    function fnA(n){
        if(n==0){
            return 100;
        }else{
            return function(){
               return fnA.call(this,n-1);
            }
        }
    }
    return function(n){
        return genFn(fnA(n));
       }

})();
var a=testFn(100000)

