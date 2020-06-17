var myModule=(function(){
    var modules={};
    function define(name,depts,impl){
        for(var i=0;i<depts.length;i++){
            depts[i]=modules[depts[i]];
        }
        console.log(impl);
        modules[name]=impl.apply(null,depts);
        console.log(depts);
    }
    function get(name){
        return modules[name];
    }
    return {
        define,
        get
    }
})();

myModule.define("bar",[],function(){
    
    function hello(who){
        return `let me introduce ${who}`
    }
    return {
        hello
    }
});
myModule.define("foo",["bar"],function(bar){
    //console.log(arguments);
    var hungry="hippo";
    function awesome(){
       // console.log(bar);
        //console.log(bar.hello(hungry).toUpperCase());
    }
    return{
        awesome
    }
});
var foo=myModule.get("foo");
foo.awesome();


