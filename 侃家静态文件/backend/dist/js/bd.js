$(function () {
    //添加同类产品
    $(".btn-add-similar").click(function () {
        $(".pro-list").append(similarModHtml);
    });

    //删除当前同类产品
    $(document).on("click", ".panel-bd-similar .link-del", function () {
        var similarProduct = $(this).parents(".form-mod");
        similarProduct.remove();
    })

    //添加续签信息
    $(".btn-add-sign").click(function () {
        $(".sign-list").append(signItem);
    });

    //添加跟进类型选择
    $(document).on("change", ".chk-follow", function () {
        var dataChecked = $(this).attr("data-check");
        if ($(this).prop("checked")) {
            $("div." + dataChecked).show();
            $("div." + dataChecked).siblings("div").hide();
        } else {
            $("div." + dataChecked).hide();
            $("div." + dataChecked).siblings("div").hide();
        }
    });

    //添加时间段
    $(".panel-cooperation .link-add").click(function () {
        $(datatimeRange).insertAfter($(this).parents(".c-ext"));
    });
    //删除时间段
    $(document).on("click", ".panel-cooperation .link-del", function () {
        $(this).parents(".c-ext").remove();
    })

    //BD单部分添加相关楼盘
    $(".link-add-projects").click(function () {
        $(this).parents(".link-area").siblings(".bd-projects").append(relativeProject);
    });

    //BD单部分删除相关楼盘
    $(document).on("click", ".bd-projects .j-btn-project-del", function () {
        $(this).parents(".bd-projects-item").remove();
    })

    //BD单部分添加合作时间
    $(document).on("click", ".btn-cooperation-date-add", function () {
        $(cooperationDate).insertBefore($(this).parents('.btn-area'));
    });

    //BD单部分删除合作时间
    $(document).on("click", ".bd-projects .j-btn-cooperation-date-del", function () {
        $(this).parents(".j-ipt-area").remove();
    })

    //BD单首次跟进显示与隐藏BD单跟进详情
    $("input[name='bd-scgj']").change(function () {
        var bdFollowDataAction = $(this).attr("data-action");
        if (bdFollowDataAction == "sjgj") {
            $(".v-sjgj-edit").show();
        } else {
            $(".v-sjgj-edit").hide();
        }
    });
});

//添加同类产品
var similarModHtml = '<ul class="form-mod">' +
    '<li>' +
    '<div class="th"><label class="required"></label>楼盘名称：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">单价：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">户型面积：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">业态：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">房源情况：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">月均去化：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">在用渠道公司：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li class="remark">' +
    '<div class="th">优势：</div>' +
    '<div class="td">' +
    '<textarea class="form-control"></textarea>' +
    '</div>' +
    '</li>' +
    '<li class="remark">' +
    '<div class="th">劣势：</div>' +
    '<div class="td">' +
    '<textarea class="form-control"></textarea>' +
    '</div>' +
    '</li>' +
    '<li class="del">' +
    '<a class="link-del" href="javascript:void(0);">删除</a>' +
    '</li>' +
    '</ul>';


//添加续签信息
var signItem = '<div class="sign-item sign-item-dy">' +
    '<ul class="form-mod form-mod-first">' +
    '<li>' +
    '<div class="th">楼盘名称：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text" placeholder="输入楼盘名称"/>' +
    '</div>' +
    '</li>' +
    '<li class="data-add">' +
    '<a href="#" class="link-add">添加</a>' +
    '</li>' +
    '<li class="c-ext">' +
    '<div class="th">合作时间：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '<span class="ext">-</span>' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '<table class="table table-bordered table-responsive">' +
    '<tr>' +
    '<th>楼盘ID</th>' +
    '<th>楼盘名称</th>' +
    '<th>类型</th>' +
    '<th>销售状态</th>' +
    '<th>当前合作状态</th>' +
    '<th>区域</th>' +
    '<th>城市</th>' +
    '<th>操作</th>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '</tr>' +
    '</table>' +
    '<ul class="form-mod">' +
    '<li>' +
    '<div class="th">客户保护期：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">7天</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">保护期判定标准：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">是否有来电来访保护：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">是否刷电商：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">电商费用：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">结佣点位：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">跳点或奖励：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">结佣方式：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">结佣申请日期：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">佣金结算周期：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">请选择</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li class="remark">' +
    '<div class="th">案场其他要求：</div>' +
    '<div class="td"><textarea class="form-control"></textarea></div>' +
    '</li>' +
    '</ul>' +
    '<div class="btn-area">' +
    '<input class="btn btn-default" type="button" value="取消">' +
    '<input class="btn btn-primary" type="button" value="保存">' +
    '</div>' +
    '</div>';


//时间段范围
var datatimeRange = '<li class="c-ext">' +
    '<div class="th"><label class="required"></label>合作周期：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '<span class="ext">-</span>' +
    '<input class="form-control" type="text"/>' +
    '<a class="link-del" href="javascript:void(0);">删除</a>' +
    '</div>' +
    '</li>';


//添加相关楼盘
var relativeProject = '<li class="bd-projects-item">' +
    '<div class="j-ipt-area">' +
    '<label class="j-label required">相关楼盘</label>' +
    '<div class="j-suf">' +
    '<button class="j-btn j-btn-red j-btn-project-del">删除</button>' +
    '</div>' +
    '<div class="j-ipt-wrap">' +
    '<div class="j-select">' +
    '<input type="text" class="content" placeholder="请选择">' +
    '<ul class="option">' +
    '<li>1</li>' +
    '<li>2</li>' +
    '<li>3</li>' +
    '<li>4</li>' +
    '<li>5</li>' +
    '</ul>' +
    '<span class="ico"></span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>';

//添加合作时间
var cooperationDate = '<div class="j-ipt-area j-multi-col">' +
    '<label class="j-label required">合作时间</label>' +
    '<div class="j-suf">' +
    '<button class="j-btn j-btn-red j-btn-cooperation-date-del">删除</button>' +
    '</div>' +
    '<div class="j-ipt-wrap">' +
    '<div class="j-select">' +
    '<input type="text" class="content" placeholder="2017-12-23">' +
    '<ul class="option">' +
    '<li>2017-12-23</li>' +
    '<li>2017-12-24</li>' +
    '<li>2017-12-25</li>' +
    '<li>2017-12-26</li>' +
    '<li>2017-12-27</li>' +
    '</ul>' +
    '<span class="ico"></span>' +
    '</div>' +
    '<span class="j-ext">-</span>' +
    '<div class="j-select">' +
    '<input type="text" class="content" placeholder="2017-12-28">' +
    '<ul class="option">' +
    '<li>2017-12-23</li>' +
    '<li>2017-12-23</li>' +
    '<li>2017-12-23</li>' +
    '<li>2017-12-23</li>' +
    '<li>2017-12-23</li>' +
    '</ul>' +
    '<span class="ico"></span>' +
    '</div>' +
    '</div>' +
    '</div>';