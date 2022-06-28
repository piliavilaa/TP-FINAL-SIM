import { Evento } from './Evento';
import { Enfermero } from './Enfermero';
import { Paciente } from './Paciente';
import { Medico } from './Medico';
import { Utils } from './Utils';

export class Simulador {
  public mediaTiempoEntreLlegadas: number;
  public aTiempoDeterminacion: number;
  public bTiempoDeterminacion: number;
  public aTiempoAutorizacion: number;
  public bTiempoAutorizacion: number;
  public aTiempoAtencion: number;
  public bTiempoAtencion: number;
  public aTiempoPago: number;
  public bTiempoPago: number;
  public matrizEstado: string[][];
  public cantMaxPasajeros: number;
  public probTiposPacientes: number[];

  //-------------------Metodo simular

  public simular(
    cantEventos: number,
    eventoDesde: number,
    mediaLlegadaPaciente: number,
    AFinDeterminacion: number,
    BFinDeterminacion: number,
    AFinAutorizacion: number,
    BFinAutorizacion: number,
    AFinAtencion: number,
    BFinAtencion: number,
    AFinPago: number,
    BFinPago: number
  ): void {
    //----------------Definiciones

    this.probTiposPacientes = [0.4, 1];
    this.mediaTiempoEntreLlegadas = mediaLlegadaPaciente;
    this.aTiempoDeterminacion = AFinDeterminacion;
    this.bTiempoDeterminacion = BFinDeterminacion;
    this.aTiempoAutorizacion = AFinAutorizacion;
    this.bTiempoAutorizacion = BFinAutorizacion;
    this.aTiempoAtencion = AFinAtencion;
    this.bTiempoAtencion = BFinAtencion;
    this.aTiempoPago = AFinPago;
    this.bTiempoPago = BFinPago;

    this.matrizEstado = [];
    // Definimos el rango de filas que vamos a mostrar.
    let indiceHasta: number = eventoDesde + 399;
    if (indiceHasta > cantEventos - 1) indiceHasta = cantEventos;

    // Vector de estado.
    let evento: string[] = [];

    let tipoEvento: Evento;
    let reloj: number = 0;

    // Llegada de un paciente.
    let rndLlegada: number = -1;
    let tiempoEntreLlegadas: number = -1;
    let proximaLlegada: number = -1;
    // let rndTipoPasajero: number = -1;
    // let tipoPasajero: string = '';

    // Determinación del paciente.
    let rndDeterminacion: number = -1;
    let tiempoDeterminacion: number = -1;
    let finDeterminacion: number = -1;
    let rndTipoPaciente: number = -1;
    let tipoPaciente: string = '';

    // Autorización del paciente.
    let rndAutorizacion: number = -1;
    let tiempoAutorizacion: number = -1;
    let finAutorizacion: number = -1;

    // Atención del paciente.
    let rndAntencion: number = -1;
    let tiempoAtencion: number = -1;
    let finAtencion1: number = -1;
    let finAtencion2: number = -1;

    // Pago del paciente.
    let rndPago: number = -1;
    let tiempoPago: number = -1;
    let finPago: number = -1;

    // Enfermero.
    let enfermero = new Enfermero();
    let colaEnfermero: Paciente[] = [];

    // Medicos.
    let medico1 = new Medico();
    let medico2 = new Medico();
    let colaMedicosUrgencia: Paciente[] = [];
    let colaMedicosComun: Paciente[] = [];
    let tiempoRemanencia : number;

     // Pacientes en el sistema.
     let pacientesEnSistema: Paciente[] = [];
    
    
    //Variables estadisticas
    let cantidadMaxEnSala: number = 0;
    let acuEsperaPacientesUrgentes: number = 0;
    let totalPacientesUrgente: number = 0;
    let acuEsperaPacientesComunes: number = 0;
    let totalPacientesComun: number = 0;
    let acuDineroAtencion: number = 0;

    this.cantMaxPasajeros = 0;
    
    
    
    for (let i: number = 0; i < cantEventos; i++) {
      evento = [];
      
      // Determinamos el tipo de evento.
      if (i == 0) {
        tipoEvento = Evento.INICIO_SIMULACION;
      }
      else if (i == cantEventos - 1) {
        tipoEvento = Evento.FIN_SIMULACION;
      }
      else {
        let eventosCandidatos: number[] = [
          proximaLlegada,
          finDeterminacion,
          finAutorizacion,
          finAtencion1,
          finAtencion2,
          finPago
        ];
        for (let i: number = 0; i < pacientesEnSistema.length; i++) {
          let pasajero: Paciente = pacientesEnSistema[i];
        } 
      

        reloj = Utils.getMenorMayorACero(eventosCandidatos);
        tipoEvento = this.getSiguienteEvento(eventosCandidatos);

      }
    }

  }

  //--------------------METODOS NECESARIOS PARA EL SIMULAR

  public getMatrizEstado(): string[][] {
    return this.matrizEstado;
  }

  public getCantMaxPasajerosEnSistema(): number {
    return this.cantMaxPasajeros;
  }

  public getDistribucionExponencial(rnd: number, media: number): number {
    if (1 - rnd !== 0) return -media * Math.log(1 - rnd);
    return -media * Math.log(1 - rnd + 9e-16);
  }

  // Cálculo del tiempo entre llegadas, que tiene distribución exponencial.
  public getTiempoEntreLlegadas(rndLlegada: number): number {
    let tiempo: number = this.getDistribucionExponencial(
      rndLlegada,
      this.mediaTiempoEntreLlegadas
    );
    return tiempo;
  }

  // Obtención del tipo de paciente según la probabilidad asociada.
  public getTipoPaciente(
    probTipoPaciente: number,
    tiposPacientes: string[]
  ): string {
    for (let i: number = 0; i < this.probTiposPacientes.length; i++) {
      if (probTipoPaciente < this.probTiposPacientes[i])
        return tiposPacientes[i];
    }
  }

  // Cálculo del tiempo de determinación, que tiene distribución uniforme.
  public getTiempoDeterminacion(rndTiempoDeterminacion: number): number {
    let tiempo: number =
      this.aTiempoDeterminacion +
      rndTiempoDeterminacion *
        (this.bTiempoDeterminacion - this.aTiempoDeterminacion);
    return tiempo;
  }

  // Cálculo del tiempo de autorización, que tiene distribución uniforme.
  public getTiempoAutorizacion(rndTiempoAutorizacion: number): number {
    let tiempo: number =
      this.aTiempoAutorizacion +
      rndTiempoAutorizacion *
        (this.bTiempoAutorizacion - this.aTiempoAutorizacion);
    return tiempo;
  }

  // Cálculo del tiempo de atención, que tiene distribución  uniforme.
  public getTiempoAtencion(rndTiempoAtencion: number): number {
    let tiempo: number =
      this.aTiempoAtencion +
      rndTiempoAtencion * (this.bTiempoAtencion - this.aTiempoAtencion);
    return tiempo;
  }

  // Cálculo del tiempo de pago, que tiene distribución uniforme.
  public getTiempoPago(rndTiempoPago: number): number {
    let tiempo: number =
      this.aTiempoPago + rndTiempoPago * (this.bTiempoPago - this.aTiempoPago);
    return tiempo;
  }

  public getSiguienteEvento(tiemposEventos: number[]): Evento {
    let menor: number = Utils.getMenorMayorACero(tiemposEventos);
    for (let i: number = 0; i < tiemposEventos.length; i++) {
      if (tiemposEventos[i] === menor) {
          return Evento[Evento[i+1]];
      }
    }
    return -1;
  }

}
