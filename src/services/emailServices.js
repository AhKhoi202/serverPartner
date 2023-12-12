require("dotenv").config();
import nodemailer from "nodemailer";

export const sendSimpleEmail = async (reciverEmail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Partner" <khoianh3702@gmail.com>', // Địa chỉ người gởi
    to: reciverEmail, // danh sách người nhận
    subject: "ĐĂNG KÝ PARTNER THÀNH CÔNG", // Dòng tiêu đề
    // text: "Hello world?", // plain text body
    html: `
    <html>
      <head>
        <style>
      /* Thêm bất kỳ kiểu dáng bổ sung nếu cần thiết */
    </style>
  </head>
  <body>
    <p>Kính gửi đối tác thân mến,</p>
    <p>Chào mừng bạn đến với BlueBlot! Chúng tôi rất vui mừng khi có bạn trong đội ngũ đối tác của chúng tôi.</p>
    <p>Cảm ơn bạn đã lựa chọn làm đối tác với chúng tôi. Là một đối tác có giá trị, bạn sẽ có cơ hội truy cập vào nhiều lợi ích và cơ hội khác nhau.</p>
    <!-- Thêm nội dung hoặc thông tin cá nhân khác ở đây -->
    <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua địa chỉ email support@example.com.</p>
    <p>Trân trọng,<br>BlueBolt</p>
  </body>
</html>
    `, // html body
  });
};
