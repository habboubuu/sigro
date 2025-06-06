const express = require("express");
const fileUpload = require("express-fileupload");
const crypto = require("crypto");
const cors = require("cors");
const fs = require("fs");
const dns = require('dns');
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// مفاتيح RSA
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

app.get("/public-key", (req, res) => {
  res.send(publicKey.export({ type: "pkcs1", format: "pem" }));
});

// توقيع ملف
app.post("/sign-file", (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send("No file uploaded.");

  const fileBuffer = req.files.file.data;
  const hash = crypto.createHash("sha256").update(fileBuffer).digest();

  const signature = crypto.sign("sha256", hash, privateKey);
  const base64Signature = signature.toString("base64");

  res.json({ signature: base64Signature });
});

// تحقق من توقيع الملف
app.post("/verify-file", (req, res) => {
  if (!req.files || !req.files.file || !req.body.signature)
    return res.status(400).send("File or signature missing.");

  const fileBuffer = req.files.file.data;
  const signature = Buffer.from(req.body.signature, "base64");

  const hash = crypto.createHash("sha256").update(fileBuffer).digest();
  const isValid = crypto.verify("sha256", hash, publicKey, signature);

  res.json({ valid: isValid });
});

// Route to check website safety and get IP
app.post("/check-website", async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    let parsedUrl;
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Get IP address
    const ip = await new Promise((resolve) => {
      dns.lookup(parsedUrl.hostname, (err, address) => {
        if (err) resolve('Unknown');
        else resolve(address);
      });
    });

    // Check safety (mock function - replace with real API)
    const safetyCheck = await checkSafety(parsedUrl.href);

    res.json({
      url: parsedUrl.href,
      ip,
      isSafe: safetyCheck.isSafe,
      threats: safetyCheck.threats,
      lastChecked: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while checking the website' });
  }
});

async function checkSafety(url) {
  // This is a mock function. In production, use a real API like:
  // - Google Safe Browsing API
  // - VirusTotal API
  
  // Mock implementation
  const maliciousDomains = ['malicious.com', 'phishing-site.org', 'dangerous.net'];
  const domain = new URL(url).hostname;
  
  return {
    isSafe: !maliciousDomains.includes(domain),
    threats: maliciousDomains.includes(domain) ? ['malware'] : []
  };
}

// ========== صفحة الواجهة الأمامية ==========
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
