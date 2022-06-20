var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var fs = require('fs');
const { path } = require('pdfkit');
const pat = require('path');

var options = { format: 'A4' };

//init app
var app = express();

//set the template engine
app.set('view engine', 'ejs');
app.use(express.static(pat.join(__dirname, 'public')));

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home')
});

app.post('/generatepdf', (req, res) => {
    res.render('demopdf', { name: req.body.name, orgName: req.body.orgName, mobile: req.body.mobile, email: req.body.email, address: req.body.address }, function(err, html) {

        pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function(err, result) {
            if (err) {
                return console.log(err);
            } else {
                var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
                res.header('content-type', 'application/pdf');
                res.send(datafile);
            }
        });
    })
})

//assign port
var port = process.env.PORT || 5000;
app.listen(port, () => console.log('server run at port ' + port));