const statusItems=['pending','fulfilled','rejected'];
function Promise(...args){
  this.err='';
  this.value='';
  this.status=statusItems[0];
  let fn=args[0];
  let resolve=(data)=>{
      this.value=data;
      this.status=statusItems[1];
  }
  let rejected=(msg)=>{
    this.err=msg;
    this.status=statusItems[2];
  }
  fn(resolve,reject);
}
Promise.prototype.then=function(onfulfilled,onrejected){
    if(this.status===statusItems[1]){
        return new Promise(function(resolve,reject){
            resolve(onfulfilled(this.value));
        });
    }else if(this.status===statusItems[2]){
        return new Promise(function(resolve,reject){
            reject(onrejected(this.value));
        });
    }
}