const { app } = require('electron')
const path = require('path')
const { DataTypes, Model, Sequelize } = require('sequelize')
const univDb = path.join(app.getPath('userData'), 'data.db')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: univDb,
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  define: {
    timestamps: false,
    underscored: true
  }
})

class User extends Model {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize
  }
)

User.sync()

export { sequelize, User }
