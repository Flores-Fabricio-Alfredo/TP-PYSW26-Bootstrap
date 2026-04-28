$(document).ready(function(){

  // RATING INICIAL
  $('.rating').each(function(){
    let value = $(this).data('value');

    $(this).find('i').each(function(){
      let index = $(this).data('index');

      if(index <= value){
        $(this).removeClass('bi-star').addClass('bi-star-fill');
      } else {
        $(this).removeClass('bi-star-fill').addClass('bi-star');
      }
    });
  });

  // CLICK EN ESTRELLAS
  $('.rating i').click(function(e){
    e.stopPropagation();

    let index = $(this).data('index');
    let parent = $(this).parent();

    parent.attr('data-value', index);

    parent.find('i').each(function(){
      let iIndex = $(this).data('index');

      if(iIndex <= index){
        $(this).removeClass('bi-star').addClass('bi-star-fill');
      } else {
        $(this).removeClass('bi-star-fill').addClass('bi-star');
      }
    });
  });

});