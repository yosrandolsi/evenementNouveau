package com.event.eventManagment.Service;

import com.event.eventManagment.model.Registration;
import com.event.eventManagment.Repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EmailSender emailSender; // ✅ Ajout du service d'envoi d'e-mail

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository, EmailSender emailSender) {
        this.registrationRepository = registrationRepository;
        this.emailSender = emailSender;
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public List<Registration> getAllRegistrations() {
        List<Registration> registrations = new ArrayList<>();
        registrationRepository.findAll().forEach(registrations::add);
        return registrations;
    }

    public Optional<Registration> getRegistrationById(String id) {
        return registrationRepository.findById(id);
    }

    public void deleteRegistration(String id) {
        Registration registrationToDelete = registrationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Inscription non trouvée pour l'ID : " + id));

        // Envoi de l'email avant la suppression
        String subject = "Votre inscription a été supprimée";
        String content = "<p>Bonjour " + registrationToDelete.getFirstName() + ",</p>" +
                "<p>Nous vous informons que votre inscription à l'événement a été <strong>supprimée</strong>.</p>" +
                "<p>Nous vous remercions pour votre compréhension.</p><br><p>Cordialement,<br>L'équipe d'organisation</p>";

        emailSender.sendEmail(registrationToDelete.getEmail(), content, subject);

        // Suppression de l'inscription après l'envoi de l'email
        registrationRepository.deleteById(id);
    }

    public List<Registration> getRegistrationsByEventId(String eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public Registration updateRegistration(String id, Registration updatedRegistration) {
        return registrationRepository.findById(id).map(existingRegistration -> {

            boolean alreadyAccepted = "Accepté".equalsIgnoreCase(existingRegistration.getStatus());
            boolean isNowAccepted = "Accepté".equalsIgnoreCase(updatedRegistration.getStatus());
            
         

            // Mise à jour des informations
            existingRegistration.setFirstName(updatedRegistration.getFirstName());
            existingRegistration.setLastName(updatedRegistration.getLastName());
            existingRegistration.setEmail(updatedRegistration.getEmail());
            existingRegistration.setPhone(updatedRegistration.getPhone());
            existingRegistration.setAddress(updatedRegistration.getAddress());
            existingRegistration.setCategory(updatedRegistration.getCategory());
            existingRegistration.setStatus(updatedRegistration.getStatus());
            existingRegistration.setPreferences(updatedRegistration.getPreferences());
            existingRegistration.setRegistrationDate(updatedRegistration.getRegistrationDate());

            Registration savedRegistration = registrationRepository.save(existingRegistration);

            // Envoi de l'email si le statut devient "Accepté"
            if (!alreadyAccepted && isNowAccepted) {
                String subject = "Confirmation de votre inscription";
                String content = "<p>Bonjour " + savedRegistration.getFirstName() + ",</p>" +
                        "<p>Votre inscription à l'événement a été <strong>acceptée</strong> !</p>" +
                        "<p>Nous avons hâte de vous voir.</p><br><p>Cordialement,<br>L'équipe d'organisation</p>";
                emailSender.sendEmail(savedRegistration.getEmail(), content, subject);
            }

    

            return savedRegistration;
        }).orElseThrow(() -> new RuntimeException("Inscription non trouvée pour l'ID : " + id));
    }
}