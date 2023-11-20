const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = CLIENT_ID;
const CLIENT_SECRET = CLIENT_SECRET;
const REDIRECT_URL = REDIRECT_URL;
const REFRESH_TOKEN = REFRESH_TOKEN

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function send_mail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "userid who logged in using oauth",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOption = {
      from: "XYZ <xyz@gmai.com>",
      to: "to candidiate whom we want to send mail",
      subject: "Hello this mail is from Raza Hussain Rizwi",
      text: "Hello from New App texting Gmail API",
      html: "<h1>Hello from Gmail api using Gmail API</h1>",
    };

    const result = await transport.sendMail(mailOption);
    return result;
  } catch (error) {
    return error;
  }
}

send_mail().then((result) => {
  console.log("Email Sent...", result);
}).catch(error => console.log(error.message));
