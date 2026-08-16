"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  name: string
  email: string
  message: string
}

export interface ProjectInquiryData {
  name: string
  company: string
  email: string
  phone: string
  scope: string[]
  platform: string[]
  existingAssets: string
  budget: string
  timeline: string
  projectIdea: string
  mustHaveFeatures: string
  additionalNotes: string
}

export async function sendEmail(data: EmailData) {
  try {
    const { name, email, message } = data

    // Parse the message to extract services and project details
    const messageLines = message.split("\n")
    let services = ""
    let projectDetails = ""
    let isProjectDetails = false

    for (const line of messageLines) {
      if (line.startsWith("Services:")) {
        services = line
      } else if (line.startsWith("Project Details:")) {
        isProjectDetails = true
        projectDetails = line + "\n"
      } else if (isProjectDetails && line.trim() !== "") {
        projectDetails += line + "\n"
      }
    }

    // Email to the business using verified domain
    const businessEmail = await resend.emails.send({
      from: "SCULPT Contact <noreply@sculpt.work>",
      to: "sculptvisions@gmail.com", // Corrected email address
      subject: `New contact form submission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #101010; color: #EAEFFF; padding: 30px; border-radius: 8px;">
            <h2 style="color: #EAEFFF; margin: 0 0 20px 0;">New Contact Form Submission</h2>
            
            <div style="background-color: #151515; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background-color: #1a1a1a; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.8;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    })

    // Auto-reply email to the user using verified domain
    const autoReplyEmail = await resend.emails.send({
      from: "SCULPT Team <noreply@sculpt.work>",
      to: email, // This sends to the user's email address
      subject: "Hey! SCULPT received your idea 👍🏼",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting SCULPT.</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background-color: #101010;
              color: #EAEFFF;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #101010;
              padding: 0;
            }
            .header {
              background-color: #151515;
              padding: 40px 30px;
              text-align: center;
              border-bottom: 1px solid #252525;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #EAEFFF;
              letter-spacing: -0.02em;
              margin: 0;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 24px;
              font-weight: 600;
              color: #EAEFFF;
              margin: 0 0 20px 0;
            }
            .message {
              font-size: 16px;
              color: #EAEFFF;
              opacity: 0.9;
              margin: 0 0 30px 0;
            }
            .details-section {
              background-color: #151515;
              border: 1px solid #252525;
              border-radius: 8px;
              padding: 25px;
              margin: 30px 0;
            }
            .details-title {
              font-size: 18px;
              font-weight: 600;
              color: #EAEFFF;
              margin: 0 0 15px 0;
            }
            .detail-item {
              margin: 10px 0;
              font-size: 14px;
            }
            .detail-label {
              color: #EAEFFF;
              opacity: 0.7;
              font-weight: 500;
            }
            .detail-value {
              color: #EAEFFF;
              margin-left: 10px;
            }
            .next-steps {
              background-color: #1a1a1a;
              border-left: 3px solid #EAEFFF;
              padding: 20px 25px;
              margin: 30px 0;
            }
            .next-steps-title {
              font-size: 16px;
              font-weight: 600;
              color: #EAEFFF;
              margin: 0 0 10px 0;
            }
            .next-steps-text {
              font-size: 14px;
              color: #EAEFFF;
              opacity: 0.9;
              margin: 0;
            }
            .footer {
              background-color: #151515;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #252525;
            }
            .footer-text {
              font-size: 14px;
              color: #EAEFFF;
              opacity: 0.7;
              margin: 0 0 15px 0;
            }
            .contact-info {
              font-size: 14px;
              color: #EAEFFF;
              opacity: 0.8;
            }
            .contact-link {
              color: #EAEFFF;
              text-decoration: none;
            }
            .contact-link:hover {
              opacity: 0.8;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
              }
              .header, .content, .footer {
                padding: 20px !important;
              }
              .logo {
                font-size: 28px !important;
              }
              .greeting {
                font-size: 20px !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">SCULPT.</h1>
            </div>
            
            <div class="content">
              <h2 class="greeting">Hello ${name},</h2>
              
              <p class="message">
                Thank you for reaching out to SCULPT. We've received your project inquiry and are excited to learn more about your vision.
              </p>
              
              <p class="message">
                Our team specializes in chiseling digital visions into exceptional apps and experiences. We'll review your request carefully and get back to you with a detailed response.
              </p>
              
              <div class="details-section">
                <h3 class="details-title">Your Submission Details</h3>
                <div class="detail-item">
                  <span class="detail-label">${services}</span>
                </div>
                <div class="detail-item" style="margin-top: 15px;">
                  <div class="detail-value" style="margin-left: 0; white-space: pre-wrap;">${projectDetails.trim()}</div>
                </div>
              </div>
              
              <div class="next-steps">
                <h3 class="next-steps-title">What happens next?</h3>
                <p class="next-steps-text">
                  Our team will review your project details and respond within 6 hours with next steps, timeline estimates, and any questions we might have about your vision.
                </p>
              </div>
              
              <p class="message">
                In the meantime, feel free to explore our portfolio and case studies to get a better sense of our work and approach.
              </p>
              
              <p class="message">
                We're looking forward to the possibility of bringing your digital vision to life.
              </p>
              
              <p class="message" style="margin-top: 40px;">
                Best regards,<br>
                <strong>SCULPT</strong>
              </p>
            </div>
            
            <div class="footer">
              <p class="footer-text">
                This is an automated response confirming we've received your inquiry.
              </p>
              <div class="contact-info">
                <p style="margin: 5px 0;">
                  <a href="mailto:admin@sculpt.work" class="contact-link">admin@sculpt.work</a>
                </p>
                <p style="margin: 5px 0;">
                  <a href="https://sculpt.work" class="contact-link">sculpt.work</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Check if both emails were sent successfully
    if (businessEmail.error) {
      console.error("Error sending business email:", businessEmail.error)
      throw new Error("Failed to send business notification email")
    }

    if (autoReplyEmail.error) {
      console.error("Error sending auto-reply email:", autoReplyEmail.error)
      throw new Error("Failed to send auto-reply email")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in sendEmail:", error)
    throw new Error("Failed to send email")
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function pillList(items: string[]) {
  if (items.length === 0) {
    return `<span style="color:#EAEFFF; opacity:0.5; font-size:14px;">None selected</span>`
  }
  return items
    .map(
      (item) =>
        `<span style="display:inline-block; background-color:#1a1a1a; border:1px solid #333; color:#EAEFFF; font-size:13px; padding:6px 14px; border-radius:999px; margin:0 8px 8px 0;">${escapeHtml(
          item,
        )}</span>`,
    )
    .join("")
}

function detailRow(label: string, value: string) {
  if (!value || !value.trim()) return ""
  return `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid #232323; color:#EAEFFF; opacity:0.55; font-size:13px; width:170px; vertical-align:top;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:10px 0; border-bottom:1px solid #232323; color:#EAEFFF; font-size:14px; vertical-align:top;">${escapeHtml(
        value,
      )}</td>
    </tr>
  `
}

function textBlock(label: string, value: string) {
  if (!value || !value.trim()) return ""
  return `
    <div style="margin:0 0 20px 0;">
      <p style="margin:0 0 8px 0; color:#EAEFFF; opacity:0.55; font-size:13px; text-transform:uppercase; letter-spacing:0.05em;">${escapeHtml(
        label,
      )}</p>
      <div style="background-color:#1a1a1a; border:1px solid #252525; border-radius:10px; padding:16px 18px; color:#EAEFFF; font-size:14px; line-height:1.6; white-space:pre-wrap;">${escapeHtml(
        value,
      )}</div>
    </div>
  `
}

export async function sendProjectInquiry(data: ProjectInquiryData) {
  try {
    const {
      name,
      company,
      email,
      phone,
      scope,
      platform,
      existingAssets,
      budget,
      timeline,
      projectIdea,
      mustHaveFeatures,
      additionalNotes,
    } = data

    const fullScope = ["App Development", ...scope]
    const platformLabel = platform.length > 0 ? platform.join(", ") : ""
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    })

    const businessEmail = await resend.emails.send({
      from: "SCULPT Inquiries <noreply@sculpt.work>",
      to: "sculptvisions@gmail.com",
      subject: `New Project Inquiry — ${name}${company ? ` (${company})` : ""}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #101010; color: #EAEFFF; border-radius: 14px; overflow: hidden;">

            <div style="padding: 28px 32px; border-bottom: 1px solid #252525;">
              <p style="margin:0 0 6px 0; font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:#EAEFFF; opacity:0.6;">New Project Inquiry</p>
              <h1 style="margin:0; font-size:24px; color:#EAEFFF;">${escapeHtml(name)}${
                company ? ` <span style="opacity:0.6; font-weight:400;">— ${escapeHtml(company)}</span>` : ""
              }</h1>
            </div>

            <div style="padding: 24px 32px 4px 32px;">
              <div>${pillList([`Budget: ${budget || "Not specified"}`, `Timeline: ${timeline || "Not specified"}`, `Platform: ${platformLabel || "Not specified"}`])}</div>
            </div>

            <div style="padding: 8px 32px 24px 32px;">
              <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
                ${detailRow("Email", email)}
                ${detailRow("Phone", phone)}
                ${detailRow("Existing assets", existingAssets)}
              </table>
            </div>

            <div style="padding: 0 32px 8px 32px;">
              <p style="margin:0 0 10px 0; color:#EAEFFF; opacity:0.55; font-size:13px; text-transform:uppercase; letter-spacing:0.05em;">Scope of work</p>
              <div>${pillList(fullScope)}</div>
            </div>

            <div style="padding: 16px 32px 8px 32px;">
              ${textBlock("Project idea", projectIdea)}
              ${textBlock("Must-have features", mustHaveFeatures)}
              ${textBlock("Additional notes / references", additionalNotes)}
            </div>

            <div style="padding: 20px 32px 28px 32px; border-top: 1px solid #252525;">
              <p style="margin:0; font-size:13px; color:#EAEFFF; opacity:0.6;">
                Submitted ${submittedAt} IST via sculpt.work/project-inquiry &middot; Reply directly to this email to respond to ${escapeHtml(name)}.
              </p>
            </div>

          </div>
        </div>
      `,
    })

    const autoReplyEmail = await resend.emails.send({
      from: "SCULPT Team <noreply@sculpt.work>",
      to: email,
      subject: "We've received your project inquiry — SCULPT",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for your project inquiry.</title>
        </head>
        <body style="margin:0; padding:0; font-family:'Helvetica Neue', Arial, sans-serif; background-color:#101010; color:#EAEFFF; line-height:1.6;">
          <div style="max-width:600px; margin:0 auto; background-color:#101010;">
            <div style="background-color:#151515; padding:40px 30px; text-align:center; border-bottom:1px solid #252525;">
              <h1 style="font-size:32px; font-weight:bold; color:#EAEFFF; letter-spacing:-0.02em; margin:0;">SCULPT.</h1>
            </div>
            <div style="padding:40px 30px;">
              <h2 style="font-size:24px; font-weight:600; color:#EAEFFF; margin:0 0 20px 0;">Hey ${escapeHtml(name)},</h2>
              <p style="font-size:16px; color:#EAEFFF; opacity:0.9; margin:0 0 20px 0;">
                Thanks for filling out our project inquiry form. This gives our team everything we need to hit the ground running before we even talk.
              </p>
              <p style="font-size:16px; color:#EAEFFF; opacity:0.9; margin:0 0 30px 0;">
                We're reviewing your submission now and will follow up by email within 24 hours with next steps.
              </p>
              <div style="background-color:#151515; border:1px solid #252525; border-radius:8px; padding:25px; margin:30px 0;">
                <h3 style="font-size:18px; font-weight:600; color:#EAEFFF; margin:0 0 15px 0;">What you told us</h3>
                <div style="font-size:14px; margin:6px 0;"><span style="opacity:0.7;">Scope:</span> ${escapeHtml(
                  ["App Development", ...scope].join(", "),
                )}</div>
                ${platformLabel ? `<div style="font-size:14px; margin:6px 0;"><span style="opacity:0.7;">Platform:</span> ${escapeHtml(platformLabel)}</div>` : ""}
                ${budget ? `<div style="font-size:14px; margin:6px 0;"><span style="opacity:0.7;">Budget:</span> ${escapeHtml(budget)}</div>` : ""}
                ${timeline ? `<div style="font-size:14px; margin:6px 0;"><span style="opacity:0.7;">Timeline:</span> ${escapeHtml(timeline)}</div>` : ""}
              </div>
              <div style="background-color:#1a1a1a; border-left:3px solid #EAEFFF; padding:20px 25px; margin:30px 0;">
                <h3 style="font-size:16px; font-weight:600; color:#EAEFFF; margin:0 0 10px 0;">Want to skip ahead?</h3>
                <p style="font-size:14px; color:#EAEFFF; opacity:0.9; margin:0 0 16px 0;">
                  You can book a call directly and we'll go through your answers together.
                </p>
                <a href="https://cal.com/sculptvisions/new-project" style="display:inline-block; background-color:#EAEFFF; color:#101010; text-decoration:none; font-weight:600; font-size:14px; padding:12px 24px; border-radius:999px;">Book a call</a>
              </div>
              <p style="font-size:16px; color:#EAEFFF; opacity:0.9; margin-top:40px;">
                Talk soon,<br><strong>SCULPT</strong>
              </p>
            </div>
            <div style="background-color:#151515; padding:30px; text-align:center; border-top:1px solid #252525;">
              <p style="font-size:14px; color:#EAEFFF; opacity:0.7; margin:0 0 15px 0;">
                This is an automated response confirming we've received your inquiry.
              </p>
              <div style="font-size:14px; color:#EAEFFF; opacity:0.8;">
                <p style="margin:5px 0;"><a href="mailto:admin@sculpt.work" style="color:#EAEFFF; text-decoration:none;">admin@sculpt.work</a></p>
                <p style="margin:5px 0;"><a href="https://sculpt.work" style="color:#EAEFFF; text-decoration:none;">sculpt.work</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (businessEmail.error) {
      console.error("Error sending inquiry business email:", businessEmail.error)
      throw new Error("Failed to send business notification email")
    }

    if (autoReplyEmail.error) {
      console.error("Error sending inquiry auto-reply email:", autoReplyEmail.error)
      throw new Error("Failed to send auto-reply email")
    }

    return { success: true }
  } catch (error) {
    console.error("Error in sendProjectInquiry:", error)
    throw new Error("Failed to send project inquiry")
  }
}
