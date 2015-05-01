var express = require('express');
var path = require('path');
var app = express();
var favicon = require('static-favicon');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon());
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
