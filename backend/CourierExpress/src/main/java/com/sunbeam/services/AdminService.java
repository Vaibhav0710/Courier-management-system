package com.sunbeam.services;

import com.sunbeam.config.JWTService;
import com.sunbeam.dao.AdminRepository;
import com.sunbeam.entities.Admin;
import com.sunbeam.entities.Status;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AdminRepository adminRepository;

    /*
     * Login
     */
    public Map<String, Object> getLogin(Admin admin) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(admin.getEmail(), admin.getPassword())
        );
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(admin.getEmail());
            Long id = adminRepository.findByEmail(admin.getEmail()).getAdminId(); // Fetch customer details from DB

            // Create a response map
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("adminID", id);
            return response;
        }
        throw new RuntimeException("Authentication failed");
    }

    /*
     * finding admin by id
     */
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin createAdmin(Admin admin) {
        // Encrypt the password
        admin.setPassword(admin.getPassword());
        admin.setRegistrationDate(LocalDateTime.now());
        admin.setStatus(Status.OFFLINE);
        admin.setLastOnline(LocalDateTime.now());
        admin.setPassword((encoder.encode(admin.getPassword()))); // Set the encrypted password
        return adminRepository.save(admin); // Save the admin to the database
    }

    /*
     * Logout
     */
    public String Logout(Long id, HttpServletRequest request, HttpServletResponse response) {
        Admin existingAdmin = adminRepository.findById(id).orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setLastOnline(LocalDateTime.now());
            request.getSession().invalidate();
            adminRepository.save(existingAdmin);
            return "Logged out successfully";
        }
        return "User not found";
    }
}