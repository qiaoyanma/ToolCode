let tree={
    val:1,
    left:{
        val:2,
        left:{
            val:4,
            left:null,
            right:null
        },
        right:{
            val:5,
            left:null,
            right:null
        }
    },
    right:{
        val:3,
        left:null,
        right:null
    }
}

function calPathSum(tree){
    let paths=[];
    calpathval(tree,paths,"");
    let result=paths.reduce((pre,next)=>{
        return parseInt(pre)+parseInt(next);
    })
    console.log(result);
}
function calpathval(node,paths,path){
     path+=node.val;
    if(node){
        if(node.left){
          calpathval(node.left,paths,path);
        }
        if(node.right){
            calpathval(node.right,paths,path);
        }
        if(!node.right && !node.left){
            paths.push(path);
        }
    }
    
}
calPathSum(tree);