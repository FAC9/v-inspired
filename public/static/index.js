var blue = '#25ABCA';
var green = '#B3C92B';
var hoverBlue = '#30b9d9';
var hoverGreen = '#bfd539';

$( document ).ready(function() {
  $.getScript('static/browser.js')
  .done(function () {
    _ybg.config.service = 'https://www.yoti.com/connect/';
    _ybg.init();
    $('.buttons a').css({
      'font-family': 'Rubik',
      'font-weight': 'bold',
    });
    $('.buttons a:first-of-type').css('background-color', blue)
    .hover(function() {
      $(this).css('background-color', hoverBlue);
    }, function() {
      $(this).css('background-color', blue);
    });
    $('.buttons a:last-of-type').css('background-color', green)
    .hover(function() {
      $(this).css('background-color', hoverGreen);
    }, function() {
      $(this).css('background-color', green);
    });
  })
  .fail(function () {
    console.log('error');
  });
});
