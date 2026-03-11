
import './style.css'
import './animation.js'

const restartbtn = document.querySelector('.refresh')

restartbtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
})