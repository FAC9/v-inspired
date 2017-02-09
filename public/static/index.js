$( document ).ready(function() {
  $.getScript('static/browser.js')
  .done(function () {
    _ybg.config.service = 'https://www.yoti.com/connect/';
    _ybg.init();
    $('.buttons a:first-of-type').css('background-color', '#25ABCA');
    $('.buttons a:last-of-type').css('background-color', '#B3C92B');
  })
  .fail(function () {
    console.log('error');
  });
});
