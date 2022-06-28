// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNros: HTMLInputElement = document.getElementById('txtCantNros') as HTMLInputElement;
const txtEventoDesde: HTMLInputElement = document.getElementById('txtEventoDesde') as HTMLInputElement;
const txtMediaLlegadaPacientes: HTMLInputElement = document.getElementById('txtMediaLlegadaPacientes') as HTMLInputElement;
const txtAFinDeDeterminacion: HTMLInputElement = document.getElementById('txtAFinDeDeterminacion') as HTMLInputElement;
const txtBFinDeDeterminacion: HTMLInputElement = document.getElementById('txtBFinDeDeterminacion') as HTMLInputElement;
const txtAFinDeAutorizacion: HTMLInputElement = document.getElementById('txtAFinDeAutorizacion') as HTMLInputElement;
const txtBFinDeAutorizacion: HTMLInputElement = document.getElementById('txtBFinDeAutorizacion') as HTMLInputElement;
const txtAFinDeAntencion: HTMLInputElement = document.getElementById('txtAFinDeAntencion') as HTMLInputElement;
const txtBFinDeAntencion: HTMLInputElement = document.getElementById('txtBFinDeAntencion') as HTMLInputElement;
const txtAFinDePago: HTMLInputElement = document.getElementById('txtAFinDePago') as HTMLInputElement;
const txtBFinDePago: HTMLInputElement = document.getElementById('txtBFinDePago') as HTMLInputElement;


// Definición de la secciones de la simulación.
const divTablaSimulacion: HTMLDivElement = document.getElementById('divTablaSimulacion') as HTMLDivElement;

// Definición de la tablas de simulación de colas.
const tablaSimulacion: HTMLTableElement = document.getElementById('tablaSimulacion') as HTMLTableElement;
const cantEncabezadosTablaSimulacion = tablaSimulacion.rows[0].cells.length;
const cantSubEncabezadosTablaSimulacion = tablaSimulacion.rows[1].cells.length;

const indicesEventosCandidatos: number[] = [5, 8, 13, 16, 17, 20];
const colPasajeros: string[] = ['ID Pasajero', 'Tipo Pasajero', 'Estado'];

// Definición de botones de la interfaz de usuario.
const btnSimular: HTMLButtonElement = document.getElementById('btnSimular') as HTMLButtonElement;

// Definición de los objetos que realizan la simulación de colas.
let simulador: Simulador;
let matrizEstado: any[][];
let cantMaxPasajeros: number;

// Definición de los parámetros.
let n: number;
let eventoDesde: number;
let mediaLlegadaPasajero: number;
let AFinFacturacion: number;
let BFinFacturacion: number;
let mediaVentaBillete: number;
let mediaChequeoBilletes: number;
let desEstChequeoBilletes: number;
let mediaControlMetales: number;
let mediaPasoEntreZonas: number;