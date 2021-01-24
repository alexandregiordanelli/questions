/* eslint-disable @typescript-eslint/explicit-function-return-type */

import nodemailer from 'nodemailer'
import admin from 'lib/firebase-server'
import { VercelApiHandler } from '@vercel/node'

// Email HTML body
const html = ({ url, email }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`

  // Some simple styling options
  const backgroundColor = '#f9f9f9'
  const textColor = '#444444'
  const mainBackgroundColor = '#ffffff'
  const buttonBackgroundColor = '#346df1'
  const buttonBorderColor = '#346df1'
  const buttonTextColor = '#ffffff'

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>Questionsof</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

// Email text body – fallback for email clients that don't render HTML
const text = ({ url }) => `Sign in to \n${url}\n\n`

const sendSignInEmail = async (email: string, url: string) => {
  await nodemailer
    .createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
    .sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: `Sign in to `,
      text: text({ url }),
      html: html({ url, email }),
    })
}

const EmailController: VercelApiHandler = async (req, res) => {
  if (req.method == 'POST') {
    const email = req.body as string
    const link = await admin.auth().generateSignInWithEmailLink(email, {
      url: 'http://localhost:3000',
      handleCodeInApp: true,
    })

    const obj = Object.fromEntries(new URL(link).searchParams)
    const url = new URL('http://localhost:3000')
    for (const key in obj) {
      url.searchParams.append(key, obj[key])
    }
    const urlString = url.toString()
    await sendSignInEmail(email, urlString)

    res.status(200).send('ok')
  }
}

export default EmailController
