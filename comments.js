// Create web server
// Create a new comment
// Get all comments
// Get a specific comment
// Update a specific comment
// Delete a specific comment
// Export the router

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

router.get('/', (req, res) => {
    res.json(comments);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

router.post('/', (req, res) => {
    const { username, comment } = req.body;
    if (username && comment) {
        const newComment = {
            id: comments.length + 1,
            username,
            comment
        };
        comments.push(newComment);
        res.json(newComment);
    } else {
        res.status(400).send('Please include a username and comment');
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        const { username, comment } = req.body;
        if (username && comment) {
            comment.username = username;
            comment.comment = comment;
            res.json(comment);
        } else {
            res.status(400).send('Please include a username and comment');
        }
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

module.exports = router;