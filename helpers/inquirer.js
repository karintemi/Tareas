const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que desea realizar?',
    choices: [
      {
        name: `${'1.'.magenta} Crear Tarea`,
        value: 1
      },
      {
        name: `${'2.'.magenta} Listar Tareas`,
        value: 2
      },
      {
        name: `${'3.'.magenta} Listar Tareas completadas`,
        value: 3
      },
      {
        name: `${'4.'.magenta} Listar Tareas pendientes`,
        value: 4
      },
      {
        name: `${'5.'.magenta} Completar Tarea(s)`,
        value: 5
      },
      {
        name: `${'6.'.magenta} Borrar Tareas`,
        value: 6
      },
      {
        name: `${'0.'.magenta} Salir`,
        value: 0
      },

    ]
  }
];

const inquirerMenu = async() => {
  console.clear();
  console.log('============================'.green);
  console.log('   Seleccione una opción   '.white);
  console.log('============================\n'.green);

  const {opcion} = await inquirer.prompt(preguntas);
  return opcion;
}

pausa = async() => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.blue} para continuar`
    }
  ];
  console.log('\n');
  await inquirer.prompt(question);
}

const leerInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length ===0) {
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];
  const {desc} = await inquirer.prompt(question);
  return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
  const choices = tareas.map((tarea, id) => {
    const idx = `${id+1}.`.magenta;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  });

  choices.unshift({
    value: 0,
    name: '0.'.magenta + 'Cancelar'
  });

  const pregunta = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]
  const {id} = await inquirer.prompt(pregunta);
  return id;
}

const confirmar = async(message) => {
  const pregunta = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
  const {ok} = await inquirer.prompt(pregunta);
  return ok;
}

const mostrarTareasCompletar = async(tareas = []) => {
  const choices = tareas.map((tarea, id) => {
    const idx = `${id+1}.`.magenta;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]
  const {ids} = await inquirer.prompt(pregunta);
  return ids;
}

module.exports = {
inquirerMenu,
pausa,
leerInput,
listadoTareasBorrar,
confirmar,
mostrarTareasCompletar
};
