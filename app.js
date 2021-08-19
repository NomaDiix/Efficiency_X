const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;

    convert( inputValue);
});

//___________________________________________________________________________________________
function convert( codigo) {
    let mem_fisica = "";
    mem_fisica = Calculo_Fisica(codigo); //Paso el texto y Calculo las memorias y tiempo
    
    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}
//___________________________________________________________________________________________
function Calculo_Fisica(codigo) {

    var total = 0;
    var variable = "";
    var valor=0;
    const Datos_Type  = 0;
    
    var cadena=Datos_Type [variable,valor] = Calculo_Type(codigo);
    
    console.log("Fax "+ cadena);

    console.log(cadena[1]);
    total = CalculoF_Principal(codigo,total,cadena);//Calculo lo declarado en el programa principal
    
    return total;
}
//___________________________________________________________________________________________
function CalculoF_Principal(codigo,total,cadena) {
    var memoria_fisica = codigo;
    var codigo2 = codigo;

    const myRe = "(integer|char|real|boolean|string|"+cadena[0]+")"; //Extraemos todos los tipos de datos

    let cosa = new RegExp(myRe,"gim");
    console.log(cosa);
    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt =  /[-^](integer|char|real|boolean|string);/gim; //Para filtrar punteros

    console.log(cosa);


    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " ");
    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal

    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    console.log("Codigo: "+codigo2);
    
    memoria_fisica = codigo2.match(cosa); //Hago otro filtro sobre el texto ya recortado del programa principal
    

    console.log("memoria fisica:" + memoria_fisica);
    
    for (var i = 0; i < memoria_fisica.length;i++){//Una vez que tengo los datos filtrados, hago todas las operaciones
        
        punt.test(memoria_fisica[0]);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
        
        if(punt.test(memoria_fisica[i])){ //Si es puntero sumo 4bytes que es para todos igual
            total = total + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(memoria_fisica[i])){ total = total + 6; console.log("integer");} // 6 bytes
            else if(/char/gim.test(memoria_fisica[i])){ total = total + 1; console.log("char");} // 1 byte
            else if(/real/gim.test(memoria_fisica[i])){ total = total + 8; console.log("real");} // 8 bytes
            else if(/boolean/gim.test(memoria_fisica[i])){ total = total + 1; console.log("boolean");} // 1 bytes
            else if(cosa.test(memoria_fisica[i])){ total = total + cadena[1] + 1; console.log("cadena");} // Longitud + 1 bytes
        }
        
    }
    return total;
}
//___________________________________________________________________________________________
function Calculo_Type(codigo){
    var codigo2 = codigo;
    const cadenas = /(.+\s[=]\s)(string).+]/gim;
    const valor = /(string).+[\d]]/gim;
    const nombre = /\w.+\b(.+)?[=]/g;
    var valor_n = 0;
    var variable = codigo2;

    codigo2 = codigo.match(cadenas);
    codigo2=codigo2.toString();
    console.log(codigo2);

    variable = codigo2.match(nombre);
    variable = variable.toString();
    variable = variable.replace(/\s|[=]/g,'');
    console.log(variable);
    
    codigo2 = codigo2.match(valor);
    codigo2=codigo2.toString();
    console.log(codigo2);

    codigo2 = codigo2.replace(/[^(\d.+\b)]/gim,'');
    console.log(codigo2);
    valor_n = parseInt(codigo2,10);

    console.log('nombre: '+variable);
    console.log('Valor: '+valor_n);
    
    
    return [variable,valor_n];
}
