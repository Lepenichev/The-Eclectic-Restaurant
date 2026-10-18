function init() {
    const gallery = document.getElementById('gallery');
    const buttons = document.querySelectorAll('.gallery__button');

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if(gallery.classList.contains('about')) {
                gallery.classList.replace('about', 'values')
            } else {
                gallery.classList.replace('values', 'about')
            }
        });
    });

    const revievsContainer = document.getElementById('reviewsItems')
    const btnPrev = document.querySelector('.reviews__button--prev');
    const btnNext = document.querySelector('.reviews__button--next');
    const card = document.querySelector('.reviews__item')
    const widthCard = card.offsetWidth

    btnPrev.addEventListener('click', (event) => {
        revievsContainer.scrollLeft -= widthCard + 35;
    });

    btnNext.addEventListener('click', (event) => {
        revievsContainer.scrollLeft += widthCard + 35;
    });

    const showBtn = document.getElementById('showMore');
    const cards = revievsContainer.querySelectorAll('.reviews__item');

    showBtn.addEventListener('click', () => {
        cards.forEach(card => card.classList.toggle('open'));
        const isAllOpen = [...cards].every(card => card.classList.contains('open'));
        showBtn.textContent = isAllOpen ? 'Скрыть все' : 'Показать еще';
    });

    const popUp = document.getElementById('popUp');
    const openPopUp = document.getElementById('openPopUp');
    const mobOpenPopUp = document.getElementById('mobOpenPopUp');
    const popUpClose = document.getElementById('popUpClose');

    openPopUp.addEventListener('click', () => {
        popUp.classList.add('open');
    });

    mobOpenPopUp.addEventListener('click', () => {
        popUp.classList.add('open');
    });

    popUpClose.addEventListener('click', () => {
        popUp.classList.remove('open');
    });
}

init();