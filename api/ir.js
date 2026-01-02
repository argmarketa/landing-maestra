export default function handler(req, res) {
  try {
    // 1. RECIBIMOS EL NÚMERO ELEGIDO POR EL INDEX.HTML
    // El index manda algo como: /api/ir?phone=549223...
    const { phone } = req.query;

    // 2. FALLBACK (RED DE SEGURIDAD)
    // Si por alguna razón extraña el link no trae número, usamos uno fijo de emergencia.
    // (Pon aquí tu número principal o el que menos riesgo tenga)
    const destinationPhone = phone || "5492235568815"; 

    // 3. MENSAJE PREDETERMINADO
    // El mensaje que aparecerá escrito en el WhatsApp del cliente.
    const message = "Hola! Quiero mi usuario";
    
    // Codificamos el mensaje para que funcione en la URL (cambia espacios por %20, etc.)
    const encodedMessage = encodeURIComponent(message);

    // 4. CONSTRUIMOS LA URL FINAL DE WHATSAPP
    // Pegamos el número y el mensaje.
    const finalUrl = `https://wa.me/${destinationPhone}?text=${encodedMessage}`;

    // 5. REDIRECCIÓN
    // Enviamos al usuario a su destino final.
    res.redirect(307, finalUrl);

  } catch (error) {
    // Si todo falla, redirigir al número de emergencia
    console.error(error);
    res.redirect(307, "https://wa.me/5492235568815");
  }
}
