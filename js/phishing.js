document.addEventListener("DOMContentLoaded", function(){

  const docNumber = document.getElementById("docNumber");
  const user = document.getElementById("user");
  const pass = document.getElementById("pass");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  //  ACTIVAR BOTÓN
  function checkInputs(){
    if(
      docNumber.value.trim() !== "" &&
      user.value.trim() !== "" &&
      pass.value.trim() !== ""
    ){
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  docNumber.addEventListener("input", checkInputs);
  user.addEventListener("input", checkInputs);
  pass.addEventListener("input", checkInputs);

  //  SUBMIT
  form.addEventListener("submit", function(e){
    e.preventDefault();

    let doc = docNumber.value.trim();
    let usuario = user.value.trim();
    let clave = pass.value.trim();

    //  VALIDACIONES
    limpiarErrores();
    let hayErrores = false;

    if(doc === ""){
      mostrarError(docNumber, "Este campo es obligatorio");
      hayErrores = true;
    } else if(!/^[0-9]{7,8}$/.test(doc)){
      mostrarError(docNumber, "El DNI debe tener 7 u 8 números");
      hayErrores = true;
    }

    if(usuario === ""){
      mostrarError(user, "Este campo es obligatorio");
      hayErrores = true;
    } else if(usuario.length < 4){
      mostrarError(user, "El usuario debe tener al menos 4 caracteres");
      hayErrores = true;
    }

    if(clave === ""){
      mostrarError(pass, "Este campo es obligatorio");
      hayErrores = true;
    } else if(clave.length < 4){
      mostrarError(pass, "La clave debe tener al menos 4 caracteres");
      hayErrores = true;
    }

    if(hayErrores) return;

    //  CONSOLA (PARA DEFENSA)
    console.log("=== SIMULACIÓN DE LOGIN BBVA ===");
    console.log("Documento:", doc);
    console.log("Usuario:", usuario);
    console.log("Clave:", clave);
    console.warn("⚠ Simulación educativa - NO se envían datos");

    // LOADER
    if(loader){
      loader.classList.remove("d-none");
    }

    submitBtn.innerText = "Validando...";
    submitBtn.disabled = true;

    // Simulación
    setTimeout(function(){

      if(loader){
        loader.classList.add("d-none");
      }

      //  MODAL PHISHING (Bootstrap)
      let modal = new bootstrap.Modal(document.getElementById('phishingModal'));
      modal.show();

      // Reset
      submitBtn.innerText = "Ingresar";
      form.reset();
      submitBtn.disabled = true;

    }, 2000);

  });

  //  FUNCIONES AUXILIARES
  function mostrarError(inputElement, msg){
    inputElement.classList.add("is-invalid");
    let errorDiv = document.getElementById(inputElement.id + "Error");
    if(errorDiv){
      errorDiv.textContent = msg;
    }
  }

  function limpiarErrores(){
    const inputs = [docNumber, user, pass];
    inputs.forEach(input => {
      input.classList.remove("is-invalid");
      let errorDiv = document.getElementById(input.id + "Error");
      if(errorDiv){
        errorDiv.textContent = "";
      }
    });
  }

});