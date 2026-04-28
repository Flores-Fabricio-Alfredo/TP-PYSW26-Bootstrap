const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const $el = $(entry.target);
            $el.prop('Counter', 0).animate({
                Counter: $el.data('target')
            }, {
                duration: 2000,
                step: function(now) {
                    $el.text(Math.ceil(now).toLocaleString());
                }
            });
            observer.unobserve(entry.target); // Detiene la observación tras animar
        }
    });
});

$('.counter').each(function() { observer.observe(this); });

