$(function () {
    imgAjust($(".v-slide-ul li"), $(".v-slide-ul li img"));

    var index = 0;
    var SLID_TIME = 400;
    var moving = false;
    var movings = false;


    // 弹出层 函数 变量
    var $popup = $('#v-fade');
    var $middle = $('.v-content');


    //  给所有的li 添加 事件 渲染出来的也能添加
    $(document).on('click', '.pic-list li', function () {
        //  区分你所点击的 li 数量为
        var $poupbox = $(this).parents(".pic-list").next(".v-picture");
        var $pic_list = $(this).parents(".pic-list");
        // 获取所 需要的参数
        var $list = $(this).parents('.pic-area').find('.v-slide-ul');
        var $spans = $(this).parents('.pic-area').find('.v-zmd-container-ul li');
        var $prevA = $(this).parents('.pic-area').find('.v-slide-btnz');
        var $nextA = $(this).parents('.pic-area').find('.v-slide-btny');
        var $li_width = $(this).parents('.pic-area').find('.v-slide-ul li').width();
        var $move = $(this).parents('.pic-area').find('.v-move');
        var $btn03 = $(this).parents('.pic-area').find('.v-zmd-btnz');
        var $btn04 = $(this).parents('.pic-area').find('.v-zmd-btny');
        var $cha = $(this).parents('.pic-area').find('.v-cha');
        var $moveLeft = $move.width();


        //  点击cha
        $cha.off('click').on('click', function () {
            // 隐藏函数
            hideli($popup, $poupbox);
        });
        // 点击弹层
        $popup.off('click').on('click', function () {
            // 隐藏函数
            hideli($popup, $poupbox);
            stop()
        });

        // 初始化样式
        var firstLi = $(".v-move").find(".v-first");
        firstLi.addClass("v-zon");
        // 判断是否只有一张
        if ($spans.length == 1) {
            $nextA.addClass('v-zno');
        }
        // 显示函数
        showli($popup, $poupbox, $list.children("li"), $list.children("li").find("img"));

        // 判断 走马灯移动次数 moveNumber
        var moveNumber = ( $spans.length / 5 ) - 1;

        var arrlistmoveR = [];
        var arrlistmoveL = [];
        for (var i = 0; i < moveNumber; i++) {
            a = (i + 1) * 5;
            b = a - 1;
            arrlistmoveR.push(b);
            arrlistmoveL.push(a);
        }
        ;

        // 调用 走马灯移动函数
        var num = $(this).index();
        // 移动到对应的 num
        nextPage(num);

        var arr1 = [5, 6, 7, 8, 9];
        var arr2 = [10, 11, 12, 13, 14];
        var arr3 = [15, 16, 17, 18, 19, 20];

        // 根据num 直接改变 move left 值
        if (!(arr1.indexOf(num) == -1)) {
            $move.css('left', '-530px');
            $btn03.removeClass('v-zno');
            $btn04.removeClass('v-zno');

        } else if (!(arr2.indexOf(num) == -1)) {
            $move.css('left', '-1060px');
            $btn03.removeClass('v-zno');
            $btn04.removeClass('v-zno');
        } else if (!(arr3.indexOf(num) == -1)) {
            $move.css('left', '-1590px');
            $btn03.removeClass('v-zno');
            $btn04.removeClass('v-zno');
        }
        // 判断是否要加入按钮
        if (num < 5) {
            $prevA.addClass('v-zno');
            $btn03.addClass('v-zno');
            $btn04.removeClass('v-zno');
        }
        // 判断是否给右侧按钮加入样式
        if ($spans.length > 4) {
            if (num > 4) {
                $btn04.addClass('v-zno');
            }
        }
        // 直接改变left 的值
        $popup.off('click').on('click', function () {
            stop();
            hideli($popup, $poupbox);
        });
        $prevA.off('click').on('click', function () {
            $spans.each(function () {
                if ($(this).hasClass('v-zon')) {
                    if (!(arrlistmoveL.indexOf($(this).index()) == -1)) {
                        nextGroup($(this).index());
                    }
                }
            });
            if ($(this).hasClass('v-zno')) {
                return;
            }
            nextPage(false);
        });
        $nextA.off('click').on('click', function () {
            $spans.each(function () {
                if ($(this).hasClass('v-zon')) {
                    if (!(arrlistmoveR.indexOf($(this).index()) == -1)) {
                        nextGroup($(this).index());
                    }
                }
            });
            if ($(this).hasClass('v-zno')) {
                return;
            }
            nextPage(true);
        });
        $spans.off('click').on("click", function () {
            nextPage($(this).index());
        });
        // 移动函数
        function nextPage(next) {
            // 如果正在移动  则 退出
            if (moving) {
                return;
            }
            var targetLeft = 0;
            var currentLeft = $list.position().left;
            var offsetLeft = 0;
            // IE 1px问题
            if ((navigator.userAgent.indexOf('MSIE') >= 0)
                && (navigator.userAgent.indexOf('Opera') < 0)) {
                if (currentLeft == 0) {
                    currentLeft == 0
                } else {
                    currentLeft = currentLeft - 1;
                }
            }
            // IE 问题

            // 正在移动
            moving = true;
            if (typeof next === 'boolean') {
                offsetLeft += next ? -$li_width : $li_width;
            } else {
                if (next - index === 0) {
                    moving = false;
                    return;
                }
                offsetLeft = -$li_width * (next - index);
            }

            targetLeft = currentLeft + offsetLeft;

            if (targetLeft == 600) {
                targetLeft = 0;
            }
            // 动画效果
            $list.animate({
                left: targetLeft
            }, SLID_TIME, 'linear', function () {
                Btnhide();
                moving = false;

            });
            //更新小图片
            updatePoint(next);
            // 按钮 隐藏函数
            function Btnhide() {
                targetLeft == -($spans.length - 1) * $li_width ? $nextA.addClass('v-zno') : $nextA.removeClass('v-zno');
                targetLeft == 0 ? $prevA.addClass('v-zno') : $prevA.removeClass('v-zno');
            }
        }

        // 更新原点函数
        function updatePoint(next) {
            var targetIndex;
            //更新当前页的圆点样式
            $spans.eq(index).removeClass('v-zon');
            if (typeof next === 'boolean') {
                if (next) {
                    targetIndex = index + 1;
                } else {
                    targetIndex = index - 1;
                }
            } else {
                targetIndex = next;
            }
            $spans.eq(targetIndex).addClass('v-zon');
            //更新下标
            index = targetIndex;
        }

        // 初始化判断
        if ($spans.length <= 5) {
            $btn03.addClass('v-zno');
            $btn03.click(function () {
                return false;
            });
        } else {
            $btn03.click(function () {
                if ($(this).hasClass('v-zno')) {
                    return;
                }
                nextGroup(false);
            });
        }
        if ($spans.length <= 5) {
            $btn04.addClass('v-zno');
            $btn04.click(function () {
                return false;
            });

        } else {
            $btn04.click(function () {
                if ($(this).hasClass('v-zno')) {
                    return false;
                }
                nextGroup(true);
            });
        }
        // 走马灯移动函数
        function nextGroup(next) {

            if (movings) {
                return;
            }

            // 目标位置
            var targetLeft = 0;
            var offsetLeft = 0;
            movings = true;
            //  初始位置
            var currentLeft = $move.position().left;


            var s = 530;
            if (typeof next == 'boolean') {
                offsetLeft += next ? -s : s;
                targetLeft = offsetLeft + currentLeft;
            } else {
                if ((next + 1) % 5 == 0) {
                    targetLeft = -s * ((next + 1) / 5);
                }
                if (next % 5 == 0) {
                    targetLeft = -s * ((next) / 5 - 1);
                }
            }
            $move.animate({
                left: targetLeft
            }, SLID_TIME, 'linear', function () {
                movings = false;
                Btnhide()
            });
            //  隐藏 按钮 函数
            function Btnhide() {
                targetLeft == 0 ? $btn03.addClass('v-zno') : $btn03.removeClass('v-zno');
                targetLeft <= -$moveLeft * moveNumber ? $btn04.addClass('v-zno') : $btn04.removeClass('v-zno');
            }
        }

        // 显示函数
        function showli(p, b, picContainer, pic) {
            imgAjust(picContainer, pic);
            p.css('display', 'block');
            b.css('display', 'block');
        }

        // 隐藏 函数
        function hideli(p, b) {
            // 弹出层
            p.css('display', 'none');
            // 内容层
            b.css('display', 'none');
            reset()
        }

        // 第一个添加 class
        var $lists = $('.v-slide-ul');
        var $spanAll = $('.v-zmd-container-ul li');
        var $Lifirst = $('.v-zmd-container-ul li:first-child');
        var $moveAll = $('.v-move');
        // 重置函数
        function reset() {
            index = 0;
            // 移动距离为0
            // 下标更新 为 0
            $lists.css('left', '0');
            //  移除所有 spand 的 样式
            $spanAll.removeClass('v-zon');
            $Lifirst.addClass('v-zon');
            $moveAll.css('left', '0');
            // 移除 记录的按钮 样式
            $nextA.removeClass('v-zno');
        }

        // 取消事件 冒泡
        function stop() {
            $middle.click(function (ev) {
                var ev = ev || event;
                ev.stopPropagation();
            })
        }
    });
});