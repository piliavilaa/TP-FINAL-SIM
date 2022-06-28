export module HTMLUtils {
  // Función para ocultar un elemento div.
  export function ocultarSeccion(div: HTMLDivElement): void {
    div.style.display = 'none';
  }

  // Función para mostrar un elemento div.
  export function mostrarSeccion(div: HTMLDivElement): void {
    div.style.display = 'block';
  }

  // Función que elimina todas las filas de la tabla HTML excepto los encabezados.
  export function limpiarTablaSimulacion(
    tabla: HTMLTableElement,
    cantEncabezados: number,
    cantSubEncabezados: number
  ) {
    for (let i: number = tabla.rows.length; i > 2; i--) tabla.deleteRow(i - 1);

    // Limpiamos los encabezados correspondientes a los pasajeros.
    for (let i: number = tabla.rows[0].cells.length; i > cantEncabezados; i--)
      tabla.rows[0].deleteCell(i - 1);

    for (
      let i: number = tabla.rows[1].cells.length;
      i > cantSubEncabezados;
      i--
    )
      tabla.rows[1].deleteCell(i - 1);
  }
  
}
