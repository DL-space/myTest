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
var htmlBeautify = require("gulp-html-beautify");
var changed = require("gulp-changed");


//相关路径常量
var basePath = "./src";  //源文件目录
var developPath = "./develop";  //开发目录
var releasePath = "./dist";  //资源发布目录

//文件路径配置
var paths = {
    js: [
        "./src/js/**/*.js"
    ],
    commonJs: [
        "./src/js/j-ui.js"
    ],
    appCommentJS: [
        basePath + "/js/app/app-comment.js"
    ],
    appJs: [
        basePath + "/js/app/*.js",
        "!" + basePath + "/js/app/css.js"
    ],
    appCommonJs: [
        basePath + "/js/app/css.js"
    ],
    componentJs: [
        basePath + "/js/component/component.js"
    ],
    homeJs: [
        "./src/js/index.js"
    ],
    houseListJs: [
        "./src/js/list.js"
    ],
    askJs: [
        "./src/js/ask.js"
    ],
    houseDetailJs: [
        "./src/js/house-detail.js"
    ],
    newsJs: [
        "./src/js/news.js"
    ],
    checkPriceJs: [
        "./src/js/check-price.js"
    ],
    consultantJs: [
        "./src/js/consultant.js"
    ],
    jd2017Js: [
        "./src/js/jd-2017.js"
    ],
    photoAlbumJs: [
        "./src/js/photo-album.js"
    ],
    courseDetailJs: [
        "./src/js/course-detail.js"
    ],
    informationFlowJs: [
        "./src/js/information-flow.js"
    ],
    helpFind: [
        "./src/js/help-find.js"
    ],
    commonCss: [
        "./src/css/reset.css",
        "./src/app/icon/css/icon.css",
        "./src/app/button/css/button.css",
        "./src/app/topbar/css/topbar_blue.css",
        "./src/app/header/css/header.css",
        "./src/app/dialog/css/dialog.css",
        "./src/app/footer-layer/css/footer-layer.css",
        "./src/css/module.css"
    ],
    homeCss: [
        "./src/css/index.css"
    ],
    searchCss: [
        "./src/css/search.css"
    ],
    userCss: [
        "./src/css/user.css"
    ],
    zizhiCss: [
        "./src/css/zizhiceshi.css"
    ],
    photoAlbumCss: [
        "./src/css/photo-album.css"
    ],
    checkPriceCss: [
        "./src/css/check-price.css"
    ],
    houseListCss: [
        "./src/css/house-list.css"
    ],
    informationFlowCss: [
        "./src/css/app/app-information-flow.css"
    ],
    houseDetailCss: [
        "./src/css/house-detail.css"
    ],
    newsCss: [
        "./src/css/news.css"
    ],
    appDownloadCss: [
        "./src/css/reset.css",
        "./src/css/app-download.css"
    ],
    consultantCss: [
        "./src/css/consultant.css"
    ],
    helpFindCss: [
        "./src/css/help-find.css"
    ],
    helpFindCss2: [
        "./src/css/help-find2.css"
    ],
    siteMapCss: [
        "./src/css/sitemap.css"
    ],
    courseDetailCss: [
        "./src/css/course-detail.css"
    ],
    feedbackCss: [
        "./src/css/feedback.css"
    ],
    dropFloorCss: [
        "./src/css/drop-floor.css"
    ],
    letterCss: [
        "./src/css/letter.css"
    ],
    askCss: [
        "./src/css/ask.css"
    ],
    appCommonCss: [
        basePath + "/css/reset.css",
        basePath + "/app/button/css/button.css",
        basePath + "/css/app/app-common.css",
        basePath + "/css/app/css.css"
    ],
    appCommentCss: [
        basePath + "/app/nav-app/css/nav-tab.css",
        basePath + "/css/app/app-comment.css"
    ],
    statementCss: [
        "./src/css/app/statement.css"
    ],
    processCss: [
        "./src/css/app/process.css"
    ],
    canonCss: [
        "./src/css/app/canon.css"
    ],
    jd2017Css: [
        "./src/css/jd-2017.css"
    ],
    appInformationFlowCss: [
        basePath + "/css/app/app-information-flow.css"
    ],
    componentCss: [
        "./src/css/component/component.css"
    ],
    weixinCss: [
        "./src/css/weixin/weixin.css"
    ],
    pageImage: [
        basePath + "/images/**/*.{png,gif,jpg}"
    ],
    moduleImage: [
        basePath + "/app/*/images/*.{png,gif,jpg}"
    ],
    html: [
        basePath + "/**/*.html",
        "!" + basePath + "/app/**/*.html"
    ]
};

