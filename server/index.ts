import express from 'express';

const app = express();

const port = 8642;

// app.get('/', (req, res) => {
//   res.send('Hello, world');
// });

app.use(express.static('dist/'));

app.listen(port, () => {
  console.info(`App is listening on port ${port}`);
});

// const test = 'test';

// console.log('unused var');