var http = require('http');

class ClientsService
{
    constructor(port)
    {
        this.count   = 100;
        this.port    = port;
        this.clients = this.createClientsList(this.count);
        console.log("======== Generated Sample Clients List, Total "+this.count+" Entries");

        this.server = http.createServer(this.onRequest.bind(this));
        this.server.listen(port);
        console.log("======== Server started at: port",port);
    }

    randomBetween(max,min,additionEnd,additionBefore)
    {
        min            = min           !==undefined ? min            :  0;
        additionBefore = additionBefore!==undefined ? additionBefore : '';
        additionEnd    = additionEnd   !==undefined ? additionEnd    : '';

        return Number.parseInt(additionBefore + (Math.floor(Math.random() * max) + min) + additionEnd);
    }

    getClientFromArray(id)
    {
        let result = null;
        
        if(this.clients)
        {
            result = this.clients.filter(function(o){return o.clientID == id;});
        }
        return result ? result[0] : null;
    }

    generateClientID()
    {
        let date = Date.now().toString().substr(9,13);
        return this.randomBetween(900,100,date);
    }

    generateAccounts(count)
    {
        let arr = [];

        for(let num = 0; num < count; num++)
        {
            let date = Date.now().toString().substr(9,13);
            let obj  = 
            {
                accountID   :this.randomBetween(900,100,date),
                clientNumber:this.randomBetween(900000,100000,date),
                accountType :this.randomBetween(3),
                currency    :this.randomBetween(4),
                state       :this.randomBetween(2)
            };
            arr.push(obj);
        }
        return arr;
    }
    
    createClientObject(clientID,personID,firstName,lastName,gender,phone,regCountry,regCity,regAddr,actualCountry,actualCity,actualAdress,accounts)
    {
        return {gender:gender,clientID:clientID,
                personID         :personID,
                phone            :phone,
                firstName        :firstName,
                lastName         :lastName,
                registeredCountry:regCountry,
                registeredCity   :regCity,
                registeredAdress :regAddr,
                actualCountry    :actualCountry,
                actualCity       :actualCity,
                actualAdress     :actualAdress,
                photo            :'',
                accounts         :accounts
            };
    }

    createClientsList(count)
    {
        let arr         = [];
        let countries   = ['საქართველო','გერმანია','იტალია','საფრანგეთი','რუსეთი','თურქეთი'];
        let cities      = ['თბილისი','ბათუმი','ქუთაისი','რუსთავი','გორი','ფოთი'];
        let addresses   = ['აღმაშენებლის','რუსთაველის','ქავთარაძის','ყაზბეგის','დოლიძის','ჭავჭავაძის'];
        let maleNames   = ['გიორგი','აკაკი','თორნიკე','ზურაბი','ლუკა','ჯიმშერა'];
        let femaleNames = ['ანი','ნინო','ნატა','მარიამი','ლელა','თამუნა'];
        let lastNames   = ['გიორგაძე','გაგუა','ჩიხლაძე','ილიშვილი','რამიშვლი'];

        // ratqmaunda germaniashi an italiashi chavchavadzis an dolizis qucha araa, tumca mravalferovnebistvis mgoni misagebia :)

        for(let num = 0; num < count; num++)
        {
            let gender    = this.randomBetween(2);
            let namesList = gender == 0 ? femaleNames : maleNames;
            let date      = Date.now().toString().substr(9,13);
            let obj       = this.createClientObject(
                this.generateClientID(),
                this.randomBetween(9000000,1000000,date),
                namesList[this.randomBetween(namesList.length)],
                lastNames[this.randomBetween(lastNames.length)],
                gender,
                this.randomBetween(9000,1000,date,'5'),
                countries[this.randomBetween(countries.length)],
                cities   [this.randomBetween(cities.length)],
                addresses[this.randomBetween(addresses.length)] + " # "+ this.randomBetween(100,1),
                countries[this.randomBetween(countries.length)],
                cities   [this.randomBetween(cities.length)],
                addresses[this.randomBetween(addresses.length)] + " # "+ this.randomBetween(100,1),
                this.generateAccounts(Math.floor(Math.random() * 4))
            );
            arr.push(obj);
        }
        return arr;
    }

    onRequest(req,res)
    {
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.method === 'OPTIONS')
        {
            var headers = {};
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400';
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
        }
        if (req.method === 'POST')
        {
            var body = '';
            req.on('data',(data)=>{ body += data;});
            req.on('end' ,()=>    { this.onPost(req.url,body,res); });
        }
        if (req.method === 'GET')
        {
            let arr    = req.url.split("?");
            let path   = arr[0];
            let params = {};
            if(arr[1])
            {
                let objs = data.split("&");
                for(let num = 0; num < objs.length; num++)
                {
                    let obj = objs[num].split('=');

                    if(obj.length>1){params[obj[0]] = obj[1];}
                }
            }
            this.onGet(path,params,res);
        }
    }

    onPost(method,params,res)
    {
        console.log("-------- Incoming POST Request:",method," Params:",params);
        
        switch(method)
        {
            case '/submitClient':
            {
                params = JSON.parse(params);
                let item = this.getClientFromArray(params.clientID);

                if(item)
                {
                    let index = this.clients.indexOf(item);
                    if(index>-1) {this.clients.splice(index,1); }
                }
                this.clients.unshift(this.createClientObject(
                    params.clientID <= 0 ? this.generateClientID() : params.clientID,
                    params.personalID,
                    params.firstName,
                    params.lastName,
                    params.gender,
                    params.phone,
                    params.legalAddress.country,
                    params.legalAddress.city,
                    params.legalAddress.address,
                    params.actualAddress.country,
                    params.actualAddress.city,
                    params.actualAddress.address,
                    params.accounts
                ));
                
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.write(JSON.stringify({status:0}));
                res.end();
                break;
            }
            case '/getClient':
            {
                params = JSON.parse(params);
                let item = this.getClientFromArray(params.id);
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.write(JSON.stringify(item ? item : {status:1}));
                res.end();
                break;
            }
            case '/removeClient':
            {
                params = JSON.parse(params);
                let item = this.getClientFromArray(params.id);
                if(item)
                {
                    let index = this.clients.indexOf(item);
                    if(index>-1) {this.clients.splice(index,1); }
                }
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.write(JSON.stringify({status:0}));
                res.end();
                break;   
            }
        }
    }

    onGet(method,params,res)
    {
        console.log("-------- Incoming GET Request:",method," Params:",params);

        switch(method)
        {
            case '/getClients':
            {
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.write(JSON.stringify(this.clients));
                res.end();
                break;
            }
            default:
            {
                let baseURL = "http://localhost:"+this.port;

                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                res.write("<h3>Available methods:</h3>");
                res.write("<ul>");
                res.write("<li><a href='"+baseURL+"/getClients'>(GET) getClients</a></li>");
                res.write("<br>");
                res.write("<li>(POST) submitClient [object:Client]</a></li>");
                res.write("<li>(POST) getClient [id:Int]</a></li>");
                res.write("<li>(POST) removeClient [id:Int]</a></li>");
                res.write("</ul>");
                res.end();
                break;
            }
        }
    }
}

new ClientsService(5000);