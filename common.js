jQuery(document).ready(function($){
  // Responsive Menu
  $('a', '.responsive-menu').on('click', function(){
    var ul = $(this).parents('.navbar-nav');
    $('li.active', ul).toggleClass('opened');
    $('li:hidden, li.unactive', ul).toggleClass('unactive').toggle();
    $('li.has-submenu', ul).toggleClass('hide-submenu');
    $(ul).toggleClass('responsive-menu-active');
    
    return false;
  });
  
  $('a', '.navbar-nav').on('click', function(){
    if ($('.navbar-nav').hasClass('responsive-menu-active') &&
       $(this).parents('li.responsive-menu').length == 0) {
      $('a', '.responsive-menu').trigger('click');
    }
    
    return true;
  });

  // header Revolution Slider
  slider = $('.tp-banner').revolution({
    delay: 9000,
    startwidth: 1170,
    startheight: 500,
    hideThumbs: true,
    onHoverStop: "on",
    hideTimerBar: "on",
    navigationType: 'none',
    soloArrowLeftHOffset: -50,
    soloArrowRightHOffset: -50
  });
  slider.bind("revolution.slide.onchange", function(event, data) {
     $('.slider-navigation .slider-nav').removeClass('active');
     $('.slider-navigation .slider-nav').eq(data.slideIndex - 1).addClass('active');
  });
  $('.slider-navigation').on('click', 'a', function () {
    slider.revshowslide($(this).index() + 1);
    
    return false;
  });
  // end header Revolution Slider

  // Partners Slider
  owl = $("#owl-demo");
  owl.owlCarousel({pagination: false,
                   items: 4,
                   itemsDesktop: [1199,4],
                   itemsDesktopSmall: [980,3],
                   itemsTablet: [768,2],
                   itemsTabletSmall: false,
                   itemsMobile: [479,1]});
  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
  
  // make the header sticky if necessary
  if ($('nav.navbar').hasClass('sticky') && $('nav.navbar').is(':visible')) {
    menuTop = $('nav.navbar').offset().top;
    $('body').prepend('<div class="sticky-menu-container navbar"><div class="container"><div class="row"><div class="col-xs-12" id="sticky-menu"></div></div></div></div>');
    $('.sticky-menu-container').hide();
    $('ul.navbar-nav').clone().prependTo('#sticky-menu');
  
    $(window).scroll(function (event) {
      scrollY = $(window).scrollTop();
      if (scrollY >= menuTop) {
        $('.sticky-menu-container').show();
      } else {
        $('.sticky-menu-container').hide();
      }
    });
    $(window).trigger('scroll');
  } // sticky header
  
  // smooth scrolling anchors
  $('.smoothscroll').click(function(e) {
    el = $(this).attr('href');
    $('html, body').animate({scrollTop: $(el).offset().top - 0}, 'slow');
    e.preventDefault();
    
    return false;
  });
  
  // ScrollSpy
  $('body').scrollspy({ target: '.sticky-menu-container' });
  
  // pricing boxes hover
  $('.pricing-column').hover(
    function(){ 
      $('.pricing-tables-container .pricing-column').removeClass('hovered');
      $(this).addClass('hovered');
    },
    function(){}
  );

  // Twitter feed
  if ($('.twitter-content').length) {
    $('.twitter-content').tweet({
            username: $('.twitter-content').attr('data-twitter-username') || 'infowebservices',
            join_text: 'auto',
            avatar_size: 0,
            count: 1,
            auto_join_text_default: '',
            auto_join_text_ed: '',
            auto_join_text_ing: '',
            auto_join_text_reply: '',
            auto_join_text_url: '',
            loading_text: 'Loading tweets...',
            modpath: "./twitter_proxy/"
        });
  };
  
  // init newsletter subscription AJAX handling
  if ($('#newsletterform').length) {
    if ($('#newsletterform').attr('data-mailchimp') == 'true') {
      $('#newsletterform').attr('action', '_newsletter-subscribe-mailchimp.php');
      $('#newsletterform').ajaxForm({ dataType: 'json',
                                       timeout: 2000,
                                       success: newsletterResponseMailchimp});
    } else if ($('#newsletterform').attr('data-madmimi') == 'true') {
      $('#newsletterform').attr('action', '_newsletter-subscribe-madmimi.php');
      $('#newsletterform').ajaxForm({ dataType: 'json',
                                       timeout: 2000,
                                       success: newsletterResponseMadmimi});
    } else {
      $('#newsletterform').attr('action', '_newsletter-subscribe.php');
      $('#newsletterform').ajaxForm({ dataType: 'json',
                                      timeout: 2000,
                                      success: newsletterResponse});
    }
    $('#button-newsletter').click(function() { $('#newsletterform').submit(); return false; });
  } // if newsletter form
  
  // load captcha question for contact form
  if ($('#captcha-img').length) {
    $.get('_captcha.php?generate', function(response) {
      $('#captcha-img').html(response);
    }, 'html');
  }
  
  // contact form
  if ($('#contact_form').length) {
    $('#contact_form').validate({ rules: { name: { required: true},
                                          email: { required: true, email: true },
                                          message: { required: true },
                                          _captcha: { required: true, remote: '_captcha.php' }},
                                 messages: { name: 'This field is required.',
                                             email: { required: 'This field is required.',
                                                      email: 'Please enter a valid email address.'},
                                             message: 'This field is required.',
                                             _captcha: 'Are you really a human?'},
                                 errorPlacement: function(error, element) {},
                                 submitHandler: function(form) {  $(form).ajaxSubmit({ dataType: 'json',
                                                                                        success: contactFormResponse }); }
                              });
  } // if contact form
  
  // chat window
  // remove this JS if you install the LiveChat script
  $('.live-chat').on('click', function() {
    $(this).hide();
    $('.live-chat-icon').hide();
    $('.live-chat-container').show().css('opacity', 1).css('visibility', 'visible');
    
    return false;
  });
  $('.live-chat-container .live-chat-button').on('click', function() {
    $('.live-chat-container').hide();
    $('.live-chat').show();
    $('.live-chat-icon').show();
    $('.live-chat .live-chat-button').show();
    
    return false;
  });
  $('#livechat').on('submit', function() {
    alert('This is just a sample form. Register on LiveChat to get a fully functional one.');
    return false;
  });
  // live chat end
  
  $('#domain-search-submit').on('click', function() {
    alert('This form has to be linked to a domain selling tool/provider such as Name.com.');
    return false;
  });

  // show google map
  $('#google-map').gMap({
    draggable: false,
    scaleControl: false,
    scrollwheel: false,
    panControl: false,
    markers: [
        {
            address: $('#google-map').attr('data-map-address'),
            html: $('#google-map').attr('data-map-bubble'),
            popup: true,
            icon: {
                image: 'images/pin1.png',
                iconsize: [25, 40],
                iconanchor: [25,40],
                infowindowanchor: [12, 0]
            }
        }
    ],
    zoom: parseInt($('#google-map').attr('data-map-zoom'), 10),
    styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
  });
  $(window).on('resize', function() {
    $('#google-map').gMap('fixAfterResize', 0);
  });

}); // onload

// handle newsletter subscribe AJAX response
function newsletterResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'fileopen') {
      alert('Error opening $emailsFile. Please refer to documentation for help.');
    } else if (response.responseMsg == 'name') {
      alert('Please enter a valid name.');
    } else if (response.responseMsg == 'email') {
      alert('Please enter a valid email address.');
    } else if (response.responseMsg == 'duplicate') {
      alert('You are already subscribed to our newsletter.');
    } else if (response.responseMsg == 'filewrite') {
      alert('Error writing to $emailsFile. Please refer to documentation for help.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for subscribing to Infoweb Services\'s newsletter! We will not abuse your address.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
} // newsletterResponse

//removed lines

// handle contact form AJAX response
function contactFormResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'notsent') {
      alert('We are having some mail server issues. Please refresh the page or try again later.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for contacting us! We\'ll get back to you ASAP.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
  
  location.reload(true);
} // contactFormResponse
