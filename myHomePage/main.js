'use strict';


//navbar 스크롤을 내리면 색깔이 나타나게 하는 코드이다.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
//쿼리셀렉터를 이용해서 가져온 navbar의 높이이다. 직접 브라우저 상에서 보여지는 높이가 된다.

document.addEventListener('scroll', ()=> {
    console.log(window.scrollY);
    //원점으로부터 문서를 수직방향으로 스크롤한 픽셀의 수
    console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) { //스크롤을 navbarHeight보다 더 내렸을 때
        navbar.classList.add('navbar--dark'); //navbar에 클래스를 추가한다.
    } else {
        navbar.classList.remove('navbar--dark'); //스크롤을 내리지 않으면 클래스를 제거한다.
    }
});