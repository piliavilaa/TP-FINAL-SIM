import { EstadoPaciente } from './EstadoPaciente';

export class Paciente {
  private id: number;
  private tipoPaciente: string;
  private estado: EstadoPaciente;

  public constructor(id: number, tipoPaciente: string) {
    this.id = id;
    this.tipoPaciente = tipoPaciente;
  }

  public esperandoDeterminacion(): void {
    this.estado = EstadoPaciente.ESPERANDO_DETERMINACION;
  }

  public siendoDeterminado(): void {
    this.estado = EstadoPaciente.SIENDO_DETERMINADO;
  }

  public esperandoAutorizacion(): void {
    this.estado = EstadoPaciente.ESPERANDO_AUTORIZACION;
  }

  public esperandoAtencion(): void {
    this.estado = EstadoPaciente.ESPERANDO_ATENCION;
  }

  public siendoAtendido(): void {
    this.estado = EstadoPaciente.SIENDO_ATENDIDO;
  }

  public enInterrupcion(): void {
    this.estado = EstadoPaciente.INTERRUMPIDO;
  }

  public esperandoPago(): void {
    this.estado = EstadoPaciente.ESPERANDO_PAGO;
  }

  public pagando(): void {
    this.estado = EstadoPaciente.PAGANDO;
  }

  public getEstado(): EstadoPaciente {
    return this.estado;
  }

  public getId(): number {
    return this.id;
  }

  public getTipoPaciente(): string {
    return this.tipoPaciente;
  }

  // public getMinutoLlegada(): number {
  //   return this.minutoLlegada;
  // }
}
