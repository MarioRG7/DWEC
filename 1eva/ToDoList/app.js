const formulario = document.querySelector("#formulario")

formulario.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    const text = document.querySelector("#input").value;
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tarea = tareas.find(item => item.texto === text);
    if(tarea)alert("no se puede agregar el elemento", text)
    if (text && !tarea){
        tareas.unshift({ texto: text, completada: false });
        localStorage.setItem("tareas", JSON.stringify(tareas));
        document.querySelector("#input").value = "";
        pintar();
    }
})


function pintar(){
    const lista = document.querySelector("#lista-tareas");
    lista.innerHTML = '';
    const template = document.getElementById("temp");
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas.forEach(tarea => {
        const p = template.content.querySelector("p");
        p.textContent = tarea.texto;

        const clone = document.importNode(template.content, true);
        if (tarea.completada) {
            clone.querySelector("div").classList.remove('alert-warning');
            clone.querySelector("div").classList.add("alert-success");
        }
        const items = clone.querySelectorAll("i")
        items.forEach((i)=>{
            i.addEventListener("click", (e)=>{
                if(e.target.classList.contains("fa-check-circle")){
                    const abuelo = e.target.parentNode.parentNode
                    const text = abuelo.querySelector("p").textContent
                    const tarea = tareas.find(item => item.texto === text);
                    tarea.completada = true
                    const tareasFiltradas = tareas.filter(item => item !== tarea);
                    tareasFiltradas.push(tarea)
                    localStorage.setItem("tareas", JSON.stringify(tareasFiltradas));
                    pintar()
    
                }
                if(e.target.classList.contains("fa-times-circle")){
                    const abuelo = e.target.parentNode.parentNode
                    const text = abuelo.querySelector("p").textContent
                    const tarea = tareas.find(item => item.texto === text);
                    const tareasFiltradas = tareas.filter(item => item !== tarea);
                    localStorage.setItem("tareas", JSON.stringify(tareasFiltradas));
                    pintar()
                }
            })
        })
        lista.appendChild(clone);
    });

    
}
document.addEventListener("DOMContentLoaded",()=>{
    pintar()
})
