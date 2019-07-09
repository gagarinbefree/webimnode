//'use strict';
var express = require('express');
var router = express.Router();
//var VK = require('vksdk');
var bodyParser = require('body-parser');
var easyvk = require('easyvk');
var Promise = require('promise');
var Datastore = require('nedb');


router.post('/login', function (req, res) {
    var body = JSON.parse(req.body);
    var password = body.password;
    var username = body.username;
    if (password == '' || username == '')
        res.send(401);

    var prom = easyvk({
        password: password,
        username: username
    });

    Promise.all([prom]).then(result => {
        if (result.length == 0)
            res.send(401); 

        var user_id = result[0].session.user_id.toString();
        var token = result[0].session.access_token;
        var first_name = result[0].session.first_name;
        var last_name = result[0].session.last_name;

        var db = new Datastore({ filename: 'users' });
        db.loadDatabase();

        var condition = { user_id: user_id };
        db.find(condition, function (err, docs) {
            if (err)
                res.send(401);

            var dto = {
                username: username,
                password: password,
                token: token,
                user_id: user_id
            };

            if (docs.length == 0) {
                db.insert(dto);
            }
            else {
                db.update(condition, dto, {});
            }

            res.send(200, JSON.stringify({
                user_id: user_id,
                first_name: first_name,
                last_name: last_name
            }));
        });
    }).catch(err => {
        res.send(401, err);
    });
});

module.exports = router;