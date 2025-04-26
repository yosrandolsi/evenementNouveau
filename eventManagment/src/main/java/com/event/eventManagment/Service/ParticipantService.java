package com.event.eventManagment.Service;

import com.event.eventManagment.model.Participant;
import com.event.eventManagment.Repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

	@Service
	public class ParticipantService {
	    @Autowired
	    private ParticipantRepository participantRepository;

	    public Participant registerParticipant(Participant participant) {
	        return participantRepository.save(participant);
	    }

	    public List<Participant> getParticipantsByEvent(String eventId) {
	        return participantRepository.findByEventId(eventId);
	    }

	    public Iterable<Participant> getAllParticipants() {
	        return participantRepository.findAll();
	    }
	   

}
