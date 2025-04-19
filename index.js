const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = "your_secret_token"; // Change this to your actual token
const BLOGGER_SAFELINK_BASE = "https://yourblog.blogspot.com/p/safelink.html?url="; // Replace with your actual Blogger safelink page

app.get('/', (req, res) => {
  res.send('Safelink API is running!');
});

app.get('/api', (req, res) => {
  const { api, url, format } = req.query;

  if (api !== API_TOKEN) {
    return res.status(403).json({ status: 'error', message: 'Invalid API token' });
  }

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing URL' });
  }

  const encoded = Buffer.from(url).toString('base64');
  const safelink = `${BLOGGER_SAFELINK_BASE}${encoded}`;

  if (format === 'text') {
    return res.send(safelink);
  } else {
    return res.json({
      status: 'success',
      original: url,
      safelink
    });
  }
});

app.listen(PORT, () => {
  console.log(`Safelink API running on port ${PORT}`);
});
