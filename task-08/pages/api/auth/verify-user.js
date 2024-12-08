import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    email: "test@example.com",
    passwordHash: await bcrypt.hash("password123", 10),
  },
];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return res.status(200).json({ isValid: true, id: user.id, email: user.email });
    }
    return res.status(401).json({ isValid: false });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
