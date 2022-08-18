const inquirer = require("inquirer");
require("colors");

const opciones = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   SELECCIONE UNA OPCION".white);
  console.log("===========================\n".green);

  const { opcion } = await inquirer.prompt(opciones);
  return opcion;
};

const pausa = async () => {
  const opcionesPausa = [
    {
      type: "input",
      name: "pausa",
      message: `Pulsa ${"ENTER".green} para continuar: `,
    },
  ];

  const { pausa } = await inquirer.prompt(opcionesPausa);
  return pausa;
};

const leerInput = async (message) => {
  const pregunta = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(pregunta);
  return desc;
};

const listarLugares = async (lugares = []) => {
  const opcionesSalida = lugares.map((lugar, id) => {
    const i = `${id + 1}.`.green;
    return {
      value: lugar.id,
      name: `${i} ${lugar.nombre}`,
    };
    //    opcionesSalida += `{  value:${id}, name:'${desc}'  },`;
  });

  //UNSIFT SIRVE PARA AÑADIR AL PRINCIPIO DE UN ARRAY
  opcionesSalida.unshift({
    value: 0,
    name: "0.".green + " Cancelar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar:",
      choices: opcionesSalida,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const opcionesSalida = tareas.map((tarea, id) => {
    const i = `${id + 1}.`.green;
    return {
      value: tarea.id,
      name: `${i} ${tarea.desc}`,
      checked: tarea.finalizadoEn !== null ? true : false,
    };
    //    opcionesSalida += `{  value:${id}, name:'${desc}'  },`;
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices: opcionesSalida,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
