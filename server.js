const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const forumFile = path.join(__dirname, 'forum-messages.html');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>GameIdeasBroughtToLife</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(to right, #1a1a1a, #333);
        color: #fff;
        overflow-x: hidden;
      }
      header {
        background-color: #111;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        position: sticky;
        top: 0;
        z-index: 10;
      }
      header h1 {
        font-size: 1.5rem;
        color: #00ffcc;
      }
      .menu {
        position: relative;
        cursor: pointer;
      }
      .menu-icon {
        width: 30px;
        height: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .menu-icon div {
        height: 4px;
        background: #fff;
        border-radius: 5px;
      }
      .dropdown {
        display: none;
        position: absolute;
        top: 30px;
        right: 0;
        background: #222;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 10px #000;
      }
      .dropdown a {
        display: block;
        padding: 10px 20px;
        color: #fff;
        text-decoration: none;
        transition: background 0.3s;
      }
      .dropdown a:hover {
        background: #444;
      }
      .menu:hover .dropdown {
        display: block;
      }
      .hero {
        text-align: center;
        padding: 4rem 2rem;
      }
      .hero h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #00ffcc;
      }
      .hero p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
      .btn-download {
        background: #00ffcc;
        color: #111;
        padding: 1rem 2rem;
        text-decoration: none;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 50px;
        transition: 0.3s ease;
        box-shadow: 0 0 15px #00ffcc;
      }
      .btn-download:hover {
        background: #00ccaa;
        box-shadow: 0 0 25px #00ffcc, 0 0 10px #00ccaa;
      }
      footer {
        text-align: center;
        padding: 1rem;
        background: #111;
        color: #888;
        margin-top: 2rem;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>GameIdeasBroughtToLife</h1>
      <div class="menu">
        <div class="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="dropdown">
          <a href="/download">Download</a>
          <a href="/forum">Forum</a>
          <a href="/about">About Us</a>
        </div>
      </div>
    </header>
    <section class="hero">
      <h2>Welcome to GameIdeasBroughtToLife</h2>
      <p>Where epic game ideas become reality. Start downloading now or join the forum!</p>
      <a class="btn-download" href="/download">Download Soldier Parkour Game</a>
    </section>
    <footer>
      © 2025 GameIdeasBroughtToLife — Powered by Node.js
    </footer>
  </body>
  </html>
  `);
});

// Download route
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'Fortnite Demo', 'Soldier Parkour Game.exe');
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send("Game file not found.");
  }
});

// Forum page (GET)
app.get('/forum', (req, res) => {
  const messages = fs.existsSync(forumFile)
    ? fs.readFileSync(forumFile, 'utf8')
    : '';

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Forum - GameIdeasBroughtToLife</title>
    </head>
    <body style="font-family:sans-serif; padding:2rem; background:#111; color:white;">
      <h1>Forum</h1>
      <form method="POST" action="/forum">
        <input type="text" name="username" placeholder="Your name" required style="padding:10px; width:200px;" /><br><br>
        <textarea name="message" placeholder="Your message" required style="padding:10px; width:300px; height:100px;"></textarea><br><br>
        <button type="submit" style="padding:10px 20px;">Post</button>
      </form>
      <hr><div>${messages}</div>
      <br><a href="/" style="color:#00ffcc;">Back to Home</a>
    </body>
    </html>
  `);
});

// Forum POST
app.post('/forum', (req, res) => {
  const { username, message } = req.body;
  const newPost = `<p><strong>${username}</strong>: ${message}</p>\n`;
  fs.appendFileSync(forumFile, newPost);
  res.redirect('/forum');
});

// About Us page
app.get('/about', (req, res) => {
  res.send(`
    <body style="background:#111; color:white; padding:2rem; font-family:sans-serif;">
      <h1>About Us</h1>
      <p>GameIdeasBroughtToLife is a hub for passionate game makers to share and play awesome games!</p>
      <a href="/" style="color:#00ffcc;">Back to Home</a>
    </body>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Website running at http://localhost:${PORT}`);
});
