const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const builder = require('xmlbuilder2');

const db = new sqlite3.Database('./unapec.db');

const layout = {
  encabezado: {},
  detalle: [],
  sumario: {}
};

db.all("SELECT * FROM nomina_unapec", (err, rows) => {
  if (err) throw err;

  if (rows.length === 0) return;

  // Encabezado (usa el primer registro)
  const first = rows[0];
  layout.encabezado = {
    "Tipo Registro": first.tipo_registro,
    "Código Empresa": first.codigo_empresa,
    "Nombre Empresa": first.nombre_empresa,
    "Fecha de Pago": first.fecha_pago
  };

  // Detalles
  layout.detalle = rows.map(row => ({
    "Tipo Registro": row.tipo_registro,
    "Cédula Empleado": row.cedula_empleado,
    "Nombre Empleado": row.nombre_empleado,
    "Cuenta Bancaria": row.cuenta_bancaria,
    "Monto a Pagar": row.monto_pagar.toFixed(2),
    "Concepto Pago": row.concepto_pago
  }));

  // Sumario
  layout.sumario = {
    "Tipo Registro": "S",
    "Total Registros": rows.length
  };

  // Escribir JSON
  fs.writeFileSync('../nomina.json', JSON.stringify(layout, null, 2));


  console.log("Archivos JSON y XML generados exitosamente.");
  db.close();
});

