const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const db = new sqlite3.Database('./apap.db');

async function importarDesdeUnapec() {
  const { data } = await axios.get('http://localhost:3000/api/nomina');

  const stmt = db.prepare(`
    INSERT INTO nomina_apap 
    (cedula_empleado, nombre_empleado, cuenta_bancaria, monto_pagar, concepto_pago, fecha_pago)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  data.detalle.forEach(d => {
    stmt.run(
      d["Cédula Empleado"],
      d["Nombre Empleado"],
      d["Cuenta Bancaria"],
      parseFloat(d["Monto a Pagar"]),
      d["Concepto Pago"],
      data.encabezado["Fecha de Pago"]
    );
  });

  stmt.finalize();
  db.close();
  console.log("Datos importados desde UNAPEC vía Web API.");
}

importarDesdeUnapec();
