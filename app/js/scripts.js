'use strict';

$(function () {
    dropdownMenu();
});

/*Dropdown menu*/
function dropdownMenu() {
    var menu = $('.menu');
    var menuItem = $('.menu__link');
    var menuHeight = menu.height();
    menuItem.on('click', function () {
        var currentItem = $(this);
        var submenu = currentItem.closest('.menu__list-item').find('.menu__submenu');
        if (submenu.length > 0) {
            currentItem.toggleClass('menu__link_opened');
            if (currentItem.hasClass('menu__link_opened')) {
                submenu.addClass('menu__submenu_visible');
                menu.stop();
                menu.animate({
                    height: menuHeight + submenu.outerHeight()
                }, 300);
            } else {
                submenu.removeClass('menu__submenu_visible');
                menu.stop();
                menu.animate({
                    height: menuHeight
                }, 300);
            }
        }
    });
}

/*-----*/

/*User inactive*/
function userInactive() {
    var inactiveTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;

    // debugger;
    var timeout = void 0;
    // User events
    $(document).on('mousemove click scroll tap', function () {
        clearCounter();
    });
    // -----
    // Clear counter function
    function clearCounter() {
        clearTimeout(timeout);
        inactivityCounter();
    }

    // -----
    // Set counter function
    function inactivityCounter() {
        timeout = setTimeout(function () {
            var cookies = Cookies.get();
            for (var cookie in cookies) {
                Cookies.remove(cookie);
            }
            backToStarterVideo();
        }, inactiveTime);
    }

    clearCounter();
    // -----
}
/*-----*/
/*Close video and go to application*/
function startApplication() {
    $(document).on('click tap', function () {
        document.location.href = "/page-authentification.html";
    });
}
/*-----*/
function backToStarterVideo() {
    document.location.href = "/index.html";
}

/*Slider with presents*/
function presentsSlider() {
    var navigationSlider = $('.slider__nav');
    var sliderItem = $('.slider__nav .menu__link_slider');
    sliderItem.on('click', function (e) {
        e.preventDefault();
        var checkedSlide = $(e.target).closest('.slick-slide').data('slick-index');
        navigationSlider.slick('slickGoTo', checkedSlide);
    });
}
/*-----*/

