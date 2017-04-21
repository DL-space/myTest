var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var cleancss = require("gulp-clean-css");
var fileinclude = require("gulp-file-include");
var rename = require("gulp-rename");
var gulpif = require("gulp-if");
var minimist = require("minimist");
var flatten = require("gulp-flatten");
var uglify = require("gulp-uglify");
var cache = require("gulp-cache");


//相关路径常量
var basePath = "./src";  //源文件目录
var developPath = "./develop";  //开发目录
var releasePath = "./dist";  //资源发布目录

//文件路径配置
var paths = {
    js: [
      "./src/js/**/*.js"
    ],
    homeJs:[
      "./src/js/index.js"
    ],
    houseListJs:[
        "./src/js/list.js"
    ],
    houseDetailJs:[
        "./src/js/house-detail.js"
    ],
    newsJs:[
        "./src/js/news.js"
    ],
    photoAlbumJs:[
        "./src/js/photo-album.js"
    ],
    courseDetailJs:[
        "./src/js/course-detail.js"
    ],
    informationFlowJs:[
        "./src/js/information-flow.js"
    ],
    commonCss: [
        "./src/css/reset.css",
        "./src/app/icon/css/icon.css",
        "./src/app/topbar/css/topbar.css",
        "./src/app/header/css/header.css",
        "./src/app/footer-layer/css/footer-layer.css",
        "./src/css/module.css"
    ],
    homeCss:[
        "./src/css/index.css"
    ],
    zizhiCss:[
        "./src/css/zizhiceshi.css"
    ],
    photoAlbumCss:[
        "./src/css/photo-album.css"
    ],
    houseListCss:[
        "./src/css/house-list.css"
    ],
    informationFlowCss:[
        "./src/css/information-flow.css"
    ],
    houseDetailCss:[
        "./src/css/house-detail.css"
    ],
    checkPriceCss:[
        "./src/css/check-price.css"
    ],
    newsCss:[
        "./src/css/news.css"
    ],
    appDownloadCss:[
        "./src/css/reset.css",
        "./src/css/app-download.css"
    ],
    moduleImage:[
        "./src/app/*/images/*.{png,gif,jpg}"
    ],
    helpFindCss:[
      "./src/css/help-find.css"
    ],
    siteMapCss:[
        "./src/css/sitemap.css"
    ],
    courseDetailCss:[
        "./src/css/course-detail.css"
    ],
    pageImage:[
        "./src/images/**/*.{png,gif,jpg}"
    ],
    html:[
        //"./src/news.html",
        //"./src/news-detail.html"
        "./src/check-price.html"
        //"./src/comment-list.html"
        //"./src/list.html",
        //"./src/index.html",
        //"./src/information-flow.html"
    ]
};

var knownOptions = {
    string:"env",
    default:{env:process.env.NODE_ENV || "release"}
};
var options = minimist(process.argv.slice(2),knownOptions);

// photo-album.css
gulp.task("photoAlbumCss",function () {
    gulp.src(paths.photoAlbumCss)
        .pipe(concat("photo-album.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});
//module.css
gulp.task("commonCss",function () {
    gulp.src(paths.commonCss)
        .pipe(concat("module-new.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//首页css
gulp.task("homeCss",function(){
    gulp.src(paths.homeCss)
        .pipe(concat("index.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//资质测试css
gulp.task("zizhiCss",function(){
    gulp.src(paths.zizhiCss)
        .pipe(concat("zizhiceshi.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//楼盘列表页css
gulp.task("houseListCss",function(){
    gulp.src(paths.houseListCss)
        .pipe(concat("house-list.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//楼盘详情页css
gulp.task("houseDetailCss",function(){
    gulp.src(paths.houseDetailCss)
        .pipe(concat("house-detail.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//资讯页css
gulp.task("newsCss",function(){
    gulp.src(paths.newsCss)
        .pipe(concat("news.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//信息流css
gulp.task("informationFlowCss",function(){
    gulp.src(paths.informationFlowCss)
        .pipe(concat("information-flow.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//承接页
gulp.task("appDownloadCss",function(){
    gulp.src(paths.appDownloadCss)
        .pipe(concat("app-download.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
});

//帮你找房
gulp.task("helpFindCss",function () {
    gulp.src(paths.helpFindCss)
        .pipe(concat("help-find.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
});

//查房价
gulp.task("checkPriceCss",function () {
    gulp.src(paths.checkPriceCss)
        .pipe(concat("check-price.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
});

//案例分析
gulp.task("helpFindCss",function () {
    gulp.src(paths.helpFindCss)
        .pipe(concat("help-find.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
});
//网站地图
gulp.task("courseDetailCss",function () {
    gulp.src(paths.courseDetailCss)
        .pipe(concat("course-detail.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/css")))
});
//模块图片压缩、迁移
gulp.task("moduleImageCompress",function(){
    gulp.src(paths.moduleImage)
        .pipe(flatten())
        .pipe(cache(imagemin()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/images")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/images")))
});

//页面图片压缩、迁移
gulp.task("pageImageCompress",function () {
    gulp.src(paths.pageImage)
        .pipe(cache(imagemin()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/images")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/images")))
});


//解析html
gulp.task("html",function(){
    gulp.src(paths.html)
        .pipe(fileinclude({
            prefix:"@@",
            basePath:"@file"
        }))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/")))
});

gulp.task("jsMove",function(){
    gulp.src(paths.js)
        // .pipe(flatten())
        .pipe(gulp.dest(releasePath+"/js"))
});
// 楼盘图册页js
gulp.task("photoAlbumJs",function(){
    gulp.src(paths.photoAlbumJs)
        .pipe(rename("photo-album.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});
// 案例分析js
gulp.task("courseDetailJs",function(){
    gulp.src(paths.courseDetailJs)
        .pipe(rename("course-detail.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});
// 案例分析js
gulp.task("informationFlowJs",function(){
    gulp.src(paths.informationFlowJs)
        .pipe(rename("information-flow.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});
//首页js
gulp.task("homeJs",function(){
    gulp.src(paths.homeJs)
        .pipe(rename("index-new.js"))
        // .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});

//楼盘列表页js
gulp.task("houseListJs",function(){
    gulp.src(paths.houseListJs)
        .pipe(rename("list-new.js"))
        // .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});

//楼盘详情页js
gulp.task("houseDetailJs",function(){
    gulp.src(paths.houseDetailJs)
        .pipe(rename("house-detail.js"))
        // .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});

//楼盘详情页js
gulp.task("newsJs",function(){
    gulp.src(paths.newsJs)
        .pipe(rename("news.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath+"/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath+"/js")))
});

//默认任务
// gulp.task("default",["commonCss","homeCss","houseListCss","houseDetailCss"],function(){
//
// });

gulp.task("default",["html", "houseListCss", "homeCss"],function(){

});

gulp.task("img",["moduleImageCompress","pageImageCompress"],function(){
    console.log("over");
});


gulp.task("kf",function(){
    gulp.src();
});