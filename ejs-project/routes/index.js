/**
 * Created by DL on 2017/3/27.
 */
var items = [{title:"文章1"},{title:"文章2"}];
exports.index = function (req,res) {
    res.render("index",{title:"文章列表",item:items});
};
exports.form = function (req,res) {
    res.render("form",{title:"发表文章",message:"请发表一个文章"})
};
exports.create = function (req,res) {
    res.redirect("/");
};
