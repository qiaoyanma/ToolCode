/**
 * 求数组的交集（元素不重复）
 */
function insertection(arr1=[],arr2=[]){
    return [...new Set(arr1.filter(item=>arr2.includes(arr1)))]
}
/**
 * s在未排序的数组中找到第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 */
var findKthLargest = function(nums, k) {
  var tempArr=nums.slice(0,k);
    for(var i=k;i<nums.length;i++){
        let min=Math.min(tempArr);
        if(nums[i]>min){
            let index=tempArr.indexOf(min);
            tempArr[i]=nums[i];
        }
    }
    return tempArr.sort((a,b)=>a-b)[0];
};