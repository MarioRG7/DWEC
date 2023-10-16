let email = prompt("Introduzca su email: ")

const emailPorcionado = email.split('@')

document.querySelector('.usuario').textContent = emailPorcionado[0].trim()
console.log(emailPorcionado[0].trim())