package com.sunbeam.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.DeliveryAgentRepository;
import com.sunbeam.dao.OrderRepository;
import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Order;
import com.sunbeam.entities.OrderStatus;
import com.sunbeam.entities.Type;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private DeliveryAgentRepository deliveryAgentRepository;

	/*
	 * Order List to admin
	 */
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	/*
	 * Create order
	 */
	public Order createOrderForBike(Order order) {
		order.setVehicleRequired(Type.BIKE);
		order.setOrderDate(LocalDateTime.now());
		order.setOrderStatus(OrderStatus.PENDING);
		return orderRepository.save(order);
	}

	public Order createOrderForTruck(Order order) {
		order.setVehicleRequired(Type.TRUCK);
		order.setOrderDate(LocalDateTime.now());
		order.setOrderStatus(OrderStatus.PENDING);
		return orderRepository.save(order);
	}

	/*
	 * payment Received status updated by admin
	 */
	public Order UpdateOrderStatus(Long orderId) {
		return orderRepository.findById(orderId).map(order -> {
			order.setOrderStatus(OrderStatus.IN_PROGRESS);
			return orderRepository.save(order);
		}).orElse(null);
	}

	/*
	 * List of orders accepted by agents return to agent page
	 */
	public List<Order> getAllMyOrders(Long id) {
		if (id == null) {
			throw new IllegalArgumentException("Agent ID must not be null");
		}
		return orderRepository.findByAssignedAgent_AgentId(id);
	}

	/*
	 * List of order to admin
	 */
	public List<Order> getAllAvailableOrders() {
		return orderRepository.findByOrderStatusAndAgent(OrderStatus.IN_PROGRESS);
	}

	/*
	 * List order completed by agents (agents page)
	 */
	public List<Order> getAllCompletedOrders(Long id) {
		DeliveryAgent agent = deliveryAgentRepository.findById(id).orElse(null);
		return orderRepository.findByAssignedAgentAndOrderStatus(agent);
	}

	/*
	 * Assign agents (accept order by agents)
	 */
	public Order assignAgent(DeliveryAgent deliveryAgent, Long orderId) {
		if (deliveryAgent == null || deliveryAgent.getAgentId() == null) {
			throw new IllegalArgumentException("Delivery Agent ID must not be null");
		}
		DeliveryAgent agent = deliveryAgentRepository.findById(deliveryAgent.getAgentId())
				.orElseThrow(() -> new IllegalArgumentException("Delivery Agent not found"));
		return orderRepository.findById(orderId).map(order -> {
			order.setOrderStatus(OrderStatus.OUT_FOR_DELIVERY);
			order.setAssignedAgent(agent);
			return orderRepository.save(order);
		}).orElseThrow(() -> new IllegalArgumentException("Order not found"));
	}

	/*
	 * Update order status to complete by delivery agents and adding 10% of price to
	 * agents salary
	 */
	public Order completeOrder(DeliveryAgent deliveryAgent, Long orderId) {
		// Retrieve the agent
		DeliveryAgent agent = deliveryAgentRepository.findById(deliveryAgent.getAgentId())
				.orElseThrow(() -> new IllegalArgumentException("Agent with ID " + deliveryAgent + " does not exist."));
		// Retrieve the order
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new IllegalArgumentException("Order with ID " + orderId + " does not exist."));
		// Update the order status and agent's earnings
		order.setOrderStatus(OrderStatus.COMPLETED);
		agent.setEarnings(agent.getEarnings() + (order.getPrice() / 10));

		deliveryAgentRepository.save(agent);
		return orderRepository.save(order);
	}

	/*
	 * Return Order List to customer
	 */
	public List<Order> getOrdersByCustomerId(Long id) {
		if (id == null) {
			throw new IllegalArgumentException("Agent ID must not be null");
		}
		return orderRepository.findByCustomer_CustomerId(id);
	}
}