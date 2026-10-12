function init() {
    const reviewsContainer = document.getElementById('reviewsItems');

    const reviwesData = [ 
        {
            photo: "assets/reviews/reviewNatalya.png",  
            name: "Наталья Иванова",
            rating: 5,
            text: "Посетили семейный ресторан вместе с мужем и детьми — отличное место для семейного ужина! Обстановка очень уютная, а обслуживание выше всяких похвал. Наши дети в восторге от детского меню, которое оказалось не только вкусным, но и заботливо подготовленным с учетом детских предпочтений. Будем рекомендовать всем друзьям и обязательно вернемся.",
        },
        {
            photo: "assets/reviews/reviewAleksandr.png", 
            name: "Александр Петров",
            rating: 4,
            text: "Этот ресторан — настоящая находка! Проводил здесь деловой ужин с партнерами, и все остались в восторге. Обслуживание на высшем уровне, персонал внимателен к каждой детали. Кухня порадовала своим разнообразием. Отличное место для деловых встреч и ужинов в уютной обстановке. Рекомендую!",
        },
        {
            photo: "assets/reviews/reviewIgor.png",
            name: "Игорь Ковалев",
            rating: 5,
            text:  "Провели здесь день рождения — атмосфера просто великолепная. Персонал веселый и отзывчивый, кухня порадовала. Особенно понравились закуски к пиву! Обязательно будем возвращаться, чтобы попробовать все блюда из меню.",
        },
        {
            photo: "assets/reviews/reviewMarina.png",
            name: "Марина Соколова",
            rating: 5,
            text: "Посетили семейный ресторан с подругами на девичнике, и это был наш лучший выбор! У нас был волшебный вечер — вкусная еда, отличные коктейли и веселая атмосфера. Обязательно вернемся сюда с мужьями! Очень рекомендую для дружеских посиделок и праздников.",
        }
    ]

    for(let reviewsInfo of reviwesData) {
        const reviewsCard = document.getElementById('reviweTemplate').content.cloneNode(true);
        reviewsCard.querySelector('.reviews__image').setAttribute('src', reviewsInfo.photo);
        reviewsCard.querySelector('.reviews__user-name').textContent = reviewsInfo.name;
        reviewsCard.querySelector('.reviews__text').textContent = reviewsInfo.text;
        
        for(i = 0; i < reviewsInfo.rating; i += 1) {
            let star = document.createElement('img');
            star.setAttribute('src', 'assets/svg/star.svg');
            star.setAttribute('alt', 'Звезда');
            star.setAttribute('class', 'reviews__star');
            reviewsCard.querySelector('.reviews__stars').appendChild(star)
        }
        reviewsContainer.appendChild(reviewsCard)
    }
}

init();