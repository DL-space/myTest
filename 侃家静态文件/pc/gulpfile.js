var gulp = require("gulp");
var cleancss = require("gulp-clean-css");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var fileinclude = require("gulp-file-include");
var flatten = require("gulp-flatten");
var gulpif = require("gulp-if");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var useref = require("gulp-useref");
var minimist = require("minimist");
var uglify = require("gulp-uglify");
var htmlBeautify = require("gulp-html-beautify");
var changed = require("gulp-changed");

//配置相关路径
var basePath = "./src";   //源码目录
var developPath = "./develop";  //开发目录
var releasePath = "./dist";  //部署、发布目录

// 任务处理的文件路径配置
var paths = {
    js: [
        "src/app/module/js/module.js",
        "src/app/module/js/tab.js",
        "src/app/module/js/show-hide.js",
        "src/app/header/js/header.js",
        "src/app/sidebar/js/sidebar.js",
        "src/app/app-download/js/app-download.js",
        "src/app/sus-bottom/js/sus-bottom.js",
    ],
    css: [
        "src/lib/reset/reset.css",
        "src/app/header/css/header.css",
        "src/app/footer/css/footer.css",
        "src/app/btn/css/btns.css",
        "src/app/icon/css/icon.css",
        "src/lib/mCustomScrollbar/css/jquery.mCustomScrollbar.css",
        "src/app/module/css/module.css",
        "src/app/crumbs/css/crumb.css",
        "src/app/search/css/search.css",
        "src/app/sidebar/css/sidebar.css",
        "src/app/dialog/css/dialog.css",
        "src/app/login/css/login.css",
        "src/app/advice-free/css/advice-free.css",
        "src/app/detail-top/css/detail-top.css",
        "src/app/app-download/css/app-download.css",
        "src/css/house-detail-module.css",
        "src/css/information-layer.css",
        "src/app/sus-bottom/css/sus-bottom.css"
    ],
    moduleImages: [
        "src/app/*/images/*.{jpg,png,gif}"
    ],
    pageImages:[
        "src/images/**/*.{png,jpg,gif}"
    ],
    html: [
        basePath + "/**/*.html",
        "!" + basePath + "/app/**/*.html",
        "!" + basePath + "/lib/**/*.html"
    ],
    detail:[  //楼盘详情页首页样式表文件
        "src/app/page/css/page.css",
        "src/css/albums-detail.css",
        "src/css/albums-detail2.css",
        "src/css/house-detail.css"
    ],
    userCss:[
        basePath + "/css/user.css"
    ],
    houseDetailBaseCss:[  //楼盘详情页楼盘基础信息页样式表文件
        "src/css/house-detail-base.css"
    ],
    houseDetailAroundCss:[  //楼盘详情页周边分析页样式表文件
        "src/css/around.css"
    ],
    siteCss:[  //楼盘详情页周边分析页样式表文件
        "src/css/site.css"
    ],
    houseTagCss:[  //楼盘详情页周边分析页样式表文件
        "src/css/tag.css"
    ],
    houseDetailDynamicCss:[ //楼盘详情楼盘动态页样式表文件
        "src/css/house-detail-dynamic.css"
    ],
    houseDetailPriceCss:[ //楼盘详情房价走势页样式表文件
        "src/css/price.css"
    ],
    lookHouseCss:[ //我要看房页样式表文件
        "src/app/line-banner/css/line-banner.css",
        "src/css/look-house.css"
    ],
    houseTypeListCss:[ //户型分析列表页样式表文件
        "src/css/analysis-list.css"
    ],
    houseTypeDetailCss:[ //户型分析详情页样式表文件
        "src/css/house-type-detail.css"
    ],
    albumsCss:[ //图册页样式表文件
        "src/css/albums-slide.css",
        "src/css/atlas.css"
    ],
    houseListCss:[ //楼盘列表页样式表
        "src/css/house-list.css",
        "src/app/page/css/page.css"
    ],
    checkPriceCss:[ //查房价页样式表
        "src/css/check-price.css"
    ],
    knowledgeCss:[ //买房知识样式表
        "src/css/knowledge.css"
    ],
    appDownloadCss:[ //app下载承接页
        "src/css/app-download.css"
    ],
    feedbackCss:[ //爬虫频繁抓取验证提示页
        "src/css/feedback.css"
    ],
    tweetPictrueCss:[ //花雨汀专题页
        "src/css/tweet-pictures.css"
    ],
    letterCss:[
        "src/css/letter.css"
    ],
    wdCss:[ //问答
        "src/css/wd.css"
    ],
    dualCss:[ // 京东活动页面
        "src/css/dual.css"
    ],

    houseDtailJs:[ //楼盘详情页所有页面都在用的js
        "src/app/detail-top/js/detail-top.js",
        "src/js/albums-detail.js",
        "src/js/house-detail.js"
    ],
    houseDtailAroundJs:[ //楼盘详情周边分析页js
        "src/app/detail-top/js/detail-top.js",
        "src/js/house-around.js"
    ],
    houseDetailPriceJs:[ //楼盘详情房价走势页js
        "src/app/detail-top/js/detail-top.js"
    ],
    lookHouseJs:[ //楼盘详情房价走势页js
        "src/app/detail-top/js/detail-top.js",
        "src/app/line-banner/js/linebanner-jianbian.js"
    ],
    houseTypeDetailJs:[ //户型分析详情页js
        "src/app/detail-top/js/detail-top.js",
        "src/js/house-type-detail.js"
    ],
    popupJs:[ //弹出层js
        "src/js/popup.js"
    ],
    albumsListJs:[ //图册列表页js
        "src/app/detail-top/js/detail-top.js",
        "src/js/albums.js"
    ],
    albumsDetailJs:[ //图册详情页js
        "src/app/detail-top/js/detail-top.js",
        "src/js/albums-slide.js"
    ],
    houseListJs:[ //楼盘列表页js
        "src/app/module/js/show-hide.js",
        "src/js/house-list.js"
    ],
    checkPriceJs:[ //查房价页js
        "src/js/check-price.js"
    ],
    layerNewsJs:[ //查房价页js
        "src/js/layer_news.js"
    ],
    wdJs:[ //问答js
        "src/js/wd.js"
    ],
    dualJs:[ //问答js
        "src/js/dual.js"
    ],
    albumsDetail2Js:[
        "src/js/albums-detail2.js"
    ],
    Comphtml : [
        "src/component/*.html"
    ],
    ComponentCss : [
        "src/css/component/component.css"
    ],
    ComponentJs:[
        "src/js/component/component.js"
    ],
    cityListCss : [
        "src/css/city-list.css"
    ]
};


