'use strict';

function parallax(){
    var scrolled = window.pageYOffset,
        elem = document.querySelector('.header__text');

    elem.style['transform'] = 'translateY('+ (-scrolled * 1) +'px)';
}

function navigationfix(){
    var h = document.querySelector('#intro').offsetHeight;

    if(window.pageYOffset > h){
        document.querySelector('.nav').classList.add('nav_fixed');
    }
    else if (window.pageYOffset < h){
        document.querySelector('.nav').classList.remove('nav_fixed');
    }
}

window.addEventListener('scroll', function() {
    parallax();
    navigationfix();
});
function scroll(to, duration){
    var element = document.body,
        difference = to - element.scrollTop,
        perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        scroll(to, duration - 10);
    }, 10);
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.link_nav').onclick = function () {
        var elementClick = this.getAttribute("href"),
            destination = document.querySelector(elementClick).scrollTop;

        scroll(destination, 1500);

        return false;
    };
});


// $(document).ready(function(){
//     var touch = $('#hamburger');
//     var menu = $('.nav__links');
//
//     $(touch).on('click', function(e) {
//         e.preventDefault();
//         menu.slideToggle();
//     });
//     $(window).resize(function(){
//         var wid = $(window).width();
//         if(wid > 760 && menu.is(':hidden')) {
//             menu.removeAttr('style');
//         }
//     });
// });