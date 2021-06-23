const { v4: uuidv4 } = require('uuid');

class Tarea {
  id ='';
  desc = '';
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
  }

  cargarTareasFromArr(tareas) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });

  }
}

module.exports = Tarea;
