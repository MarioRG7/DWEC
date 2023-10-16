let nombre = prompt("Introducce tu nombre: ")
let curso = prompt("Introducce tu curso: ")
let localidad = prompt("Introducce tu localidad: ")
let fechaInicio = prompt("Introducce la fecha inicio: ")
let fechaFin = prompt("Introducce la fecha final: ")


const texto = `Estimado ${nombre.trim()},<br><br>Bienvenido al curso de ${curso.trim()} que se celebrará en la localidad de ${localidad.trim()} entre las fechas ${fechaInicio.trim()} y ${fechaFin.trim()}. Espero que el curso se desarrolle según sus expectativas. Estaremos encantados de atenderle<br><br>Atentamente, <br>La dirección.
                `

document.querySelector('.texto').innerHTML = texto
    
console.log(texto.replace(/<br>/g, '\n'))