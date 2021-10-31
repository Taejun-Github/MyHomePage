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


// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu'); //css에서 쓰이는 셀렉터를 반드시 동일하게 해야 한다.
navbarMenu.addEventListener('click', (event) => {
    //console.log(event.target);//이렇게 하면 클릭한 이벤트의 태그가 들어오게 된다.
    //예시 : <li class="navbar__menu__item">My Project</li>
    //console.log(event.target.dataset);
    //이렇게 하면 data로 걸어놓은 값들을 맵으로 가져온다. 
    //data-test="test" data-link="#home" 이렇게 두개를 html 태그에 정의해 놨다면
    //{link: "#home", test: "test"}와 같은 형태의 맵이 만들어진다.

    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    console.log(event.target.dataset.link);
    //이렇게 하면 data link의 값을 특정해서 가져올 수 있다. null이 아닐때만 콘솔에 출력한다.
    //link가 null인 것을 클릭해서 undefined가 출력되는 것을 이렇게 방지할 수 있다.

    const scrollTo = document.querySelector(link);
    console.log(scrollTo);
    //왜 scrollTo가 null이 나오는지 알 수가 없다. -> html 태그에서 잘못 설정했기 때문이다.
    //예를 들어서 data-link="#home" 이렇게 설정해줬으면 실제로 존재하는 태그 아이디가 있어야 한다.
    //반드시 이름을 일치시켜 줘야 하는 것에 유의한다.
    scrollTo.scrollIntoView({behavior: 'smooth'});
});