package com.sunbeam.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sunbeam.config.JWTService;
import com.sunbeam.dao.DeliveryAgentRepository;
import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Status;

@Service
public class DeliveryAgentService {

	/*
	 * Create agents
	 */
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	@Autowired
	private JWTService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private DeliveryAgentRepository deliveryAgentRepository;

	/*
	 * Login
	 */
	public Map<String, Object> getLogin(DeliveryAgent deliveryAgent) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(deliveryAgent.getEmail(), deliveryAgent.getPassword()));
		if (authentication.isAuthenticated()) {
			DeliveryAgent agent = deliveryAgentRepository.findByEmail(deliveryAgent.getEmail());
			String token = jwtService.generateToken(deliveryAgent.getEmail());
			Long id = agent.getAgentId(); // Fetch customer details from DB
			Long earnings = agent.getEarnings();
			// Create a response map
			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("deliveryAgentID", id);
			response.put("earnings", earnings);
			return response;
		}
		throw new RuntimeException("Authentication failed");
	}

	public DeliveryAgent createDeliveryAgent(DeliveryAgent deliveryAgent) {
		deliveryAgent.setRegistrationDate(LocalDateTime.now());
		deliveryAgent.setPassword((encoder.encode(deliveryAgent.getPassword())));
		deliveryAgent.setStatus(Status.OFFLINE);
		deliveryAgent.setEarnings(0L);
		deliveryAgent.setLastOnline(LocalDateTime.now());
		return deliveryAgentRepository.save(deliveryAgent);
	}

	/*
	 * Agents List
	 */
	public List<DeliveryAgent> getAllDeliveryAgents() {
		return deliveryAgentRepository.findAll();
	}

	/*
	 * Update agents
	 */
	public DeliveryAgent updateDeliveryAgent(Long id, DeliveryAgent updatedAgent) {
		return deliveryAgentRepository.findById(id).map(existingAgent -> {
			existingAgent.setName(updatedAgent.getName());
			existingAgent.setPhone(updatedAgent.getPhone());
			return deliveryAgentRepository.save(existingAgent);
		}).orElse(null);
	}

	/*
	 * Delete agents
	 */
	public void deleteDeliveryAgent(Long id) {
		deliveryAgentRepository.deleteById(id);
	}

	/*
	 * Logout
	 */
	public void Logout(Long id) {
		DeliveryAgent existingDeliveryAgent = deliveryAgentRepository.findById(id).orElse(null);
		if (existingDeliveryAgent != null) {
			existingDeliveryAgent.setLastOnline(LocalDateTime.now());
			existingDeliveryAgent.setStatus(Status.OFFLINE);
			deliveryAgentRepository.save(existingDeliveryAgent);
		}
	}

	public DeliveryAgent updateDeliveryAgentStatus(Long id, String status) {
		return deliveryAgentRepository.findById(id).map(existingAgent -> {
			existingAgent.setStatus(Status.valueOf(status));
			return deliveryAgentRepository.save(existingAgent);
		}).orElse(null);
	}

	public DeliveryAgent findById(Long id) {
		// TODO Auto-generated method stub
		return deliveryAgentRepository.findById(id).orElse(null);
	}
}