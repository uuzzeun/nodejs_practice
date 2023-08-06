const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended : false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

// route
app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics: files}); 
    });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        if (id) {
            fs.readFile('data/'+id, 'utf8', function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {title: id, topics : files, description: data});
            })
        } else {
            res.render('view', {topics : files, title:'welcome', description:'hello, javascript for server.'});
        }
    })    
})

// app.get('/topic/:id', function (req, res) {
//     const id = req.params.id;
//     fs.readdir('data', function (err, files) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', function(err, data) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', {title: id, topics : files, description: data});
//         })
//     })
// })

app.post('/topic', function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile('data/' + title, description, function(err) {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    })
})


app.listen(3000, function () {
    console.log('connnected, 3000 port')
})