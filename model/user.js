const sequelize = require('./main')
const Sequelize = require('sequelize')
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  wechatNickname: {
    type: Sequelize.STRING
  },
  wechatProvince: {
    type: Sequelize.STRING
  },
  wechatCity: {
    type: Sequelize.STRING
  },
  wechatCountry: {
    type: Sequelize.STRING
  },
  wechatOpenid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wechatAvatarUri: {
    type: Sequelize.STRING,
  },
  thirdSession: {
    type: Sequelize.STRING,
    allowNull: false
  },
  scene: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User;
