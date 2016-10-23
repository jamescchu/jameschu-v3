document.addEventListener("DOMContentLoaded", function() {
    var dom = Barba.Pjax.Dom;
    dom.wrapperId = 'content-wrapper';
    dom.containerClass = 'content-container';

    Barba.Pjax.init();
    Barba.Prefetch.init();

    // Scroll to the wrapper
    Barba.Dispatcher.on('transitionCompleted', function() {
        window.scrollTo(0, wrapper.getBoundingClientRect().top);
    });

    // Add transition to barba
    Barba.Pjax.getTransition = function() {
      return Transition;
    };

    Barba.transitionLength = 250;
});
