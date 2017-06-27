var http = require("http");
var fs = require("fs");

http.createServer(function(request, response){
    var url = request.url;
    console.log('old - '+url);
    console.log('new - '+url.replace(/\/$/g,''));
    var newUrl = url.replace(/\/$/g,'');
    switch(newUrl) {
        case '/main':
            loadPage('main');
            break;
        case '/cat.png':{
            response.writeHead(200,{'Content-Type':'image/png'});
            fs.createReadStream('cat.png').pipe(response);
            break;
        }
        case '/css.css':{
            response.writeHead(200,{'Content-Type':'text/css'});
            fs.createReadStream('css.css').pipe(response);
            break;
        }
        default:
            loadPage('404');
            break;
    }

    function loadPage(filename){
        fs.readFile(filename+'.html', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end("Ресурс не найден!");
            }
            else{
                response.end(data);
            }
            return;
        });
    }

}).listen(3000);