(function($) {
    // 弹出层
    $.fn.propup = function(options) {
        var parameter = {
            num: 0,
            newImg: new Image()
        };
        if (options) {
            $.extend(parameter, options);
        }
        options.$imgs.css('display', 'none');
        if (options.$slideF) {
            options.$slideF.delegate(options.$slide_ul, 'click', function(event) {
                var $picture, img;
                $picture = $(this).children('.picture');
                img = $picture.find('.img')[0];
                showli(img, options.$popup, $picture);
                options.$poupbox.click(function() {
                    event.stopPropagation();
                    stop();
                    hideli(options.$popup, options.$poupbox, options.$middle, options.$imgs);
                })
            });
        } else {
            options.$slide_ul.delegate("li", "click", function(event) {
                parameter.num = $(this).index();
                showli(parameter.num, options.$popup, options.$poupbox);
            });
            options.$poupbox.click(function() {
                stop();
                hideli(options.$popup, options.$poupbox, options.$middle, options.$imgs);
            })
        }

        options.$cha.click(function() {
            hideli(options.$popup, options.$poupbox, options.$middle, options.$imgs);
        });
        // 点击切换
        options.$m_prev.click(function() {
            swit_chover(false)
            stop();
        });
        options.$m_next.click(function() {
            swit_chover(true)
            stop();
        });

        // 左右切换函数
        function swit_chover(isTrue) {
            // 判断 num  如果是第一张 或 最后一张的时候 不进行 隐藏函数
            isTrue ? parameter.num++ : parameter.num--;

            // 设置极限值
            if (parameter.num < 0) {
                parameter.num = 0;
            } else if (parameter.num >= options.$imgs.length - 1) {
                parameter.num = options.$imgs.length - 1;
            }
            hideli(options.$popup, options.$poupbox, options.$middle, options.$imgs);
            showli(parameter.num, options.$popup, options.$poupbox)
        }
        // 显示函数封装 图片自适应功能
        function showli(num, a, b) {
            // 第一张和最后一张 时候改变样式
            if (num == 0) {
                options.$m_prev.addClass('cursor_no')
            }
            if (num == options.$imgs.length - 1) {
                options.$m_next.addClass('cursor_no')
            }

            // 避免报错 属性判断
            if (num < 0 || num > options.$imgs.length - 1) {
                return false;
            } else if (typeof num == 'number') {
                img = $('.img')[num];
            } else {
                img = num;
            }


            parameter.newImg.src = img.src;
            // 获取 对应图片的路径
            var pWidth = parameter.newImg.width;
            var pHeight = parameter.newImg.height;
            //容器极限值
            var maxPicContaienrWidth = 1200;
            var maxPicContaienrHeight = 600;
            //容器宽高比率
            var picContainerRadio = maxPicContaienrWidth / maxPicContaienrHeight;

            //图片的宽高比率
            var picRadio = pWidth / pHeight;

            //图片尺寸都小于容器极限值1200 x 600
            if (pHeight <= maxPicContaienrHeight && pWidth <= maxPicContaienrWidth) {
                options.$imgs.css({
                    "width": pWidth,
                    "height": pHeight
                });
            } else {
                if (picRadio > picContainerRadio) {
                    options.$imgs.css({
                        "width": maxPicContaienrWidth,
                        "height": maxPicContaienrWidth / picRadio
                    });
                } else {
                    options.$imgs.css({
                        "width": maxPicContaienrHeight * picRadio,
                        "height": maxPicContaienrHeight
                    });
                }
            }

            //图片高度
            var pH = options.$imgs.height();

            // 获取 top 值
            var Top = ($(window).height() - pH) / 2;

            a.css("display", 'block');
            b.css("display", 'block');
            // 显示当前的 li
            img.style.display = 'block';
            // 垂直居中
            options.$middle.css('top', Top);
        }
        // 隐藏 函数 封装
        function hideli(p, b, m, i) {
            // 弹出层
            p.hide()
            // 内容层
            b.hide()
            // 重置所有的 top
            m.css('top', '0');
            // 隐藏所有的 li
            i.hide()
            // 删除 样式
            options.$m_next.removeClass('cursor_no')
            options.$m_prev.removeClass('cursor_no')
        }
        // 取消事件 冒泡
        function stop(event) {
            options.$middle.click(function(event) {
                event.stopPropagation();
            })
        }
    };

})(jQuery);