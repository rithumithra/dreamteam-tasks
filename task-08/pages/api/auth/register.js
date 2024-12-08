

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { username, email, password } = req.body;
  
        const newUser = { username, email, password };
  
        res.status(200).json({ message: 'Registration successful!' });
        
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  
