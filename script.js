const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Це головна сторінка!');
});

app.get('/about', (req, res) => {
  res.send('Це сторінка з інформацією про студента!');
});

app.use((req, res) => {
  res.status(404).send('Сторінку не знайдено!');
});

app.listen(port, () => {
  console.log(`Веб-сервер запущено на порту ${port}`);
});

app.get('/', (req, res) => {
    res.send('Це головна сторінка!');
  });

const path = require('path');

app.get('/about', (req, res) => {
  const filePath = path.join(__dirname, 'about.html');
  res.sendFile(filePath);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Щось пішло не так на сервері!');
});

const fs = require('fs');

app.get('/about', (req, res) => {
  const filePath = path.join(__dirname, 'about.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      next(err);
    } else {
      const imgPath = path.join(__dirname, 'images', 'students.jpg');
      const img = fs.readFileSync(imgPath);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data.replace('{img}', `<img src="data:image/jpg;base64,${img.toString('base64')}"/>`));
      res.end();
    }
  });
});
