 class LRUCache{
    constructor(capcity){
        this.cache=new Map();
        this.capcity=capcity;
    }
    get(key){
        if(this.cache.has(key)){
            let value=this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key,value);
            return value;
        }
        return -1;
    }
    put(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key);
        }else if(this.cache.size>=this.capcity){
            this.capcity.delete(this.capcity.keys().next().value);
        }
        this.capcity.set(key,value);
    }
 }