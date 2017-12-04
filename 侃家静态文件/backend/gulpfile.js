var gulp = require("gulp");
var cache = require("gulp-cache");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var fileinclude = require("gulp-file-include");
var flatten = require("gulp-flatten");
var htmlBeautify = require("gulp-html-beautify");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var minimist = require("minimist");
var cleanCss = require("gulp-clean-css");
var changed = require("gulp-changed");


//配置相关lujing
var baseUrl = "./src";  //源码路径
var releasePath = "./dist";  //源码发布目录
var developPath = "./developer";

var knownOptions = {
    string:"env",
    default:{env:process.env.NODE_ENV || "release"}
};
var options = minimist(process.argv.slice(2),knownOptions);

//源文件路径
var path = {
    commonCss:[
        baseUrl + "/css/jquery.mCustomScrollbar.css",
        baseUrl + "/app/header/css/header.css",
        baseUrl + "/app/footer/css/footer.css",
        baseUrl + "/app/base-info/css/base-info.css",
        baseUrl + "/css/module.css",
        baseUrl + "/css/common.css"
    ],
    hrCss:[
        baseUrl + "/css/reset.css",
        baseUrl + "/app/hr-button/css/button.css",
        baseUrl + "/app/hr-header/css/header.css",
        baseUrl + "/app/hr-footer/css/footer.css",
        baseUrl + "/app/hr-sidebar/css/sidebar.css",
        baseUrl + "/css/hr.css"
    ],
    albumsCss:[
        baseUrl + "/css/albums-detail2.css"
    ],
    houseManageCss:[
        baseUrl + "/css/house-manage.css"
    ],
    bMonduleCss:[
        baseUrl + "/css/b-module.css"
    ],

    dataAuditCss:[
        baseUrl + "/css/data-audit.css"
    ],

    dictionaryCss:[
        baseUrl + "/css/d-dictionary.css"
    ],

    pushfallCss:[
        baseUrl + "/css/push-fall.css"
    ],

    Js:[
        baseUrl + "/**/*.js",
        "!"+baseUrl+"/app/**/*.js",
        "!"+baseUrl+"/js/hr/hr-ui.js"
    ],

    hrCommonJs:[
        baseUrl + "/app/hr-header/js/header.js",
        baseUrl + "/js/hr/hr-ui.js"
    ],

    hrJs:[
        baseUrl + "/js/hr/*.js",
        "!"+baseUrl+"/js/hr/hr-ui.js"
    ],

    html:[
        baseUrl + "/**/*.html",
        "!"+baseUrl+"/app/**/*.html"
    ],
    pageImages:[
        baseUrl + "/images/**/*.{jpg,png,gif,ico}"
    ],
    moduleImages:[
        baseUrl + "/app/*/images/*.{jpg,png,gif,ico}"
    ]
}


gulp.task("commonCss",function(){
    gulp.src(path.commonCss)
        .pipe(concat("common.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath+"/css"))
});

gulp.task("hrCss",function(){
    gulp.src(path.hrCss)
        .pipe(concat("hr.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath+"/css"))
});

gulp.task("albumsCss",function(){
    gulp.src(path.albumsCss)
        .pipe(concat("albums-detail2.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
});

gulp.task("houseManageCss",function(){
    gulp.src(path.houseManageCss)
        .pipe(concat("house-manage.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
});

gulp.task("bModuleCss",function(){
    gulp.src(path.bMonduleCss)
        .pipe(concat("b-module.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
});

gulp.task("dictionaryCss",function(){
    gulp.src(path.dictionaryCss)
        .pipe(concat("d-dictionary.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
})

gulp.task("pushfallCss",function(){
    gulp.src(path.pushfallCss)
        .pipe(concat("push-fall.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
})

gulp.task("dataAuditCss",function(){
    gulp.src(path.dataAuditCss)
        .pipe(concat("data-audit.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest(releasePath + "/css"))
});

gulp.task("pageImageCompress",function(){
    gulp.src(path.pageImages)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(releasePath + "/images"))
});

gulp.task("moduleImageCompress",function(){
    gulp.src(path.moduleImages)
        .pipe(flatten())
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(releasePath + "/images"))
});

gulp.task("html",function(){
    gulp.src(path.html)
        //.pipe(changed(releasePath + "/"))  //捕捉不到通过gulp-file-include引入文件的变化
        .pipe(fileinclude({
            prefix:"@@",
            basePath:"@file"
        }))
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: " ",
            extra_liners:[]
        }))
        .pipe(gulp.dest(releasePath + "/"))
});

gulp.task("js",function(){
    gulp.src(path.Js)
        .pipe(changed(releasePath + "/"))
        .pipe(flatten())
        .pipe(gulp.dest(releasePath + "/js/"))
});

gulp.task("hrCommonJs",function(){
    gulp.src(path.hrCommonJs)
        .pipe(changed(releasePath + "/"))
        .pipe(concat("hr-ui.js"))
        .pipe(flatten())
        .pipe(gulp.dest(releasePath + "/js/hr/"))
});

gulp.task("hrJs",function(){
    gulp.src(path.hrJs)
        .pipe(changed(releasePath + "/"))
        //.pipe(concat("hr-ui.js"))
        .pipe(flatten())
        .pipe(gulp.dest(releasePath + "/js/hr/"))
});