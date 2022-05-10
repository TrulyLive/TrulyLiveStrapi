import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const message = `
        Name: ${req.body.name}\r\n
        Email: ${req.body.email}\r\n
        Subject: ${req.body.subject}\r\n
        Message: ${req.body.message}
    `

    const data = {
      to: 'info@trulylive.com',
      from: 'info@trulylive.com',
      subject: '[Website Name] Contact Form - New Message',
      text: message,
      html: message.replace(/\r\n/g, '<br>')
    }

    sendgrid.send(data)

    return res.status(200).json({ status: 'Ok' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
export default handler
