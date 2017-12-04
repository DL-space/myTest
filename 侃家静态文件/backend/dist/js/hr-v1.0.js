$(function () {
    var layerIndex = 0;
    $(".icon-tips").hover(function () {
        layerIndex = layer.tips("当前部门总人数（正式人数/非正式人数）", ".icon-tips", {
            tips: [4, '#000']
        });
    }, function () {
        layer.close(layerIndex);
        layerIndex = 0;
    });


    //组织架构列表页最低高度
    var minWindowHeight = $(window).height() - 110 - 40 + "px";
    $(".main-content").css({
        "min-height": minWindowHeight
    });

    //添加部门弹层
    $(".btn-tjbm").click(function () {
        popup($(".add-department").html(), 2, null, null, "", "750px");
    });

    //直属XXX部门的员工
    $(".btn-zsbmyg").click(function () {
        popup($(".department-staff").html(), 2, null, null, "", "750px");
    });

    //移动部门
    $(".btn-ydbm").click(function () {
        popup($(".move-department").html(), 2, null, null, "", "500px");
    });


    //调整部门
    $(".btn-tzbm").click(function () {
        popup($(".update-department").html(), 2, null, null, "", "500px");
    });

    //删除部门
    $(".btn-scbm").click(function () {
        popup($(".del-department").html(), 2, null, null, "", "500px");
    });

    //添加岗位分类
    $(".btn-tjgwfl").click(function () {
        popup($(".add-post-types").html(), 2, null, null, "", "500px");
    });

    //添加岗位
    $(".btn-tjgw").click(function () {
        popup($(".add-post").html(), 2, null, null, "", "500px");
    });

    //移动岗位
    $(".btn-ydgw").click(function () {
        popup($(".move-post").html(), 2, null, null, "", "500px");
    });

    //删除岗位分类
    $(".btn-scgwfl").click(function () {
        popup($(".del-post-type").html(), 2, null, null, "", "600px");
    });

    //删除岗位
    $(".btn-scgw").click(function () {
        popup($(".del-post").html(), 2, null, null, "", "500px");
    });

    //删除员工
    $(".btn-scyg").click(function () {
        popup($(".del-employee").html(), 2, null, null, "", "500px");
    });

    //添加员工成功
    $(".btn-tjyg").click(function () {
        popup($(".dialog-add-employee").html(), 2, null, null, "", "400px");
    });

    //员工离职成功提示弹层
    $(".btn-lzcg").click(function () {
        layer.msg("离职成功");
    });


    //员工离职成功提示弹层
    $(".btn-msg-tips").click(function () {
        popup($(".demo-msg-tips").html(), 2, null, null, "", "400px");
    });

    /*操作按钮的显示和隐藏*/
    $('.department-content').hover(function () {
        $(this).find('.structure-map').show();
        $(this).find('.popover-btn').show();
    }, function () {
        $(this).find('.structure-map').hide();
        $(this).find('.popover-btn').hide();
    });

    $('.popover-btn').hover(function () {
        var self = $(this);
        var topPoint;
        var screenHeight = $(window).height(),
            toTopHeight = self.offset().top - $(window).scrollTop(),
            toBottomHeight = screenHeight - toTopHeight,
            popoverHeight = self.find(".popover").outerHeight();
        $(this).find('.popover').show(0, function () {
            (toBottomHeight > popoverHeight) ? (topPoint = 0) : (topPoint = (toBottomHeight - popoverHeight));
            $(this).css({
                "top": topPoint
            })
        });
    }, function () {
        $(this).find('.popover').hide();
    });
    // 展开 收起
    $('.department-li').find('.unfold').click(function () {
        $(this).parents('.department-content').siblings('.root').toggle();
        $(this).parents('.department-content').find('.f1').toggleClass('zk')
    })
    /*下滑线切换*/
    $(".tabs-nav").click(function () {
        $(this).addClass('botton').siblings().removeClass('botton');
    })

    /*发送绑定通知短信 开关按钮*/
    $(".switch-lb").click(function () {
        var switchContainer = $(this).parents(".switch-container");
        var childrenSwitchBtn = $(this).children(".switch-btn");
        if (switchContainer.hasClass("msg-checked")) {
            switchContainer.removeClass("msg-checked");
            childrenSwitchBtn.animate({left: "-=20px"}, 200);
        } else {
            switchContainer.addClass("msg-checked");
            childrenSwitchBtn.animate({left: "+=20px"}, 200);
        }
    });
    /*按钮、输入框美化*/
    $(".form-area .ipt").focus(function () {
        $(this).addClass("active");
    });
    $(".form-area .ipt").blur(function () {
        $(this).removeClass("active");
    });
    $(".ipt-file").each(function () {
        var that = $(this);
        var btnIpt = that.find(".btn-file");
        var iptFile = that.find(".input-file");
        btnIpt.on("click", function () {
            iptFile.trigger("click");
        })
    });
    // 展示更多数据
    $('.ico-next').click(function () {
        $(this).toggleClass('ico-tran');
        $(this).parents('.form-area').find('.collapse-item-content').toggle();
    })

    //其他筛选条件
    $(".btn-other,.link-all").click(function () {
        $('.prop').show();
        $('.filter-container .filters').animate({right: '0'});
    });
    // 取消
    $('.btn-default').click(function () {
        $('.prop').hide();
        $('.filter-container .filters').animate({right: '-300px'});
        $('.item-options').hide();
    });
    // 取消
    $('.prop').click(function () {
        $('.prop').hide();
        $('.filter-container .filters').animate({right: '-300px'});
        $('.item-options').hide();
    });
    // 点击显示对应的li  filter-active
    $('.filter-item>li').click(function (event) {
        // 阻止事件冒泡
        $(this).addClass('filter-active').siblings().removeClass('filter-active');
        // 显示当前
        $(this).children('.item-options').toggle();
        // 隐藏其他
        $(this).siblings().children('.item-options').hide();
    })

    $('.item-options').click(function (ev) {
        var ev = ev || event;
        ev.stopPropagation();
    })
    // 委派 点击  i-close 移除对应标签
    $('.selected-filter-content').on('click', '.i-close', function () {
        var $that = $(this)
        $that.parents('.el-tag').remove();
        return false;
    })

    //员工列表员工检索取消所有检索条件
    $(".search-summary .clear").click(function () {
        $(this).prev(".selected-filter-content").children(".el-tag").remove();
    });
    // 员工列表页 鼠标移入效果
    $('.link-opt').hover(function () {
        $(this).find('.popover').show();
    }, function () {
        $(this).find('.popover').hide();
    });


    $(document).on("click", ".scroll-bar li", function () {
        var that = $(this);
        var index = that.index();
        var toTop = that.offset().top;
        var toTop2 = $(".form-block").eq(index).offset().top;
        var scrollTop = $(".major-content").scrollTop();
        if ($(".scroll-bar").hasClass("fixed")) {
            $(".major-content").animate({
                    scrollTop: (toTop2 + scrollTop - toTop + 1)
                }, 1000, "linear", function () {
                    that.addClass("active");
                    that.siblings("li").removeClass("active");
                }
            );
        } else {
            $(".major-content").animate({
                    scrollTop: (toTop2 + scrollTop - 182 + 1)
                }, 1000, "linear", function () {
                    that.addClass("active");
                    that.siblings("li").removeClass("active");
                }
            );
        }
    })

    //聘用形式
    $(".select-pyxs select.ipt").change(function () {
        if ($(this).children("option:selected").text() == "非正式") {
            $(this).parents(".form-item").next(".fzspy").show();
        } else {
            $(this).parents(".form-item").next(".fzspy").hide();
        }
    });
});
// 数据交互
$(function () {
    // <span class="el-tag" title="女">女<i class="i-close">X</i></span>
    $('.d-chk').click(function () {
        var $that = $(this);
        $that.toggleClass('ok');
        var $value = $that.val();

        if ($that.hasClass('ok')) {
            // 获取当前value
            var html = '<span class="el-tag" title=' + $value + '>' + $value + '<i class="i-close">X</i></span>';
            $that.parents('.filter-active').find('.selected-filter-content').append(html);
        } else {
            var $spans = $that.parents('.filter-active').find('.selected-filter-content').find('.el-tag');
            $spans.each(function () {
                if ($(this).attr('title') === $value) {
                    $(this).remove();
                }
            })
        }
    })
    $('.selected-filter-content').on('click', '.i-close', function () {
        var $that = $(this);
        var $value = $that.parent('.el-tag').attr("title");
        // 删除 当前结构
        $that.parents(".el-tag").remove();
        // 取消 checke 选择
        $('.d-chk ').each(function () {
            if ($(this).val() === $value) {
                $(this).removeClass('ok');
                $(this).attr('checked', false);
            }
        });
        return false;
    })
})
// 双击事件 封装函数
function DbClick_Url(url) {
    location.href = url;
}
