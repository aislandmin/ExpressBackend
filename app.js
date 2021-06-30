const express = require('express');
const fs = require('fs');
const app = express();

app.get('/a', (req, res) => {
  res.send('Hello World!')
})
app.post('/a', (req, res) => {
  res.json({ foo: 'bar' })
})
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
app.get('/api1', async (req, res) => {
  // #1
  // fs.readFile('./1.json', 'utf-8', (err, data) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   fs.readFile('./2.json', 'utf-8', (err2, data2) => {
  //     const result = JSON.parse(data).concat(JSON.parse(data2));
  //     res.json(result);
  //   });
  // });

  //#2
  // getFile('./1.json').then(data1=>{
  //   console.log(data1);
  //   return getFile('./2.json');
  // }).then(data2=>{
  //   console.log(data2);
  // })

  //#3
  const data1 = await getFile('./1.json');
  const data2 = await getFile('./2.json');
  res.json(JSON.parse(data1).concat(JSON.parse(data2)))
})
app.listen(3333, () => {
  console.log(`Example app listening at http://localhost:3333`)
})