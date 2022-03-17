const config = {
  databaseName: process.env.DB_NAME || 'pizzaria',
  databaseUser: process.env.DB_USER || 'root',
  databasePassword: process.env.DB_PASSWORD || 'root',
  databaseHost: process.env.DB_HOST || 'localhost',
  databasePort: process.env.DB_PORT || 3306,
  port: process.env.PORT || 8080
}

export default config