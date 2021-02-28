const $form = document.querySelector('.feedback-form')
const $alert = document.querySelector('.alert')

let data = { email: null }

$form.addEventListener('submit', function (event) {
    event.preventDefault()

    data.email = $form.children[0].value

    function showMessage(element) {
        element.style.display = 'flex'

        setTimeout(() => {
            element.style.display = 'none'
        }, 3000);
    }

    fetch('../scripts/mail.js', {
        method: 'POST',
        body: `${JSON.stringify(data)}`
    }).then(showMessage($alert))


    $form.children[0].value = ' '
})

const $slider = document.querySelector('.slider')
const $track = document.querySelector('.slider-track')
const $sliderItems = document.querySelectorAll('.slider-item')
const $btnLeft = document.querySelector('.slider__left')
const $btnRight = document.querySelector('.slider__right')

const slidesToShow = 1
const slidesToScroll = 1
const itemWidth = $slider.clientWidth / slidesToShow
const widthToScroll = itemWidth * slidesToScroll

let position = 0

$sliderItems.forEach(item => {
    item.style.minWidth = `${itemWidth}px`
})

$btnRight.addEventListener('click', () => {
    const itemsLeft = $sliderItems.length - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth

    position -= itemsLeft >= slidesToScroll ? widthToScroll : itemsLeft * itemWidth

    setPosition()
    checkBtns()
})

$btnLeft.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth

    position += itemsLeft >= slidesToScroll ? widthToScroll : itemsLeft * itemWidth

    setPosition()
    checkBtns()
})

function setPosition() {
    $track.style.transform = `translateX(${position}px)`
}

function checkBtns() {
    $btnLeft.disabled = position === 0
    $btnRight.disabled = position <= -($sliderItems.length - slidesToShow) * itemWidth
}

checkBtns()