var a = function (c){
    this.b = c;
    this.d =function(){
        console.log(this.b);
    }
};
a.prototype = {
    say:function () {
        console.log("prototype:say");
    }
};//
var obj = new a('test');
console.log(typeof obj.prototype);
console.log(typeof a.prototype);
console.log(obj.constructor);