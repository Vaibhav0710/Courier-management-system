package com.sunbeam.dao;

import com.sunbeam.entities.DeliveryAgent;
import com.sunbeam.entities.Order;
import com.sunbeam.entities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // return the list of order which delivery accepted
    List<Order> findByAssignedAgent_AgentId(Long id);

    // return the list of order which customer have booked
    List<Order> findByCustomer_CustomerId(Long id);

    // to get list of order for delivery person to accept
    @Query("SELECT o FROM Order o WHERE o.orderStatus = :orderStatus AND o.assignedAgent IS NULL")
    List<Order> findByOrderStatusAndAgent(@Param("orderStatus") OrderStatus orderStatus);

    // return list of orders which is completed but the agent(based on agent id)
    @Query("SELECT o FROM Order o WHERE o.orderStatus = 'COMPLETED' AND o.assignedAgent = :assignedAgent")
    List<Order> findByAssignedAgentAndOrderStatus(
            @Param("assignedAgent") DeliveryAgent assignedAgent
    );
}
