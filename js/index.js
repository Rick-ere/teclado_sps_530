const GetElement = () => {
    console.log("Holaaa");
    const container = document.getElementById("container");
    let number = 1;

    // for (let fila = 10; fila >= 1; fila--) {
    //     // FILA
    //     const div_fila = document.createElement("div");
    //     div_fila.className = "fila";
    //     div_fila.id = `fila_${fila}`;

    //     // COLUMNAS
    //     for (let col = 1; col <= 16; col++) {
    //         const div = GetInitBtn(fila, col, number);
    //         div_fila.appendChild(div);
    //         number++;
    //     }

    //     container.appendChild(div_fila);
    // }
    //GetCreateRows(container);
    //
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

const GetCreateRows = (container) => {
    let number = 1;

    for (let fila = 0; fila < 10; fila++) {
        let div_fila = document.createElement("div");
        div_fila.className = "fila";
        div_fila.id = `fila_${fila}`;
        div_fila = GetCreateBtnRow(div_fila, number);
        container.appendChild(div_fila);
    }
    //return container;
}

const GetCreateBtnRow = (row, number) => {
    for (let index = 1; index <= 16; index++) {
        let div = GetInitBtn(index, number);
        row.appendChild(div);
        number++;
    }
    return row;
}

const GetInitBtn = (row_index, col_index, number, c_btn) => {
    console.log(`FILA: ${row_index} COLUMNA: ${col_index} NUMERO: ${number}`);

    const div = document.createElement("div");
    div.className = "cuadro";
    div.style = `${c_btn.fontStyles}`;
    div.id = `btn_${row_index}`;
    div.innerText = `${c_btn.value}`;
    div.appendChild(GetInitSpanNumber(c_btn.number));
    div.appendChild(GetInitSpanKey(c_btn.key));
    return div;
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
    span.className = "span_key";
    span.innerText = `${key}`;
    return span;
}

GetElement();