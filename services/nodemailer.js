import nodemailer from "nodemailer";
import "dotenv/config";

const { NODEMAILER_MAIL, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: NODEMAILER_MAIL,
    pass: NODEMAILER_PASSWORD
  }
});

export const sendActivationCode = async (code, email) => {
  try {
    const mailOptions = {
      from: NODEMAILER_MAIL,
      to: email,
      subject: "Account activation ✔",
      html: `<h1>${code}</h1>`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export const sendManagerCredentials = async (email, password, universityName) => {
  try {
    const mailOptions = {
      from: NODEMAILER_MAIL,
      to: email,
      subject: "Manager Credentials",
      html: `<div>
        <h2>University name: <b>${universityName}</b></h2>
        <h2>Email: <b>${email}</b></h2>
        <h2>Password: <b>${password}</b></h2>
      </div>`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
