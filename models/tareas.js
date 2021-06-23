const Tarea = require('./tarea');
class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      listado.push(this._listado[key])
    });
    return listado;
  };
  constructor() {
    this._listado = {};
  }

  crearTarea(desc='') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArr( tareas = [] ) {

      tareas.forEach( tarea => {
          this._listado[tarea.id] = tarea;
      });
  }

  listadoCompleto() {
    let nro_tarea = 1;
    Object.keys(this._listado).forEach(key => {
      console.log(`${nro_tarea}`.green, `${this._listado[key].desc} ::`, (this._listado[key].completadoEn)?'Completada'.green : 'Pendiente'.red);
      nro_tarea++;
    });
  }

  listarPendienteCompletado(completado) {
    let nro_tarea = 1;
    Object.keys(this._listado).forEach(key => {
      if(completado && this._listado[key].completadoEn)
        console.log(`${nro_tarea}`.green, `${this._listado[key].desc} ::`,  this._listado[key].completadoEn.green);
      if(!completado && !this._listado[key].completadoEn)
        console.log(`${nro_tarea}`.green, `${this._listado[key].desc} ::`,  'Pendiente'.red);
      nro_tarea++;
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      // esto podria mejorarse agregando un else, si no esta completado asigno fecha
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });

  }

}

module.exports = Tareas;
