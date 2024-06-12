const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    clubId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'club',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'book'
  }
);

Book.associate = (models) => {
  Book.belongsTo(models.Club, {
    foreignKey: 'clubId',
    as: 'club'
  });
};

module.exports = Book;
