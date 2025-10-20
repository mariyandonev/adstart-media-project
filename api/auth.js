export default function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':') || [];

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    throw new Error("ADMIN_USER and ADMIN_PASS must be set in environment variables");
  }

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    return next();
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
