
// Alerta 1: prueba
Swal.fire({
    title: "Guarin es gei",
    text: "Deje de ser gei",
    icon: "warning",
    //width:'30%',
})

// ------------------------ Agregar un nuevo campo ventas - compras  --------------------------
Swal.fire({
  //Elementos de la alerta
  text: "Agregado con exito!",
  icon: "success",
  timer: 800,
  timerProgressBar: true,
  showConfirmButton: false,
  width: '30%',
  // Posicion
  position: 'bottom-end'
})

// --------------------------- eliminar campo ventas - compras ----------------------------------


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})

swalWithBootstrapButtons.fire({
  title: 'Elimnar compra',
  text: "¿Estás seguro que deseas eliminar está compra?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      //Elementos de la alerta
          text: "Se ha eliminado exitosamente!",
          icon: "success",
          timer: 800,
          timerProgressBar: true,
          showConfirmButton: false,
          width: '30%',
          // Posicion
          position: 'bottom-end'
    }
    )
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      text: "Cancelando accion",
      icon: "error",
      timer: 800,
      timerProgressBar: true,
      showConfirmButton: false,
      width: '30%',
      // Posicion
      position: 'bottom-end'
      }
    )
  }
})



// ---------------- ELIMINAR COMPRA INTENTO 1 (1 SOLO BOTON CON ACCION) --------------------
Swal.fire({
    title: 'Eliminar compra',
    text: "¿Seguro que desea eleminar esta compra?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
            //Elementos de la alerta
            text: "Agregado con exito!",
            icon: "success",
            timer: 800,
            timerProgressBar: true,
            showConfirmButton: false,
            width: '30%',
            // Posicion
            position: 'bottom-end'
        }
        )
    }
})



// ------------------------ Alerta de confirmar accion -----------------------------
Swal.fire({
    //Contenido de la alerta
    title: "Registro exitoso",
    text: "Se ha registrado una venta",
    icon: "success",
    confirmButtonText:"Cofirmar",
    timer: 5000,
    timerProgressBar: true,

    // Estilos de las alertas (Botones)
    // width:'90%',
    // customClass: {} Añadir clases del css a la alerta
    showConfirmButton: false,
    confirmButtonColor:'#118dd5',
    confirmButtonAriaLabel:'Confirmar',
})

//------------------------ Confirmar eliminar algun elemento ---------------------------

Swal.fire({
    title: '¿Estas seguro?',
    text: "¿Seguro que desea eleminar este registro?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })




// ---------------------------------- LISTAR MODULOS -----------------------

function AlertaEliminacion() {
  Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Seguro que desea eleminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
              text: "Se ha eliminado exitosamente!",
              icon: "success",
              timer: 500,
              timerProgressBar: true,
              showConfirmButton: false,
              width: '40%',
              // Posicion
              position: 'bottom-end'
          })
      }
  })
}


var botonesEliminar = document.querySelectorAll('.botonEliminarLista');

for (let index = 0; index < botonesEliminar.length; index++) {
  botonesEliminar[index].addEventListener('click', () => AlertaEliminacion())

}

