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
app.post('/api/calculate',jsonParser, async(req, res)=>{
  const {pLat, pLng} = req.body.pickup;
  const {dLat, dLng} = req.body.delivery;
  const type = req.body.type;
  if(!pLat || !pLng){
    res.json({
      code: 500,
      msg: 'parameter pickup is missing'
    })
  }
  if(!dLat || !dLng){
    res.json({
      code: 500,
      msg: 'parameter delivery is missing'
    })
  }
  if(!type){
    res.json({
      code: 500,
      msg: 'parameter type is missing'
    })
  }
  res.json({
    code: 200,
    data: {
      book_fee: 2,
      base_fee: 11.2,
    }
  })
})
app.post('/api/order/create',jsonParser, async(req, res)=>{
  const money = req.body.money;
  const tips = req.body.tips;
  const username= req.body.username;
  const {pLat, pLng, pAddress} = req.body.pickup;
  const {dLat, dLng, dAddress} = req.body.pickup;
  const remark = req.body.remark;
  const pickup_customer = req.body.pickup_customer;
  const pickup_phone = req.body.pickup_phone;
  const delivery_customer = req.body.delivery_customer;
  const delivery_phone = req.body.delivery_phone;
  if(!money){
    res.json({
      code: 500,
      msg: 'parameter type is missing'
    })
  }
  if(isNaN(money)){
    res.json({
      code: 500,
      msg: 'money format is incorrect'
    })
  }
  if(!tips){
    res.json({
      code: 500,
      msg: 'parameter type is missing'
    })
  }
  if(isNaN(tips)){
    res.json({
      code: 500,
      msg: 'tips format is incorrect'
    })
  }
  if(!username){
    res.json({
      code: 500,
      msg: 'parameter type is missing'
    })
  }
  if(!pLat || !pLng || !pAddress){
    res.json({
      code: 500,
      msg: 'parameter pickup is missing'
    })
  }
  if(!dLat || !dLng || !dAddress){
    res.json({
      code: 500,
      msg: 'parameter delivery is missing'
    })
  }
  if(!type){
    res.json({
      code: 500,
      msg: 'parameter type is missing'
    })
  }
  if(remark && remark.length > 100){
    res.json({
      code: 500,
      msg: 'maximum length of remark is 100'
    })
  }
  if(!pickup_customer){
    res.json({
      code: 500,
      msg: 'parameter pickup_customer is missing'
    })
  }
  if(!pickup_phone){
    res.json({
      code: 500,
      msg: 'parameter pickup_phone is missing'
    })
  }
  if(!delivery_customer){
    res.json({
      code: 500,
      msg: 'parameter delivery_customer is missing'
    })
  }
  if(!delivery_phone){
    res.json({
      code: 500,
      msg: 'parameter delivery_phone is missing'
    })
  }
  res.json({
    code: 200,
    msg: 'order created successfully',
    order_id: 123
  })
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