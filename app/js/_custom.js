document.addEventListener("DOMContentLoaded", function() {

// media JS
var mediaQuery992 = window.matchMedia("screen and (max-width: 992px)");
mediaQuery992.addListener(foo992);
foo992(mediaQuery992);
foo992Two(mediaQuery992);

// var mediaQuery1200 = window.matchMedia("screen and (max-width: 1200px)");
// mediaQuery1200.addListener(foo1200);
// foo1200(mediaQuery1200);

// Preloader
$('.preloader').delay(2000).fadeOut('slow');

// mmenu
$('.hamburger').click(function(){
  $('.header-topline').toggleClass('header-topline__active')
  $('#my-menu').toggleClass('m-menu__active');
  $('.hamburger').toggleClass('is-active');
});

const menuLink = document.querySelectorAll('.m-menu__list a');
for(let i = 0; i < menuLink.length; i++){
  menuLink[i].addEventListener('click', function(){
    $('.header-topline').toggleClass('header-topline__active')
    $('#my-menu').toggleClass('m-menu__active');
    $('.hamburger').toggleClass('is-active');
  })
}




/* Scroll Down Button */
var btnScrollDown = document.querySelector('.mouse-inner');

function scrollDown() {
  var windowCoords = document.documentElement.clientHeight;
  (function scroll() {
    if (window.pageYOffset < windowCoords) {
      window.scrollBy(0, 10);
      setTimeout(scroll, 0);
    }
    if (window.pageYOffset > windowCoords) {
      window.scrollTo(0, windowCoords);
    }
  })();
}

btnScrollDown.addEventListener('click', scrollDown);



// Get width gutter
function getWidthGutter(){
  var widthWindow = document.body.clientWidth;
  var widthContainer = 1365;
  var gutters = document.getElementsByClassName('gutter');
  var guttersWidth = (widthWindow -widthContainer)/2;

  for(var i = 0; i<gutters.length;i++){
    gutters[i].style.width = guttersWidth + 'px';
  }
}
getWidthGutter();

// Read more

// Read more media
function foo992(mq) {
  if(mq.matches){
    $('.projects-wrap').readmore({
      speed: 500,
      maxHeight:960,
      moreLink: '<a class="projects-link" href="#">Больше проектов</a>',
      lessLink: '<a class="projects-link" href="#">Скрыть</a>'
    });
  } else{
    $('.projects-wrap').readmore({
      speed: 500,
      maxHeight: 710,
      moreLink: '<a class="projects-link" href="#">Больше проектов</a>',
      lessLink: '<a class="projects-link" href="#">Скрыть</a>'
    });
  }
  
}





//Slider
$('.comments__slider').slick({
  prevArrow: '<div class="y_prevArrow"><i class="fa fa-angle-left"></i></div>',
  nextArrow: '<div class="y_nextArrow"><i class="fa fa-angle-right"></i></div>',
  slidesToShow: 1,
  infinite: true,
  arrows: true,
  speed: 300
});


// Telephone mask


// Scrol to top
var btn = $('#button-to-up');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});



// Modal window
// Get DOM Elements
const modal = document.querySelector('#yak-my-modal');
const modalBody = document.querySelector('#modal-body');
const modalCallBtn = document.querySelector('#callback');
const closeBtn = document.querySelector('.close');
const cardsBtn = document.getElementsByClassName('project-item');
const specialistsBtn = document.getElementsByClassName('specialists-item');
const servicesBtn = document.getElementsByClassName('services-item__btn');
const trusBtn = document.querySelector('.trust__btn');
const ordersBtn = document.getElementsByClassName('orders-item__btn');
const mapBtn = document.querySelector('.footer-contacts__btn a')

let modalWindowHtml = '';
// Events
modalCallBtn.addEventListener('click', openModalForm);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);


//render Form
function renderForm(title){
  let newTitle = 'дизайн'
  if(title){
    newTitle = title
  }
  modalWindowHtml = document.getElementById('hidden').innerHTML

  modalBody.innerHTML = modalWindowHtml;

  $("input[type=tel]").mask("+9(999) 999-99-99");
// transform for lable input
$('.form input').blur('change', function(){
  if( !$(this).val() ) {  
    $(this).next().removeClass('notempty');
  } else{
    $(this).next().addClass('notempty');
  }
})
$('button[type=submit]').click(function(){
  closeModal();
  openSuccessWindow();
})

}

