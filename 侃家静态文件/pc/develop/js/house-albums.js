$(function(){function n(n){function i(){o==-a.length*f?h.addClass("zno"):h.removeClass("zno"),o==-f?d.addClass("zno"):d.removeClass("zno")}if(!v){var o=0,t=c.position().left,e=0;if(v=!0,"boolean"==typeof n)e+=n?-f:f;else{if(n-C===0)return void(v=!1);e=-f*(n-C)}o=t+e,c.animate({left:o},p,"linear",function(){i(),v=!1}),s(n)}}function s(n){var s;a.eq(C).removeClass("zon"),"boolean"==typeof n?n?(s=C+1,s>a.length-1&&(s=0)):(s=C-1,s<0&&(s=a.length-1)):s=n,a.eq(s).addClass("zon"),C=s}function i(n){function s(){0==i?r.addClass("zno"):r.removeClass("zno"),i<=-m?z.addClass("zno"):z.removeClass("zno")}if(!y){var i=0;y=!0;var o=(u.position().left,B.width()+10);console.log(o+"移动距离"),"boolean"==typeof n&&(i+=n?-o:0),u.animate({left:i},p,"linear",function(){y=!1,s()})}}function o(n){img=$(".img")[n],D.src=document.getElementsByClassName("img")[n].src,w=D.width,x=D.height,q=x>=600?600:x,I=w>=1200?1200:w,A.css("height",q),A.css("width",I),b=($(window).height()-q)/2,img.style.display="block"}function t(n,s,i){o(n),s.css("display","block"),i.css("display","block"),P.css("top",b)}function e(n,s,i,o){n.css("display","none"),s.css("display","none"),i.css("top","0"),o.css("display","none")}function l(){P.click(function(n){n.stopPropagation()})}var c=$(".slide-ul"),a=$(".zmd-container-ul li"),d=$("#btnz"),h=$("#btny"),f=$(".slide-ul li").width(),u=$(".move"),r=$("#btn01"),z=$("#btn02"),m=u.width(),g=a.outerWidth(!0);console.log(g),d.addClass("zno"),r.addClass("zno"),d.click(function(){a.each(function(){$(this).hasClass("zon")&&5==$(this).index()&&i(!1)}),$(this).hasClass("zno")||n(!1)}),h.click(function(){a.each(function(){$(this).hasClass("zon")&&4==$(this).index()&&i(!0)}),$(this).hasClass("zno")||(console.log("下"),n(!0))}),a.click(function(){n($(this).index())});var C=0,p=400,v=!1,y=!1,k=null;$(".top-container").hover(function(){clearInterval(k)},function(){}),r.click(function(){$(this).hasClass("zno")||i(!1)}),z.click(function(){$(this).hasClass("zno")||i(!0)});var b,w,x,q,I,B=$(".zmd-container"),E=$("#fade"),N=$("#picture"),P=$("#middle"),W=$(".cha"),j=0,A=$(".img"),D=new Image;A.css("height",0),A.css("width",0),A.css("display","none"),c.delegate("li","click",function(n){j=$(this).index(),j-=1,t(j,E,N)}),N.click(function(n){l(n),e(E,N,P,A)}),W.click(function(){e(E,N,P,A)})});