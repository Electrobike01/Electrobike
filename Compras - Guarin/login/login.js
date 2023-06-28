var sesion = localStorage.getItem('permisos')

const chekearSesion = ()=>{

    if(sesion!=null){
        window.location.href = '../views/dashboard/index.php'
    }

}


const validar =async ()=>{
    var correo = document.getElementById('correo').value
    var contrasena = document.getElementById('contrasena').value

    if(correo.trim()==='' ||
    contrasena.trim()===''){
        Swal.fire({
          icon: 'error',
          title: 'Campos vacios',
          text: 'Por favor diligencie todos los campos',
          showConfirmButton: false, 
      
        })
 }
        else{
            //IR A LA BASE DE DATOS
    const datos = new FormData();
    datos.append("correo",correo)
    datos.append("contrasena",contrasena)

    var consulta = await fetch("consultar.php",{
        method: 'POST',
        body:datos
    });

    //TREAER RESPUESTA DE LA BD
    var resultado = await consulta.json();

    console.log(resultado)

    if(resultado.success==true){
        localStorage.setItem('id',resultado.id)
        localStorage.setItem('permisos',resultado.permisos)
        localStorage.setItem('nombre',resultado.nombre)
        Swal.fire({
            icon: 'success',
            title: 'EXITO',

            text: resultado.mensaje,
          }).then(() => {
 
            window.location.href = '../views/dashboard/index.php'
          });


    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error de credenciales',
            text: resultado.mensaje,
            showConfirmButton: false,
            timerProgressBar: true

          })
    }
        }


    
    
}


document.getElementById('iniciar').addEventListener('submit',(event)=>{
  event.preventDefault()
  validar()
})