// Render Success Window
function renderSuccess(){
  modalWindowHtml = `
  <div class="success-window">
  <div class="success-window__title">Спасибо мы свяжемся с вами<br/> в ближаешее время!</h3></div>
  </div>
  `
  modalBody.innerHTML = modalWindowHtml;
}

function renderSuccessSubscription(){
  modalWindowHtml = `
  <div class="success-window">
  <div class="success-window__title">Спасибо за оформление подписки!</h3></div>
  </div>
  `
  modalBody.innerHTML = modalWindowHtml;
}

// clickBtnCard
for(var i = 0; i < cardsBtn.length; i++){
  cardsBtn[i].addEventListener('click', function(e){
    let sliderImages = e.target.getElementsByClassName('project-item__slide-img');
    let title = e.target.querySelector('.project-item__title').textContent
    let desc = e.target.querySelector('.project-item__desc').textContent
    renderCardWindow(sliderImages, title, desc);
  });
}


// Render Card Window
function renderCardWindow(images, title, desc){
  modalWindowHtml = `
  <div class="card-window">

  <div class="card-window__text">
  <div class="card-window__title">${title}</div>
  <div class="card-window__desc">${desc}</div>
  </div>

  <div class="card-window__promo">
  <div class="card-window__swipe"><i class="fa fa-angle-double-left"></i>swipe<i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
  <div class="card-window__slider">
  </div>
  </div>
  </div>
  `

  modalBody.innerHTML = modalWindowHtml;
  let sliderHTML = document.querySelector('.card-window__slider')

  for(let i = 0; i < images.length; i++){
    sliderHTML.appendChild(images[i].cloneNode(true));
  }

   //Slider
   $('.card-window__slider').slick({
     prevArrow: '<div class="y_prevArrow"><i class="fa fa-angle-left"></i></div>',
     nextArrow: '<div class="y_nextArrow"><i class="fa fa-angle-right"></i></div>',
     dots: true,
     slidesToShow: 1,
     infinite: true,
     arrows: true,
     autoplay: true,
     autoplaySpeed: 5000,
     speed: 300
   });
   openModal();
   function swipeDissappea(){
     $('.card-window__swipe').css('opacity', '0');
   }
   setTimeout(swipeDissappea, 3000);

 }



// clickSpecialistsBtn
for(var i = 0; i < specialistsBtn.length; i++){
  specialistsBtn[i].addEventListener('click', function(e){
    let specialistImages = e.target.querySelector('.specialists-item__img--big img');
    let speach = e.target.querySelector('.specialists-item__speech').textContent
    let position = e.target.querySelector('.specialists-item__position').textContent
    let name = e.target.querySelector('.specialists-item__name').textContent
    renderSpecialistWindow(specialistImages, speach, position, name);
  });
}


// Render specialistWindow

function renderSpecialistWindow(specialistImages, speach, position, name){
  modalWindowHtml = `
  <div class="secialist-window">

  <div class="secialist-window__img"></div>

  <div class="secialist-window__text">
  <div class="secialist-window__hello"><img src="img/@2x/hello.jpg" alt="alt" /></div>
  <div class="secialist-window__speach">${speach}</div>
  <div class="secialist-window__position">${position} ${name}</div>
  </div>
  </div>
  `
  modalBody.innerHTML = modalWindowHtml;
  openModal();
  let imgElement = document.querySelector('.secialist-window__img')


  imgElement.appendChild(specialistImages.cloneNode(true));


}


// readyToTalk Btn
const readyToTalkBtn = document.querySelector('.readytotalk__btn')
readyToTalkBtn.addEventListener('click', openModalForm2);



// clickServicelistsBtn
for(var i = 0; i < servicesBtn.length; i++){
  servicesBtn[i].addEventListener('click', function(e){
    let imgUrl = $(e.target).parent().find('img').attr('src');
    let title = $(e.target).siblings('.services-item__title').text();
    let descFull = $(e.target).siblings('.services-item__desc-full').text();
    renderServiceWindow(imgUrl, title, descFull);
  });
}


// Render Services Window
function renderServiceWindow(imgUrl, title, descFull){
  modalWindowHtml = `
  <div class="service-window">

  <div class="service-window__img"><img src="${imgUrl}" alt="alt"></div>

  <div class="service-window__text">
  <div class="service-window__title">${title}</div>
  <div class="service-window__desc">${descFull}</div>
  <div class="btn service-window__btn">Заказать</div>
  </div>
  </div>
  `
  modalBody.innerHTML = modalWindowHtml;
  openModal();
  document.querySelector('.service-window__btn').addEventListener('click', function(){
    closeModal();
    openModalForm3();
  });
}

