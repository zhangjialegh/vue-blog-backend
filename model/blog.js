const sequelize = require('./main')
const Sequelize = require('sequelize')
const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.JSON,
    allowNull: false
  }
});

module.exports = Blog;
