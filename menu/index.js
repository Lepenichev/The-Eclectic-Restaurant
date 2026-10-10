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
    
    
}

init();