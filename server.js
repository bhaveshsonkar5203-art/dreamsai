import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-XSS-Protection": "0",
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://cdnjs.cloudflare.com https://esm.sh https://fonts.googleapis.com https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: blob: https: https://*.googleusercontent.com https://*.googleapis.com https://*.gstatic.com https://images.unsplash.com https://images.pexels.com",
    "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "connect-src 'self' https: http://localhost:* http://127.0.0.1:* https://script.google.com https://api.allorigins.win https://*.googleapis.com https://*.gstatic.com",
    "frame-src 'self' https:"
  ].join('; ')
};

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.set(securityHeaders);

  if (req.path.startsWith("/assets/") || /\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)$/i.test(req.path)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else if (req.path === "/" || /\.html?$/i.test(req.path)) {
    res.setHeader("Cache-Control", "no-cache");
  }

  next();
});

app.use(express.static(__dirname, {
  index: false,
  maxAge: "1h",
  setHeaders(res, filePath) {
    if (/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "public, max-age=3600");
    }
  }
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
