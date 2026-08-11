export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { firstName, lastName, email, subject, message, cv, cvName } = req.body

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ error: 'Mangler påkrevde felter' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ugyldig e-postadresse' })
  }

  const attachments = cv
    ? [{ filename: cvName || 'cv.pdf', content: cv }]
    : []

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vintas <noreply@vintas.no>',
        to: ['patrik@fx-dial.pro'],
        reply_to: email,
        subject: `Ny henvendelse: ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#141410">Ny henvendelse fra vintas.no</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#8a8470;width:120px">Navn</td><td style="padding:8px 0;color:#141410">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;color:#8a8470">E-post</td><td style="padding:8px 0;color:#141410"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#8a8470">Emne</td><td style="padding:8px 0;color:#141410">${subject}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2dbc8;margin:16px 0">
            <p style="color:#4a4840;line-height:1.7;white-space:pre-wrap">${message}</p>
            ${cv ? '<p style="color:#8a8470;font-size:13px">CV vedlagt.</p>' : ''}
          </div>
        `,
        attachments,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(500).json({ error: err.message || 'Sending feilet' })
    }

    res.status(200).json({ success: true })
  } catch (e) {
    res.status(500).json({ error: 'Serverfeil' })
  }
}
