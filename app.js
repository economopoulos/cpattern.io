const eyeIcons = document.getElementsByClassName("fa-eye")
const eyeSlash = document.querySelector(".fa-eye-slash")
const msg = document.getElementById("msg")
const wavesContainer = document.getElementById("waves-container")
const circlesContainer = document.getElementById("circles-container")
const data = document.querySelector(".categories")
const categories = data.children
const cards = document.querySelectorAll(".card-container")
const cardsTitle = document.querySelectorAll(".card-title")
const copyIcons = document.getElementsByClassName("fa-copy")
const images = document.querySelectorAll(".card-img-top")
const toolTipCopy = document.querySelectorAll(".tooltip1")
const tweetBtn = document.getElementById("btn-nav")
// const toggleSwitch = document.querySelector('input[type="checkbox"]')
// const sunIcon = document.getElementById("sun-icon")

//tweet
tweetBtn.addEventListener("click", () => {
  const tweetText =
    "If you love creating SVG patterns and backgrounds, you should check this out. Generate fully customizable SVG patterns for free via @cpattern \n#svgpatterns #patterns #svgbackgrounds #cpattern cpattern.netlify.app"
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
  window.open(twitterUrl, "_blank")
})

// function darkMode() {
//   sunIcon.src = "images/night-mode.png"
// }

// function lightMode(){
//   sunIcon.src = "images/sun.png"
// }

//toggle switch
// toggleSwitch.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     document.documentElement.setAttribute("data-theme", "dark")
//     localStorage.setItem("theme", "dark")
//     darkMode()
//   } else {
//     document.documentElement.setAttribute("data-theme", "light")
//     localStorage.setItem("theme", "light")
//     lightMode()
//   }
// })

//check local storage for theme
const currentTheme = localStorage.getItem("theme")
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme)
  if (currentTheme === "dark") {
    toggleSwitch.checked = true
  }
}

//copy to clipboard on click
for (let i = 0; i < copyIcons.length; i++) {
  copyIcons[i].addEventListener("click", () => {
    if (images[i].classList.contains(`patterBackground-${i}`)) {
      const style = window.getComputedStyle(images[i], false).backgroundImage
      const finalStyle = `background-image: ${style};`
      navigator.clipboard.writeText(finalStyle).then(
        function () {
          toolTipCopy[i].classList.add("active")
          setTimeout(() => {
            toolTipCopy[i].classList.remove("active")
          }, 1500)
          console.log("copied to clipboard")
        },
        function () {
          console.error(error)
        }
      )
    }
  })
}

//change background at click, etc...
for (let i = 0; i < eyeIcons.length; i++) {
  eyeIcons[i].addEventListener("click", () => {
    if (document.body.className === `patterBackground-${i}`) {
      eyeIcons[i].classList.remove("fa-eye-slash")
      document.body.className = ""
      msg.classList.remove("bg-dark")
      msg.classList.add("bg-warning")
    } else {
      msg.classList.remove("bg-warning")
      msg.classList.add("bg-dark")
      document.body.className = `patterBackground-${i}`
      resetEyeIcons()
      eyeIcons[i].classList.add("fa-eye-slash")
    }
  })
}

function resetEyeIcons() {
  for (let i = 0; i < eyeIcons.length; i++) {
    eyeIcons[i].classList.remove("fa-eye-slash")
  }
}

//categories links ================//

//set active category and button
const btns = document.querySelectorAll(".btn")
btns.forEach((a) => {
  a.addEventListener("click", () => {
    resetLinks()
    a.classList.add("bg-warning")
    const buttonId = a.id
    comparison(buttonId)
  })
})

function comparison(buttonId) {
  cards.forEach((card) => {
    if (card.id === buttonId) {
      card.classList.remove("d-none")
      card.classList.add("d-block")
    }
    if (card.id !== buttonId) {
      card.classList.remove("d-block")
      card.classList.add("d-none")
    }
    if (buttonId === "all") {
      card.classList.remove("d-none")
      card.classList.add("d-block")
    }
  })
}
//remove active class
function resetLinks() {
  btns.forEach((a) => {
    a.classList.remove("bg-warning")
  })
}

//categories links ================//

//display the names on each card
for (category of categories) {
  cardsTitle.forEach((cardTitle) => {
    const cardRef =
      cardTitle.parentElement.parentElement.parentElement.parentElement
        .parentElement
    if (cardRef.id === category.id) {
      cardTitle.textContent = `${category.id}`
    }
  })
}
