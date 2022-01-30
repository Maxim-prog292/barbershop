'use strict';
// slider
const btnPrev = document.querySelector('#prev'),
      btnNext = document.querySelector('#next'),
      wrapper = document.querySelector('.section-two__slider-wrapper'),
      inner = document.querySelector('.section-two__slider-inner'),
      bigSlides = inner.querySelectorAll('.big-slide'),
      bigSlide = inner.querySelector('.big-slide'),
      slide = bigSlide.querySelector('.section-two__slide'),
      SlideWidth = window.getComputedStyle(slide).width,
      bigSlideWidth = window.getComputedStyle(bigSlide).width,
      wrapperWidth = window.getComputedStyle(wrapper).width;

let offset = 0;
      
function modify() {
    inner.style.width = 100 * bigSlides.length + '%';
    wrapper.style.overflow = 'hidden';

    bigSlides.forEach(item => item.style.width = wrapperWidth);
}
modify();

btnNext.addEventListener('click', () => {
    if (offset == +wrapperWidth.slice(0, wrapperWidth.length - 2) * (bigSlides.length - 1)) {
        offset = 0;
    } else {
        offset += +wrapperWidth.slice(0, wrapperWidth.length - 2);
    }

    inner.style.transform = `translateX(-${offset}px)`;
});

btnPrev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +wrapperWidth.slice(0, wrapperWidth.length - 2) * (bigSlides.length - 1) 
    } else {
        offset -= +wrapperWidth.slice(0, wrapperWidth.length - 2)
    }
    inner.style.transform = `translateX(-${offset}px)`;
});

// form
const forms = document.querySelectorAll('form');

forms.forEach((form, i) => {
    const button = form.querySelector('button');


    const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {

            input.addEventListener('input', (e) => {

                e.preventDefault()
                const target = e.target;
                
                
                if (target.id == 'tel') {
                    const value = target.value;
                    if (value.match(/^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/)) {
                        target.classList.add('valid')
                        target.classList.remove('invalid')
                        button.removeAttribute('disabled')
                        button.classList.remove('disabled')
                    } else {
                        
                        target.classList.remove('valid')
                        target.classList.add('invalid')
                        button.setAttribute('disabled','disabled');
                        button.classList.add('disabled')
                    }
                }
                if (target.id == 'email') {
                    const value = target.value;
                    if (value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g)) {
                        target.classList.add('valid')
                        target.classList.remove('invalid')
                        button.removeAttribute('disabled')
                        button.classList.remove('disabled')
                        
                    } else {
                        target.classList.remove('valid')
                        target.classList.add('invalid')
                        button.setAttribute('disabled','disabled');
                        button.classList.add('disabled')
                    }
                }    
            })
            
        })


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form).entries());

        data.formID = i;
        postData(data, form);

        console.log(data);

        

        inputs.forEach(input => {
            input.classList.remove('valid')
            input.classList.remove('invalid')
        })
    })
})

function postData(data, form) {
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        jsonResponse = response.text()
    })
    .then(jsonResponse => {
        console.log(jsonResponse)
    })
    .catch(() => {
        console.log('data not posted')
    })
    .finally(() => {
        form.reset();
    })
}

const pages = document.querySelectorAll('.page'),
      toggles = document.querySelectorAll('.toggle');


toggles.forEach(tog => {
    tog.addEventListener('click', e => {
        const t = e.target;

        if (t.id) {
            e.preventDefault()
            pages.forEach(page => {
                page.classList.remove('active')
    
                
                if (t.id == page.getAttribute('data-page')) {
                    page.classList.add('active')
                }
    
            })
        }
        
    })
})


const buttonAll = document.querySelectorAll('.portfolio_page__seeal');

buttonAll.forEach((btn, i) => {
    btn.addEventListener('click', ()=> {
        addImg(i)
    })
})

function addImg(index) {
    buttonAll[index].style.display = 'none';

    const imagesSRC = [
        ['/image/work1row1img1.png',
         '/image/work1row1img2.png',
         '/image/work1row1img3.png',
         '/image/work1row1img4.png'],
        ['/image/work1row2img1.png',
         '/image/work1row2img2.png',
         '/image/work1row2img3.png',
         '/image/work1row2img4.png']
    ];
    const imagesBlock = document.querySelectorAll('.portfolio_page__images');

    class Image {
        constructor(imageBlock) {
            this.imageBlock = imageBlock;
        }

        render() {

            for (let i = 0; i < imagesSRC.length; i++) {
                const parent = document.createElement('div');
                parent.classList.add('portfolio_page__images-row');

                imagesSRC[i].forEach(item => {
                    const img = document.createElement('img');
                    img.setAttribute('src', item);
                    parent.append(img);
                });
                
                this.imageBlock[index].style.height = '1180px';
                this.imageBlock[index].append(parent);
            }
        }
    }
    new Image(imagesBlock).render()
}
