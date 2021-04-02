var attusPreviousScrollTop;

jQuery(document).ready(() => {
  attusPreviousScrollTop = jQuery(document).scrollTop();
  jQuery(document).scroll(() => {
    if (jQuery(document).scrollTop() > 0) {
      jQuery('#page-header #app-bar').addClass('attus-shadow-4');
    }
    else {
      jQuery('#page-header #app-bar').removeClass('attus-shadow-4');
    }
    if (jQuery(document).scrollTop() > 39) {
      jQuery('#page-header #app-bar').addClass('attus-mobile-fixed');
    }
    else {
      jQuery('#page-header #app-bar').removeClass('attus-mobile-fixed');
    }
    if (jQuery(document).scrollTop() > attusPreviousScrollTop) {
      jQuery('#page-header #menu-bar').removeClass('attus-mobile-fixed');
    }
    else if (jQuery(document).scrollTop() < attusPreviousScrollTop) {
      jQuery('#page-header #menu-bar').addClass('attus-mobile-fixed');
    }
    attusPreviousScrollTop = jQuery(document).scrollTop();
  });
  jQuery(document).click((event) => {
    var $target = jQuery(event.target);
    var $drawer = $target.closest('.attus-navigation-drawer');
    var $button = $target.closest('.mobile-footer-menu');
    if ($drawer.length === 0 && $button.length === 0) {
      var $mobileMenuWrapper = jQuery('header#page-header section#menu-bar');
      $mobileMenuWrapper.find('.region-menu-bar.attus-bottom-navigation-drawer')
              .removeClass('attus-bottom-navigation-drawer').removeClass('attus-navigation-drawer');
    }
  });
});

Drupal.behaviors.attus = {
  attach: function (context, settings) {
    var $mobileMenuWrapper = jQuery('header#page-header section#menu-bar');
    var $mobileFooterMenus = $mobileMenuWrapper.find('nav');
    var $mobileFooterButtons = $mobileMenuWrapper.find('div#footer-buttons-right');
    if ($mobileFooterMenus.length > 0) {
      $mobileFooterButtons.find('.mobile-footer-menu').remove();
      var $menuButton = jQuery('<div />').addClass('mobile-footer-menu')
              .addClass('mobile-footer-button').appendTo($mobileFooterButtons);
      var $menuIcon = jQuery('<span />').addClass('material-icons').html('more_vert').appendTo($menuButton);
      $menuButton.click(() => {
        $mobileMenuWrapper.find('.region-menu-bar').addClass('attus-navigation-drawer')
                .addClass('attus-bottom-navigation-drawer').addClass('attus-elevation-16')
                .addClass('attus-typography-body-2');
      });
    }
    var $mobileFooterSearchBlocks =  $mobileMenuWrapper.find('.block-search');
    $mobileFooterButtons.find('.mobile-footer-search').remove();
    if ($mobileFooterSearchBlocks.length > 0) {
      var $searchButton = jQuery('<div />').addClass('mobile-footer-search')
              .addClass('mobile-footer-button').prependTo($mobileFooterButtons);
      var $searchIcon = jQuery('<span />').addClass('material-icons').html('search').appendTo($searchButton);
      $searchButton.click(() => {
        $mobileFooterSearchBlocks.toggleClass('open');
      });
    }
    if ($mobileFooterSearchBlocks.length > 0 || $mobileFooterMenus.length > 0) {
      $mobileFooterButtons.find('.mobile-footer-expand').remove();
      var $expandButton = jQuery('<div />').addClass('mobile-footer-expand')
              .addClass('mobile-footer-button').prependTo($mobileFooterButtons);
      var $expandIcon = jQuery('<span />').addClass('material-icons').html('expand_more').appendTo($expandButton);
      $expandButton.click(function() {
        var $menuWrapper = jQuery('header#page-header section#menu-bar');
        if ($menuWrapper.hasClass('attus-menu-open')) {
          $menuWrapper.removeClass('attus-menu-open');
          jQuery(this).find('span.material-icons').html('expand_more');
        }
        else {
          $menuWrapper.addClass('attus-menu-open');
          jQuery(this).find('span.material-icons').html('expand_less');
        }
      });
    }
    jQuery('form .form-item').each(function() {
      jQuery(this).attusInput();
    });
  }
};

jQuery.fn.attusInput = function() {
  if (!jQuery(this).hasClass('attus-initialized')) {
    jQuery(this).addClass('attus-initialized');
    var $input;
    if (jQuery(this).find('input').length  > 0) {
      $input = jQuery(this).find('input');
    }
    if ($input.val() === '') {
      jQuery(this).addClass('attus-input-empty');
    }
    $input.focus(() => {
      jQuery(this).addClass('attus-input-focus');
    });
    $input.blur(() => {
      jQuery(this).removeClass('attus-input-focus');
    });
    $input.keyup(() => {
      if ($input.val() === '') {
        jQuery(this).addClass('attus-input-empty');
      }
      else {
        jQuery(this).removeClass('attus-input-empty')
      }
    });
  }
};