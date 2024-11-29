document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#form");

  formulario.onsubmit = function (e) {
    e.preventDefault();

    const nombreInput = formulario.querySelector("#name");
    const edadInput = formulario.querySelector("#age");
    const nacionalidadSelect = formulario.querySelector("#nationality");

    const nombre = nombreInput.value.trim();
    const edad = parseInt(edadInput.value, 10);
    const nacionalidad =
      nacionalidadSelect.options[nacionalidadSelect.selectedIndex]?.value;

    // validamos el error con pruebas
    let isValid = true;

    if (nombre.length === 0) {
      nombreInput.classList.add("error");
      isValid = false;
    } else {
      nombreInput.classList.remove("error");
    }

    if (isNaN(edad) || edad < 18 || edad > 120) {
      edadInput.classList.add("error");
      isValid = false;
    } else {
      edadInput.classList.remove("error");
    }

    if (!nacionalidad) {
      alert("Por favor selecciona una nacionalidad válida.");
      isValid = false;
    }

    if (isValid) {
      agregarInvitado(nombre, edad, nacionalidad);
    }
  };

  function agregarInvitado(nombre, edad, nacionalidad) {
    const lista = document.getElementById("lista-de-invitados");
    if (!lista) {
      console.error("El elemento #lista-de-invitados no existe.");
      return;
    }

    // Convertir el código de nacionalidad al nombre completo
    const nacionalidades = {
      ar: "Argentina",
      mx: "Mexicana",
      ve: "Venezolana",
      pe: "Peruana",
    };

    const nacionalidadNombre = nacionalidades[nacionalidad] || "Desconocida";

    const elementoLista = document.createElement("div");
    elementoLista.classList.add("elemento-lista");

    crearElemento(elementoLista, "Nombre", nombre);
    crearElemento(elementoLista, "Edad", edad);
    crearElemento(elementoLista, "Nacionalidad", nacionalidadNombre);

    // Botón para eliminar al invitado
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Eliminar invitado";
    botonBorrar.onclick = function () {
      elementoLista.remove();
    };

    elementoLista.appendChild(botonBorrar);
    lista.appendChild(elementoLista);
  }

  function crearElemento(contenedor, descripcion, valor) {
    const span = document.createElement("span");
    const input = document.createElement("input");
    const br = document.createElement("br");

    span.textContent = `${descripcion}: `;
    input.value = valor;
    input.readOnly = true;

    contenedor.appendChild(span);
    contenedor.appendChild(input);
    contenedor.appendChild(br);
  }
});
