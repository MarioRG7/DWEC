const btnUsuarios = document.getElementById("usuarios")
const btnPosts = document.getElementById("posts")
const app = document.getElementById("app")

const templateTr = document.getElementById("tr").content
const templateTable = document.getElementById("table").content

const loading = document.getElementById("loading");
const templateInfo=document.getElementById("infoUser").content
const templatePosts = document.getElementById("feed").content
const fetchUsers = async()=>{
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>{
        if(!response.ok) throw new Error("Error en la base de datos")
        return response.json()
    })
    .catch(error=>{
        console.error(error)
    })
}
const fetchUser = async(id)=>{
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response=>{
        if(!response.ok) throw new Error("Error en la base de datos")
        return response.json()
    })
    .catch(error=>{
        console.error(error)
    })
}
const fetchPosts = async(id)=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts${id != "" ? `?userId=${id}` : ""}`)
    .then(response=>{
        if(!response.ok) throw new Error("Error en la base de datos")
        return response.json()
    })
    .then(data =>{
        const dataArray = Array.isArray(data) ? data : [data];
        return dataArray
        
        
    })
    .catch(error=>{
        console.error(error)
    })
}
function pintarUser(id){
    app.innerHTML=""
    fetchUser(id)
    .then(user=>{
        const clon = templateInfo.cloneNode(true)
        const name = clon.getElementById("name")
        const username = clon.getElementById("username")
        const email = clon.getElementById("email")
        const web = clon.getElementById("website")
        const company = clon.getElementById("company")
        const phone = clon.getElementById("phone")
        const address = clon.getElementById("address")
        const btn = clon.querySelector("button")
        btn.addEventListener('click',()=>{
            pintarPosts(user.id)
        })
        name.textContent= user.name
        username.textContent= user.username
        email.textContent= user.email
        web.textContent= user.website
        company.textContent= user.company.name
        phone.textContent= user.phone
        address.textContent= user.address.street + ","+ user.address.suite+ ","+ user.address.city+ ","+user.address.zipcode
        app.appendChild(clon)
    })

}
function pintarPosts(id = ""){
    app.innerHTML=""
    let postsToShow = 5;
    app.innerHTML=`<div class="container mt-4">
        <h1 class="mb-4">Feed de Publicaciones</h1>
        <div id="post-feed"></div>
    </div>`

   
    const renderPosts = () => {
        document.querySelector("#post-feed").innerHTML=""
        fetchPosts(id)
            .then(posts => {
                console.log(posts);
                postsSlice= posts.slice(0, postsToShow)
                postsSlice.forEach(post => {
                    const clon = templatePosts.cloneNode(true);
                    const title = clon.querySelector(".card-title");
                    const text = clon.querySelector(".text");
                    const user = clon.querySelector(".usuario");
                    user.dataset.idUser = post.userId
                    title.textContent = post.title;
                    text.textContent = post.body;
                    user.textContent = "usuario: " + post.userId
                    document.querySelector("#post-feed").appendChild(clon);
                });
                if(postsSlice.length >= 5 && postsSlice.length < posts.length){
                    document.querySelector("#post-feed").innerHTML += `<button id="more" class="btn btn-primary">Mostrar mas</button>`
                    document.getElementById("more").addEventListener('click',()=>{
                        postsToShow += 5;c
                        renderPosts();
                    })
                }
            });
    };
    renderPosts();
    
}
function pintarUsers(){ 
    fetchUsers()
    .then((users)=>{
        console.log(templateTable)
        
        app.innerHTML=''
        const clone = templateTable.cloneNode(true)
        const tbody = clone.querySelector("tbody")
        users.forEach(user => {
            const clon = templateTr.cloneNode(true)
            const id = clon.querySelector(".id")
            const username = clon.querySelector(".username")
            username.dataset.idUser = user.id
            const email = clon.querySelector(".email")
            const button = clon.querySelector("button")
            id.textContent=user.id
            username.textContent=user.username
            username.addEventListener('click',()=>{
                pintarUser(user.id)
            })
            button.addEventListener('click', ()=>{
                pintarPosts(user.id)
            })
            email.textContent=user.email
            tbody.appendChild(clon)

        });
        app.appendChild(clone)
    })
}


btnUsuarios.addEventListener("click",()=>{
    pintarUsers()
})

btnPosts.addEventListener("click",()=>{
    pintarPosts()
})