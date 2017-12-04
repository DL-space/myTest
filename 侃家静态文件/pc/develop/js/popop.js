// 显示函数
function showli(num, p, b) {
    homologou(num);
    p.css('display', 'block');
    b.css('display', 'block');
    // 垂直居中
    $middle.css('top',Top);
}

// 隐藏函数
function hideli(p,b, m, i) {
    // 弹出层
    p.css('display', 'none');
    // 内容层
    b.css('display', 'none');
    // 重置所有的 top
    m.css('top', '0');
    // 隐藏所有的 li
    i.css('display','none');
}