const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
    process.env.DB_URL,
    {
        dialect: 'postgres',
        logging: false, 
        dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
    }
);
console.log(process.env.DB_NAME);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(sequelize.config);

module.exports = {
    sequelize
    }