var knownOptions = {
    string: "env",
    default: {env: process.env.NODE_ENV || "release"}
};
var options = minimist(process.argv.slice(2), knownOptions);

// photo-album.css
gulp.task("photoAlbumCss", function () {
    gulp.src(paths.photoAlbumCss)
        .pipe(concat("photo-album.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//sitemap.css
gulp.task("siteMapCss", function () {
    gulp.src(paths.siteMapCss)
        .pipe(concat("sitemap.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});

//查房价
gulp.task("checkPriceCss", function () {
    gulp.src(paths.checkPriceCss)
        .pipe(concat("check-price.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});
//module.css
gulp.task("commonCss", function () {
    gulp.src(paths.commonCss)
        .pipe(concat("module-new.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//appInformationFlowCss
gulp.task("appInformationFlowCss", function () {
    gulp.src(paths.appInformationFlowCss)
        .pipe(concat("app-information-flow.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/app"))
});

//首页css
gulp.task("homeCss", function () {
    gulp.src(paths.homeCss)
        .pipe(concat("index.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//搜索页css
gulp.task("searchCss", function () {
    gulp.src(paths.searchCss)
        .pipe(concat("search.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});

//个人中心页css
gulp.task("userCss", function () {
    gulp.src(paths.userCss)
        .pipe(concat("user.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});

//微信css
gulp.task("weixinCss", function () {
    gulp.src(paths.weixinCss)
        .pipe(concat("weixin.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/weixin"))
});

//京东2017css
gulp.task("jd2017Css", function () {
    gulp.src(paths.jd2017Css)
        .pipe(concat("jd-2017.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//资质测试css
gulp.task("zizhiCss", function () {
    gulp.src(paths.zizhiCss)
        .pipe(concat("zizhiceshi.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//楼盘列表页css
gulp.task("houseListCss", function () {
    gulp.src(paths.houseListCss)
        .pipe(concat("house-list.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//楼盘详情页css
gulp.task("houseDetailCss", function () {
    gulp.src(paths.houseDetailCss)
        .pipe(concat("house-detail.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//资讯页css
gulp.task("newsCss", function () {
    gulp.src(paths.newsCss)
        .pipe(concat("news.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//信息流css
gulp.task("informationFlowCss", function () {
    gulp.src(paths.informationFlowCss)
        .pipe(concat("information-flow.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//服务声明css
gulp.task("statementCss", function () {
    gulp.src(paths.statementCss)
        .pipe(concat("statement.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css/app")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css/app")))
});

//购房流程css
gulp.task("processCss", function () {
    gulp.src(paths.processCss)
        .pipe(concat("process.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css/app")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css/app")))
});

//承接页
gulp.task("appDownloadCss", function () {
    gulp.src(paths.appDownloadCss)
        .pipe(concat("app-download.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//爬虫频繁抓取验证提示页
gulp.task("feedbackCss", function () {
    gulp.src(paths.feedbackCss)
        .pipe(concat("feedback.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});
//落地页样式文件
gulp.task("dropFloorCss", function () {
    gulp.src(paths.dropFloorCss)
        .pipe(concat("drop-floor.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
});

//帮你找房
gulp.task("helpFindCss", function () {
    gulp.src(paths.helpFindCss)
        .pipe(concat("help-find.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
});
//帮你找房 6.20
gulp.task("helpFindCss2", function () {
    gulp.src(paths.helpFindCss2)
        .pipe(concat("help-find2.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
});
//网站地图
gulp.task("courseDetailCss", function () {
    gulp.src(paths.courseDetailCss)
        .pipe(concat("course-detail.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
});

//组件css
gulp.task("componentCss", function () {
    gulp.src(paths.componentCss)
        .pipe(concat("component.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css/component")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css/component")))
});

/**
 * 咨询师页
 * consultant.css
 * 适用页面：consultant-list.html consultant-detail.html
 */
gulp.task("consultantCss", function () {
    gulp.src(paths.consultantCss)
        .pipe(concat("consultant.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
});

/**
 * 致侃粉页
 * letter.css
 * 适用页面：letter.html
 */
gulp.task("letterCss", function () {
    gulp.src(paths.letterCss)
        .pipe(concat("letter.css"))
        .pipe(gulpif(options.env === "release", cleancss()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/css")))
});

/**
 * 问答
 * ask.css
 * 适用范围  问答相关页面
 */
gulp.task("askCss", function () {
    gulp.src(paths.askCss)
        .pipe(concat("ask.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});

/**
 * APP 通用样式
 * app-common.css
 * 适用页面：user-reviews.html
 * 输出路径为 css/app
 */
gulp.task("appCommonCss", function () {
    gulp.src(paths.appCommonCss)
        .pipe(concat("app-common.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/app"))
});

/**
 * APP 个人中心页，我的赞、我的评论
 * app-common.css
 * 适用页面：user-reviews.html
 * 输出路径为 css/app
 */
gulp.task("appCommentCss", function () {
    gulp.src(paths.appCommentCss)
        .pipe(concat("app-comment.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/app"))
});

/**
 * APP 买房宝典
 * canon.css
 * 适用页面：canon.html
 * 输出路径为 css/app
 */
gulp.task("canonCss", function () {
    gulp.src(paths.canonCss)
        .pipe(concat("canon.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/app"))
});

//模块图片压缩、迁移
gulp.task("moduleImageCompress", function () {
    gulp.src(paths.moduleImage)
        .pipe(flatten())
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(releasePath + "/images"))
});

//页面图片压缩、迁移
gulp.task("pageImageCompress", function () {
    gulp.src(paths.pageImage)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(releasePath + "/images"))
});


//解析html
gulp.task("html", function () {
    gulp.src(paths.html)
        .pipe(fileinclude({
            prefix: "@@",
            basePath: "@file"
        }))
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: " ",
            extra_liners: []
        }))
        .pipe(gulp.dest(releasePath + "/"))
});

// app内h5页面 appCommonJs
gulp.task("appCommonJs", function () {
    gulp.src(paths.appCommonJs)
        .pipe(rename("app-common.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js/app"))
});
// app内h5页面 appCommentJS
gulp.task("appCommentJS", function () {
    gulp.src(paths.appCommentJS)
        .pipe(rename("app-comment.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js/app"))
});

// app内h5页面 Js
gulp.task("appJs", function () {
    gulp.src(paths.appJs)
        .pipe(changed(releasePath + "/js/app"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js/app"))
});

// 组件js
gulp.task("componentJs", function () {
    gulp.src(paths.componentJs)
        .pipe(rename("component.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js/component"))
});

// commonjs
gulp.task("commonJs", function () {
    gulp.src(paths.commonJs)
        .pipe(concat("j-ui.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

// 楼盘图册页js
gulp.task("photoAlbumJs", function () {
    gulp.src(paths.photoAlbumJs)
        .pipe(rename("photo-album.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

// 京东活动2017 js
gulp.task("jd2017Js", function () {
    gulp.src(paths.jd2017Js)
        .pipe(rename("jd-2017.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

// 案例分析js
gulp.task("courseDetailJs", function () {
    gulp.src(paths.courseDetailJs)
        .pipe(rename("course-detail.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});
// 查房价js
gulp.task("checkPriceJs", function () {
    gulp.src(paths.checkPriceJs)
        .pipe(rename("check-price.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});
// 案例分析js
gulp.task("informationFlowJs", function () {
    gulp.src(paths.informationFlowJs)
        .pipe(rename("information-flow.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});
// 帮你找房页
gulp.task("helpFind", function () {
    gulp.src(paths.helpFind)
        .pipe(rename("help-find.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});
//首页js
gulp.task("homeJs", function () {
    gulp.src(paths.homeJs)
        .pipe(rename("index.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

//楼盘列表页js
gulp.task("houseListJs", function () {
    gulp.src(paths.houseListJs)
        .pipe(rename("list-new.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

//问答相关页面js
gulp.task("askJs", function () {
    gulp.src(paths.askJs)
        .pipe(rename("ask.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js"))
});

//楼盘详情页js
gulp.task("houseDetailJs", function () {
    gulp.src(paths.houseDetailJs)
        .pipe(rename("house-detail.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

//楼盘详情页js
gulp.task("newsJs", function () {
    gulp.src(paths.newsJs)
        .pipe(rename("news.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});


/**
 * 咨询师页
 * consultant.js
 * 适用页面： consultant-list.html  consultant-detail.html
 */
gulp.task("consultantJs", function () {
    gulp.src(paths.consultantJs)
        .pipe(rename("consultant.js"))
        .pipe(gulpif(options.env === "release", uglify()))
        .pipe(gulpif(options.env === "release", gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev", gulp.dest(developPath + "/js")))
});

//默认任务
// gulp.task("default",["commonCss","homeCss","houseListCss","houseDetailCss"],function(){
//
// });

gulp.task("default", ["html", "houseListCss", "homeCss"], function () {

});

gulp.task("img", ["moduleImageCompress", "pageImageCompress"], function () {
    console.log("over");
});


gulp.task("kf", function () {
    gulp.src();
});