class Persona{

    constructor (nombre, apellidos, poblacion, edad, estudios, carnet){
        if(isNaN(nombre) && isNaN(apellidos) && isNaN(poblacion) && !isNaN(edad) && isNaN(estudios) && isNaN(carnet)){
            this.nombre= nombre
            this.apellidos = apellidos
            this.poblacion= poblacion
            this._edad = edad
            this._estudios = estudios
            this.carnet = carnet
        }else{
            throw new Error("Los tipos de datos no son validos")
        }

        
    }

    get edad(){
        return this._edad
    }

    set edad(edad){
        this._edad = edad
    }

    get estudios(){
        return this._estudios
    }

    set estudios(estudios){
        this._estudios = estudios
    }
    
}

function compararPorNombre(a, b) {
    const nombreA = a.nombre.toUpperCase();
    const nombreB = b.nombre.toUpperCase();

    if (nombreA < nombreB) {
        return -1;
    }
    if (nombreA > nombreB) {
        return 1;
    }
    return 0;
}

const arrayPersonas = new Array()


arrayPersonas.push(new Persona('Juan', 'Gómez Rodríguez', 'Madrid', 30, 'Universidad', '12345678A'))
arrayPersonas.push(new Persona('Ana', 'Rodríguez Fernández', 'Barcelona', 35, 'Master', '23456789B'))
arrayPersonas.push(new Persona('Carlos', 'Fernández López', 'Valencia', 28, 'Bachillerato', '34567890C'))
arrayPersonas.push(new Persona('María', 'López Martínez', 'Sevilla', 29, 'Universidad', '45678901D'))
arrayPersonas.push(new Persona('Luis', 'Martínez Pérez', 'Zaragoza', 27, 'Master', '56789012E'))
arrayPersonas.push(new Persona('Laura', 'Pérez Torres', 'Málaga', 32, 'Bachillerato', '67890123F'))
arrayPersonas.push(new Persona('Pedro', 'Torres Sánchez', 'Murcia', 31, 'Universidad', '78901234G'))
arrayPersonas.push(new Persona('Isabel', 'Sánchez Díaz', 'Bilbao', 26, 'Master', '89012345H'))
arrayPersonas.push(new Persona('José', 'Díaz García', 'Alicante', 33, 'Bachillerato', '90123456J'))
arrayPersonas.push( new Persona('Sofía', 'García Gómez', 'Córdoba', 29, 'Universidad', '01234567K'))
arrayPersonas.sort(compararPorNombre)

console.log(arrayPersonas)

const map = new Map()

arrayPersonas.forEach((value)=>{
    map.set(value.carnet, value)
})

console.log(map)

table = document.querySelector("tbody")



map.forEach((value,key)=>{
    table.innerHTML +=`<tr>
    <th>${key}</th>
    <td>${value.nombre}</td>
    <td>${value.apellidos}</td>
    <td>${value.poblacion}</td>
    <td>${value.edad}</td>
    <td>${value.estudios}</td>
    </tr>`
})



