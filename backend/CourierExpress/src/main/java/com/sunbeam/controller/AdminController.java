package com.sunbeam.controller;

import com.sunbeam.entities.Admin;
import com.sunbeam.entities.Customer;
import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Order;
import com.sunbeam.services.AdminService;
import com.sunbeam.services.CustomerService;
import com.sunbeam.services.DeliveryAgentService;
import com.sunbeam.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private DeliveryAgentService deliveryAgentService;
    @Autowired
    private OrderService orderService;

    /*
     * For Login
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody Admin admin) {
        Map<String, Object> response = adminService.getLogin(admin);
        return ResponseEntity.ok(response);
    }

    @PostMapping()
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    /*
     * Customer List
     */
    @GetMapping("/customer")
    public List<Customer> getAllCustomer() {
        return customerService.getAllCustomers();
    }

    /*
     * Order List
     */
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    /*
     * Agents List
     */
    @GetMapping("/agents")
    public ResponseEntity<List<DeliveryAgent>> getAllAgents() {
        List<DeliveryAgent> agents = deliveryAgentService.getAllDeliveryAgents();
        return ResponseEntity.ok(agents);
    }

    /*
     * Delete Agents
     */
    @DeleteMapping("/agents/{id}")
    public ResponseEntity<?> deleteAgent(@PathVariable Long id) {
        deliveryAgentService.deleteDeliveryAgent(id);
        return ResponseEntity.noContent().build();
    }

    /*
     * Update Payment and order status (payment received)
     */
    @PutMapping("/orders/{id}")
    public Order updateOrderStatus(@PathVariable Long id) {
        return orderService.UpdateOrderStatus(id);
    }

    /*
     * For Logout
     */
    @PutMapping("/logout/{id}")
    public String logout(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
        return adminService.Logout(id, request, response);
    }

    /*
     * Find Admin by ID (not useful for now)
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Admin adminTable = adminService.getAdminById(id);
        return adminTable != null ? ResponseEntity.ok(adminTable) : ResponseEntity.notFound().build();
    }
}
