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

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
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
        registrationRepository.deleteById(id);
    }

    // Optionnel : Récupérer les inscriptions par ID événement
    public List<Registration> getRegistrationsByEventId(String eventId) {
        return registrationRepository.findByEventId(eventId);
    }
}
