package com.sunbeam.dao;

import com.sunbeam.entities.DeliveryAgent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryAgentRepository extends JpaRepository<DeliveryAgent, Long> {
    DeliveryAgent findByEmail(String email);
}
