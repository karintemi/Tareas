require('colors');

const {
        inquirerMenu, pausa,
        leerInput, listadoTareasBorrar,
        confirmar, mostrarTareasCompletar
      }
        = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

const main = async() =>{

  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer o cargar las tareas
    tareas.cargarTareasFromArr(tareasDB);
  }
  do {

    // Inmprime menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // crear opcion
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listadoCompleto();
        break;
      case 3:
        tareas.listarPendienteCompletado(true)
        break;
      case 4:
        tareas.listarPendienteCompletado(false)
        break;
      case 5:
        const ids = await mostrarTareasCompletar(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case 6:
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const confirma = await confirmar('Esta seguro de borrar la tarea?');
          // Confirmar borrado
          if (confirma) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== 0) ;
}

main();