/*Modal windows*/
function modalWindows() {
    var modal = $('.modal');
    var currentStep = 1;
    // window.currentStep = currentStep;
    /*Current window init*/
    var currentWindow = function currentWindow(step) {
        return $('.modal__window_step-' + step);
    };
    /*-----*/
    /*Show/hide modal functions*/
    var show = function show(object) {
        modal.css({ 'display': 'flex', 'height': $(document).height() });
        object.css({ 'display': 'inline-block' });
    };
    initCars();
    var hide = function hide() {
        var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $(modal);

        if (currentStep === 4) {
            // debugger;
            var cookies = Cookies.get();
            for (var cookie in cookies) {
                Cookies.remove(cookie);
            }
            backToStarterVideo();
            return;
        }
        modal.css({ 'display': 'none' });
        object.css({ 'display': 'none' });
    };
    /*-----*/
    show($('.modal__window_step-1'));
    modal.on('click', '.modal__close', function (e) {
        if ($(e.target).hasClass('modal__close_blue')) {
            hide($(e.target).closest('.modal__window'));
            show(currentWindow(currentStep));
        } else {
            console.dir(modal);
            hide(currentWindow(currentStep));
            currentStep = 1;
        }
    });
    modal.on('click', '.link_rules', function () {
        hide(currentWindow(currentStep));
        show($('.modal__window_rules'));
    });
    /*Data sending*/
    dataFormParsing();
    function dataFormParsing() {
        modal.on('click', '.button_forward', function (e) {
            var data = {};
            var response = void 0;
            var currentModal = $(e.target).closest('.modal__window');
            $('.modal__error').empty();
            currentModal.find('.input , .select').each(function () {
                // console.log($(this));
                var currentItem = $(this);
                var key = currentItem.attr('name');
                if ($(this)[0].type === 'checkbox') {
                    data[key] = $(this)[0].checked ? '__true' : '__false';
                } else if ($(this)[0].type === 'radio' && $(this).next('a').hasClass('checked')) {
                    data[key] = $(this).val();
                } else if ($(this)[0].type === 'radio') {
                    data[key] = data[key] ? data[key] : '__unchecked';
                } else {
                    data[key] = data[key] ? data[key] : currentItem.val();
                }
            });
            // data = 'data=' + JSON.stringify(data);
            // console.log(data);
            // debugger;
            // console.log(currentStep);
            if (currentStep === 1) {
                $.ajax({
                    type: 'POST',
                    url: '/api/initiate-user',
                    datatype: 'json',
                    data: data,
                    success: function success(res) {
                        // console.log(res);
                        Cookies.set('phone', data.phone);
                        Cookies.set('userId', res.id);
                        $('.input.input_w-label[name="phone"]').val(data.phone);
                        goForward(res);
                    },
                    error: function error(err) {
                        goForward(null, err);
                    }
                });
            } else if (currentStep === 2) {
                $.ajax({
                    type: 'POST',
                    url: '/api/check-code',
                    datatype: 'json',
                    data: data,
                    success: function success(res) {
                        // console.log(res);
                        goForward(res);
                    },
                    error: function error(err) {
                        goForward(null, err);
                    }
                });
            } else if (currentStep === 3) {
                data.id = Cookies.get('userId');
                data.giftId = Cookies.get('giftId');
                data.region = Cookies.get('region');
                // console.log(data);
                $.ajax({
                    type: 'POST',
                    url: '/api/complete-user',
                    datatype: 'json',
                    data: data,
                    success: function success(res) {
                        goForward('finish');
                    },
                    error: function error(err) {
                        // console.log(err);
                        goForward(null, err);
                    }
                });
            }
            /*Go to next step conditions*/
            var goForward = function goForward(res, err) {
                if (res) {
                    hide(currentWindow(currentStep));
                    currentStep++;
                    // window.currentStep = currentStep;
                    if (res === 'finish') {
                        Cookies.set('giftOrdered', 'true');
                    }
                    show(currentWindow(currentStep));
                } else if (err) {
                    console.time('hello');
                    console.log(err);
                    if (err.responseText === 'wrong phone') {
                        $('.input.input_phone').css({ borderColor: '#d20000', color: '#d20000' });
                        $('.input.input_phone').on('input', function () {
                            $(this).css({ borderColor: '#d4d4d4', color: '#000000' });
                        });
                    } else if (err.responseText === 'wrong code') {
                        $('.input.input_code').css({ borderColor: '#d20000', color: '#d20000' });
                        $('.input.input_code').on('input', function () {
                            $(this).css({ borderColor: '#d4d4d4', color: '#000000' });
                        });
                    } else if (err.responseJSON.length) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = err.responseJSON[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                name = _step.value;

                                $('input[name=' + name).css({ borderColor: '#d20000', color: '#d20000' });
                                $('input[name=' + name).siblings('label').css({ borderColor: '#d20000', color: '#d20000' });
                                $('input[name=' + name).on('input', function () {
                                    $(this).css({ borderColor: '#d4d4d4', color: '#000000' });
                                    $(this).siblings('label').css({ borderColor: '#d4d4d4', color: '#000000' });
                                });
                                $('input[name=' + name).siblings('a').on('click', function () {
                                    $(this).css({ borderColor: '#d4d4d4', color: '#000000' });
                                    $(this).siblings('label').css({ borderColor: '#d4d4d4', color: '#000000' });
                                    if ($(this).siblings('input').hasClass('input_radio')) {
                                        $('.prettyradio').find('label').css({ borderColor: '#d4d4d4', color: '#000000' });
                                    }
                                });
                                if (name === 'carBrand') {
                                    $('.input-container_car-brand .selectric-wrapper .selectric').css({ borderColor: '#d20000' });
                                    $('.input-container_car-brand .selectric-wrapper .selectric .label').css({ color: '#d20000' });
                                    $('.input-container_car-brand .selectric .label, .input-container_car-brand .selectric .button').on('click', function () {
                                        $('.input-container_car-brand .selectric-wrapper .selectric').css({ borderColor: '#d4d4d4' });
                                        $('.input-container_car-brand .selectric-wrapper .selectric .label').css({ color: '#000000' });
                                    });
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    } else {
                        $('.modal__error').html('Введите данные');
                    }
                    console.timeEnd('hello');
                }
            };
            /*-----*/
        });
    }
    function initCars() {
        $.ajax({
            url: '/api/get-cars',
            success: function success(cars) {
                // console.log(cars);
                $('select[name="carBrand"]').html(cars);
                $('select').selectric({
                    arrowButtonMarkup: '<b class="button"><img src="img/select-arrow.png" class="button__image" alt=""></b>'
                });
                // $.ajax({
                //     type: 'POST',
                //     url: '/api/get-car-models',
                //     data: {
                //         brand: $('.input-container_car-brand').find('.label').text()
                //     },
                //     success: function (models) {
                //         // console.log(models);
                //         $('select[name="carModel"]').html(models);
                //         $('select').selectric({
                //             arrowButtonMarkup: '<b class="button"><img src="img/select-arrow.png" class="button__image" alt=""></b>'
                //         });
                //     }
                // });
            }
        });
        $('select[name="carBrand"]').on('selectric-select', function (event, element, selectric) {
            var carBrand = $('.input-container_car-brand').find('.label').text();
            if (carBrand === 'Выберите марку') {
                return;
            }
            $.ajax({
                type: 'POST',
                url: '/api/get-car-models',
                data: {
                    brand: carBrand
                },
                success: function success(models) {
                    // console.log(models);
                    $('select[name="carModel"]').html(models);
                    $('select').selectric({
                        arrowButtonMarkup: '<b class="button"><img src="img/select-arrow.png" class="button__image" alt=""></b>'
                    });
                }
            });
        });
    }
    /*-----*/
}
/*-----*/

/*Input masks*/
function phoneMask() {
    $('.input_phone').mask("+7 (000) 000-00-00", {
        placeholder: "+7 (___) ___-__-__"
    });
}
/*-----*/

/*Custom radio and checkbox*/
function customCheck() {
    var inputList = document.querySelectorAll('.input_custom');
    for (var i = inputList.length - 1; i >= 0; i--) {
        $(inputList[i]).prettyCheckable();
    }
}
/*-----*/

function authentification() {
    $('.button_auth').on('click', function (e) {
        var data = {};
        var response = void 0;
        var currentModal = $(e.target).closest('.modal__window');
        $('.modal__error').empty();
        currentModal.find('.input , .select').each(function () {
            var currentItem = $(this);
            var key = currentItem.attr('name');
            data[key] = currentItem.val();
        });
        // data = 'data=' + JSON.stringify(data);
        // console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/region-authenticate',
            datatype: 'json',
            data: data,
            success: function success(res) {
                // console.log(res);
                if (res) {
                    Cookies.set('region', res.id);
                    goForward();
                } else {}
            }
        });
        /*Go to next step conditions*/
        var goForward = function goForward() {
            document.location.href = "/page-home.html";
        };
        /*-----*/
    });
}


$(document).ready(function() {
    let dealersNetElements = $('.menu__link, .card').filter(function() {
        if ($(this).text() === 'Дилерская сеть') return true;
        if ($(this).find('title_main_s').text() === 'ДИЛЕРСКАЯ СЕТЬ.') return true;
        return false;
    });
    console.log(dealersNetElements);
});