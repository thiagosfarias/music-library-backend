var http = require('http')
    ,app = require('./src/config/express');
    
http.createServer(app).listen(3035, function() {
    console.log('Servidor escutando na porta: ' + this.address().port);
});

