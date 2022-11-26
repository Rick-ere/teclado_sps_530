// ELEMENTOS
const tbxContenido = document.getElementById("contenido");
const btn_cerrar = document.getElementById("btn_cerrar").addEventListener("click", Cerrar);
let element_temp = null;

const GetElement = () => {
    console.log("Holaaa");
    const container = document.getElementById("container");
    let number = 1;

    tbxContenido.addEventListener("keyup", GetSetNewValues);

    config_tecla.forEach(fila => {
        const div_fila = document.createElement("div");
        div_fila.className = "fila";
        div_fila.id = `fila_${fila._id}`;

        fila.cols_btn.forEach(col_btn => {
            const div = GetInitBtn(fila.index, col_btn.index, number, col_btn);
            div_fila.appendChild(div);
            number++;
            col_btn.fontSizeValue
        });

        container.appendChild(div_fila);
    });
}

const GetInitBtn = (row_index, col_index, number, c_btn) => {
    // console.log(`FILA: ${row_index} COLUMNA: ${col_index} NUMERO: ${number}`);

    const div = document.createElement("div");
    div.className = "cuadro";
    div.style = `${c_btn.btnStyles}`;
    div.id = `btn_${c_btn._id}`;
    // div.innerText = `${c_btn.value}`;
    if (c_btn.isVisibleNumber) div.appendChild(GetInitSpanNumber(c_btn.number));
    div.appendChild(GetInitP(c_btn));
    div.appendChild(GetInitSpanKey(c_btn.key));
    div.addEventListener("click", HandlerClick);
    //div.addEventListener("", HandlerClick);
    div.addEventListener("click", (event)=>{
        event.target.addEventListener("click", (e)=>{
            console.log("HOLAAAA")
        })
    })
    /*div.addEventListener("click", (event)=>{
        // event.stopImmediatePropagation();
        // event.stopPropagation();

        // console.log(event.currentTarget);
        // console.log(event);

        if(event.target.nodeName == "DIV"){
            console.log("CUADRO")
            const parrafo =  event.target.querySelector('p');
            SetValue(parrafo);
        }
        else if(event.target.nodeName == "P"){
            console.log("PARRAFO");
            SetValue(event.target);
        }
        else if(event.target.nodeName == "SPAN"){
            console.log("SPAN")
        }
    });*/
    return div;
}

const GetInitP = (c_btn) => {
    const p = document.createElement("p");
    p.className = "";
    p.style = `${c_btn.valueStyles}`;
    p.innerText = `${c_btn.value}`;
    return p;
}

const GetInitSpanNumber = (number) => {
    const span = document.createElement("span");
    span.className = "span_number";
    span.id = `span_${number}`;
    span.innerText = `${number}`;
    return span;
}

const GetInitSpanKey = (key) => {
    const span = document.createElement("span");
    span.innerText = `${key}`;
    span.className = `span_key ${key.length != 1 ? 'font10':'font12'}`;
    // console.log(key.length)
    return span;
}

const HandlerClick = (event) => {
    // event.stopPropagation();
    // console.log(event.target);
    modal.style.display = "block";
    if(event.target.nodeName == "DIV"){
        console.log("CUADRO")
        const parrafo =  event.target.querySelector('p');
        SetValues(parrafo);
        element_temp = parrafo;
    }
    else if(event.target.nodeName == "P"){
        console.log("PARRAFO");
        SetValues(event.target);
        element_temp = event.target;
    }
    else if(event.target.nodeName == "SPAN"){
        console.log("SPAN")
        SetValues(event.target);
        element_temp = event.target;
    }

}

const SetValue = (target)=>{
    // console.log("ENTRADA", target);
    const compStyles = window.getComputedStyle(target);
    // const result = getComputedStyle(target, ":after").content;
    // console.log("STYLES", compStyles.getPropertyValue('font-size'));
    // console.log("STYLES2", compStyles);

    // valor = prompt("Ingrese valor: ", target.textContent);
    // console.log(valor);    

    // if(valor != null && valor != ""){
    //     target.innerText = valor;
    //     console.log(target);
    //     target.style.backgroundColor = "red";
    // }
}

const SetValues = (target)=>{
    tbxContenido.value = target.textContent;
}

const GetSetNewValues = ()=>{
    // console.log(e.target);
    element_temp.textContent = tbxContenido.value;
}

function Cerrar (event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    modal.style.display = "none";
}

GetElement();