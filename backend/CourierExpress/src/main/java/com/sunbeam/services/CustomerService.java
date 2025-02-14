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
import com.sunbeam.dao.CustomerRepository;
import com.sunbeam.entities.Customer;
import com.sunbeam.entities.Status;

@Service
public class CustomerService {

	/*
	 * Create Customer
	 */
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	private JWTService jwtService;
	@Autowired
	private CustomerRepository customerRepository;
	/*
	 * For password encryption
	 */

	/*
	 * Login
	 */
	public Map<String, Object> getLogin(Customer customer) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(customer.getEmail(), customer.getPassword()));
		if (authentication.isAuthenticated()) {
			String token = jwtService.generateToken(customer.getEmail());
			Long id = customerRepository.findByEmail(customer.getEmail()).getCustomerId(); // Fetch customer details
																							// from DB

			// Create a response map
			Map<String, Object> response = new HashMap<>();
			response.put("token", token);
			response.put("customerId", id);
			return response;
		}
		throw new RuntimeException("Authentication failed");
	}

	/*
	 * List of Customer
	 */
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer createCustomer(Customer customer) {
		customer.setRegistrationDate(LocalDateTime.now());
		customer.setStatus(Status.OFFLINE);
		customer.setLastOnline(LocalDateTime.now());
		customer.setPassword((encoder.encode(customer.getPassword()))); // Set the encrypted password
		return customerRepository.save(customer);
	}

	/*
	 * Find Customer by id
	 */
	public Customer getCustomerById(Long id) {
		Customer cust = customerRepository.findById(id).orElse(null);
		cust.setPassword(null);
		return cust;
	}

	/*
	 * Update Customer
	 */
	public Customer updateCustomer(Long id, Customer updatedCustomer) {
		Customer existingCustomer = customerRepository.findById(id).orElse(null);
		assert existingCustomer != null;
		existingCustomer.setName(updatedCustomer.getName());
		existingCustomer.setPhone(updatedCustomer.getPhone());
		return customerRepository.save(existingCustomer);
	}

	/*
	 * Delete Customer
	 */
	public void deleteCustomer(Long id) {
		customerRepository.deleteById(id);
	}

	/*
	 * Logout
	 */
	public void Logout(Long id) {
		Customer existingCustomer = customerRepository.findById(id).orElse(null);
		if (existingCustomer != null) {
			existingCustomer.setLastOnline(LocalDateTime.now());
			existingCustomer.setStatus(Status.OFFLINE);
			customerRepository.save(existingCustomer);
		}
	}
}