const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

//template ve public için urller
const templatesUrl = path.join(__dirname, '../templates');
const publicPathUrl = path.join(__dirname, '../public');
const partialsPathUrl = path.join(__dirname,'../templates/partials');

//başlangıç ile gelen express i çağırdık
const app = express();

    // request({
    //     url: `https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=bfc0f353f67abe5e109d4c92fa7567a5`,
    //     json:true
    //   }, (error, response)=>{
    //   if(error){
    //     return console.log("sadas");
    //   }
    //   console.log(response);
    //   });




request({
    url: `http://192.168.1.23:8888/ResultData/_hasan_JsonChartBOLGE.json`,
    json:true
  }, (error, response)=>{
    if(error){
      return console.log("error");
    }

    console.log(response.body);
  });






//view engine ve views'i güncelle
app.set('view engine', 'hbs');
app.set('views', templatesUrl)

hbs.registerPartials(partialsPathUrl);

//public klasörünü servis et
app.use(express.static(publicPathUrl));


//path
//abc.com/help, abc.com/, abc.com/about
app.get('', (req, res) => {
res.render('index', {
  title:'Ana sayfa',
  body: 'ara metin'
});
});

app.get('/about', (req, res) => {
res.render('about')
});

app.get('/help', (req, res) => {
res.render('help')
});

app.get('/abc', (req, res) => {
  res.send({
    test:'test'
  });
});

app.get('/forecast', (req, res) => {
  console.log(req.query);
  const {address} = req.query;

  if(address){
    request({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=bfc0f353f67abe5e109d4c92fa7567a5`,
        json:true
      }, (error, response)=>{
        if(response.body.message){
          res.send({
            error:"Lokasyon Bilgisi Bulunamadı..."
          });
      }else{
            let kelvin = parseInt(response.body.main.temp);
          const temp = kelvin -273
            res.send({
              address:address ,
              weather: `Bugün hava ${temp} C, rüzgar şiddeti: ${response.body.wind.speed} `
            })
  }
      });
  }else{
    res.send({
      error:"ADRES VERMEDİNİZ"
    });

  }
});

app.get('*',(req,res)=>{
  res.render("404notfound");
});

app.listen(3030, () => {
  console.log('3030 portu dinleniyor, server ayakta')
});
