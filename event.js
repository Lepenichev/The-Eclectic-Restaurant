function init() {
    const container = document.getElementById('reviewsItems');
    const nextBtn = document.querySelector('.reviews__button--next')
    const prevBtn = document.querySelector('.reviews__button--prev')
    const firstReview = container.firstChild.nextElementSibling;
    const lastReview = container.lastChild.previousElementSibling;

    const options = {
        root: container,
        rootMargin: "0px",
        threshold: 0.9,
    };

    function callbackCreator(arrowSelector) {
        return (entries, observer) => {
        entries.forEach(entrie => {
            if(entrie.isIntersecting) {
                arrowSelector.classList.add('inactive')
            } else {
                arrowSelector.classList.remove('inactive')
            }
        });
    }
    }

    const rightObserver = new IntersectionObserver(callbackCreator(nextBtn), options);
    rightObserver.observe(lastReview);

    const leftObserver = new IntersectionObserver(callbackCreator(prevBtn), options);
    leftObserver.observe(firstReview);

    const buttonObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 1],
    };
    const openPopUp = document.getElementById('openPopUp');
    let buttonIsShown = {};

    const observerButtons = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            let btn = entry.target
            buttonIsShown[btn.dataset.observeid] = entry.isIntersecting
        });
        if (Object.values(buttonIsShown).some(btn => btn == true)) {
            openPopUp.classList.add('hiden');
        } else {
            openPopUp.classList.remove('hiden');
        }
    },
    buttonObserverOptions
    );

    const buttons = document.querySelectorAll('.btn-big');
    buttons.forEach((btn, btnIndex) => {
        btn.dataset.observeid = btnIndex;
        observerButtons.observe(btn);
    })
}

init();