class CreateUser{
 construcotr(name){
     this.name=name;

 }
 getName(){
     console.log(this.name);
 }
}

var ProxyModel=(function(){
    let instance=null;
    return function(name){
        if(!instance){
            instance=CreateUser(name);
        }
        return instance;
    }
})()