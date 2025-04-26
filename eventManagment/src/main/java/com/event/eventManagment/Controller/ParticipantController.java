package com.event.eventManagment.Controller;


	

	import com.event.eventManagment.model.Participant;
	import com.event.eventManagment.Service.ParticipantService;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;

	

	import java.util.List;

	@RestController
	@RequestMapping("/api/participants")
	@CrossOrigin(origins = "*")
	public class ParticipantController {

	    @Autowired
	    private ParticipantService participantService;

	    @PostMapping("/register")
	    public ResponseEntity<?> register(@RequestBody Participant participant) {
	        if (participant.getUserId() == null || participant.getUserId().isEmpty()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
	        }
	        return ResponseEntity.ok(participantService.registerParticipant(participant));
	    }

	    @GetMapping("/event/{eventId}")
	    public List<Participant> getByEvent(@PathVariable String eventId) {
	        return participantService.getParticipantsByEvent(eventId);
	    }

	    @GetMapping("/all")
	    public Iterable<Participant> getAll() {
	        return participantService.getAllParticipants();
	    }
	}
