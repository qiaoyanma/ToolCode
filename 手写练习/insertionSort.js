function insertionSort(arr){
    for(let outer=1,l=arr.length;outer<l;outer++){
        let inner=outer;
        let temp=arr[outer];
        while(inner>0&& arr[inner-1]>=temp){
            arr[inner] = arr[inner - 1];
            --inner;
        }
        arr[inner] = temp;
    }
}
var arr=[83,23,8,20,30]
insertionSort(arr);
console.log(arr);

/*合同两个有序数组*/
let merge=function(nums1,m,nums2,n){
    let len1=m-1;
    let len2=n-1;
    let len=m+n-1;
    /*
    把数组nums2合并到nums1中
    有两种边界情况：
    1.数组2没数据则终止循环
    2。数组1没有数据，则把数组2剩余的合并到数组1
    */

    while(len2>0){
        if(len1<0){
           nums1[len--]=nums2[len2--];
           continue;
        }
        nums1[len--]=nums1[len1]>nums2[len2]?nums1[len1--]:nums2[len2--];
    }
}

var merge = function(nums1, m, nums2, n) {
    let len1 = m - 1,
        len2 = n - 1,
        len = m + n - 1
    while(len2 >= 0) {
        if(len1 < 0) {
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--]: nums2[len2--]
    }
};
var a=[7,20,35,68];
var b=[19,23,25,80,90,100]
merge(a,4,b,6);
console.log(a);

/*
给定一个整数数组 nums 和一个目标值 target ，
请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
例如：给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/
function twoSum(arr,target){
    let map=new Map();
    for(let i=0;i<arr.length;i++){
        let k=target-arr[i];
        if(map.has(k)){
            return [map.get(k),i];
        }
        map.set(arr[i],i);
    }
}
console.log(twoSum([2,11,17,8,7,20,3],9));


function samepart(arr1,arr2){
    return arr1.filter(item=>arr2.includes(item))
}
console.log(samepart([2,12,8,10],[12,19,10]));