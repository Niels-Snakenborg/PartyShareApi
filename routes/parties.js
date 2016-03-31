var express = require('express');
var router = express.Router();
var Party = require('mongoose').model('Party');

router.route('/')
    .get(function(req, res) {
        Party.find().exec(function(err, parties){
            if(err){ return next(err); }
            res.json(parties);
        });
    });

router.route('/add')
    .post(function(req, res) {
        var newParty = new Party();
        newParty.name = req.body.name;
        newParty.description = req.body.description;
        newParty.location = req.body.location;
        newParty.start_date = req.body.start_date;
        newParty.end_date = req.body.end_date;
        newParty.ticket_price = req.body.ticket_price;
        newParty.likes = req.body.likes;

        newParty.save(function(err){

            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    error: err
                });
                res.end();
            }
            else {
                res.json({
                    status: 200,
                    newParty: newParty
                });
                res.end();
            }
        });

    });

    router.delete('/:id/delete', function(req, res, next) {
        Party.findById(req.params.id, function (err, parties) {
            if(err) { return next(err); }
            if(!parties) { return res.send(404); }
            parties.remove(function(err) {
                if(err) { return handleError(res, err); }
                return res.send(204);
            });
        });
    });

    router.put('/:id/likes/:likes', function(req, res, next) {
            Party.findOne({_id: req.params.id}, function(err, party){
                if (err) { return next(err); }
                party.likes = req.params.likes
                party.save(function(err) {
                    if (err) { return next(err); }
                });
            });
        });



module.exports = router;

