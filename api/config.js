export default function handler(req, res) {
  // 1. Configurar CORS (Vital para que el frontend pueda leer esto)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Leer la variable de entorno de Vercel
  const sheetUrl = process.env.SHEET_URL;

  // 3. Responder con JSON
  if (!sheetUrl) {
    return res.status(500).json({ error: "SHEET_URL no configurada en Vercel" });
  }

  res.status(200).json({ sheetUrl: sheetUrl });
}
