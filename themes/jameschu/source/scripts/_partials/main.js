document.addEventListener("DOMContentLoaded", function() {
    var dom = Barba.Pjax.Dom;
    dom.wrapperId = 'content-wrapper';
    dom.containerClass = 'content-container';
    
    Barba.Pjax.init();
    Barba.Prefetch.init();

    var nav = document.querySelector('.nav-list');
    var items = menu.querySelectorAll('.nav-list-link');
    var wrapper = document.getElementById('content-wrapper');

    // Add the active class when click on the menu item.
    Barba.Dispatcher.on('linkClicked', function(el) {
        if (!menu.contains(el)) {
            return;
        }

        [].forEach.call(items, function(item) {
            item.classList.remove('active');
        });

        el.parentElement.classList.add('active');
    });
});
