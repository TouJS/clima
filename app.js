require("dotenv").config();

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const lugar = await leerInput("Indique la ciudad: ");

        await busquedas.ciudad(lugar);

        console.log("\n Información de la ciudad \n".green);
        console.log(`Ciudad: `);
        console.log(`Latitud:`);
        console.log(`Longitud: `);
        console.log(`Temperatura: `);
        console.log(`Temperatura min: `);

        break;
      case 2:
        break;
      default:
        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
