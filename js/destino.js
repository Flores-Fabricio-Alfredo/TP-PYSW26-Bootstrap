$(document).ready(function() {
  
  // LOGICA 2: FILTROS DINÁMICOS (.filter(), .hide(), .show())
  $(".filter-btn").click(function() {
    var category = $(this).data("filter");

    // Actualizar botón activo
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    if (category === "all") {
      // Mostrar todos los elementos
      $(".destino-item").show(400);
    } else {
      // Usar filter() y hide()/show() como se solicita
      $(".destino-item").hide(400);
      $(".destino-item").filter("." + category).show(400);
    }
  });

});