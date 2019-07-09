'use strict';
var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var easyvk = require('easyvk');

router.get('/photo/:id', function (req, res) {
    var user_id = req.params.id;

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
                        return send(404);

                    res.send(200, JSON.stringify({
                        photo: response.vkr[0].photo_50
                    }));
                });
            });
        }
        return
            res.send(401);
    });

    

    //var condition = { user_id: user_id };
    //db.find(condition, function (err, docs) {
    //    if (err)
    //        res.send(401);

    //    if (docs.length == 0) {

    //    }
    //    return
    //        res.send(401);
    //});

});

module.exports = router;
