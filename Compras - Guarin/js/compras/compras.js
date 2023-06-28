var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

// ----------------------- DIVIDIR MODULOS EN REGISTRAR Y LISTAR -------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- REGISTRAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "registrar") {
  botonFinalizarCompra = document.getElementById("finalizarCompra");
  botonR = document.getElementById("botonR");
  botonB = document.getElementById("botonB");
  registrosBorrados = 1;
  sinGuardar = 0;
  contador = 0;
  compra = [];
  suma = 0;

  //Consulta y Remplzar los valores de producto dependiendo la consulta
  categoria_ = document.getElementById("categoriaProducto");

  categoria_.addEventListener("change", () => {
    consultaCategoria = categoria_.value;
    const ConsultarProductos = async (consultaCategoria_) => {
      // Solo se envian los necesarios ----------
      const datosCp = new FormData();
      datosCp.append("categoria", consultaCategoria_);

      var consultaCategoriaProducto = await fetch(
        "../../controllers/compras/consProductos.php",
        {
          method: "POST",
          body: datosCp,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaCategoriaProducto.json();
      contenido = document.getElementById("producto");

      //---- Si alguno esta repetido ERROR
      if (resultado.success == false) {
        contenido.disabled = true;
        option = document.createElement("option");
        contenido.innerHTML = "";
        option.value = "No se encontro ningun producto";
        option.text = "No se encontro ningun producto";
        contenido.appendChild(option);
      } else {
        contenido.disabled = false;

        contenido.innerHTML = "";

        for (let n = 0; n < resultado.productos.length; n++) {
          option = document.createElement("option");
          option.value = resultado.ids[n];
          option.text = resultado.productos[n];
          contenido.appendChild(option);
        }
      }
    };

    if (consultaCategoria != "Seleccione una categoria") {
      ConsultarProductos(consultaCategoria);
    } else {
      contenido = document.getElementById("producto");
      contenido.innerHTML = "";
      option = document.createElement("option");
      option.value = "Primero seleccione una categoria";
      option.text = "Primero seleccione una categoria";
      contenido.appendChild(option);
      contenido.disabled = true;
    }
  });

  // AGREGA LA COMPRA AL CARRITO DE COMPRAS
  botonR.addEventListener("click", () => {
    proveedor_ = document.getElementById("proveedor");
    proveedor = document.getElementById("proveedor").value.trim();
    categoria = document.getElementById("categoriaProducto").value;
    producto = document.getElementById("producto").value.trim();
    producto_ = document.getElementById("producto");
    valor_uni_ = document.getElementById("preciosUProducto").value.trim();
    valor_uni = valor_uni_.replace(/\./g, "");
    valorT_compra = document.getElementById("campoValorT").value.trim();
    cantidad = document.getElementById("cantidadProducto").value.trim();

    valorT2 = document.getElementById("total2").value;

    if (
      proveedor == "Seleccione un proveedor" ||
      categoria == "Seleccione una categoria" ||
      producto == "Seleccione un producto" ||
      producto == "No se encontro ningun producto" ||
      valor_uni == "" ||
      cantidad == ""
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (cantidad <= 0) {
      Swal.fire({
        title: "Alerta de cantidad",
        text: "Por favor registre una cantidad valida",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });

      document.getElementById("cantidadProducto").classList.add("picho");
    } else if (valor_uni < 50) {
      Swal.fire({
        title: "Alerta de precio",
        text: "Por favor registre un valor mayor a 50$",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (proveedor == "No se encontro ningun proveedor activo") {
      Swal.fire({
        title: "Alerta de proveedor",
        text: "Por favor registre o active un proveedor",
        icon: "warning",
        html: '<a href="../../views/proveedores/registrar.php">Presione aqui para registrar un proveedor</a> ',
        confirmButtonColor: "#118dd5",
      });
    } else if (sinGuardar > 0) {
      Swal.fire({
        title: "Alerta de registro",
        text: "Por favor termine de editar su producto",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      var contenido = document.getElementById("contenido");
      var p = document.createElement("tr");
      p.classList.add("registro");

      // Agregar el nombre en vez del value
      proveedorName = proveedor_.options[proveedor_.selectedIndex].innerText;
      productoName = producto_.options[producto_.selectedIndex].innerText;

      contador += 1;

      multi = valor_uni * cantidad;

      multi = formatearNumero(multi);

      console.log("Final " + multi);

      p.innerHTML = `
                <tr >
                    <td class='proveedor' data-valor="${proveedor}" id="proveedor_${contador}">${proveedorName}</td>
                    <td class='categoria' id="categoria_${contador}">${categoria}</td>
                    <td class='producto' data-valor="${producto}" id="producto_${contador}">${productoName}</td>
                    <td class='valorU'"><input id="valorU_${contador}" class="edit" type="text" value="${valor_uni_}" oninput="formatearInput(this)" disabled></td>
                    <td "><input id="cantidad_${contador}" class="edit" type="text" value="${cantidad}" oninput="filtroNumero(this)" disabled></td>
                    <td class="precioT"  id="valorTotal_${contador}">${multi}</td>

                    <td class="btns-cont">
                    <button class="botonesEditar btn btn-primary  btn-editar_${contador}" type="button">Editar</button>
                    <button class="botonesBorrar btn btn-danger" style="margin-left: 8px;" type="button">Borrar</button>
                        <button class="botonesGuardar btn btn-primary btn-guardar_${contador}" style="display:none;" type="button">Guardar</button>
                    </td>
                </tr>
                `;
      proveedor_.disabled = true;
      p.setAttribute("id", `registro_${contador}`);
      p.classList.add("registro");
      contenido.appendChild(p);

      botonB.style.display = "inline";

      //Creamos los botones que eliminan los registros
      botonesEliminar = document.getElementsByClassName("botonesBorrar");
      botonEl = botonesEliminar[botonesEliminar.length - 1];
      botonEl.id = contador - 1;

      //Creamos los botones que editan los registros
      botonesEditar = document.getElementsByClassName("botonesEditar");
      botonEd = botonesEditar[botonesEditar.length - 1];
      botonEd.id = contador - 1;

      //Creamos los botones que editan los registros
      botonesGuardar = document.getElementsByClassName("botonesGuardar");
      botonGr = botonesGuardar[botonesGuardar.length - 1];
      botonGr.id = contador - 1;

      //Creamos variable que almacena los registros
      registros = document.getElementsByClassName("registro");

      //Agregamos a cada elemento su evento de eliminar
      botonEl.addEventListener("click", function () {
        registrosBorrados += 1;
        //Inicializamos la variable iteradora
        idBotonPresionado = this.id;

        //----------- Eliminamos en el json la compra agregada -----------
        //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
        provIterado = document.getElementById(
          `proveedor_${parseInt(idBotonPresionado) + 1}`
        );
        proveedorBorrado = provIterado.dataset.valor;

        prodIterado = document.getElementById(
          `producto_${parseInt(idBotonPresionado) + 1}`
        );
        poroductoBorrado = prodIterado.dataset.valor;

        cantdIterado = document.getElementById(
          `cantidad_${parseInt(idBotonPresionado) + 1}`
        );
        cantidadBorrado = cantdIterado.value;

        categoIterado = document.getElementById(
          `categoria_${parseInt(idBotonPresionado) + 1}`
        );
        categoriaBorrado = categoIterado.innerHTML;

        valorUIterado = document.getElementById(
          `valorU_${parseInt(idBotonPresionado) + 1}`
        );
        valorUnitarioBorrado = valorUIterado.value;

        //Obtenemos el valor incial de la cantidad de compras
        cantInicial = compra.length;
        //Eliminamos del array json el registro actual
        const newData = compra.filter(
          (item) =>
            !(
              item.Cantidad === cantidadBorrado &&
              item.Categoria === categoriaBorrado &&
              item.Producto === poroductoBorrado &&
              item.Proveedor === proveedorBorrado &&
              item.ValorUn === valorUnitarioBorrado
            )
        );
        compra = newData;

        cantFinal = compra.length;
        resta = cantInicial - cantFinal;

        if (resta > 1) {
          // resta // cantidad de registros que re borraon
          for (let r = 0; r < resta - 1; r++) {
            //Vamos agregando al array principal
            registro = {
              Proveedor: proveedorBorrado,
              Categoria: categoriaBorrado,
              Producto: poroductoBorrado,
              ValorUn: valorUnitarioBorrado,
              Cantidad: cantidadBorrado,
            };
            compra.push(registro);
          }
        }

        //Borramos el boton seleccionado
        registros[idBotonPresionado].innerHTML = "";

        //Volvemos a calcular la compra total
        for (
          let s = 0;
          s < document.getElementsByClassName("precioT").length;
          s++
        ) {
          suma += parseFloat(
            document
              .getElementsByClassName("precioT")
              [s].innerHTML.replace(/\./g, "")
          );
        }
        camporValorT = document.getElementById("campoValorT");
        valorT2 = document.getElementById("total2");

        suma = formatearNumero(suma);
        camporValorT.value = suma;
        valorT2.innerHTML = suma + "$";
        suma = 0;

        if (compra.length == 0) {
          proveedor_.disabled = false;
        } else {
          proveedor_.disabled = true;
        }
      });

      //Agregamos a cada elemento su evento de editar
      botonEd.addEventListener("click", function () {
        //Inicializamos la varibale iteradora
        campoRegistro = parseInt(this.id) + 1;
        console.log(campoRegistro);

        //Cerramos los otros inputs
        inputsDisable = document.getElementsByClassName("edit");
        for (let r = 0; r < inputsDisable.length; r++) {
          inputsDisable[r].disabled = true;
        }

        botonesEditar = document.getElementsByClassName("botonesEditar");
        // Cerramos los otros botones guardar
        for (let g = 0; g < botonesEditar.length; g++) {
          botonesEditar[g].style.display = "none";
        }

        botonesEliminar = document.getElementsByClassName("botonesBorrar");
        // Cerramos los otros botones eliminar
        for (let g = 0; g < botonesEliminar.length; g++) {
          botonesEliminar[g].style.display = "none";
        }

        //Remplazamos el boton editar por el guardar
        document.getElementsByClassName(
          "btn-guardar_" + campoRegistro
        )[0].style.display = "inline";

        //----------- Eliminamos en el json la compra agregada para guardar la nueva -----------

        //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
        provIterado = document.getElementById(`proveedor_${campoRegistro}`);
        proveedorBorrado = provIterado.dataset.valor;

        prodIterado = document.getElementById(`producto_${campoRegistro}`);
        poroductoBorrado = prodIterado.dataset.valor;

        cantdIterado = document.getElementById(`cantidad_${campoRegistro}`);
        cantidadBorrado = cantdIterado.value;

        categoIterado = document.getElementById(`categoria_${campoRegistro}`);
        categoriaBorrado = categoIterado.innerHTML;

        valorUIterado = document.getElementById(`valorU_${campoRegistro}`);
        valorUnitarioBorrado = valorUIterado.value;

        //Obtenemos el valor incial de la cantidad de compras
        cantInicial = compra.length;

        //Eliminamos del array json el registro actual
        const newData = compra.filter(
          (item) =>
            !(
              item.Cantidad === cantidadBorrado &&
              item.Categoria === categoriaBorrado &&
              item.Producto === poroductoBorrado &&
              item.Proveedor === proveedorBorrado &&
              item.ValorUn === valorUnitarioBorrado
            )
        );
        compra = newData;

        cantFinal = compra.length;

        resta = cantInicial - cantFinal;

        if (resta > 1) {
          // resta // cantidad de registros que re borraon
          for (let r = 0; r < resta - 1; r++) {
            //Vamos agregando al array principal
            registro = {
              Proveedor: proveedorBorrado,
              Categoria: categoriaBorrado,
              Producto: poroductoBorrado,
              ValorUn: valorUnitarioBorrado,
              Cantidad: cantidadBorrado,
            };
            compra.push(registro);
          }
        }

        //Activamos los inputs  editables
        cantdIterado.disabled = false;
        valorUIterado.disabled = false;

        //Contamos la variable sin guardar
        sinGuardar += 1;
      });

      botonGr.addEventListener("click", function () {
        iter = parseInt(this.id) + 1;

        cantdIterado = document.getElementById(`cantidad_${iter}`);
        cantidadEditado = cantdIterado.value;

        valorUIterado = document.getElementById(`valorU_${iter}`);

        valorUnitarioEditado = valorUIterado.value;
        valorUnitarioEditado = valorUnitarioEditado.replace(/\./g, "");

        if (cantidadEditado <= 0) {
          Swal.fire({
            title: "Alerta de cantidad",
            text: "Por favor registre una cantidad valida",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else if (valorUnitarioEditado < 50) {
          Swal.fire({
            title: "Alerta de precio",
            text: "Por favor registre un valor mayor a 50$",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else {
          //Inicializamos la varibale iteradora

          botonesGuardar = document.getElementsByClassName("botonesGuardar");
          document.getElementsByClassName(
            "btn-guardar_" + iter
          )[0].style.display = "none";

          //Mostramos todos los botones editar
          for (let g = 0; g < botonesEditar.length; g++) {
            botonesEditar[g].style.display = "inline";
          }

          //Mostramos todos los botones eliminar
          botonesEliminar = document.getElementsByClassName("botonesBorrar");
          for (let g = 0; g < botonesEliminar.length; g++) {
            botonesEliminar[g].style.display = "inline";
          }

          //Activamos los inputs  editables
          inputCantidad = document.getElementById("cantidad_" + iter);
          inputCantidad.disabled = true;

          inputCantidad = document.getElementById("valorU_" + iter);
          inputCantidad.disabled = true;

          //Agregamos los nuevos valores al json
          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          provIterado = document.getElementById(`proveedor_${iter}`);
          proveedorEditado = provIterado.dataset.valor;

          prodIterado = document.getElementById(`producto_${iter}`);
          productoEditado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(`cantidad_${iter}`);
          cantidadEditado = cantdIterado.value;

          categoIterado = document.getElementById(`categoria_${iter}`);
          categoriaEditado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(`valorU_${iter}`);
          valorUnitarioEditado = valorUIterado.value;

          //Agregamos los nuevos datos al json
          registro = {
            Proveedor: proveedorEditado,
            Categoria: categoriaEditado,
            Producto: productoEditado,
            ValorUn: valorUnitarioEditado,
            Cantidad: cantidadEditado,
          };
          compra.push(registro);

          //Recargamos el campo Total
          total = document.getElementById(`valorTotal_${iter}`);
          total.innerHTML = formatearNumero(
            cantidadEditado * valorUnitarioEditado.replace(/\./g, "")
          );

          //Volvemos a calcular la compra total
          for (
            let s = 0;
            s < document.getElementsByClassName("precioT").length;
            s++
          ) {
            suma += parseFloat(
              document
                .getElementsByClassName("precioT")
                [s].innerHTML.replace(/\./g, "")
            );
          }
          camporValorT = document.getElementById("campoValorT");
          valorT2 = document.getElementById("total2");

          suma = formatearNumero(suma);

          camporValorT.value = suma;
          valorT2.innerHTML = suma + "$";
          suma = 0;

          //Desontamos la variable sin guardar
          sinGuardar -= 1;
        }
      });

      for (
        let s = 0;
        s < document.getElementsByClassName("precioT").length;
        s++
      ) {
        suma += parseFloat(
          document
            .getElementsByClassName("precioT")
            [s].innerHTML.replace(/\./g, "")
        );
      }

      camporValorT = document.getElementById("campoValorT");
      valorT2 = document.getElementById("total2");

      suma = formatearNumero(suma);

      camporValorT.value = suma;
      valorT2.innerHTML = suma + "$";
      suma = 0;
      document.getElementById("cantidadProducto").value = "";
      document.getElementById("preciosUProducto").value = "";
      document.getElementById("categoriaProducto").value =
        "Seleccione una categoria";
      contenido = document.getElementById("producto");
      contenido.innerHTML = "";
      option = document.createElement("option");
      option.value = "Primero seleccione una categoria";
      option.text = "Primero seleccione una categoria";
      contenido.appendChild(option);
      contenido.disabled = true;

      //Vamos agregando al array principal
      registro = {
        Proveedor: proveedor,
        Categoria: categoria,
        Producto: producto,
        ValorUn: valor_uni_,
        Cantidad: cantidad,
      };
      compra.push(registro);

      // Lleva hasta el final de la pagina
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  //VACIAR TODA LA COMPRA
  botonB.addEventListener("click", () => {
    compra = [];
    contador = 0;
    proveedor_.disabled = false;
    var contenido = document.getElementById("contenido");
    contenido.innerHTML = "";
    suma = 0;
    camporValorT.value = 0;
    valorT2.innerHTML = suma + "$";
    sinGuardar = 0;
  });

  // FINALIZAMOS LA COMPRA Y ENVIAMOS LOS JSON
  botonFinalizarCompra.addEventListener("click", () => {
    if (compra.length == 0) {
      Swal.fire({
        title: "Error de compra",
        text: "Por favor agregue al menos una compra o termine de editar",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (sinGuardar > 0) {
      Swal.fire({
        title: "Alerta de compra",
        text: "Por favor termine de editar el producto",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      const Registrar = async () => {
        valorT_compra = document.getElementById("campoValorT").value;
        valorCompra = {
          ValorTotal: valorT_compra,
        };
        compra.push(valorCompra);

        // Se envian los datos en .json ----------
        const datosRg = JSON.stringify(compra);
        var registrarCompra = await fetch(
          "../../controllers/compras/registrar.php",
          {
            method: "POST",
            body: datosRg,
          }
        );

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await registrarCompra.json();

        Swal.fire({
          title: "Compra registrada!",
          text: "Se ha registrado una compra",
          icon: "success",
          confirmButtonText: "Cofirmar",
          timer: 1200,
          timerProgressBar: true,
          position: "bottom-end",
          showConfirmButton: false,
          confirmButtonColor: "#118dd5",
          confirmButtonAriaLabel: "Confirmar",
        }).then(() => {
          window.location.href = "../../views/compras/listar.php";
        });
      };
      Registrar();
    }
  });

  document.getElementById("ver_json").addEventListener("click", () => {
    console.log(`Dentro del json hay ${compra.length} compras`);
    console.log(compra);
    console.log("Compras sin guardar: " + sinGuardar);
  });
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------------------------ LISTAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "listar") {
  // ----- Se crea el metodo Consulta ----------
  const Consultar = async () => {
    // Enviamos los filtros de busqueda
    filtro_fecha = document.getElementById("select_fechas");
    filtro_prove = document.getElementById("select_proveedor");
    filtro_fecha.value;
    filtro_prove.value;
    // Se envian los datos en .json ----------
    const datosCons = new FormData();
    datosCons.append("proveedor", filtro_prove.value);
    datosCons.append("fecha", filtro_fecha.value);

    var consultarBuscador = await fetch(
      "../../controllers/compras/listado.php",
      {
        method: "POST",
        body: datosCons,
      }
    );

    //Inicializamos las variables
    var resultado = await consultarBuscador.json();
    if (resultado.success == false) {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";

      fila = document.createElement("tr");
      fila.innerHTML = `
                    <td class="impar" colspan="7" class="text-center idCliente">Lo sentimos no encontramos ningun resultado para tu busqueda</td>
                    `;
      contenido.appendChild(fila);
    } else {
      contis = 0;
      p = 0;
      c = 0;
      array_resultados = resultado.data;
      contenido = document.getElementById("contenido").innerHTML = "";
      posiciones = resultado.posiciones;
      ids = resultado.ids;

      // Ciclamos las filas de busqueda
      for (let x = 0; x < array_resultados.length; x++) {
        fila = document.createElement("tr");

        // Agregamos la clase para el color
        if (posiciones.includes(contis)) {
          c += 1;
          if (c % 2 == 0) {
            clase = "par";
          } else {
            clase = "impar";
          }
        }

        if (posiciones.includes(contis)) {
          // Creamos cada td con los datos

          fila.innerHTML = `
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center idCliente">${
            array_resultados[x]["idCompra"]
          }</td>
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center nombreCliente">${
            array_resultados[x]["nombreProveedor"]
          }</td>
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center telefonoCliente">${
            array_resultados[x]["fechaCompra"]
          }</td>
                    <td class="${clase}" class="text-center correoCliente">${
            array_resultados[x]["nombreProducto"]
          }</td>
                    <td class="${clase}" class="text-center estadoModulo">${
            array_resultados[x]["cantidad"]
          }</td>
                    <td class="${clase}" class="text-center estadoModulo">${formatearNumero(
            parseInt(array_resultados[x]["valor"])
          )}</td>
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center documentoCliente">${formatearNumero(
            parseInt(array_resultados[x]["valorT"])
          )}</td>
                `;
          p += 1;
        } else {
          fila.innerHTML = `
               
                    <td class="${clase}" class="text-center correoCliente">${
            array_resultados[x]["nombreProducto"]
          }</td>
                    <td class="${clase}" class="text-center estadoModulo">${
            array_resultados[x]["cantidad"]
          }</td>
                    <td class="${clase}" class="text-center estadoModulo">${formatearNumero(
            parseInt(array_resultados[x]["valor"])
          )}</td>

                `;
        }

        console.log(fila);

        contenido = document.getElementById("contenido");

        // Agregamos a la clase contenido los td
        contenido.appendChild(fila);

        contis += 1;
      }
    }

    verTodas = document.getElementById("FechasTodas");
    filtro_fecha = document.getElementById("select_fechas");

    if (filtro_fecha.value == "Todas las fechas") {
      verTodas.style.display = "none";
    } else {
      verTodas.style.display = "block";
    }
  };

  //Agregamos a una lista las fechas encontradas en la BD
  var fechasEncontradas = document.getElementById("fechas").innerHTML;
  fechasEncontradas = fechasEncontradas.split(",");
  fechasEncontradas.pop();
  console.log(fechasEncontradas);

  console.log(fechasEncontradas);
  if (fechasEncontradas.length != 0) {
    //Creamos los selects filtros
    filtro_prove = document.getElementById("select_proveedor");
    filtro_fecha = document.getElementById("select_fechas");
    verTodas = document.getElementById("FechasTodas");
    verTodas.addEventListener("click", () => {
      filtro_fecha.value = "Todas las fechas";
      Consultar();
    });
    Consultar();

    filtro_prove.addEventListener("change", () => {
      Consultar();
    });
  } else {
    fila = document.createElement("tr");
    fila.innerHTML = `<td class="impar" colspan="7" class="text-center idCliente">Lo sentimos no encontramos ningun resultado registrado</td>`;
    contenido.appendChild(fila);
  }
  //Creamo el calendario y le pasamos las fechas encontradas para que deshabilite el resto de fechas
  $(document).ready(function () {
    $("#select_fechas").datepicker({
      dateFormat: "yy-mm-dd",
      beforeShowDay: function (date) {
        const dateString = $.datepicker.formatDate("yy-mm-dd", date);
        return [fechasEncontradas.includes(dateString) ? "prueba" : "", ""];
      },
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      onSelect: Consultar,
    });
  });
}
