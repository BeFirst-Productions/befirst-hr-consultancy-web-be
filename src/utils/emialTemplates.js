export const enquiryEmailTemplate = ({ name, lastname, email, subject, notes }) => {
  const fullName = `${name} ${lastname}`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 650px;
        background: #ffffff;
        margin: 30px auto;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 4px 15px rgba(0,0,0,0.08);
        border: 1px solid #e5e5e5;
      }
      .header {
        background: #007bff;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .header h2 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 25px;
      }
      .content h3 {
        margin-bottom: 15px;
        color: #007bff;
        font-size: 18px;
      }
      .info {
        background: #f9fbfd;
        padding: 15px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        margin-bottom: 20px;
      }
      .info p {
        margin: 6px 0;
        font-size: 15px;
      }
      .message-box {
        background: #fff;
        border-left: 4px solid #007bff;
        padding: 15px;
        font-size: 15px;
        line-height: 1.6;
        white-space: pre-line;
      }
      .footer {
        background: #f1f1f1;
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>📩 New Enquiry Received</h2>
      </div>
      <div class="content">
        <h3>Contact Information</h3>
        <div class="info">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submitted On:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <h3>Subject</h3>
        <div class="info">
          <p>${subject}</p>
        </div>

        <h3>Message</h3>
        <div class="message-box">
          ${notes}
        </div>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Your Company Name — This is an automated notification.
      </div>
    </div>
  </body>
  </html>
  `;
};
