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
  botonFinalizarVenta = document.getElementById("finalizarVenta");
  botonR = document.getElementById("botonR");
  botonB = document.getElementById("botonB");
  registrosBorrados = 1;
  sinGuardar = 0;
  contador = 0;
  venta = [];
  suma = 0;

  promedioVentaTemp = 0;

  data = [];

  const ConsData = async () => {
    prod = document.getElementById("producto").value;

    // Solo se envian los necesarios ----------
    const datosDt = new FormData();
    datosDt.append("idProd", prod);

    var consultaData = await fetch("../../controllers/ventas/data.php", {
      method: "POST",
      body: datosDt,
    });

    //Traer mensaje de respuesta desde PHP -----
    var resultadoInfo_ = await consultaData.json();

    data = resultadoInfo_.data;
  };

  ConsData();

  const actualizarCanti = (busqueda_) => {
    console.log(busqueda_.value);

    for (var i = 0; i < data.length; i++) {
      if (data[i].idProducto == busqueda_.value) {
        document.getElementById("cantidadStock").value =
          data[i].cantidadProducto;
        break; // Salir del bucle una vez que se encuentre el producto
      }
    }
  };

  const ConsultarInfo = async () => {
    prod = document.getElementById("producto").value;

    // Solo se envian los necesarios ----------
    const datosCI = new FormData();
    datosCI.append("idProd", prod);

    var consultaInformacionProducto = await fetch(
      "../../controllers/ventas/consInfoProdu.php",
      {
        method: "POST",
        body: datosCI,
      }
    );

    //Traer mensaje de respuesta desde PHP -----
    var resultadoInfo = await consultaInformacionProducto.json();

    if (resultadoInfo.success) {
      document.getElementById("promedioVenta").value = formatearNumero(
        resultadoInfo.promedioProd
      );
    } else {
      document.getElementById("promedioVenta").value = 0;
    }
  };

  //Consulta y Remplzar los valores de producto dependiendo la consulta
  categoria_ = document.getElementById("categoriaProducto");

  categoria_.addEventListener("change", () => {
    consultaCategoria = categoria_.value;
    const ConsultarProductos = async (consultaCategoria_) => {
      // Solo se envian los necesarios ----------
      const datosCp = new FormData();
      datosCp.append("categoria", consultaCategoria_);

      var consultaCategoriaProducto = await fetch(
        "../../controllers/ventas/consProductos.php",
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
      actualizarCanti(document.getElementById("producto"));

      ConsultarInfo();
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

  productoConsulta = document.getElementById("producto");
  productoConsulta.addEventListener("change", () => {
    ConsultarInfo();
    actualizarCanti(document.getElementById("producto"));
  });

  // AGREGA LA COMPRA AL CARRITO DE COMPRAS
  botonR.addEventListener("click", () => {
    cliente_ = document.getElementById("cliente");
    cliente = document.getElementById("cliente").value.trim();
    categoria = document.getElementById("categoriaProducto").value;
    producto = document.getElementById("producto").value.trim();
    producto_ = document.getElementById("producto");
    valor_uni_ = document.getElementById("preciosUProducto").value.trim();
    valor_uni = valor_uni_.replace(/\./g, "");
    valorT_venta = document.getElementById("campoValorT").value.trim();
    cantidad = document.getElementById("cantidadProducto").value.trim();

    promedio_ = document
      .getElementById("promedioVenta")
      .value.replace(/\./g, "");
    ganancia = (valor_uni * 100) / promedio_ - 100;
    ganancia = parseFloat(ganancia.toFixed(2));

    cant_stock = parseInt(document.getElementById("cantidadStock").value);
    cant_prod = parseInt(document.getElementById("cantidadProducto").value);

    if (
      cliente == "Seleccione un cliente" ||
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
    } else if (cant_prod > cant_stock) {
      if (
        parseInt(document.getElementById("cantidadProducto").value) <
        parseInt(document.getElementById("cantidadStock").value)
      ) {
        console.log("El mayor es: " + cant_prod);
      } else {
        console.log("El mayor es: " + cant_stock);
      }

      Swal.fire({
        title: "Error de cantidad",
        text: "No tiene tantos productos en stock",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (cliente == "No se encontro ningun cliente activo") {
      Swal.fire({
        title: "Alerta de cliente",
        text: "Por favor registre o active un cliente",
        icon: "warning",
        html: '<a href="../../views/clientes/registrar.php">Presione aqui para registrar un cliente</a> ',
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
      const agregarAlCarrito = () => {
        var contenido = document.getElementById("contenido");
        var p = document.createElement("tr");
        p.classList.add("registro");

        // Agregar el nombre en vez del value
        clienteName = cliente_.options[cliente_.selectedIndex].innerText;
        productoName = producto_.options[producto_.selectedIndex].innerText;

        contador += 1;
        multi = valor_uni * cantidad;
        multi = formatearNumero(multi);

        console.log("Final " + multi);
        ganancia__ = formatearNumero(Math.round(ganancia));

        if (ganancia__ == "-.100") {
          ganancia__ = "-100";
        }
        p.innerHTML = `
                    <tr >
                        <td class='proveedor' data-valor="${cliente}" id="cliente_${contador}">${clienteName}</td>
                        <td class='categoria' id="categoria_${contador}">${categoria}</td>
                        <td class='producto' data-valor="${producto}" id="producto_${contador}">${productoName}</td>
                        <td class='valorU'"><input id="valorU_${contador}" class="edit" type="text" value="${valor_uni_}" oninput="formatearInput(this)" disabled></td>
                        <td "><input id="cantidad_${contador}" class="edit" type="text" value="${cantidad}" oninput="filtroNumero(this)"disabled></td>
                        <td class=''  id="porcentajeG_${contador}">${ganancia__} </td>

                        <td class="precioT"  id="valorTotal_${contador}">${multi}</td>
                        <td class="btns-cont">
                            <button class="botonesBorrar btn btn-danger" style="margin-right: 8px; type="button">Borrar</button>
                            <button class="botonesEditar btn btn-primary btn-editar_${contador}" type="button">Editar</button>
                            <button class="botonesGuardar btn btn-primary btn-guardar_${contador}" style="display:none;" type="button">Guardar</button>
                        </td>
                    </tr>
                    `;
        cliente_.disabled = true;
        p.setAttribute("id", `registro_${contador}`);
        p.classList.add("registro");
        contenido.appendChild(p);

        botonB.style.display = "block";

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

        // Restamos la cantidad al data general para las cantidades

        for (var i = 0; i < data.length; i++) {
          if (data[i].idProducto == producto) {
            data[i].cantidadProducto -= cantidad;

            console.log(
              "R: La cantidad de " +
                producto +
                " ha sido actualizada a: " +
                data[i].cantidadProducto
            );
            break; // Salir del bucle una vez que se encuentre el producto
          }
        }

        //Agregamos a cada elemento su evento de eliminar
        botonEl.addEventListener("click", function () {
          //Inicializamos la variable iteradora
          idBotonPresionado = this.id;

          idProduct_ = document.getElementById(
            `producto_${parseInt(idBotonPresionado) + 1}`
          );
          idProduct_p = idProduct_.dataset.valor;

          cantidad__ = document.getElementById(
            `cantidad_${parseInt(idBotonPresionado) + 1}`
          );
          cantidad_p = cantidad__.value;

          for (var i = 0; i < data.length; i++) {
            if (data[i].idProducto == idProduct_p) {
              data[i].cantidadProducto += parseInt(cantidad_p);

              break; // Salir del bucle una vez que se encuentre el producto
            }
          }

          // ------ Agregmos nuevamente los productos al stock ----

          registrosBorrados += 1;

          //----------- Eliminamos en el json la compra agregada -----------
          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(
            `cliente_${parseInt(idBotonPresionado) + 1}`
          );
          clienteBorrado = clienIterado.dataset.valor;

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
          cantInicial = venta.length;
          //Eliminamos del array json el registro actual
          const newData = venta.filter(
            (item) =>
              !(
                item.Cantidad === cantidadBorrado &&
                item.Categoria === categoriaBorrado &&
                item.Producto === poroductoBorrado &&
                item.Cliente === clienteBorrado &&
                item.ValorUn === valorUnitarioBorrado
              )
          );
          venta = newData;

          cantFinal = venta.length;

          resta = cantInicial - cantFinal;

          if (resta > 1) {
            // resta // cantidad de registros que re borraon
            for (let r = 0; r < resta - 1; r++) {
              //Vamos agregando al array principal
              registro = {
                Cliente: clienteBorrado,
                Categoria: categoriaBorrado,
                Producto: poroductoBorrado,
                ValorUn: valorUnitarioBorrado,
                Cantidad: cantidadBorrado,
              };
              venta.push(registro);
            }
          }

          //Borramos el boton seleccionado
          registros[idBotonPresionado].innerHTML = "";

          //Formateamos los campos
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
          document.getElementById("cantidadStock").value = 0;
          document.getElementById("promedioVenta").value = 0;

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

          if (venta.length == 0) {
            cliente_.disabled = false;
          } else {
            cliente_.disabled = true;
          }
        });

        //Agregamos a cada elemento su evento de editar
        botonEd.addEventListener("click", function () {
          //Inicializamos la varibale iteradora
          campoRegistro = parseInt(this.id) + 1;

          idProduct_ = document.getElementById(
            `producto_${parseInt(campoRegistro)}`
          );
          idProduct_p = idProduct_.dataset.valor;

          cantidad__ = document.getElementById(
            `cantidad_${parseInt(campoRegistro)}`
          );
          cantidad_p = cantidad__.value;

          for (var i = 0; i < data.length; i++) {
            if (data[i].idProducto == idProduct_p) {
              data[i].cantidadProducto += parseInt(cantidad_p);

              break; // Salir del bucle una vez que se encuentre el producto
            }
          }

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
          )[0].style.display = "block";

          //----------- Eliminamos en el json la compra agregada para guardar la nueva -----------

          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(`cliente_${campoRegistro}`);
          clienteBorrado = clienIterado.dataset.valor;

          prodIterado = document.getElementById(`producto_${campoRegistro}`);
          poroductoBorrado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(`cantidad_${campoRegistro}`);
          cantidadBorrado = cantdIterado.value;

          categoIterado = document.getElementById(`categoria_${campoRegistro}`);
          categoriaBorrado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(`valorU_${campoRegistro}`);
          valorUnitarioBorrado = valorUIterado.value;

          //Obtenemos el valor incial de la cantidad de compras
          cantInicial = venta.length;

          //Eliminamos del array json el registro actual
          const newData = venta.filter(
            (item) =>
              !(
                item.Cantidad === cantidadBorrado &&
                item.Categoria === categoriaBorrado &&
                item.Producto === poroductoBorrado &&
                item.Cliente === clienteBorrado &&
                item.ValorUn === valorUnitarioBorrado
              )
          );
          venta = newData;

          cantFinal = venta.length;

          resta = cantInicial - cantFinal;

          if (resta > 1) {
            // resta // cantidad de registros que re borraon
            for (let r = 0; r < resta - 1; r++) {
              //Vamos agregando al array principal
              registro = {
                Cliente: clienteBorrado,
                Categoria: categoriaBorrado,
                Producto: poroductoBorrado,
                ValorUn: valorUnitarioBorrado,
                Cantidad: cantidadBorrado,
              };
              venta.push(registro);
            }
          }

          //Activamos los inputs  editables
          cantdIterado.disabled = false;
          valorUIterado.disabled = false;

          //Contamos la variable sin guardar
          sinGuardar += 1;

          porcent = document.getElementById(`porcentajeG_${campoRegistro}`);
          porcentV = porcent.innerHTML;
          porcentV = porcentV.replace(/\./g, "");

          promedioVentaTemp =
            (100 * parseFloat(valorUnitarioBorrado.replace(/\./g, ""))) /
            (parseFloat(porcentV) + 100);
        });

        botonGr.addEventListener("click", function () {
          //Inicializamos la varibale iteradora
          iter = parseInt(this.id) + 1;

          //Input cantidad

          //Agregamos los nuevos valores al json
          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(`cliente_${iter}`);
          clienteEditado = clienIterado.dataset.valor;

          prodIterado = document.getElementById(`producto_${iter}`);
          productoEditado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(`cantidad_${iter}`);
          cantidadEditado = cantdIterado.value;

          categoIterado = document.getElementById(`categoria_${iter}`);
          categoriaEditado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(`valorU_${iter}`);
          valorUnitarioEditado = valorUIterado.value;

          porcenti = document.getElementById(`porcentajeG_${iter}`);

          valorUnitarioEditado_ = valorUnitarioEditado.replace(/\./g, "");

          //GANANCIA ----
          resul = (valorUnitarioEditado_ * 100) / promedioVentaTemp - 100;
          resul = Math.round(resul);

          if (resul < 0) {
            Swal.fire({
              title: "Alerta de ganancia",
              text: `Estás perdiendo un total de ${resul}% con esta venta.\n ¿Desea continuar?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              cancelButtonText: "Cancelar",
              confirmButtonText: "Continuar",
            }).then((result) => {
              if (result.isConfirmed) {
                //Agregamos nuevamente a los producto general data
                idProduct_ = document.getElementById(
                  `producto_${parseInt(campoRegistro)}`
                );
                idProduct_p = idProduct_.dataset.valor;

                cantidad__ = document.getElementById(
                  `cantidad_${parseInt(campoRegistro)}`
                );
                cantidad_p = cantidad__.value;

                for (var i = 0; i < data.length; i++) {
                  if (data[i].idProducto == idProduct_p) {
                    cantidadActual = data[i].cantidadProducto;
                    break; // Salir del bucle una vez que se encuentre el producto
                  }
                }

                if (cantidad_p > cantidadActual) {
                  console.log(cantidadActual);
                  console.log(cantidad_p);
                  Swal.fire({
                    title: "Error de cantidad",
                    text: "No tiene tantos productos en stock",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                  });
                } else {
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].idProducto == idProduct_p) {
                      data[i].cantidadProducto -= cantidad_p;
                      console.log(
                        "G: La cantidad de " +
                          idProduct_p +
                          " ha sido actualizada a: " +
                          data[i].cantidadProducto
                      );
                      break; // Salir del bucle una vez que se encuentre el producto
                    }
                  }
                  botonesGuardar =
                    document.getElementsByClassName("botonesGuardar");
                  document.getElementsByClassName(
                    "btn-guardar_" + iter
                  )[0].style.display = "none";

                  //Mostramos todos los botones editar
                  for (let g = 0; g < botonesEditar.length; g++) {
                    botonesEditar[g].style.display = "block";
                  }

                  //Mostramos todos los botones eliminar
                  botonesEliminar =
                    document.getElementsByClassName("botonesBorrar");
                  for (let g = 0; g < botonesEliminar.length; g++) {
                    botonesEliminar[g].style.display = "block";
                  }

                  //Activamos los inputs  editables
                  inputCantidad = document.getElementById("cantidad_" + iter);
                  inputCantidad.disabled = true;

                  inputCantidad = document.getElementById("valorU_" + iter);
                  inputCantidad.disabled = true;

                  resul_ = formatearNumero(resul);

                  console.log("p1" + resul_);
                  if (resul_ == "-.100") {
                    resul_ = "-100";
                  }

                  porcenti.innerHTML = resul_;

                  console.log(promedioVentaTemp);

                  //Agregamos los nuevos datos al json
                  registro = {
                    Cliente: clienteEditado,
                    Categoria: categoriaEditado,
                    Producto: productoEditado,
                    ValorUn: valorUnitarioEditado,
                    Cantidad: cantidadEditado,
                  };
                  venta.push(registro);

                  //Recargamos el campo Total
                  total = document.getElementById(`valorTotal_${iter}`);
                  total.innerHTML = formatearNumero(
                    cantidadEditado * valorUnitarioEditado.replace(/\./g, "")
                  );

                  //Volvemos a calcular la venta total
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
              } else {
                Swal.fire({
                  title: "Cancelado",
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              }
            });
          } else {
            //Agregamos nuevamente a los producto general data
            idProduct_ = document.getElementById(
              `producto_${parseInt(campoRegistro)}`
            );
            idProduct_p = idProduct_.dataset.valor;

            cantidad__ = document.getElementById(
              `cantidad_${parseInt(campoRegistro)}`
            );
            cantidad_p = cantidad__.value;

            for (var i = 0; i < data.length; i++) {
              if (data[i].idProducto == idProduct_p) {
                cantidadActual = data[i].cantidadProducto;
                break; // Salir del bucle una vez que se encuentre el producto
              }
            }

            if (cantidad_p > cantidadActual) {
              Swal.fire({
                title: "Error de cantidad",
                text: "No tiene tantos productos en stock",
                icon: "warning",
                confirmButtonColor: "#118dd5",
              });
            } else {
              for (var i = 0; i < data.length; i++) {
                if (data[i].idProducto == idProduct_p) {
                  data[i].cantidadProducto -= cantidad_p;
                  console.log(
                    "G2: La cantidad de " +
                      idProduct_p +
                      " ha sido actualizada a: " +
                      data[i].cantidadProducto
                  );
                  break; // Salir del bucle una vez que se encuentre el producto
                }
              }
              botonesGuardar =
                document.getElementsByClassName("botonesGuardar");
              document.getElementsByClassName(
                "btn-guardar_" + iter
              )[0].style.display = "none";

              //Mostramos todos los botones editar
              for (let g = 0; g < botonesEditar.length; g++) {
                botonesEditar[g].style.display = "block";
              }

              //Mostramos todos los botones eliminar
              botonesEliminar =
                document.getElementsByClassName("botonesBorrar");
              for (let g = 0; g < botonesEliminar.length; g++) {
                botonesEliminar[g].style.display = "block";
              }

              //Activamos los inputs  editables
              inputCantidad = document.getElementById("cantidad_" + iter);
              inputCantidad.disabled = true;

              inputCantidad = document.getElementById("valorU_" + iter);
              inputCantidad.disabled = true;

              resul_ = formatearNumero(resul);
              console.log("p2" + resul);
              porcenti.innerHTML = resul_;

              //Agregamos los nuevos datos al json
              registro = {
                Cliente: clienteEditado,
                Categoria: categoriaEditado,
                Producto: productoEditado,
                ValorUn: valorUnitarioEditado,
                Cantidad: cantidadEditado,
              };
              venta.push(registro);

              //Recargamos el campo Total
              total = document.getElementById(`valorTotal_${iter}`);
              total.innerHTML = formatearNumero(
                cantidadEditado * valorUnitarioEditado.replace(/\./g, "")
              );

              //Volvemos a calcular la venta total
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
          }

          //Formateamos los campos
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
          document.getElementById("cantidadStock").value = 0;
          document.getElementById("promedioVenta").value = 0;
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

        // ----- FORMATEAMOS TOODOS LOS INPUTS -----
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
        document.getElementById("cantidadStock").value = 0;
        document.getElementById("promedioVenta").value = 0;

        //Vamos agregando al array principal
        registro = {
          Cliente: cliente,
          Categoria: categoria,
          Producto: producto,
          ValorUn: valor_uni_,
          Cantidad: cantidad,
        };
        venta.push(registro);

        // Lleva hasta el final de la pagina
        window.scrollTo(0, document.body.scrollHeight);
      };

      if (ganancia < 0) {
        Swal.fire({
          title: "Alerta de ganancia",
          text: `Estás perdiendo un total de ${ganancia}% con esta venta.\n ¿Desea continuar?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            agregarAlCarrito();
          } else {
            Swal.fire({
              title: "Cancelado",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          }
        });
      } else {
        agregarAlCarrito();
      }
    }
  });

  //VACIAR TODA LA COMPRA
  botonB.addEventListener("click", () => {
    ConsData();
    venta = [];
    contador = 0;
    cliente_.disabled = false;
    var contenido = document.getElementById("contenido");
    contenido.innerHTML = "";
    suma = 0;
    camporValorT.value = 0;
    valorT2.value = suma;
    sinGuardar = 0;
  });

  // FINALIZAMOS LA COMPRA Y ENVIAMOS LOS JSON
  botonFinalizarVenta.addEventListener("click", () => {
    if (venta.length == 0) {
      Swal.fire({
        title: "Error de venta",
        text: "Por favor agregue al menos una venta o termine de editar",
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
        valorT_venta = document.getElementById("campoValorT").value;
        valorVenta = {
          ValorTotal: valorT_venta,
        };
        venta.push(valorVenta);

        // Se envian los datos en .json ----------
        const datosRg = JSON.stringify(venta);
        var registrarVenta = await fetch(
          "../../controllers/ventas/registrar.php",
          {
            method: "POST",
            body: datosRg,
          }
        );

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await registrarVenta.json();

        Swal.fire({
          title: "Venta registrada!",
          text: "Se ha registrado una venta",
          icon: "success",
          confirmButtonText: "Cofirmar",
          timer: 1200,
          timerProgressBar: true,
          position: "bottom-end",
          showConfirmButton: false,
          confirmButtonColor: "#118dd5",
          confirmButtonAriaLabel: "Confirmar",
        }).then(() => {
          window.location.href = "../../views/ventas/listar.php";
        });
      };
      Registrar();
    }
  });

  document.getElementById("ver_json").addEventListener("click", () => {
    console.log(`Dentro del json hay ${venta.length} ventas`);
    console.log(venta);
    console.log("Compras sin guardar: " + sinGuardar);

    console.log("------- DATA ------");

    console.log(data);

    // console.log(resultado)
  });
}

if (valorSubModuloActual == "listar") {
  // ----- Se crea el metodo Consulta ----------

  const Consultar = async () => {
    // Enviamos los filtros de busqueda
    filtro_fecha = document.getElementById("select_fechas");
    filtro_prove = document.getElementById("select_cliente");
    filtro_fecha.value;
    filtro_prove.value;
    // Se envian los datos en .json ----------
    const datosCons = new FormData();
    datosCons.append("cliente", filtro_prove.value);
    datosCons.append("fecha", filtro_fecha.value);

    var consultarBuscador = await fetch(
      "../../controllers/ventas/listado.php",
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
          }" class="text-center ">${array_resultados[x]["idVenta"]}</td>
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center nombreCliente">${
            array_resultados[x]["nombreCliente"]
          }</td>
                    <td class="${clase}" rowspan="${
            ids[p]
          }" class="text-center telefonoCliente">${
            array_resultados[x]["fechaVenta"]
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
    filtro_prove = document.getElementById("select_cliente");
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
  }else {
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
