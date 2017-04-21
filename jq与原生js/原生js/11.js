/**
 * Created by DL on 2017/4/11.
 */
String.prototype.render = function (obj) {
    console.log(obj);
    with(obj) {
        console.log(this);
        return eval("`"+this+"`");
    }
};
var greeting = "My name is ${name}, age ${age}, I am a ${job.jobLevel} ${job.jobName}";
var employee = { //对象
    name: 'XiaoMing',
    age: 11,
    job: {
        jobName: 'designer',
        jobLevel: 'senior'
    }
};
var result = greeting.render(employee);
console.log(result);