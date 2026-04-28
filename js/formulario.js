    $(document).ready(function(){

// Expresiones regulares
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// VALIDACIÓN EN TIEMPO REAL

$('#nombre').on('input', function(){
  let valor = $(this).val();

  if(!regexNombre.test(valor)){
    $('#errorNombre').removeClass('d-none');
  } else {
    $('#errorNombre').addClass('d-none');
  }
});

$('#email').on('input', function(){
  let valor = $(this).val();

  if(!regexEmail.test(valor)){
    $('#errorEmail').removeClass('d-none');
  } else {
    $('#errorEmail').addClass('d-none');
  }
});

$('#mensaje').on('input', function(){
  let valor = $(this).val();

  if(valor.length < 10){
    $('#errorMensaje').removeClass('d-none');
  } else {
    $('#errorMensaje').addClass('d-none');
  }
});

// ENVÍO DEL FORMULARIO

$('#formContacto').submit(function(e){
  e.preventDefault();

  let nombre = $('#nombre').val();
  let email = $('#email').val();
  let mensaje = $('#mensaje').val();

  if(
    regexNombre.test(nombre) &&
    regexEmail.test(email) &&
    mensaje.length >= 10
  ){

    // Mostrar spinner
    $('#spinnerOverlay').removeClass('d-none');

    // Simular carga
    setTimeout(() => {

        $('#spinnerOverlay').addClass('d-none');

      // Mostrar modal
      let modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
      modal.show();

      // Limpiar form
      $('#formContacto')[0].reset();

    }, 2000);

  } else {
    // Show error modal instead of alert
    let modalError = new bootstrap.Modal(document.getElementById('modalError'));
    modalError.show();

    // Trigger input validation visualization for empty/invalid fields
    if(!regexNombre.test(nombre)){
      $('#errorNombre').removeClass('d-none');
    }
    if(!regexEmail.test(email)){
      $('#errorEmail').removeClass('d-none');
    }
    if(mensaje.length < 10){
      $('#errorMensaje').removeClass('d-none');
    }
  }
});

});
