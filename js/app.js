const container = document.querySelector(".container-cards");
const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const doors = document.querySelector("#doors");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

/** Objeto para los datos a buscar */

const dataSearch = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  doors: "",
  transmision: "",
  color: "",
};


/** Vamos a crear un evento general y le pasamos por parametro el elemento al cual se le va a asignar el evento */
 const addEvent = (element, property)=>{
 element.addEventListener("input", (event)=>{
  dataSearch[property] = event.target.value

  filtrarAutos()
 })
}

addEvent(transmision,"transmision")
addEvent(doors, "doors");
addEvent(maximo, "maximo");
addEvent(minimo, "minimo");
addEvent(year, "year");
addEvent(marca, "marca");
addEvent(color, "color");

/** EVENTO QUE CARGA PRIMERO LA PAGINA */
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);

  const max = new Date().getFullYear();
  const min = max - 10;

  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    year.appendChild(option);
  }
});

function filtrarAutos() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarDoors).filter(filtrarTransmision).filter(filtrarColor)
  if (resultado.length != 0) {
    mostrarAutos(resultado);
  } else {
    limpiarHTML()
    console.log("deberia limpiarse el carro");
    const alert = document.createElement("h1")
    alert.textContent = "No se encontro ningún automovil"
    container.appendChild(alert)

  }
}
function filtrarColor (auto){
  if(dataSearch.color){
    return dataSearch.color == auto.color
  }
  return auto
}

function filtrarTransmision (auto){
  if(dataSearch.transmision){

    return dataSearch.transmision == auto.transmision
  }
  return auto
}

function filtrarDoors (auto){
 if(dataSearch.doors){
  return dataSearch.doors == auto.puertas;
 }
 return auto
}

function filtrarMaximo(auto) {
  console.log(dataSearch.maximo);
  if (dataSearch.maximo) {
    return auto.precio <= dataSearch.maximo;
  }
  return auto;
}

function filtrarMinimo(auto){
  if(dataSearch.minimo){
   
    return auto.precio >= dataSearch.minimo
  }
  return auto
}
function filtrarYear(auto) {
  if (dataSearch.year) {
    return dataSearch.year == auto.year;
  }
  return auto;
}
function filtrarMarca(auto) {
  //SI el usuario esta filtrando por marca entonces
  if (dataSearch.marca) {

    //Guarda el vehiculo solo si se cumple la condicion
    return dataSearch.marca == auto.marca;
  }
  //SI no se esta filtrando por marca entonces se retorna el auto completo
  return auto;
}

function mostrarAutos(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    container.innerHTML += `
   <div class="card">
  <img src= ${auto.imagen} alt="">
  <div class="description">
    <p>${auto.marca} - ${auto.year}</p>
    <p>${auto.modelo}</p>
    <p>${auto.transmision}</p>
    <p>${auto.color}</p>
    <p>${auto.precio}</p>
  </div>
  </div>
  `;
  });
}

function limpiarHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
