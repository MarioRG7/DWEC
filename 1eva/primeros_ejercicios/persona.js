class Persona{
    constructor(nombre,apellido,año,estudios,poblacion){
        this._nombre=nombre
        this._apellido=apellido
        this._año=año
        this._estudios=estudios
        this._poblacion=poblacion
    }

    get nombre(){
        return this._nombre
    }

    get apellido(){
        return this._apellido
    }

    get año(){
        return this._año
    }

    get estudios(){
        return this._estudios
    }

    get poblacion(){
        return this._poblacion
    }
}

const persona1 = new Persona("Mario","Ramos",19,"DAW","Toledo")
const persona2 = new Persona("Mario","Ramos",19,"DAW","Toledo")
const persona3 = new Persona("Mario","Ramos",19,"DAW","Toledo")

const array = [persona1,persona2,persona3]

const fun = (array)=>{
    array.forEach((element) => {
        console.log(element.nombre + " " + element.año)
    });
}

fun(array);



function Hola (valor){
    console.log(valor)
}

Hola("Hola")
Hola("Tonto")



const arry = [1,2,3,4]

arry.forEach(function(value, index){
    console.log(value)
    console.log(index)
})