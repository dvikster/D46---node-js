var http = require("http");
var fs = require("fs");

http.createServer(function(request, response){
    var url = request.url;
    console.log(url);
    switch(url) {
        case '/index':
            loadPage('index');
            break;
        case '/main':
            loadPage('main');
            break;
        case '/contacts':
            loadPage('contacts');
            break;
        case '/about':
            loadPage('about');
            break;

        case '/cat.png': {
            response.writeHead(200, {'Content-Type': 'image/png'});
            fs.createReadStream("cat.png").pipe(response);
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
        //читаю хедер
        fs.readFile('templates/header.html', function(error, data){
            var h = data.toString(); //header
            // читаю нужный файл
            fs.readFile(filename+'.html', function(error, data){
                h = h+data.toString();
                fs.readFile('templates/footer.html', function(error, data){
                    h = h + data.toString();
                    response.end(h);
                    return;
                });
            });
        });

    }
}).listen(3000);