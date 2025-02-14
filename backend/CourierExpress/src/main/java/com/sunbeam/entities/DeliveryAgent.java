package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DeliveryAgent")
public class DeliveryAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long agentId;

    private String name;
    private String email;
    private String phone;
    private String password;

    private String vehicleNo;

    @Enumerated(EnumType.STRING)
    private Type vehicleType;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Long earnings;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "LastOnline")
    private LocalDateTime LastOnline;
}