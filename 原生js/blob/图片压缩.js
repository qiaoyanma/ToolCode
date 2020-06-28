// compress.js
const MAX_WIDTH = 800; // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      /*
      其实 Canvas 对象除了提供 toDataURL() 方法之外，它还提供了一个 toBlob() 方法，该方法的语法如下：
      canvas.toBlob(callback, mimeType, qualityArgument)
      */
      resolve(imageData);
    };
  });

}
//data转化为blob
function dataUrlToBlob(base64, mimeType) {
    let bytes = window.atob(base64.split(",")[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }
  //发送ajax请求到服务器
  function uploadFile(url, blob) {
    let formData = new FormData();
    let request = new XMLHttpRequest();
    formData.append("image", blob);
    request.open("POST", url, true);
    request.send(formData);
  }
//file 的onchange事件
  const loadFile = function (event) {
    const reader = new FileReader();
    reader.onload = async function () {
      let compressedDataURL = await compress(
        reader.result,
        90,
        "image/jpeg"
      );
      let compressedImageBlob = dataUrlToBlob(compressedDataURL);
      uploadFile("https://httpbin.org/post", compressedImageBlob);
    };
    reader.readAsDataURL(event.target.files[0]);
  };