function jsonp({url,params,callback}){
    return new Promise((resolve,reject)=>{
        let script=document.createElement("script");
        let query=[];
        window[callback]=function(data){
            resolve(data);
            document.body.removeChild(script);
        }
        let urlPara={...params,callback}
        for(let key in urlPara){
            query.push(`${key}=${urlPara[key]}`);
        }
        script.src=`${url}?${query.join("&")}`;
        document.body.appendChild(script);
    });
}z