const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./apap.db');
const data = JSON.parse(fs.readFileSync('../nomina.json', 'utf8'));

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
console.log("Datos importados a la base de APAP.");
db.close();
