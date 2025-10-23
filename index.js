const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const users = JSON.parse(fs.readFileSync('users.json'));

// Endpoint cek server
app.get('/', (req, res) => {
  res.json({ message: 'Login API is running 🚀' });
});

// Endpoint login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      status: 'success',
      message: 'Login berhasil',
      user: { id: user.id, username: user.username },
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Username atau password salah',
    });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
