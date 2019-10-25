const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('tasks', {
    task_title: {
        type: Sequelize.STRING
    },
    task_description: {
        type: Sequelize.STRING
    },
    task_technologies: {
        type: Sequelize.STRING
    },
    task_team: {
        type: Sequelize.STRING
    },
    task_owner: {
        type: Sequelize.STRING
    }
})

module.exports = Task;