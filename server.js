const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local first, then .env
const envLocalPath = path.join(__dirname, '.env.local');
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  require('dotenv').config();
}

const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend - check both REACT_APP_ and direct variable names
const apiKey = process.env.REACT_APP_RESEND_API_KEY || process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('❌ ERROR: Resend API key not found!');
  console.error('Please add REACT_APP_RESEND_API_KEY to your .env.local file');
  process.exit(1);
}

const resend = new Resend(apiKey);

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { from_name, from_email, from_mobile, subject, message } = req.body;

    // Validation
    if (!from_email || !from_name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, and Message)'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const toEmail = process.env.REACT_APP_CONTACT_EMAIL || 'aadityachauhan6395@gmail.com';
    const fromEmail = process.env.REACT_APP_FROM_EMAIL || 'onboarding@resend.dev';

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #854CE6 0%, #cc00bb 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #854CE6;
              margin-bottom: 5px;
              display: block;
            }
            .value {
              padding: 10px;
              background-color: #f5f5f5;
              border-radius: 4px;
              border-left: 3px solid #854CE6;
            }
            .message-box {
              padding: 15px;
              background-color: #f5f5f5;
              border-radius: 4px;
              border-left: 3px solid #854CE6;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${from_name || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${from_email || 'Not provided'}</div>
              </div>
              
              ${from_mobile ? `
              <div class="field">
                <span class="label">Mobile Number:</span>
                <div class="value">${from_mobile}</div>
              </div>
              ` : ''}
              
              ${subject ? `
              <div class="field">
                <span class="label">Subject:</span>
                <div class="value">${subject}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message || 'No message provided'}</div>
              </div>
              
              <div class="footer">
                <p>This email was sent from your portfolio contact form.</p>
                <p>Sent at: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject || `Contact Form Message from ${from_name || 'Portfolio Website'}`,
      html: htmlContent,
      reply_to: from_email,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to send email'
      });
    }

    res.json({
      success: true,
      message: 'Email sent successfully!',
      data: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email API server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails to: ${process.env.REACT_APP_CONTACT_EMAIL || 'aadityachauhan6395@gmail.com'}`);
});

