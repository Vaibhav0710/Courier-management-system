package com.sunbeam.config;

import com.sunbeam.dao.AdminRepository;
import com.sunbeam.dao.CustomerRepository;
import com.sunbeam.dao.DeliveryAgentRepository;
import com.sunbeam.entities.Admin;
import com.sunbeam.entities.Customer;
import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDateTime;

@Configuration
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private DeliveryAgentRepository agentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Check in Admin repository
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            admin.setStatus(Status.ONLINE);
            admin.setLastOnline(LocalDateTime.now());
            // Return UserDetails with roles if applicable
            return new UserAdmin(admin); // Add roles if needed
        }

        // Check in Agent repository
        DeliveryAgent agent = agentRepository.findByEmail(email);
        if (agent != null) {
            agent.setStatus(Status.ONLINE);
            agent.setLastOnline(LocalDateTime.now());
            return new UserAgent(agent); // Add roles if needed
        }

        // Check in Customer repository
        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            customer.setStatus(Status.ONLINE);
            customer.setLastOnline(LocalDateTime.now());
            return new UserCustomers(customer); // Add roles if needed
        }
        throw new UsernameNotFoundException("User  not found with email: " + email);
    }
}
