function insertSort(arr){
    for(let i=1;i<arr.length;i++){
        let temp=arr[i];
        let j=i;
        for(;j>0&&arr[j-1]>temp;j--){
            arr[j]=arr[j-1];
        }
        arr[j]=temp;
    }
}
let arr=[89,23,36,9,12];
insertSort(arr);
console.log(arr);