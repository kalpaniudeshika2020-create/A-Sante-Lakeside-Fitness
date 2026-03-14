import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize SQLite database
const db = new Database('gym.db');

// Setup database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    plan TEXT NOT NULL,
    startDate TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    classId INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    trainer TEXT NOT NULL,
    day TEXT NOT NULL,
    time TEXT NOT NULL,
    duration INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience TEXT NOT NULL,
    imageUrl TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    trainer TEXT NOT NULL,
    imageUrl TEXT NOT NULL
  );
`);

// Seed initial data if empty
const classCount = db.prepare('SELECT COUNT(*) as count FROM classes').get() as { count: number };
if (classCount.count === 0) {
  const insertClass = db.prepare('INSERT INTO classes (name, trainer, day, time, duration) VALUES (?, ?, ?, ?, ?)');
  insertClass.run('HIIT Blast', 'Mike Johnson', 'Monday', '07:00', 45);
  insertClass.run('Powerlifting', 'Sarah Connor', 'Tuesday', '18:00', 60);
  insertClass.run('Yoga Flow', 'Emma Watson', 'Wednesday', '08:00', 60);
  insertClass.run('CrossFit WOD', 'David Miller', 'Thursday', '17:30', 60);
  insertClass.run('Cardio Burn', 'Jessica Alba', 'Friday', '06:30', 45);
  insertClass.run('Strength & Conditioning', 'Mike Johnson', 'Saturday', '10:00', 90);
}

const trainerCount = db.prepare('SELECT COUNT(*) as count FROM trainers').get() as { count: number };
if (trainerCount.count === 0) {
  const insertTrainer = db.prepare('INSERT INTO trainers (name, specialty, experience, imageUrl) VALUES (?, ?, ?, ?)');
  insertTrainer.run('Mike Johnson', 'HIIT & Strength', '8 Years', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800');
  insertTrainer.run('Sarah Connor', 'Powerlifting', '12 Years', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800');
  insertTrainer.run('David Miller', 'CrossFit', '6 Years', 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800');
}

// Ensure trainer images are updated even if already seeded
db.prepare("UPDATE trainers SET imageUrl = 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800' WHERE name = 'Mike Johnson'").run();
db.prepare("UPDATE trainers SET imageUrl = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800' WHERE name = 'Sarah Connor'").run();
db.prepare("UPDATE trainers SET imageUrl = 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800' WHERE name = 'David Miller'").run();

const programCount = db.prepare('SELECT COUNT(*) as count FROM programs').get() as { count: number };
if (programCount.count === 0) {
  const insertProgram = db.prepare('INSERT INTO programs (name, description, trainer, imageUrl) VALUES (?, ?, ?, ?)');
  insertProgram.run('Weight Training', 'Build muscle and increase strength with our comprehensive weight training program.', 'Sarah Connor', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800');
  insertProgram.run('HIIT Training', 'High-intensity interval training to burn fat and improve cardiovascular fitness.', 'Mike Johnson', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800');
  insertProgram.run('CrossFit', 'Constantly varied functional movements executed at high intensity.', 'David Miller', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800');
  insertProgram.run('Yoga', 'Improve flexibility, balance, and mental focus with our yoga sessions.', 'Emma Watson', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800');
}

// Ensure the CrossFit image is updated even if already seeded
db.prepare("UPDATE programs SET imageUrl = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800' WHERE name = 'CrossFit'").run();

// API Routes
app.get('/api/classes', (req, res) => {
  const classes = db.prepare('SELECT * FROM classes ORDER BY day, time').all();
  res.json(classes);
});

app.get('/api/trainers', (req, res) => {
  const trainers = db.prepare('SELECT * FROM trainers').all();
  res.json(trainers);
});

app.get('/api/programs', (req, res) => {
  const programs = db.prepare('SELECT * FROM programs').all();
  res.json(programs);
});

app.post('/api/members', (req, res) => {
  const { fullName, phone, email, plan, startDate } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO members (fullName, phone, email, plan, startDate) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(fullName, phone, email, plan, startDate);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists or invalid data' });
  }
});

app.post('/api/bookings', (req, res) => {
  const { name, phone, email, classId, date, time } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO bookings (name, phone, email, classId, date, time) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, phone, email, classId, date, time);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
});

// Admin Routes
app.get('/api/admin/members', (req, res) => {
  const members = db.prepare('SELECT * FROM members ORDER BY createdAt DESC').all();
  res.json(members);
});

app.get('/api/admin/bookings', (req, res) => {
  const bookings = db.prepare(`
    SELECT b.*, c.name as className 
    FROM bookings b 
    JOIN classes c ON b.classId = c.id 
    ORDER BY b.createdAt DESC
  `).all();
  res.json(bookings);
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
