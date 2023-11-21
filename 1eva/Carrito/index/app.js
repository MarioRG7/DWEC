

const pintar=()=>{

}

const cards = document.getElementById("cards")
const templateCard = document.getElementById("template-card").content
const templateCarrito = document.getElementById("template-carrito").content
const templateFooter = document.getElementById("template-footer").content
const fragment = document.createDocumentFragment()
const carrito = document.getElementById("items")

const pintarCards = (data)=>{
    data.forEach(card => {
        const clone = document.importNode(templateCard, true);
        const titulo = clone.querySelector("h5")
        const precio = clone.querySelector(".año")
        const img = clone.querySelector("img")
        const button = clone.querySelector("button")
        titulo.textContent = card.title
        precio.textContent = card.precio
        img.src = card.thumbnailUrl
        button.addEventListener("click",(e)=>{
            añadirObjeto(card)
        })
        cards.appendChild(clone)
    });
}

const FetchItems = async()=>{
    return await fetch("./productos.json")
    .then(response=>{
      if(!response.ok) throw new Error("Error al ver los porductos")  
      return response.json()
    })
    .then(data=>{
        pintarCards(data);
    })
    .catch(error=>{
        console.error(error)
    })

}
const addCantidad= (e)=>{
    const abuelo = e.target.parentNode.parentNode
    const cantidad =  abuelo.querySelector(".cantidad")
    cantidad.textContent =  (parseInt(cantidad.textContent) + 1).toString();
}

const restarCantidad = (e)=>{
    const abuelo = e.target.parentNode.parentNode
    const cantidad =  abuelo.querySelector(".cantidad")
    if(cantidad.textContent === "1"){
        const tabla = abuelo.parentNode
        tabla.removeChild(abuelo)
    }else{
        cantidad.textContent =  (parseInt(cantidad.textContent) - 1).toString();
    }
    
}
const añadirObjeto = (product)=>{
    const clone = document.importNode(templateCarrito,true)
    const nombre = clone.querySelector(".nombre")
    const id = clone.querySelector("th")
    const cantidad = clone.querySelector(".cantidad")
    const add = clone.querySelector(".btn-info")
    const restar = clone.querySelector(".btn-danger")

    nombre.textContent = product.title
    id.textContent = product.id
    add.addEventListener("click", addCantidad)
    restar.addEventListener("click",restarCantidad  )
    
    carrito.appendChild(clone)
}
FetchItems()
