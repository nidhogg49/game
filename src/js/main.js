'use strict';

function parallax(){
    var scrolled = window.pageYOffset,
        elem = document.querySelector('.header__text'),
        elemOffsetTop = elem.getBoundingClientRect().top;

    if (elemOffsetTop > 0) {
        elem.style['transform'] = 'translateY('+ (-scrolled * 1) +'px)';
    }
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
    if (duration <= 0) {return;}

    var element = document.body,
        difference = to - element.scrollTop,
        perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        scroll(to, duration - 10);
    }, 10);
}

function toggleClass(el, myClass) {
    if (el && el.className && el.className.indexOf(myClass) >= 0) {
        var pattern = new RegExp('\\s*' + myClass + '\\s*');

        el.className = el.className.replace(pattern, ' ');
    } else {
        el.className = el.className + ' ' + myClass;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var anchorLinks = document.querySelectorAll('.link_nav'),
        menu = document.querySelector('.nav__links'),
        hamburger = document.getElementById('hamburger');

    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener('click', function (e) {
            e.preventDefault();

            toggleClass(hamburger, 'active');
            toggleClass(menu, 'active');

            var elementClick = this.getAttribute("href"),
                destination = document.querySelector(elementClick).getBoundingClientRect().top + document.body.scrollTop;

            scroll(destination, 1500);

            return false;
        });
    }

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();

        toggleClass(hamburger, 'active');
        toggleClass(menu, 'active');
    });
});