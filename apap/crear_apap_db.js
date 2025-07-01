const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./apap.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS nomina_apap");

  db.run(`
    CREATE TABLE nomina_apap (
      cedula_empleado TEXT,
      nombre_empleado TEXT,
      cuenta_bancaria TEXT,
      monto_pagar REAL,
      concepto_pago TEXT,
      fecha_pago TEXT
    )
  `);

  console.log("Base de datos apap.db creada.");
});

db.close();
