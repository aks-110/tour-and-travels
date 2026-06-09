const express = require('express');
const app = express();
const router = express.Router();

const clerkAuth = [
  (req, res, next) => {
    next();
  }
];

router.use('/admin', clerkAuth);
router.post('/admin/routes', (req, res) => {
  res.send('ok');
});

app.use('/api/pricing', router);

app.listen(8082, async () => {
  try {
    const res = await fetch('http://localhost:8082/api/pricing/admin/routes', { method: 'POST' });
    console.log('test3 status:', res.status);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
