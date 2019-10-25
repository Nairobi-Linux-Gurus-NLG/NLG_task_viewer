const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Task = require('../models/Task')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Get gig list
router.get('/', (req, res) =>
    Task.findAll()
    .then(tasks => {
        console.log(tasks);
        res.render('tasks', {
            tasks
        });
    })
    .catch(err => console.log(err)));

// dispay add form
router.get('/add', (req, res) => res.render('add'));

// add a gig
router.post('/add', (req, res) => {
    let { task_title, task_description, task_technologies, task_team, task_owner } = req.body;
    let errors = [];

    //validate fields
    if (!task_title) {
        errors.push({ text: 'Please add title' })
    }
    if (!task_description) {
        errors.push({ text: 'Please add technologies' })
    }
    if (!task_technologies) {
        errors.push({ text: 'Please add description' })
    }
    if (!task_owner) {
        errors.push({ text: 'Please add a contact email' })
    }

    //check for errors
    if (errors.length > 0) {
        res.render('add', {
            task_title,
            task_description,
            task_technologies,
            task_team,
            task_owner
        })
    } else {
        if (!task_team) {
            task_team = 'Unknown'
        } else {
            task_team = `$${task_team}`
        }

        //edit technologies make lowercase and remove space after comma
        task_technologies = task_technologies.toLowerCase().replace(/, /g, ',')
            // insert into table
        Task.create({
                task_title,
                task_description,
                task_technologies,
                task_team,
                task_owner
            })
            .then(tasks => res.redirect('/tasks'))
            .catch(err => console.log(err))
    }
})

// search for gigs
router.get('/search', (req, res) => {
    let { term } = req.query
        // make term lowercase
    term = term.toLowerCase

    Task.findAll({
            where: {
                task_technologies: {
                    [Op.like]: '%' + term + '%'
                }
            }
        })
        .then(tasks => res.render('tasks', { tasks }))
        .catch(err => console.log(err))
})

module.exports = router;