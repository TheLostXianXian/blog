const createDiv = () => {
  var hello = document.createElement('div')
  hello.textContent = `Hello Webpack4!`
  document.body.appendChild(hello)
}

createDiv()