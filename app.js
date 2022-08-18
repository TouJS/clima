require("dotenv").config();

const { green } = require("colors");
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //BUSCAR LUGARES
        const lugar = await leerInput("Indique la ciudad: ");
        const lugares = await busquedas.ciudad(lugar);

        //SELECCIONAR LUGAR
        const id = await listarLugares(lugares);
        if (id === 0) continue;
        const lugarSeleccionado = lugares.find((l) => l.id === id);

        //GUARDAR EN DB
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        const tiempo = await busquedas.climaPorLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );

        console.log("\n Información de la ciudad \n".green);
        console.log(`Ciudad: ${lugarSeleccionado.nombre}`);
        console.log(`Latitud: ${lugarSeleccionado.lat}`);
        console.log(`Longitud: ${lugarSeleccionado.lng}`);
        console.log(`Cómo esta el tiempo: ${tiempo.descripcion}`);
        console.log(`Temperatura: ${tiempo.temperatura}`);
        console.log(`Temperatura max: ${tiempo.temperaturaMax}`);
        console.log(`Temperatura min: ${tiempo.temperaturaMin}`);
        break;
      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const id = `${i + 1}.`.green;
          console.log(`${id} ${lugar}`);
        });
        break;
      default:
        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
