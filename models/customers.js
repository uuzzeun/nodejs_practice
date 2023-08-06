'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customers',
    timestamps: false   // createdAt, updatedAt 기본으로 사용하는 것으로 인식함. 실제 사용 안하니까 칼럼 없음을 명시함
  });
  return customers;
};