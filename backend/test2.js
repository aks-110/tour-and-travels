const express = require('express');
const app = express();
const router = express.Router();

const mw = [
  (req, res, next) => {
    console.log('mw 1', req.url);
    next();
  },
  (req, res, next) => {
    console.log('mw 2', req.url);
    next();
  }
];
router.use('/admin', mw);

router.post('/admin/routes', (req, res) => {
  res.send('POST ok');
});

app.use('/api', router);

app.listen(8081, async () => {
  try {
    const res = await fetch('http://localhost:8081/api/admin/routes', { method: 'POST' });
    console.log('Status:', res.status);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
