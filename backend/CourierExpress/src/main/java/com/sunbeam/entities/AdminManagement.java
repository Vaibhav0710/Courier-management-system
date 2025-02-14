package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AdminManagement")
public class AdminManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long managementId;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "managed_customer_id")
    private Customer managedCustomer;

    @ManyToOne
    @JoinColumn(name = "managed_order_id")
    private Order managedOrder;

    @ManyToOne
    @JoinColumn(name = "managed_agent_id")
    private DeliveryAgent managedAgent;
}