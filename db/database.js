const { Sequelize } = require('sequelize');
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'scrum-manager.db'
});

(async () => { 
  try {
    await db.authenticate();
    console.log('Success');
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