// Trust click
trusBtn.addEventListener('click', openModalForm4);

// subscription Form
$('.my-form__submit').click(function(e){
  e.preventDefault();
  openSuccessSubscription();
});



// clickOrderBtn
for(var i = 0; i < ordersBtn.length; i++){
  ordersBtn[i].addEventListener('click', function(e){
    e.preventDefault();
    let title = $(e.target).siblings('.orders-item__title').text();
    renderForm(title);
    modal.style.display = 'block';
  });
}

// clickMapBtn
$(mapBtn).click(function(e){
  e.preventDefault();
  renderMap();
});


// RenderMap
function renderMap(){
  modalWindowHtml = `
  <div class="map">
  <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A84e19b23cd939cadc9e8af60dea3c0edeba7b6a4ab18fb20e07ffd61424915f3&amp;source=constructor" width="100%" height="600" frameborder="0"></iframe>
  </div>
  `
  modalBody.innerHTML = modalWindowHtml;
  openModal();
}

// ModalWindowFunction

function openSuccessSubscription() {
  renderSuccessSubscription();
  modal.style.display = 'block';
  setTimeout(closeModal, 3000);
}


function openSuccessWindow() {
  renderSuccess();
  modal.style.display = 'block';
  setTimeout(closeModal, 3000);
}

// Open
function openModalForm() {
  renderForm();
  modal.style.display = 'block';
}
function openModalForm2() {
  renderForm();
  modal.style.display = 'block';
  $('#callback h3').text('Заказать звонок')
}
function openModalForm3() {
  renderForm();
  modal.style.display = 'block';
  $('#callback h3').text('Заказать услугу')
}
function openModalForm4() {
  renderForm();
  modal.style.display = 'block';
  $('#callback h3').text('Заказать дизайн')
}
function openModal(){
  modal.style.display = 'block';
}
// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}


// WoW init
new WOW().init();

// ANIMATE CSS
function mouseDuration(){
  $('.mouse-inner').css('opacity', '1')
}
setTimeout(mouseDuration, 2700);


// Scroll to anchor

$("a[href*=\\#]").on("click", function(e){
  var anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $(anchor.attr('href')).offset().top
  }, 777);
  e.preventDefault();
  return false;
});


// Scroll Change logo to dark
$(window).scroll(function () {
  if ($(this).scrollTop() > 920) {
    $('.header-topline').addClass('header-topline--dark-theme')
  }
  else {
    $('.header-topline').removeClass('header-topline--dark-theme')
  }
});


// TAP HERE
function foo992Two(mq) {
  if(mq.matches){
    var scroll = $('.projects-wrap').offset().top;
    $(window).scroll(function () {
      if ($(this).scrollTop() > scroll) {
        setTimeout(function(){
             $('.project-item').addClass('opactity-active') 
         }, 2000);
      }
    });
  }
}

// Specialits slider
$(window).on('load resize', function() {
  if ($(window).width() < 1200) {
        var scroll = $('.specialists').offset().top;
    $(window).scroll(function () {
      if ($(this).scrollTop() > scroll) {
        setTimeout(function(){
             $('.specialists__swipe').addClass('opactity-active') 
         }, 2000);
      }
    });
  }
});

$(window).on('load resize', function() {
  if ($(window).width() < 1200) {
$('.specialists-wrap:not(.slick-initialized)').slick({
     slidesToShow: 1,
     infinite: true,
     arrows: false,
     speed: 300
});
  } else {
    $(".specialists-wrap.slick-initialized").slick("unslick");
  }
});

// orders SLIDER
$(window).on('load resize', function() {
  if ($(window).width() < 1200) {
        var scroll = $('.orders').offset().top;
    $(window).scroll(function () {
      if ($(this).scrollTop() > scroll) {
        setTimeout(function(){
             $('.orders__swipe').addClass('opactity-active') 
         }, 2000);
      }
    });
  }
});

$(window).on('load resize', function() {
  if ($(window).width() < 1200) {
$('.orders__wrap:not(.slick-initialized)').slick({
     slidesToShow: 1,
     infinite: true,
     arrows: false,
     speed: 300
});
  } else {
    $(".orders__wrap.slick-initialized").slick("unslick");
  }
});



});
