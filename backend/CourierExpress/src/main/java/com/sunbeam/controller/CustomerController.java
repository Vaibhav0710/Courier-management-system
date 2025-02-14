package com.sunbeam.controller;

import com.sunbeam.entities.Customer;
import com.sunbeam.entities.Order;
import com.sunbeam.services.CustomerService;
import com.sunbeam.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;

    /*
     * For Login
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody Customer customer) {
        Map<String, Object> response = customerService.getLogin(customer);
        return ResponseEntity.ok(response);
    }

    //
    /*
     * For logout
     */
    @PutMapping("/logout/{id}")
    public void logout(@PathVariable Long id) {
        customerService.Logout(id);
    }

    /*
     * Create Customer
     */
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    /*
     * For booking
     */
    @PostMapping("/BookForBike")
    public Order bookOrderForBike(@RequestBody Order order) {
        return orderService.createOrderForBike(order);
    }

    @PostMapping("/BookForTruck")
    public Order bookOrder(@RequestBody Order order) {
        return orderService.createOrderForTruck(order);
    }

    /*
     * Return the List of order book by me(customer) {Customer order history}
     */
    @GetMapping("/getAllMyOrders/{id}")
    public List<Order> getAllMyOrders(@PathVariable Long id) {
        return orderService.getOrdersByCustomerId(id);
    }

    /*
     * Update myself(customer)
     */
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    /*
     * To delete myself(customer
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    /*
     * Find Customer by ID not useful for now
     */
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }
}
