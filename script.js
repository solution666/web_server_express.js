const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Довільний текст на головній сторінці
app.get('/', (req, res) => {
  res.send('Це головна сторінка!');
});

// Сторінка /about з інформацією про студента
app.get('/about', (req, res) => {
  fs.readFile('about.html', (err, data) => {
    if (err) {
      res.status(500).send('Помилка сервера!');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
});

// Відображення картинок
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  fs.readFile(`images/${imageName}`, (err, data) => {
    if (err) {
      res.status(404).send('Картинка не знайдена!');
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(data);
      res.end();
    }
  });
});

// Обробка помилок
app.use((req, res) => {
  res.status(404).send('Сторінку не знайдено!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Помилка сервера!');
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});