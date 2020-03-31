const nodeMail = require("nodemailer");
const Path = process.cwd();
const emailInfo = require(Path + '/mailInfo.json');
const transporter = nodeMail.createTransport({
  service: "Gmail",
  auth: {
    user: emailInfo.user,
    pass: emailInfo.pass
  }
});
console.log('emailInfo.user : ',emailInfo.default.user);
// var mailOptions = {
//   from: req.body.email,
//   to: myEmail,
//   subject: req.body.name + "님의 문의 메일",
//   text: "문의 메일이 왔습니다. 이름: " + req.body.name + ", 메시지 내용: " + req.body.message
// };

// var mailOptions = {
//   from: "hello@undefined.gg",
//   to: "lucia@undefined.gg",
//   subject: "req.body.name" + "안녕안",
//   html: `<h3>[DuelNET] 임시 비밀번호는 []입니다. </h3><br>
// 							<h4> 사용 후 변경해 주세요. </h4>`
// };


function mailOptions(email, type, value){
  let subject;
  let html;
  let from = "hello.duelnet@gmail.com";
  let	to = email;
  switch (type) {
    case "tempPwd" :
      subject = `[DuelNET] 임시 비밀번호 : ${value}`;
      html = `<h3>[DuelNET] 임시 비밀번호는 [${value}]입니다. </h3><br>
							<h4> 사용 후 변경해 주세요. </h4>`;
      break;
    case  "emailValidateNum" :
      subject = `[DuelNET] 이메일 인증 번호 : ${value}`;
      html = `<h3>[DuelNET] 이메일 인증 번호는 [${value}]입니다.</h3><br>`;
      break;
    case  "userInquiry" :
      subject = `${email} 문의 메일`;
      html = value;
      to = 'hello@undefined.gg';
      break;
  }
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html
  };

  return mailOptions;
}

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



// transporter.sendMail(mailOptions, function (err) {
//   if (err) {
//     console.log(err);
//     // res.status(400).send({ msg: "전송 실패" });
//   } else {
//     console.log("Message send");
//     // res.status(200).send({ msg: "전송 완료" });
//   }
// });