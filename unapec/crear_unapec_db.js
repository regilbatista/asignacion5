const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./unapec.db');

db.serialize(() => {
  // Eliminar tabla si existe
  db.run("DROP TABLE IF EXISTS nomina_unapec");

  // Crear tabla
  db.run(`
    CREATE TABLE nomina_unapec (
      tipo_registro TEXT,
      codigo_empresa TEXT,
      nombre_empresa TEXT,
      fecha_pago TEXT,
      cedula_empleado TEXT,
      nombre_empleado TEXT,
      cuenta_bancaria TEXT,
      monto_pagar REAL,
      concepto_pago TEXT
    )
  `);

  // Insertar datos de prueba
  const stmt = db.prepare(`
    INSERT INTO nomina_unapec (
      tipo_registro, codigo_empresa, nombre_empresa, fecha_pago,
      cedula_empleado, nombre_empleado, cuenta_bancaria,
      monto_pagar, concepto_pago
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const empleados = [
    ["D", "001", "UNAPEC", "2025-07-01", "00112345678", "Juan Pérez", "1234567890", 25000.00, "Salario Mensual"],
    ["D", "001", "UNAPEC", "2025-07-01", "00223456789", "Ana Gómez", "2345678901", 27000.00, "Salario Mensual"],
    ["D", "001", "UNAPEC", "2025-07-01", "00334567890", "Luis Rodríguez", "3456789012", 30000.00, "Salario Mensual"]
  ];

  empleados.forEach(emp => stmt.run(emp));
  stmt.finalize();

  console.log("Base de datos unapec.db creada y poblada.");
});

db.close();
