const navbarNav = document.querySelector
('.navbar-nav');

document.querySelector('#list').
onclick = () => {
    navbarNav.classList.toggle('active');
};

const shopcart = document.querySelector('.shoppingcart');

document.querySelector('#shop').onclick = () => {
    shopcart.classList.toggle('active');
};

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box')

document.querySelector('#search-btn').onclick = (e) => {
    searchForm.classList.toggle('active')
    searchBox.focus();
    e.preventDefault();
};





const menu = document.querySelector('#list');
const sb = document.querySelector('#search-btn');
const sc = document.querySelector('#shop');

document.addEventListener('click' , function(e) {
    if(!menu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active')
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active')
    }
});


const detail = document.querySelector('#detail-item-ui');
const detailbtn = document.querySelectorAll('.detail-btn');

detailbtn.forEach((btn) => {
    btn.onclick = (e) => {
        detail.style.display = 'flex';
        e.preventDefault();
    };
    
});

document.querySelector('.close').onclick = (e) => {
    detail.style.display = 'none';
    e.preventDefault();
};