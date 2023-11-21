//Obtenemos los diferentes elementos que necesitamos
const btnUsuarios = document.getElementById("usuarios")
const btnPosts = document.getElementById("posts")
const app = document.getElementById("app")

const templateTr = document.getElementById("tr").content
const templateTable = document.getElementById("table").content

const loading = document.getElementById("loading");
const templateInfo=document.getElementById("infoUser").content
const templatePosts = document.getElementById("feed").content

//Creamos una funcion asincrona para el fetch de los usuarios
const fetchUsers = async()=>{
    return await fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>{
        //comprobamos si la respuesta nos a dado algun error
        if(!response.ok) throw new Error("Error en la base de datos")
        //si no nos da error lo convertimos en json
        return response.json()
    })
    .catch(error=>{
        //si da error lo mostramos
        console.error(error)
    })
}
//Creamos una funcion asincrona para el fetch de un unico usuario y seguimos los pasos del anterior
const fetchUser = async(id)=>{
    return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response=>{
        //verificamos si hay algun error
        if(!response.ok) throw new Error("Error en la base de datos")
        //si no pues lo returnamos convertido en json
        return response.json()
    })
    .catch(error=>{
        //y si si hay error lo sacamos por la consola
        console.error(error)
    })
}

//Por ultimo creamos el fetch para sacar los posts de lso usuarios o todos
const fetchPosts = async(id)=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts${id != "" ? `?userId=${id}` : ""}`)
    .then(response=>{
        //verificamos que este todo bien
        if(!response.ok) throw new Error("Error en la base de datos")
        //si lo esta lo returnamos convertido en json
        return response.json()
    })
    .then(data =>{
        //como necesitamos que este en formato array si o si para mas adelante lo convertimos en array si es necesario
        const dataArray = Array.isArray(data) ? data : [data];
        return dataArray
        
        
    })
    .catch(error=>{
        //si da error lo returnamos por consola
        console.error(error)
    })
}

//creamos una funcion para pintar la informacion de un usuario
function pintarUser(id){
    //limpiamos la pantalla
    app.innerHTML=""
    //usamos la funcion de fetch usuarios
    fetchUser(id)
    .then(user=>{
        //creamos un clone de la plantilla que vamos a usar
        const clon = templateInfo.cloneNode(true)
        //Ahora obtenemos los elementos que deseamos modificar
        const name = clon.getElementById("name")
        const username = clon.getElementById("username")
        const email = clon.getElementById("email")
        const web = clon.getElementById("website")
        const company = clon.getElementById("company")
        const phone = clon.getElementById("phone")
        const address = clon.getElementById("address")
        const btn = clon.querySelector("button")
        //añadimos un evento para poder pintar los posts del usuario
        btn.addEventListener('click',()=>{
            pintarPosts(user.id)
        })
        //acomodamos los datos que tenemos en la plantilla
        name.textContent= user.name
        username.textContent= user.username
        email.textContent= user.email
        web.textContent= user.website
        company.textContent= user.company.name
        phone.textContent= user.phone
        address.textContent= user.address.street + ","+ user.address.suite+ ","+ user.address.city+ ","+user.address.zipcode
        //Por ultimo lo añadimos a la app
        app.appendChild(clon)
    })

}

//Funcion para pintar los post de un usuario o de todos
function pintarPosts(id = ""){
    //el parametro de id sera el que le mandemos o si no le mandamos ninguno sera ""
    //borramos la pantalla
    app.innerHTML=""
    //como tenemos que mostrar de 5 en 5 ponemos los que vamos a mostrar ahora
    let postsToShow = 5;
    //le añadimos un poco de html para que quede bonito 
    app.innerHTML=`<div class="container mt-4">
        <h1 class="mb-4">Feed de Publicaciones</h1>
        <div id="post-feed"></div>
    </div>`

   //y ahora hacemos una funcion para pintarlos
    const renderPosts = () => {
        //limpiamos la feed de post por si hay algo
        document.querySelector("#post-feed").innerHTML=""
        //hacemos el fetch de post
        fetchPosts(id)
            .then(posts => {
                //primero vamos a coger los post que vamos a mostrar, de inicio seran 5 pero a medida que el usuario vaya cargando mas se mostraran mas
                postsSlice= posts.slice(0, postsToShow)
                //recorremos el array con un foreach
                postsSlice.forEach(post => {
                    //creamos un clon de la plantilla
                    const clon = templatePosts.cloneNode(true);
                    //y recogemos los elementos que vamos a emplear
                    const title = clon.querySelector(".card-title");
                    const text = clon.querySelector(".text");
                    const user = clon.querySelector(".usuario");
                    //le añadimos un dataset para que el enlace lo pueda usar al hacer la funcion que tiene en el onclick
                    user.dataset.idUser = post.userId
                    //ponemos la informacion que va en la plantilla
                    title.textContent = post.title;
                    text.textContent = post.body;
                    user.textContent = "usuario: " + post.userId
                    //añadimos el post a post-feed
                    document.querySelector("#post-feed").appendChild(clon);
                });
                //ahora vamos a crear un boton para cargar mas posts que solo se muestre si hay mas
                //de 5 post o no sea el ultimo quinteto de posts
                if(postsSlice.length >= 5 && postsSlice.length < posts.length){
                    //añadimos el boton al html
                    document.querySelector("#post-feed").innerHTML += `<button id="more" class="btn btn-primary">Mostrar mas</button>`
                    //le añadimos un evento para que cada vez que el usuario le de se muestren 5 posts mas y se vuelvan a renderizar
                    document.getElementById("more").addEventListener('click',()=>{
                        postsToShow += 5;
                        renderPosts();
                    })
                }
            });
    };
    //Iniciamos la funcion para pintar los posts
    renderPosts();
    
}
//Creamos una funcion para pintar todos los usuarios
function pintarUsers(){ 
    //usamos el fetch de users
    fetchUsers()
    .then((users)=>{
        //limpiamos la pantalla
        app.innerHTML=''
        //clonamos la plantilla
        const clone = templateTable.cloneNode(true)
        //y obtenemos el tbody
        const tbody = clone.querySelector("tbody")
        //recorremos el users
        users.forEach(user => {
            //clonamos la plantilla para los tr
            const clon = templateTr.cloneNode(true)
            //y obtenemos los elementos necesarios
            const id = clon.querySelector(".id")
            const username = clon.querySelector(".username")
            username.dataset.idUser = user.id
            const email = clon.querySelector(".email")
            const button = clon.querySelector("button")
            //agregamos la informacion
            id.textContent=user.id
            username.textContent=user.username
            //y creamos dos eventos, uno para ver la informacion de un usuario, y otro para ver sus posts
            username.addEventListener('click',()=>{
                pintarUser(user.id)
            })
            button.addEventListener('click', ()=>{
                pintarPosts(user.id)
            })
            email.textContent=user.email
            //por ultimo lo añadimos al tbody
            tbody.appendChild(clon)

        });
        //y al final añadimos la tabla entera al html
        app.appendChild(clone)
    })
}

//creamos los eventos para el menu de navegacion
btnUsuarios.addEventListener("click",()=>{
    pintarUsers()
})

btnPosts.addEventListener("click",()=>{
    pintarPosts()
})