function layer_new(e,l,c,n,o,t){close_layer();var i="";return 1==e?i=l:2==e&&(i=l),layer.open({type:e,title:!1,closeBtn:0,area:c,shadeClose:1,shade:[.5,"#000"],content:i,success:function(e,l){e.find(".ly-close").click(function(){layer.closeAll()})}})}function layer_func(e,l,c){if(void 0!==c&&0!=c.length&&$(".btn-commit").on("click",function(){location.href=c}),void 0!==e){e(l)}void 0===e?$(".layer > .ly-close,.layer-btn-reset,.btn-commit").click(function(){}):$(".layer > .ly-close,.layer-btn-reset").click(function(){layer.closeAll()})}function close_layer(){layer.closeAll()}