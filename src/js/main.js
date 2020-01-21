var $slider;
var game = {};

$(document).ready(function(){
    $slider = $('.slider');
    setGame();

    $('.js-start').on('click', function() {
        $('.slider__input').each(function(i, el) {
            if (!el.value.length) {
                $(el).addClass('Error');
                return false;
            } else {
                $(el).removeClass('Error');
            }

            if (i + 1 === $slider.find('.slider__input').length) {
                game.name = $('.slider__input')[0].value.trim().substring(0, 32);
                game.surname = $('.slider__input')[1].value.trim().substring(0, 32);
                game.current = 1;
                setGameToLocalStorage();
                $slider.slick('slickNext');
            }
        });
    });

    $('.slider__input').on('input', function() {
        $(this).removeClass('Error');
    });

    $('.js-button-correct, .js-button-wrong').on('click', function() {
        var $this = $(this);
        var questionIndex = $this.parents('.slider__item_question').index() - 1;
        var result;
        var imgUrl;
        var text;

        if($this.hasClass('js-button-correct')) {
            result = true;
            imgUrl = getGameFromLocalStorage().questions[questionIndex].imgCorrect;
            text = getGameFromLocalStorage().questions[questionIndex].correctText;
        } else {
            result = false;
            imgUrl = getGameFromLocalStorage().questions[questionIndex].imgWrong;
            text = getGameFromLocalStorage().questions[questionIndex].wrongText;
        }

        $('.slider__item_answerresult').css("background-image", imgUrl);
        $('.slider__item_answerresult .slider__title').html('<span>' + (questionIndex + 1) + ' вопрос</span>' + text);
        game.questions[questionIndex].result = result;
        game.current = $slider.slick('slickCurrentSlide') + 1;
        setGameToLocalStorage();
        $slider.slick('slickGoTo', 8,  false);
    });

    $('.js-button-next').on('click', function() {
        var transform;

        $slider.slick('slickGoTo', 9,  false);

        switch(getGameFromLocalStorage().current) {
            case 2:
                transform = 'translate(125px, 40px)';
                break;
            case 3:
                transform = 'translate(206px, 110px)';
                break;
            case 4:
                transform = 'translate(140px, 180px)';
                break;
            case 5:
                transform = 'translate(67px, 251px)';
                break;
            case 6:
                transform = 'translate(110px, 331px)';
                break;
            case 7:
                transform = 'translate(165px, 410px)';
                break;
        }

        $('.marker').css('transition', 'all 1.5s ease').css('transform', transform);
    });

    $('.js-button-end').on('click', function() {
        var result = getGameFromLocalStorage().questions.reduce(function(prev, cur, index, arr){
            var summ;
            if(prev.result !== null && cur.result !== null) {
                summ = prev.result + cur.result;
            } else {
                summ = 0;
            }
            return summ;
        });

        game.questions[6].result = true;
        game.current = 10;
        game.result = result;

        $('.slider__item_userresult span').text(result + ' балл(ов)');
        $slider.slick('slickGoTo', 10,  false);

        setGameToLocalStorage();
    });

    $('.marker').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        $slider.slick('slickGoTo', getGameFromLocalStorage().current,  false);
    });

    function setGameToLocalStorage() {
        localStorage.setItem('game', JSON.stringify(game));

        setMap();

        console.log(getGameFromLocalStorage());
    }

    function getGameFromLocalStorage() {
        return JSON.parse(localStorage.game);
    }

    function setMap() {
        $.each(getGameFromLocalStorage().questions, function(i, el){
            var $el = $('.map__button:nth-of-type(' + (i+1) + ')');

            if (el.result === true) {
                $el.addClass('correct');
            } else if (el.result === false) {
                $el.addClass('wrong');
            }
        });
    }

    function setGame() {
        game = {
            name: '',
            surname: '',
            questions: [
                {
                    result: null,
                    correctText: 'Верно!<br/>Вы на правильном пути.',
                    wrongText: 'Не верно.<br/>За готовой картой Клиенту надо будет приехать в офис.',
                    imgCorrect: 'url(src/img/true_1.png)',
                    imgWrong: 'url(src/img/ wrong_1.png)',
                },
                {
                    result: null,
                    correctText: 'Правильно!',
                    wrongText: 'Нет, заявок подано в два раза больше',
                    imgCorrect: 'url(src/img/true_2.png)',
                    imgWrong: 'url(src/img/ wrong_2.png)',
                },
                {
                    result: null,
                    correctText: 'Правильно!',
                    wrongText: 'Не верно',
                    imgCorrect: 'url(src/img/true_1.png)',
                    imgWrong: 'url(src/img/ wrong_1.png)',
                },
                {
                    result: null,
                    correctText: 'Верно!<br/>Сейчас только 24%, но мы уверены, что общими усилиями их доля увеличится!',
                    wrongText: 'Хотелось бы, но нет!<br/>Функционал реализован для гарантий в рамках ФЗ.',
                    imgCorrect: 'url(src/img/true_2.png)',
                    imgWrong: 'url(src/img/ wrong_2.png)',
                },
                {
                    result: null,
                    correctText: 'Верно!',
                    wrongText: 'У вас еще не было сделок по Белой зоне?<br/>Так будут!',
                    imgCorrect: 'url(src/img/true_1.png)',
                    imgWrong: 'url(src/img/ wrong_1.png)',
                },
                {
                    result: null,
                    correctText: 'Верно, теперь СББОЛ стал еще оперативнее!',
                    wrongText: 'Можно и так, но зачем тратить время, если СМС Клиенту поступит быстрее!',
                    imgCorrect: 'url(src/img/true_2.png)',
                    imgWrong: 'url(src/img/ wrong_2.png)',
                },
                {
                    result: null,
                    correctText: 'Верно!',
                    wrongText: '',
                    imgCorrect: 'url(src/img/true_1.png)',
                    imgWrong: 'url(src/img/ wrong_1.png)',
                },
            ],
            current: 0,
            result: null
        };

        if(!localStorage.game) {
            setGameToLocalStorage();
        } else {
            game = JSON.parse(localStorage.game);
        }

        $slider.slick({
            accessibility: false,
            arrows: false,
            infinite: false,
            fade: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            swipe: false,
            touchMove: false,
            initialSlide: getGameFromLocalStorage().current,
        });
    }
});
