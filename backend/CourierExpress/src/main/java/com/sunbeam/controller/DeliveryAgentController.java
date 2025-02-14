package com.sunbeam.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Order;
import com.sunbeam.services.DeliveryAgentService;
import com.sunbeam.services.OrderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/delivery-agents")
public class DeliveryAgentController {
	@Autowired
	private DeliveryAgentService deliveryAgentService;
	@Autowired
	private OrderService orderService;

	/*
	 * For Login
	 */
	@PostMapping("/login")
	public Map<String, Object> authenticate(@RequestBody DeliveryAgent deliveryAgent) throws Exception {
		return deliveryAgentService.getLogin(deliveryAgent);
	}

	/*
	 * For Logout
	 */
	@PutMapping("/logout/{id}")
	public void logout(@PathVariable Long id) {
		deliveryAgentService.Logout(id);
	}

	/*
	 * Create Agents
	 */
	@PostMapping
	public DeliveryAgent createDeliveryAgent(@RequestBody DeliveryAgent deliveryAgent) {
		return deliveryAgentService.createDeliveryAgent(deliveryAgent);
	}

	/*
	 * Available order List to delivery agents
	 */
	@GetMapping("/getAllAvailableOrders")
	public ResponseEntity<List<Order>> getAllAvailableOrders() {
		return ResponseEntity.ok(orderService.getAllAvailableOrders());
	}

	/*
	 * Accepting orders
	 */
	@PutMapping("/acceptOrders/{orderId}")
	public Order acceptOrders(@PathVariable Long orderId, @RequestBody DeliveryAgent deliveryAgentID) {
		return orderService.assignAgent(deliveryAgentID, orderId);
	}

	@GetMapping("/{id}")
	public DeliveryAgent getProfile(@PathVariable Long id) {
		return deliveryAgentService.findById(id);
	}

	/*
	 * Update order status after delivering
	 */
	@PutMapping("/completeOrders/{orderId}")
	public Order completeOrders(@PathVariable Long orderId, @RequestBody DeliveryAgent deliveryAgentID) {
		return orderService.completeOrder(deliveryAgentID, orderId);
	}

	/*
	 * List of order accepted by the agent
	 */
	@GetMapping("/myOrders/{id}")
	public List<Order> getMyOrders(@PathVariable Long id) {
		return orderService.getAllMyOrders(id);
	}

	/*
	 * List of order delivered by the agents({id})
	 */
	@GetMapping("/my_DeliveredOrders/{id}")
	public List<Order> getMyDeliveredOrders(@PathVariable Long id) {
		return orderService.getAllCompletedOrders(id);
	}

	/*
	 * Update agent
	 */
	@PutMapping("/{id}")
	public DeliveryAgent updateDeliveryAgent(@PathVariable Long id, @RequestBody DeliveryAgent deliveryAgent) {
		return deliveryAgentService.updateDeliveryAgent(id, deliveryAgent);
	}

	@PutMapping("/status/{id}")
	public DeliveryAgent updateDeliveryAgentStatus(@PathVariable Long id, @RequestBody String status) {
		return deliveryAgentService.updateDeliveryAgentStatus(id, status);
	}

	/*
	 * Delete agent
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDeliveryAgent(@PathVariable Long id) {
		deliveryAgentService.deleteDeliveryAgent(id);
		return ResponseEntity.noContent().build();
	}
}