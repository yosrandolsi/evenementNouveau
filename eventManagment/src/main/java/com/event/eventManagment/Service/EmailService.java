package com.event.eventManagment.Service;

import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
@Service
public class EmailService implements EmailSender {

    private final JavaMailSender mailSender;

    // Injection via le constructeur
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String to, String emailContent, String subject) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(emailContent, true); // HTML content
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("yosserayadi79@gmail.com");

            mailSender.send(mimeMessage);
            System.out.println("Email sent successfully");
        } catch (MessagingException e) {
            throw new IllegalStateException("Failed to send email", e);
        }
    }
}
