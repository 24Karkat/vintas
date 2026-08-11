export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { firstName, lastName, email, subject, message, cv, cvName } = req.body

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')

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
        subject: `Ny henvendelse: ${esc(subject)}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#f9f7f2">
            <div style="background:#ffffff;border-radius:8px;padding:32px;border:1px solid #e2dbc8">
              <h2 style="color:#141410;margin:0 0 24px;font-size:20px">Ny henvendelse fra vintas.no</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr style="border-bottom:1px solid #f0ece2">
                  <td style="padding:10px 0;color:#8a8470;width:130px;font-size:13px">Fornavn</td>
                  <td style="padding:10px 0;color:#141410;font-size:14px">${esc(firstName)}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0ece2">
                  <td style="padding:10px 0;color:#8a8470;font-size:13px">Etternavn</td>
                  <td style="padding:10px 0;color:#141410;font-size:14px">${esc(lastName)}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0ece2">
                  <td style="padding:10px 0;color:#8a8470;font-size:13px">E-post</td>
                  <td style="padding:10px 0;font-size:14px"><a href="mailto:${esc(email)}" style="color:#fcaa2d">${esc(email)}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f0ece2">
                  <td style="padding:10px 0;color:#8a8470;font-size:13px">Emne</td>
                  <td style="padding:10px 0;color:#141410;font-size:14px">${esc(subject)}</td>
                </tr>
              </table>
              <div style="margin-top:20px">
                <p style="color:#8a8470;font-size:13px;margin:0 0 8px">Melding</p>
                <p style="color:#4a4840;line-height:1.75;font-size:14px;white-space:pre-wrap;margin:0;padding:16px;background:#f9f7f2;border-radius:6px">${esc(message)}</p>
              </div>
              ${cv ? '<p style="margin-top:16px;color:#8a8470;font-size:13px">📎 CV vedlagt.</p>' : ''}
            </div>
            <p style="text-align:center;color:#8a8470;font-size:12px;margin-top:16px">vintas.no</p>
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
