const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json()

const getFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data);
    });
  });
}
app.post('/api/user/myOrders', jsonParser, async(req, res)=>{
  data = await getFile('./mock/my_orders.json');
  res.json(JSON.parse(data))
})
app.post('/api/order/detail', jsonParser, async(req, res)=>{
  data = await getFile('./mock/order_detail.json');
  res.json(JSON.parse(data))
})
app.post('/login', jsonParser, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  //#3
  let data;
  if(username==='wjiang' && password ==='123456'){
    data = await getFile('./mock/login.json');
  }else{
    data = await getFile('./mock/login_fail.json');
  }
  res.json(JSON.parse(data))
})
app.listen(3333, () => {
  console.log(`Example app listening at http://localhost:3333`)
})