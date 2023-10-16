const x = prompt("introduzca un número: ")
if(!isNaN(x) && x >= 0){
    const ul = document.createElement('ul')
    
    for (i = 0; i <= 10 ; i++){
        console.log(x+ " X " + i + " = " + x*i)
        const li = document.createElement('li')
        li.textContent = x+ " X " + i + " = " + x*i
        ul.appendChild(li)
    }
    document.body.appendChild(ul)
}else{
    console.warn("Número invalido")
}