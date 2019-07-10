'use strict';
var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var easyvk = require('easyvk');

router.get('/:user_id/photo', function (req, res) {
    var user_id = req.params.user_id;

    var db = new Datastore({ filename: 'users' });
    db.loadDatabase();

    var condition = { user_id: user_id };
    db.find(condition, function (err, docs) {
        if (err)
            res.send(401, err);

        if (docs.length > 0) {
            easyvk({
                password: docs[0].password,
                username: docs[0].username
            }).then(vk => {
                vk.call('users.get', { "user_ids": vk.session.user_id, fields: "photo_50" }).then(response => {
                    if (response.vkr.length == 0)
                        res.send(404);

                    res.send(200, JSON.stringify({
                        photo: response.vkr[0].photo_50
                    }));
                }).catch(err => {
                    res.send(404, err);
                });
            }).catch(err => {
                res.send(401, err);
            });
        }
        else
            res.send(401);
    });
});

router.get('/:user_id/friends/:count', function (req, res) {
    var user_id = req.params.user_id;
    var count = req.params.count;

    var db = new Datastore({ filename: 'users' });
    db.loadDatabase();

    var condition = { user_id: user_id };
    db.find(condition, function (err, docs) {
        if (err)
            res.send(401, err);

        if (docs.length > 0) {
            easyvk({
                password: docs[0].password,
                username: docs[0].username
            }).then(vk => {
                vk.call('friends.get', { "user_id": vk.session.user_id, "fields": "first_name,lastname,photo_50", "count": count }).then(response => {
                    if (response.vkr.length == 0)
                        res.send(404);

                    res.send(200, JSON.stringify({
                        friends: response.vkr.items
                    }));
                }).catch(err => {
                    res.send(404, err);
                });
            }).catch(err => {
                res.send(401, err);
            });
        }
        else
            res.send(401);
    });
});

module.exports = router;