var knownOptions = {
    string:"env",
    default:{env:process.env.NODE_ENV || "release"}
};
var options = minimist(process.argv.slice(2),knownOptions);


gulp.task("albumsDetail2Js",function(){
    gulp.src(paths.albumsDetail2Js)
        .pipe(concat("albums-detail2.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js"))
});
/**
 * 生成全站公共文件
 * 文件名臣:common.css
 */
gulp.task("commonCss",function(){
    gulp.src(paths.css)
        .pipe(concat("common.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情页首页
 * name: house-detail.css
 * 使用页面：detail.html
 */
gulp.task("houseDetailCss",function(){
    gulp.src(paths.detail)
        .pipe(concat("house-detail.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 个人信息
 * name: user.css
 * 使用页面：user-info.html
 */
gulp.task("userCss",function(){
    gulp.src(paths.userCss)
        .pipe(concat("user.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});

/**
 * 花雨汀专题页
 * name: tweet-pictures.css
 * 使用页面：tweet-pictures.html
 */
gulp.task("hytCss",function(){
    gulp.src(paths.tweetPictrueCss)
        .pipe(concat("tweet-pictures.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 问答
 * name: wd.css
 * 使用页面：
 */
gulp.task("wdCss",function(){
    gulp.src(paths.wdCss)
        .pipe(concat("wd.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});


/**
 * 京东活动页面
 * name: dual.css
 * 使用页面：index-dual11.html
 */
gulp.task("dualCss",function(){
    gulp.src(paths.dualCss)
        .pipe(concat("dual.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情页基本信息页
 * name: house-detail-base.css
 * 使用页面：base.html
 */
gulp.task("houseDetailBaseCss",function(){
    gulp.src(paths.houseDetailBaseCss)
        .pipe(concat("house-detail-base.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情周边分析页
 * name:around.css
 * 使用页面：around.html
 */
gulp.task("houseDetailAroundCss",function(){
    gulp.src(paths.houseDetailAroundCss)
        .pipe(concat("around.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情周边分析页
 * name:site.css
 */
gulp.task("siteCss",function(){
    gulp.src(paths.siteCss)
        .pipe(concat("site.css"))
        .pipe(cleancss())
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
});

/**
 * 楼盘详情标签页
 * name:tag.css
 * 使用页面：around.html
 */
gulp.task("houseTagCss",function(){
    gulp.src(paths.houseTagCss)
        .pipe(concat("tag.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 买房知识页
 * name:knowledge.css
 * 使用页面：info.html
 */
gulp.task("knowledgeCss",function(){
    gulp.src(paths.knowledgeCss)
        .pipe(concat("knowledge.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情楼盘动态页
 * name: house-detail-dynamic.css
 * 使用页面：house-dynamic.html
 */
gulp.task("houseDetailDynamicCss",function(){
    gulp.src(paths.houseDetailDynamicCss)
        .pipe(concat("house-detail-dynamic.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘详情房价走势页
 * name: price.css
 * 使用页面：price.html
 */
gulp.task("houseDetailPriceCss",function(){
    gulp.src(paths.houseDetailPriceCss)
        .pipe(concat("price.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 我要看房页
 * name: look-house.css
 * 使用页面：look-house.html
 */
gulp.task("lookHouseCss",function(){
    gulp.src(paths.lookHouseCss)
        .pipe(concat("look-house.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 户型分析列表页
 * name: analysis-list.css
 * 使用页面：house-type.html、house-type-detail.html
 */
gulp.task("houseTypeListCss",function(){
    gulp.src(paths.houseTypeListCss)
        .pipe(concat("analysis-list.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 户型分析详情页
 * name: house-type-detail.css
 * 使用页面：house-type-detail.html
 */
gulp.task("houseTypeDetailCss",function(){
    gulp.src(paths.houseTypeDetailCss)
        .pipe(concat("house-type-detail.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});


/**
 * 相册页样式文件：列表页和详情页
 * name: atlas.css
 * 使用页面：albums.html、albums-detail.html
 */
gulp.task("albumsCss",function(){
    gulp.src(paths.albumsCss)
        .pipe(concat("atlas.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 楼盘列表页样式文件
 * name: house-list.css
 * 使用页面：list.html
 */
gulp.task("houseListCss",function(){
    gulp.src(paths.houseListCss)
        .pipe(concat("house-list.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 改版查房价页面样式文件
 * name: check-price.css
 * 使用页面：check-price.html
 */
gulp.task("checkPriceCss",function(){
    gulp.src(paths.checkPriceCss)
        .pipe(concat("check-price.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * app下载承接页页面样式文件
 * name: app-download.css
 * 使用页面：app-download.html
 */
gulp.task("appDownloadCss",function(){
    gulp.src(paths.appDownloadCss)
        .pipe(concat("app-download.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});


/**
 * 爬虫频繁抓取验证提示页样式文件
 * name: feedback.css
 * 使用页面：feedback.html
 */
gulp.task("feedbackCss",function(){
    gulp.src(paths.feedbackCss)
        .pipe(concat("feedback.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 致侃粉页样式文件
 * name: letter.css
 * 使用页面：letter.html
 */
gulp.task("letterCss",function(){
    gulp.src(paths.letterCss)
        .pipe(concat("letter.css"))
        .pipe(gulpif(options.env === "release",cleancss()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/css")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/css")))
});

/**
 * 生成公用js文件
 * 文件名称：common.js
 */
gulp.task("commonJs",function(){
    gulp.src(paths.js)
    // .pipe(flatten())
        .pipe(concat("common.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 生成楼盘详情页首页js
 * name：house-detail.js
 * 使用页面：detail.html、base.html、house-dynamic.html、house-type.html
 */
gulp.task("houseDetailJs",function(){
    gulp.src(paths.houseDtailJs)
        .pipe(concat("house-detail.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 楼盘详情周边分析页js生成文件
 * name：house-around.js
 * 使用页面：around.html
 */
gulp.task("houseDetailAroundJs",function(){
    gulp.src(paths.houseDtailAroundJs)
        .pipe(concat("house-around.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 问答
 * name：wd.js
 * 使用页面：
 */
gulp.task("wdJs",function(){
    gulp.src(paths.wdJs)
        .pipe(concat("wd.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * dual
 * name：dual.js
 * 使用页面：
 */
gulp.task("dualJs",function(){
    gulp.src(paths.dualJs)
        .pipe(concat("dual.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 楼盘详情房价走势页js生成文件
 * name：price.js
 * 使用页面：around.html
 */
gulp.task("houseDetailPriceJs",function(){
    gulp.src(paths.houseDetailPriceJs)
        .pipe(concat("price.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 我要看房页js生成文件
 * name：look-house.js
 * 使用页面：look-house.html
 */
gulp.task("lookHouseJs",function(){
    gulp.src(paths.lookHouseJs)
        .pipe(concat("look-house.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 户型分析详情页js生成文件
 * name：house-type-detail.js
 * 使用页面：house-type-detail.html
 */
gulp.task("houseTypeDetailJs",function(){
    gulp.src(paths.houseTypeDetailJs)
        .pipe(concat("house-type-detail.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});
/**
 * 户型分析详情页js生成文件
 * name：house-type-detail.js
 * 使用页面：house-type-detail.html
 */
gulp.task("popupJs",function(){
    gulp.src(paths.popupJs)
        .pipe(concat("popup.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 图册列表页js生成文件
 * name：house-detail-albums.js
 * 使用页面：albums.html
 */
gulp.task("albumsListJs",function(){
    gulp.src(paths.albumsListJs)
        .pipe(concat("house-detail-albums.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 图册详情页js生成文件
 * name：albums-slide.js
 * 使用页面：albums-detail.html
 */
gulp.task("albumsDetailJs",function(){
    gulp.src(paths.albumsDetailJs)
        .pipe(concat("albums-slide.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});


/**
 * 楼盘列表页js生成文件
 * name：house-list.js
 * 使用页面：list.html,region-analysis.html
 */
gulp.task("houseListJs",function(){
    gulp.src(paths.houseListJs)
        .pipe(concat("house-list.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});
/**
 * 楼盘列表页js生成文件
 * name：check-price.js
 * 使用页面：list.html,region-analysis.html
 */
gulp.task("checkPriceJs",function(){
    gulp.src(paths.checkPriceJs)
        .pipe(concat("check-price.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});

/**
 * 楼盘列表页js生成文件
 * name：layer_news.js
 * 使用页面：list.html,region-analysis.html
 */
gulp.task("layerNewsJs",function(){
    gulp.src(paths.layerNewsJs)
        .pipe(concat("layer_news.js"))
        .pipe(gulpif(options.env === "release",uglify()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/js")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/js")))
});


//解析html
gulp.task("html",function(){
    gulp.src(paths.html)
        //.pipe(changed(releasePath + "/"))
        .pipe(fileinclude({
            prefix:"@@",
            basePath:"@file"
        }))
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: " ",
            //unformatted: true,
            extra_liners:[]
        }))
        .pipe(gulp.dest(releasePath + "/"))
});

/**
 * 模块图片压缩迁移
 * 模块app内图片迁移
 */
gulp.task("moduleImageCompress",function(){
    return gulp.src(paths.moduleImages)
        .pipe(flatten())
        .pipe(cache(imagemin()))
        .pipe(gulpif(options.env === "release",gulp.dest(releasePath + "/images")))
        .pipe(gulpif(options.env === "dev",gulp.dest(developPath + "/images")))
});

//页面图片压缩迁移
gulp.task("pageImageCompress",function(){
    gulp.src(paths.pageImages)
    // .pipe(flatten()) 因src/images下的图片，需要将图片的目录带过来，所以不需要flatten()
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(releasePath + "/images"))
});


/**
 * 命令行执行任务的时候，需传递参数确认执行环境
 * gulp --env release  发布环境
 * gulp --env dev  开发环境
 * 默认执行的是release，发布环境
 */
gulp.task("default",["allCssCompress","allJsCompress","allImageCompress","html"],function(){
     // gulp.run();
});

/**
 * commonCss  生成common.css
 * commonJsConcat 打包common.js
 * allJsCompress 打包所有的js资源
 * html 打包html资源
 * allImageCompress 重新打包所有的图片资源
 * moduleImageCompress 打包app组件的图片资源
 * pageImageCompress 打包src/images目录下的所有图片资源
 */

/**
 * 组件样式打包任务
 */
gulp.task("componentCss",function(){
    gulp.src(paths.ComponentCss)
        .pipe(concat("component.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css/component"))
});
/**
 * 组件js 打包任务
 */
gulp.task("componentJs",function(){
    gulp.src(paths.ComponentJs)
        .pipe(concat("component.js"))
        .pipe(uglify())
        .pipe(gulp.dest(releasePath + "/js/component"))
});

gulp.task("cityListCss",function(){
    gulp.src(paths.cityListCss)
        .pipe(concat("city-list.css"))
        .pipe(cleancss())
        .pipe(gulp.dest(releasePath + "/css"))
});