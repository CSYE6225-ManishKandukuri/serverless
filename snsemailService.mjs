import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
 
 
const smtpUser = process.env.EMAIL_SMTP_USERNAME;
const smtpPassword = process.env.EMAIL_SMTP_PASSWORD;
const smtpHost = process.env.EMAIL_SMTP_HOST;
const senderEmail = process.env.EMAIL_SENDER_EMAIL;
const smtpPort = process.env.EMAIL_SMTP_PORT;
 
 
//Create a Nodemailer transporter using SMTP configuration.
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});
 
async function saveAssignmentSubmissionStatus(toEmail, assignmentName, downloadStatus, uploadStatus, url, filePath = null) {
 
  let emailSubject;
  let emailBody;
 
  // Download status and upload status  success then assignment submission status is scuccesful
  if (downloadStatus === 1 && uploadStatus === 1)
  {
    emailSubject = 'Assignment Submission Status Successful';
    emailBody = `Assignment ${assignmentName} has been submitted successfully, stored in Google Cloud Storage download from this URL - ${url} with File Name - ${filePath}`;
  }
  else
  {
    // Download status  is success and upload status  failure  then assignment submission status is not succesful
    if (downloadStatus === 1)
    {
      emailSubject = 'Assignment Submission Status Failure';
      emailBody = `Assignment : ${assignmentName} Downloaded Successfully Failed to upload to GCP contact Admin`;
    }
    else
    {
        // Download status  is failure and upload status  failure  due to wrong url then assignment submission status is not succesful
      emailSubject = 'Assignment Submission Status Failure';
      emailBody = `Assignment : ${assignmentName} Submission Failed enter proper url, invalid submitted url - ${url}`;
    }
  }
 
  const ccEmailListString = process.env.CCEMAILLIST;
 
  const ccEmailList = JSON.parse(ccEmailListString);
 
  const formattedCcList = ccEmailList.map(email => `"${email}"`).join(', ');
 
  const info = await transporter.sendMail({
    from: senderEmail,
    to: toEmail,
    cc: formattedCcList,
    subject: emailSubject,
    text: emailBody,
  });
  console.log(info);
  console.log(`Message sent to: ${toEmail}, messageId - ${info.messageId}.`);
}
 
 
export default saveAssignmentSubmissionStatus;