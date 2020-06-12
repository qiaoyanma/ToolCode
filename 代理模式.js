let imgFun=(function(){
    var image=document.createElement("img");
    document.body.appendChild(image);
    return {
        setSrc:(url)=>{
            image.src=url;
        }
    }
})();

let proxyFun=(function(){
    let image=new image();
    image.onload=function(){
        imgFun.setSrc(this.src);
    }
    return {
        setImgUrl(url){
            image.src=url;
            imgFun.setSrc('loading.jpg');
        }
    }
})();

proxyFun.setImgUrl('test.jpg');