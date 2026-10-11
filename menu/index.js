async function init() {
    let category = new URL(document.location).searchParams.get('cat') ?? 'dessert';

    const anchors = document.querySelectorAll('.menu__anchor');
    anchors.forEach(anchor => {
        const cat = anchor.dataset.cat;
        if(cat === category) {
            anchor.classList.add('menu__anchor--disabled');
        } else {
            anchor.classList.remove('menu__anchor--disabled');
        }
    })

    const res = await fetch(`${category}.json`)
    if(res.ok) {
        const data = await res.json();
        const template = document.getElementById('menuItemCard');

        for(const itemInfo of data){
            let card = template.content.cloneNode(true);
            card.querySelector('.menu__item-image').setAttribute('src', itemInfo['pic']);
            card.querySelector('.menu__item-button').dataset.details = itemInfo['details'];
            card.querySelector('.menu__item-button').dataset.kcal = itemInfo['kcal'];
            card.querySelector('.menu__item-title').textContent = itemInfo['name'];
            card.querySelector('.menu__item-price').textContent = itemInfo['price'];
            document.getElementById('menuItems').appendChild(card);
        }
    } else {
        document.location.href = '/menu';
    }

    const detailsWindow = document.getElementById('detailsWindow');
    const openDetailed = document.querySelectorAll('.menu__item-button');
    const closeDetailed = document.getElementById('detailsClose');

    openDetailed.forEach(detailed => detailed.addEventListener('click', (event) => {
        const target = event.target;
        const parent = target.parentElement;
        detailsWindow.querySelector('.details__title').textContent = parent.querySelector('.menu__item-title').textContent;
        detailsWindow.querySelector('.details__calories').textContent = `${target.dataset.kcal} ккал`;
        detailsWindow.querySelector('.details__price').textContent = parent.querySelector('.menu__item-price').textContent;
        detailsWindow.querySelector('.details__info').textContent = target.dataset.details;
        detailsWindow.classList.add('details-open');
        
    }))

    closeDetailed.addEventListener('click', (event) => {
        detailsWindow.classList.remove('details-open');
    });

    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
            detailsWindow.classList.remove('details-open');
        }
    });
}

init();