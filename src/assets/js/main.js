$(document).ready(function() {
    var app = new App();
    app.init();

});

var App = function () {
    this.init = function () {
        this.mobileMenu();
        this.tabSwitcher();
        this.slider();
        this.dropdown();
    };


    this.mobileMenu = function () {
        var $menu_button = $('#mobile-sandwich'),
            $menu = $('#mobile-menu'),
            $body = $('body');

        $menu_button.on('click', function () {
            $menu.toggleClass('open');
            $body.toggleClass('no-scroll');
        });
    };

    this.tabSwitcher = function () {
        var $tabs_wrapper = $('#tabs'),
            $nav = $('#tabs-nav'),
            $nav_item = $('.main-tabs-nav__item'),
            $tab = $('.tab');

        $nav_item.on('click', function () {
            var $self = $(this),
                index = $self.index();

            $nav.find('.main-tabs-nav__item--active').removeClass('main-tabs-nav__item--active');
            $self.addClass('main-tabs-nav__item--active');

            $tabs_wrapper.find('.active').removeClass('active');
            $tab.eq(index).addClass('active');
        });
    };

    this.slider = function () {
        var $slider = $('.tab-slider'),
            $left_arrow = $('.tab-slider-arrow--left'),
            $right_arrow = $('.tab-slider-arrow--right'),
            count = $('.tab-slider__image').length;

        $slider.owlCarousel({
            items: 1,
            nav: false,
            dots: false
        });

        $left_arrow.on('click', function () {
            $slider.trigger('prev.owl.carousel');
        });

        $right_arrow.on('click', function () {
            $slider.trigger('next.owl.carousel');
        });

        $slider.on('changed.owl.carousel', function(event) {
            $('.tab-slider-nav__item--active').removeClass('tab-slider-nav__item--active');
            $('.tab-slider-nav__item').eq(event.item.index + 1).addClass('tab-slider-nav__item--active');
        });

        $('.tab-slider-nav__item').on('click', function () {
            $slider.trigger('to.owl.carousel', $(this).index() - 1);
        });

        $('.tab-slider-nav__item--back').on('click', function () {
            $slider.trigger('to.owl.carousel', 0);
        });

        $('.tab-slider-nav__item--forward').on('click', function () {
            $slider.trigger('to.owl.carousel', count);
        });
    };

    this.dropdown = function () {
        var $dropdown_title = $('.tab-dropdown__title'),
            $dropdown_body = $('.tab-dropdown-body'),
            $dropdown_option = $('.tab-dropdown__item'),
            $dropdown_input = $('#dropdown');

        $dropdown_title.on('click', function () {
            $dropdown_body.slideToggle(300);
        });

        $dropdown_option.on('click', function () {
            var $self = $(this);

            $dropdown_body.slideToggle(300);
            $dropdown_input.val($self.data('option'));
            $dropdown_title.find('span').html($self.text());
        });
    };

};
