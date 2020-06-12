function Jiecheng(number, result = 1) {
    if (number === 1) {
        return result;
    }
    return Jiecheng(number - 1, number * result);
}

console.log(Jiecheng(100));