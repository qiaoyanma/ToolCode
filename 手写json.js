var jsonStr ='{ "age": 20, "name": "jack" }';

var json =(new Function('return '+jsonStr))();

function JsonParse(jsonStr){
    return (new Function("return "+jsonStr))();

}
JsonParse(jsonStr)