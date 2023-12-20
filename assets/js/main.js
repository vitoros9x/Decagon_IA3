const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

;(() => {
  const imageThumbItems = [...$$('.picture-gallery__thumb-item img')]
  const imageThumbWrapper = [...$$('.picture-gallery__thumb-item')]
  const bigImage = $('.picture-gallery__big-image img')
  const modal = $('.zoom-modal')
  const zoomImage = $('.zoom-modal img')
  const closeButton = $('.btn-close')
  let currentImageChoosingIndex = 0
  const ARROW_LEFT_KEYCODE = 'ArrowLeft'
  const ARROW_RIGHT_KEYCODE = 'ArrowRight'

  // Click thumbs
  imageThumbItems.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      const urlImage = e.target.src
      $('.picture-gallery__thumb-item.active').classList.remove('active')

      bigImage.src = urlImage
      imageThumbWrapper[i].classList.add('active')
      currentImageChoosingIndex = i
    })
  })

  // Open modal image
  bigImage.onclick = (e) => {
    const urlImage = e.target.src

    zoomImage.src = urlImage
    modal.classList.remove('hidden')
  }

  // Close modal
  const closeModal = () => {
    modal.classList.add('hidden')
    zoomImage.src = ''
  }

  closeButton.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.currentTarget === modal) closeModal()
  })

// Handle change image with keyboard
  const handleChangeImageOnKeyBoard = (index) => {
    imageThumbItems[index].click()
    imageThumbItems[index].scrollIntoView()
  }

  window.addEventListener('keydown', (e) => {
    const keyCode = e.key

    if (keyCode === ARROW_LEFT_KEYCODE) {
      if (currentImageChoosingIndex === 0) return

      currentImageChoosingIndex -= 1
      handleChangeImageOnKeyBoard(currentImageChoosingIndex)
    }

    if (keyCode === ARROW_RIGHT_KEYCODE) {
      if (currentImageChoosingIndex === imageThumbWrapper.length - 1) return

      currentImageChoosingIndex += 1
      handleChangeImageOnKeyBoard(currentImageChoosingIndex)
    }
  })

  window.addEventListener('resize', (e) => {
    const screenWidth = e.target.innerWidth

    if (screenWidth < 500) {
      imageThumbWrapper.forEach(imageItem => {
        imageItem.style.width = `${(screenWidth - 24) / 3 - 10}px`
      })

      return
    }

    imageThumbWrapper.forEach(imageItem => {
      imageItem.style.width = ''
    })
  })
})()
