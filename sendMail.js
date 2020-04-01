const Path = process.cwd();
const nodeMail = require("nodemailer");
const emailInfo = require(Path + '/mailInfo.json');
const transporter = nodeMail.createTransport({
  service: "Gmail",
  auth: {
    user: emailInfo.user,
    pass: emailInfo.pass
  }
});

async function sendSampleMail() {
  try {
    mailOptions = {
      from: 'Sender mailAddress',
      to: 'Receiver mailAddress',
      subject: "Mail Subject. Title of mail",
      text: "body of mail. it just Text. if you want send Html form, you just change the key 'text' to 'html' "
    };
    const send_mail = await sendEmailWithNodeMailer(mailOptions);
    if (!send_mail)
      throw {status: 400, errorCode: "ErrorCode", category: 'email/sendRefuse', message: "Can Not Send Email"};
    console.log({message: [200, {data: ""}, 'Success']});
    // res.send({message: [200, {data: ""}, 'Success']});
  } catch (e) {
    console.error(e)
    // res.send(e)
  }
}


async function sendCustomEmail(type, value, email) {
  try {
    const mailOptions = mailOptions(email, type, value);
    const send_mail = await sendEmailWithNodeMailer(mailOptions);
    if (!send_mail)
      throw {status: 400, errorCode: "ErrorCode", category: 'email/sendRefuse', message: "Can Not Send Email"};
    console.log({message: [200, {data: ""}, 'Success']});
    // res.send({message: [200, {data: ""}, 'Success']});
  } catch (e) {
    console.error(e)
    // res.send(e)
  }
}

function mailOptions(type, value, email){
  switch (type) {
    case "sendHtml" :
      addressOption.fromMe["to"] = email;
      addressOption.fromMe["subject"] = value.subject;
      addressOption.fromMe["html"] = value.body;
      return addressOption.fromMe;

    case  "sendText" :
      addressOption.fromMe["to"] = email;
      addressOption.fromMe["subject"] = value.subject;
      addressOption.fromMe["text"] = value.body;
      return addressOption.fromMe;

    case  "userInquiry" :
      addressOption.fromMeToMe["subject"] = value.subject;
      addressOption.fromMeToMe["html"] = value.body;
      break;
  }
}

const addressOption = {
  fromMe : {from: emailInfo.user},
  toMe: {to: emailInfo.user},
  fromMeToMe : {from: emailInfo.user, to: emailInfo.user}
};



async function sendEmailWithNodeMailer(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.error(err);
        reject(false)
      } else {
        console.log("Message send");
        resolve (true)
      }
    })
  })
}

