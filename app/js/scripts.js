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
        document.location.href = "/page-home.html";
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
            hide(modal);
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
                var currentItem = $(this);
                var key = currentItem.attr('name');
                data[key] = currentItem.val();
            });
            data = 'data=' + JSON.stringify(data);
            console.log(data);
            $.ajax({
                type: 'POST',
                url: '../datahandler.php',
                datatype: 'json',
                data: data,
                success: function success(res) {
                    response = JSON.parse(res);
                    goForward(response.status);
                }
            });
            /*Go to next step conditions*/
            var goForward = function goForward(stat) {
                if (stat) {
                    hide(currentWindow(currentStep));
                    currentStep++;
                    show(currentWindow(currentStep));
                } else {
                    $('.modal__error').html('Введите данные');
                }
            };
            /*-----*/
        });
    }
    function initCars() {
        $.ajax({
            url: 'cars.php',
            success: function success(cars) {
                console.log(cars);
                $('select[name="carBrand"]').html(cars);
                $('select').selectric({
                    arrowButtonMarkup: '<b class="button"><img src="img/select-arrow.png" class="button__image" alt=""></b>'
                });
            }
        });
        $('select[name="carBrand"]').on('selectric-select', function (event, element, selectric) {
            var carBrand = $('.input-container_car-brand').find('.label').text();
            $.ajax({
                type: 'POST',
                url: 'cars.php',
                data: {
                    brand: carBrand
                },
                success: function success(models) {
                    console.log(models);
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