class EventEmitter {
    constructor() {
        this.events = Object.create(null);
        this.maxSizeListener = 10;
    }
    // 向事件队列添加事件
    // prepend为true表示向事件队列头部添加事件
    addEventListener(type, listener, prepend) {
        if (!this.events) {
            this.events = Object.create(null);
        }
        if (this.events[type]) {
            if (prepend) {
                this.events[type].unshift();
            } else {
                this.events[type].push();
            }
        } else {
            this.events[type] = [listener];
        }
    }

    // 移除某个事件
    removeListener(type, listener) {
        if (Arrary.isArray(this.events[type])) {
            if(!listener){
                delete this.events[type];
            }else{
                this.events[type]=this.events[type].filter(item=>{
                    return item!==listener && item.origin!==listener;
                })
            }
        } 
    }
     // 向事件队列添加事件，只执行一次
     once(type,listener){
         const only=function(...args){
             listener.apply(this,args);
             this.removeListener(type,listener);
         }
         only.origin=listener;
         this.addEventListener(type,only);
     }

      // 执行某类事件
      emit(type,...args){
          if(Array.isArray(this.events[type])){
              this.events[type].foreach(item=>{
                  item.apply(this,args);
              })
          }
      }

      // 设置最大事件监听个数
      setMaxListener(count){
          this.maxSizeListener=count;
      }
}