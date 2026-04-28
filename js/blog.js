$(document).ready(function() {
    
    // 1. Filtro por categorías (jQuery)
    $('.filter-btn').on('click', function(e) {
        e.preventDefault();
        var category = $(this).data('filter');

        // Actualizar botón activo
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        if (category === 'all') {
            $('.blog-post-item').fadeIn(400);
            $('#ultimas-publicaciones-header').fadeIn(400);
        } else {
            $('.blog-post-item').hide();
            $('.blog-post-item.' + category).fadeIn(400);
            
            // Ocultar encabezado "Últimas Publicaciones" si no hay artículos visibles en esa sección
            if ($('article.blog-post.blog-post-item.' + category).length > 0) {
                $('#ultimas-publicaciones-header').fadeIn(400);
            } else {
                $('#ultimas-publicaciones-header').hide();
            }
        }

        // Forzar actualización de IntersectionObserver al mostrar nuevos elementos
        $(window).trigger('scroll');
    });

    // 2. Animaciones al hacer scroll (Intersection Observer)
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // Si el elemento entra en pantalla, añadimos la clase visible
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    }, { threshold: 0.1 }); // 10% del elemento visible para dispararse

    $('.fade-in-up').each(function() {
        observer.observe(this);
    });

    // 3. Comentarios Simulados
    $('#comment-form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('#comment-name').val();
        var text = $('#comment-text').val();
        
        if(name && text) {
            // Obtener la categoría actual
            var currentCategory = $('.filter-btn.active').data('filter');
            var categoryAttr = currentCategory !== 'all' ? 'data-category="' + currentCategory + '"' : 'data-category="general"';

            // Crear el nuevo elemento de comentario
            var newComment = `
            <div class="d-flex mb-4 comment-item" ` + categoryAttr + ` style="display:none;">
                <div class="flex-shrink-0">
                    <img src="https://i.pravatar.cc/50?img=` + (Math.floor(Math.random() * 70) + 1) + `" class="rounded-circle" alt="User">
                </div>
                <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">` + name + ` <small class="text-muted fw-normal">Justo ahora</small></h6>
                    <p class="mb-0">` + text + `</p>
                </div>
            </div>`;

            // Añadir al DOM con animación jQuery
            $(newComment).appendTo('#comments-list').hide().slideDown(400);

            // Incrementar contador
            var count = parseInt($('#comments-count').text()) + 1;
            $('#comments-count').text(count);

            // Limpiar formulario
            $('#comment-form')[0].reset();
        }
    });

});
