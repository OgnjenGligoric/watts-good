package com.example.WattsGood.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String wattsGoodMail;

    private static final String linkPath = "http://localhost:4200/activate";

    public void sendAccountConfirmationEmail(String to, String secret) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String confirmationLink = linkPath + "/" + to + "/" + secret;

        helper.setFrom(wattsGoodMail);
        helper.setTo(to);
        helper.setSubject("Confirm Your WattsGood Account!");
        helper.setText(generateUserEmailConfirmationBody(confirmationLink), true);

        mailSender.send(message);
    }

    private String generateUserEmailConfirmationBody(String confirmationLink) {
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Confirm Your Email</title>\n" +
                "    <style>\n" +
                "        body { font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; margin: 0; padding: 0; }\n" +
                "        .container { width: 100%; max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }\n" +
                "        .header { text-align: center; padding: 10px 0; }\n" +
                "        .header h1 { font-size: 24px; color: #1A76D1; }\n" +
                "        .content { padding: 20px; line-height: 1.6; }\n" +
                "        .button-container { text-align: center; margin-top: 20px; }\n" +
                "        .button-container a { color: #fff; }\n" +
                "        .button { padding: 12px 24px; background: #1A76D1; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <div class=\"header\"><h1>Welcome to WattsGood!</h1></div>\n" +
                "        <div class=\"content\">\n" +
                "            <p>Hi there,</p>\n" +
                "            <p>Thank you for signing up! Please confirm your email address to activate your account and get started.</p>\n" +
                "            <p>Click the button below to confirm your email:</p>\n" +
                "            <div class=\"button-container\">\n" +
                "                <a href=\"" + confirmationLink + "\" class=\"button\">Confirm Email</a>\n" +
                "            </div>\n" +
                "            <p>If the button doesn't work, click on this link:</p>\n" +
                "            <p><a href=\"" + confirmationLink + "\">" + confirmationLink + "</a></p>\n" +
                "            <p>Thank you,<br>The WattsGood Team</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}