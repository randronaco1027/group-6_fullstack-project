const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_url',
            'recipe_text',
            'user_id',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }))

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/login', (req, res) => {
    if (req.session.logged) {
        res.redirect('/')
        return
    }

    res.render('login')
})

router.get('/submit-page', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('addpost')
})
module.exports = router