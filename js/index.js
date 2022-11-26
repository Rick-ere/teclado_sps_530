function Init() {
  // ELEMENTOS
  let element_temp = null;
  // const caja = document.getElementById("caja");
  const tbxContenido = document.getElementById("contenido");
  const tbxFont_size = document.getElementById("font_size");
  const tbxFont_bold = document.getElementById("font_bold");
  const tbxFotn_ancho = document.getElementById("fotn_ancho");
  const tbxFotn_alto = document.getElementById("fotn_alto");

  const tbxSpan_key = document.getElementById("span_key");
  const tbxSpan_number = document.getElementById("span_number");
  const cpkColor_fondo = document.getElementById("color_fondo");
  const cpkColor_letra = document.getElementById("color_letra");

  document.getElementById("btn_cerrar").addEventListener("click", Cerrar);

  function rgbToHex2(a) {
    if (~a.indexOf("#")) return a;
    a = a.replace(/[^\d,]/g, "").split(",");
    return (
      "#" +
      ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1)
    );
  }

  const GetScale = (data) => {
    let scale = { ancho: 1, alto: 1 };
    if (data != "none" && data != "") {
      let numb = data.replace("matrix", "");
      numb = numb.replace("(", "");
      numb = numb.replace(")", "");
      numb = numb.split(",");

      for (const key in numb) {
        if (key == 0) scale.ancho = numb[key].trim();
        if (key == 3) scale.alto = numb[key].trim();
      }
    }
    return scale;
  };

  const GetElement = () => {
    console.log("Holaaa");
    const container = document.getElementById("container");
    let number = 1;

    tbxContenido.addEventListener("keyup", HandlerGetSetNewValues);
    tbxFont_size.addEventListener("keyup", HandlerGetSetNewValues);
    tbxFont_bold.addEventListener("keyup", HandlerGetSetNewValues);
    tbxFotn_ancho.addEventListener("keyup", HandlerGetSetNewValues);
    tbxFotn_alto.addEventListener("keyup", HandlerGetSetNewValues);

    tbxFont_size.addEventListener("change", HandlerGetSetNewValues);
    tbxFont_bold.addEventListener("change", HandlerGetSetNewValues);
    tbxFotn_ancho.addEventListener("change", HandlerGetSetNewValues);
    tbxFotn_alto.addEventListener("change", HandlerGetSetNewValues);

    tbxSpan_key.addEventListener("keyup", HandlerGetSetNewValues);
    tbxSpan_number.addEventListener("keyup", HandlerGetSetNewValues);
    cpkColor_fondo.addEventListener("change", HandlerGetSetNewValues);
    cpkColor_letra.addEventListener("change", HandlerGetSetNewValues);

    config_tecla.forEach((fila) => {
      const div_fila = document.createElement("div");
      div_fila.className = "fila";
      div_fila.id = `fila_${fila._id}`;

      fila.cols_btn.forEach((col_btn) => {
        const div = GetInitBtn(fila.index, col_btn.index, number, col_btn);
        div_fila.appendChild(div);
        number++;
        // col_btn.fontSizeValue;
      });

      container.appendChild(div_fila);
    });
  };

  const GetInitBtn = (row_index, col_index, number, c_btn) => {
    // console.log(`FILA: ${row_index} COLUMNA: ${col_index} NUMERO: ${number}`);

    const div = document.createElement("div");
    div.className = "cuadro";
    div.style = `${c_btn.btnStyles}`;
    div.id = `btn_${c_btn._id}`;
    // div.innerText = `${c_btn.value}`;
    if (c_btn.isVisibleNumber) div.appendChild(GetInitSpanNumber(c_btn.number));
    else div.appendChild(GetInitSpanNumber(""));
    div.appendChild(GetInitP(c_btn));
    div.appendChild(GetInitSpanKey(c_btn.key));

    div.addEventListener("click", HandlerClick);
    return div;
  };

  const GetInitP = (c_btn) => {
    const p = document.createElement("p");
    p.className = "";
    p.style = `${c_btn.valueStyles}`;
    p.innerText = `${c_btn.value}`;
    return p;
  };

  const GetInitSpanNumber = (number) => {
    const span = document.createElement("span");
    span.className = "span_number";
    span.id = `span_${number}`;
    span.innerText = `${number}`;
    return span;
  };

  const GetInitSpanKey = (key) => {
    const span = document.createElement("span");
    span.innerText = `${key}`;
    span.className = `span_key ${key.length != 1 ? "font10" : "font12"}`;
    // console.log(key.length)
    return span;
  };

  const HandlerClick = (event) => {
    // event.stopPropagation();
    // console.log(event.target);
    modal.style.display = "block";
    element_temp = event.currentTarget;
    SetValues(element_temp);
  };

  const SetValues = (element) => {
    // GET
    const parrafo = element.querySelector("p");
    const span_key = element.querySelector(".span_key");
    const span_number = element.querySelector(".span_number");

    // SET
    tbxContenido.value = parrafo.textContent;
    tbxFont_size.value = getComputedStyle(parrafo).fontSize.replace("px", "");

    tbxSpan_key.value = span_key.textContent;
    tbxSpan_number.value = span_number.textContent;
    tbxFont_bold.value = getComputedStyle(parrafo).fontWeight;

    // matrix(1, 0, 0, 1, 0, 0)
    let transformacion = getComputedStyle(parrafo).transform;
    const { ancho, alto } = GetScale(transformacion);
    tbxFotn_ancho.value = ancho;
    tbxFotn_alto.value = alto;

    color = getComputedStyle(element).backgroundColor;
    cpkColor_fondo.value = rgbToHex2(color);

    color = getComputedStyle(parrafo).color;
    cpkColor_letra.value = rgbToHex2(color);
  };

  const HandlerGetSetNewValues = (event) => {
    // console.log(event);
    let element = null;

    if (event.target == tbxContenido) {
      element = element_temp.querySelector("p");
      element.textContent = tbxContenido.value;
    } else if (event.target == tbxSpan_key) {
      element = element_temp.querySelector(".span_key");
      element.textContent = tbxSpan_key.value;
    } else if (event.target == tbxSpan_number) {
      element = element_temp.querySelector(".span_number");
      element.textContent = tbxSpan_number.value;
    } else if (event.target == cpkColor_fondo) {
      element_temp.style = `background-color: ${cpkColor_fondo.value}`;
    } else if (event.target == cpkColor_letra) {
      element = element_temp.querySelector("p");
      element.style.color = cpkColor_letra.value;
    } else if (event.target == tbxFont_size) {
      element = element_temp.querySelector("p");
      element.style.fontSize = `${tbxFont_size.value}px`;
    } else if (event.target == tbxFont_bold) {
      element = element_temp.querySelector("p");
      element.style.fontWeight = `${tbxFont_bold.value}`;
    } else if (event.target == tbxFotn_ancho || event.target == tbxFotn_alto) {
      element = element_temp.querySelector("p");
      element.style.transform = `scale(${tbxFotn_ancho.value},${tbxFotn_alto.value})`;
    }
  };

  function Cerrar(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    modal.style.display = "none";
  }
  GetElement();
}

Init();
