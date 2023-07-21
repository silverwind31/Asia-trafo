$(document).ready(function() {
    // HEADER
    $('.header_menu .menu_item, header .header_row .hamburger a').hover(
        function() {
            var line1 = $(this).find('.line1');
            var line2 = $(this).find('.line2');
            var line3 = $(this).find('.line3');
            
            if (line1.length && line2.length && line3.length) {
                gsap.to(line1, { attr: { x2: 9 } });
                gsap.to(line2, { attr: { x2: 15 } });
                gsap.to(line3, { attr: { x2: 7 } });
            }
        },
        function() {
            var line1 = $(this).find('.line1');
            var line2 = $(this).find('.line2');
            var line3 = $(this).find('.line3');
            
            if (line1.length && line2.length && line3.length) {
                gsap.to(line1, { attr: { x2: 15 } });
                gsap.to(line2, { attr: { x2: 11 } });
                gsap.to(line3, { attr: { x2: 14 } });
            }
        }
    );
    $('.header_menu .menu_item').on('click', function(e) {
        if ($('header').hasClass('inner_pages') && $(this).hasClass('active')) {
            e.preventDefault();
        } else {
            if ($(this).hasClass('about_company') && !$('.header_menu .menu_item').hasClass('fixed')) {
                $('header #about_company').addClass('active');
                $('header #reference_list').removeClass('active');
                $('header .overlay').addClass('active');
            } else if ($(this).hasClass('references') && !$('.header_menu .menu_item').hasClass('fixed')) {
                $('header #reference_list').addClass('active');
                $('header #about_company').removeClass('active');
                $('header .overlay').addClass('active');
            }
        }
    });
    $('.overlay').on('click', function(e) {
        var overlay = $(this);
        overlay.removeClass('active');
        if ($('header #reference_list').hasClass('active')) {
            $('header #reference_list').removeClass('active');
        }
        if ($('header #about_company').hasClass('active')) {
            $('header #about_company').removeClass('active');
        }
    });
    $('.sub_menu .close_btn').on('click', function(e) {
        var subMenu = $(this).closest('.sub_menu');
    
        if (subMenu.hasClass('active')) {
            $('.overlay').removeClass('active');
            subMenu.removeClass('active');
        }
    });
    $('.languages .list_item').on('click', function() {
        $(this).addClass('active');
        $('.languages .list_item').not(this).removeClass('active');
    });
    $('.scroll_container').on('click', function(e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        var headerHeight = $('header').outerHeight();
        $('html, body').scrollTop($(target).offset().top - headerHeight);
    });
    var scrollThreshold = 100;
    var headerHeight = $('header').outerHeight();

    $(window).on('mousewheel DOMMouseScroll', function(event) {

    var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
    var scrollTop = $(window).scrollTop();
    var newsElement = $('#news');
    if (newsElement.length) {
    var newsOffset = newsElement.offset().top - headerHeight;
 
    }

    if (delta < 0 && scrollTop < scrollThreshold && scrollTop < newsOffset) {
        document.documentElement.scrollTop = newsOffset;
    }
    });

    $('[data-fancybox]').fancybox({
        beforeShow: function(instance, slide) {
         $('header').each(function() {
             $(this).addClass('compensate-for-scrollbar');
         });
        },
        afterClose: function(instance, slide) {
            $('header').each(function() {
             $(this).removeClass('compensate-for-scrollbar');
         });
        }
    });
    // PAGE CONTACTS
    let center = [42.365055, 69.732827];
    let map;

    function init() {
    
        let mapElement = document.getElementById('map');
        if (mapElement) {
            map = new ymaps.Map('map', {
            center: center,
            zoom: 16
            });
            map.controls.remove('geolocationControl');
            map.controls.remove('searchControl');
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.controls.remove('zoomControl');
            map.controls.remove('rulerControl');
            map.behaviors.disable(['scrollZoom']);

            var marker = new ymaps.Placemark(center, {
            hintContent: 'Asia Trafo'
            }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map-icon.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-19, -44]
            });
            map.geoObjects.add(marker);

            let mapIcons = document.querySelectorAll('.map_icon');
            mapIcons.forEach(function (mapIcon) {
            mapIcon.addEventListener('click', function (event) {
                event.preventDefault();
                map.setCenter(center);
                map.setZoom(16);
            });
            });
        }
    }
    ymaps.ready(init);

    $('.map_icon').on('click', function(e) {
        if ($(window).width() < 768) {
          e.preventDefault();
          $('.map_modal').addClass('active');
          $('.map_overlay').addClass('active');
        }
    });
    $('.map_modal .map_close').on('click', function(e){
        $('.map_modal, .map_modal .map_overlay').removeClass('active');
    })
    $('.map_modal .map_overlay').on('click', function(e){
        $(this).removeClass('active');
        $('.map_modal').removeClass('active');

    })
        
    $('.hero_row .click').on('click', function(){
        $('.hero .disc').toggleClass('active');
    });

    $('.products .swiper-slide').on('mouseenter touchstart', function() {
        var id = $(this).attr('id');
        $('.products .product_type').removeClass('active');
        $('.products .product_type#' + id).addClass('active');
    }).on('mouseleave touchend', function() {
        var id = $(this).attr('id');
        $('.products .product_type#' + id).removeClass('active');
    });
    // PAGE PRODUCT 
  
    // NAVIGATION TO SECTIONS
    $('.sections_nav a').click(function(e) {
        e.preventDefault();
        $('.sections_nav a').removeClass('active');
        $(this).addClass('active');
        var target = $(this).attr('href');
        var headerHeight = $('header').outerHeight();
        var navHeight = $('.sections_nav').outerHeight();
        $('html, body').scrollTop($(target).offset().top - headerHeight - navHeight);
    });
    
    $(window).on('load scroll', function() {
        var headerHeight = $('header').outerHeight();
        var navHeight = $('.sections_nav').outerHeight();
        var fixedElementsHeight = headerHeight + navHeight;
        var currentScroll = $(window).scrollTop() + fixedElementsHeight;
    
        $('.sections_nav a').each(function() {
            var target = $(this).attr('href');
            var sectionTop = $(target).offset().top - fixedElementsHeight;
            var sectionHeight = $(target).outerHeight();
    
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                $('.sections_nav a').removeClass('active');
                $(this).addClass('active');
            }
        });
    });
    

    // LIGHT GALLERY

    // PAGE PRODUCTION
    const productionCard = document.querySelectorAll('.production_card');
    productionCard.forEach((container) => {
        lightGallery(container, {
            licenseKey: 'your_license_key',
            speed: 500,
            selector: 'a',
        });
    });
    
    // PAGE TRANSFORMERS

    const transformerCards = document.querySelectorAll('.transformers .transformers_row .transformer_card');
    transformerCards.forEach((container) => {
        lightGallery(container, {
            licenseKey: 'your_license_key',
            speed: 500,
            selector: 'a',
        });
    });

    lightGallery(document.querySelector('.test_lab .swiper-container'), {
		licenseKey: 'your_license_key',
		speed: 500,
		thumbnail: true,
		selector: 'a'
	});

    const swiperContainers = document.querySelectorAll('.section_item .swiper-container');

    swiperContainers.forEach((container) => {
        lightGallery(container, {
            licenseKey: 'your_license_key',
            speed: 500,
            thumbnail: true,
            selector: 'a'
        });
    });

    lightGallery(document.querySelector('.sertificates .sertificates_row'), {
		licenseKey: 'your_license_key',
		speed: 500,
		thumbnail: true,
		selector: 'a'
	});

    // SWIPERS
    let newsSwiper = new Swiper('.news .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
                scrollbar: {
                    el: ".news .swiper-scrollbar",
                    draggable: true,
                    dragSize: 80,
                  },
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 50,
                scrollbar: {
                    el: ".news .swiper-scrollbar",
                    draggable: true,
                    dragSize: 150,
                  },
            },
            1024: {
                slidesPerView: 2.6,
                spaceBetween: 50,
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });
    let sectionSwiper = new Swiper('.product_sections .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".slide_next",
          prevEl: ".slide_prev",
        },
        pagination: {
          el: ".swiper_pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<div class="' + className + '">' + (index + 1) + "</div>";
          },
        },
    });
    var swiper = new Swiper(".products .swiper-container", {
        slidesPerView: 4,
        spaceBetween: 60,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
                scrollbar: {
                    el: ".products .swiper-scrollbar",
                    draggable: true,
                    dragSize: 120,
                  },
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 60,

                scrollbar: {
                    el: ".products .swiper-scrollbar",
                    draggable: true,
                    dragSize: 120,
                  },
            },
            1024: {
                slidesPerView: 2.7,
                spaceBetween: 60,

                scrollbar: {
                    el: ".products .swiper-scrollbar",
                    draggable: true,
                    dragSize: 150,
                  },
            },
            1500: {
                slidesPerView: 4,
                spaceBetween: 60,
            },
        },
    });
    var productSwiper = new Swiper(".product_slider .swiper-container", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 80,
        navigation: {
            nextEl: ".slide_next",
            prevEl: ".slide_prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
                scrollbar: {
                    el: ".product_slider .swiper-scrollbar",
                    draggable: true,
                    dragSize: 80,
                },
            },
            768: {
                slidesPerView: 1.9,
                spaceBetween: 40,
                scrollbar: {
                    el: ".product_slider .swiper-scrollbar",
                    draggable: true,
                    dragSize: 80,
                },
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 80,
            },
            1500: {
                slidesPerView: 1,
                spaceBetween: 80,
            },
        },
    });
    
    var slideTitles = $('.product_slider .swiper-container .slide_title');
    var slidePrev = $('.product_slider .swiper-container .slide_prev');
    var slideNext = $('.product_slider .swiper-container .slide_next');
    var currentSlideIndex = 0;
    
    function updateSlideNavigation() {
        var activeSlideIndex = productSwiper.realIndex;
        currentSlideIndex = activeSlideIndex;
        var prevSlideIndex = activeSlideIndex === 0 ? slideTitles.length - 1 : activeSlideIndex - 1;
        var nextSlideIndex = activeSlideIndex === slideTitles.length - 1 ? 0 : activeSlideIndex + 1;
    
        var prevTitle = slideTitles.eq(prevSlideIndex).text();
        var nextTitle = slideTitles.eq(nextSlideIndex).text();
    
        slidePrev.text(prevTitle);
        slideNext.text(nextTitle);
    }
    
    productSwiper.on('slideChange', function() {
        updateSlideNavigation();
    });
    
    updateSlideNavigation();
    let productionSwiper = new Swiper('.production_card .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".slide_next",
          prevEl: ".slide_prev",
        },
        pagination: {
          el: ".swiper_pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<div class="' + className + '">' + (index + 1) + "</div>";
          },
        },
    });
    let labSwiper = new Swiper(".test_lab .swiper-container", {
        spaceBetween: 20,
        speed: 500,
        slidesPerView: 'auto',
        scrollbar: {
          el: ".swiper_nav .swiper-scrollbar",
          draggable: true,
          dragSize: 170,
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 1,
                scrollbar: {
                    el: ".swiper_nav .swiper-scrollbar",
                    draggable: true,
                    dragSize: 100,
                  },
            },
            768: {
                spaceBetween: 20,
                slidesPerView: 'auto',
                scrollbar: {
                    el: ".swiper_nav .swiper-scrollbar",
                    draggable: true,
                    dragSize: 120,
                  },
            },
            1024: {
                spaceBetween: 20,
                slidesPerView: 'auto',
            },
            1500: {
                spaceBetween: 20,
                slidesPerView: 'auto',
                scrollbar: {
                    el: ".swiper_nav .swiper-scrollbar",
                    draggable: true,
                    dragSize: 170,
                  },
            },
        },
    });
    
    /* HAMBURGER MENU */
    $('header .hamburger').on('click', function(e){
        e.preventDefault();
        $('.hamburger_menu').addClass('active');
        $('.hamburger_menu .overlay').addClass('active');
    })
    $('.hamburger_menu .close, .hamburger_menu .overlay').on('click', function() {
        $('.hamburger_menu').removeClass('active');
        $('.hamburger_menu .overlay').removeClass('active');
    });

    /* LANG SWITCH MOBILE */
    function handleResize() {
        if ($(window).width() < 768) {
            $('.lang_switch_manual').on('click', function(e) {
                $('.lang_switch, .lang_switch .switcher_overlay').addClass('active');
            });
        } else {
            $('.lang_switch_manual').off('click');
            $('.lang_switch, .lang_switch .switcher_overlay').removeClass('active');
        }
    }
    handleResize();    
    $(window).resize(function() {
        handleResize();
    });

    $('.lang_switch .close_btn, .lang_switch .switcher_overlay').on('click', function(e){
        $('.lang_switch, .lang_switch .switcher_overlay').removeClass('active');
    })

    $('.hero').on('mousemove', function(e) {
        var disc = $('.hero .disc');
        var discSize = disc.width() / 2;
        var mouseX = e.clientX - discSize;
        var mouseY = e.clientY - discSize;
      
        disc.css('left', mouseX + 'px');
        disc.css('top', mouseY + 'px');
      });

});