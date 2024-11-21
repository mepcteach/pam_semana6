import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public dbInstance!: SQLiteObject; 

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default',
    });
    await this.createTables();
  }

  // Crear tabla con los nuevos campos
  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        apellido TEXT,
        email TEXT UNIQUE,
        password TEXT,
        nivel_educacion TEXT,
        fecha_nacimiento TEXT
      )`,
      []
    );
  }

  // Registrar usuario con los nuevos campos
  async registerUser(nombre: string, apellido: string, email: string, password: string, nivelEducacion: string, fechaNacimiento: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (nombre, apellido, email, password, nivel_educacion, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, password, nivelEducacion, fechaNacimiento]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async loginUser(email: string, password: string): Promise<boolean> {
    const result = await this.dbInstance.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return result.rows.length > 0;
  }
}
