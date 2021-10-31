'use strict';


//navbar 스크롤을 내리면 색깔이 나타나게 하는 코드이다.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
//쿼리셀렉터를 이용해서 가져온 navbar의 높이이다. 직접 브라우저 상에서 보여지는 높이가 된다.

document.addEventListener('scroll', ()=> {
    //console.log(window.scrollY);
    //원점으로부터 문서를 수직방향으로 스크롤한 픽셀의 수
   // console.log(`navbarHeight: ${navbarHeight}`);
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
    //console.log(event.target.dataset.link);
    //이렇게 하면 data link의 값을 특정해서 가져올 수 있다. null이 아닐때만 콘솔에 출력한다.
    //link가 null인 것을 클릭해서 undefined가 출력되는 것을 이렇게 방지할 수 있다.

    //const scrollTo = document.querySelector(link);
    //console.log(scrollTo);
    //왜 scrollTo가 null이 나오는지 알 수가 없다. -> html 태그에서 잘못 설정했기 때문이다.
    //예를 들어서 data-link="#home" 이렇게 설정해줬으면 실제로 존재하는 태그 아이디가 있어야 한다.
    //반드시 이름을 일치시켜 줘야 하는 것에 유의한다.
    //scrollTo.scrollIntoView({behavior: 'smooth'}); 공통함수로 처리하는 것으로 바꿈

    scrollIntoView(link);
});


// Handle click on "contact me" button on home
const HomeContact = document.querySelector('.home__contact');
HomeContact.addEventListener('click', (event) => {
    scrollIntoView("#contact");

});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    console.log(1 - window.scrollY / homeHeight);
    //scrollY가 homeHeight까지 내려가면 최종적으로 1이 되어서 console.log에 찍히는 값은 0이 된다.
    home.style.opacity = 1 - window.scrollY / homeHeight;
    //opacity가 - 가 되는 것은 완전 불투명이다.
});


//show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
    if(window.scrollY > homeHeight /2) {
        arrowUp.classList.add('visible');
        //스크롤이 내려가면 arrowUp 아이콘에다가 visible 클래스를 추가한다. 그러면 css에서 정의한 
        //것에 따라서 arrowUp 아이콘이 보이게 된다.
    } else {
        arrowUp.classList.remove('visible');
        //클래스를 제거한다.
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', ()=> {
    scrollIntoView('#home');
});


//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project'); //프로젝트들이 할당된 배열이 만들어진다.
workBtnContainer.addEventListener('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    //이벤트 안에 있는 데이터 안의 필터들을 받아온다. html 안에서 data-filter라고 정의했다.
    //만약 숫자를 클릭하면 html에서 숫자는 span 태그 안에 있기 때문에 제대로 불러오지 못한다. 
    //그래서 그 경우를 고려하여 따로 정의해주어야 한다. e.target.parentNode.dataset.filter;
    console.log(filter); //이 경우에는 front-end, *, back-end 이렇게 세개로 나온다
    if(filter == null) {
        return;
    }
    projectContainer.classList.add('anim-out');
    setTimeout(() => {  
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
                //필터와 이름이 일치하거나 모두 보여주는 경우에는 클래스 리스트에서 invisible 제거
            } else {
                project.classList.add('invisible');
            }
        });
        //opacity가 다시 1로 돌아올 수 있도록 하기 위해서
        projectContainer.classList.remove('anim-out');
    }, 500);  
});


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

