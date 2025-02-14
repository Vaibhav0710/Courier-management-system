# Courier Services Management Project Using Spring Boot

## **What Technology We Used For Backend**

### **Backend**

- **Spring Boot**: Robust backend services.
- Spring Security: Secure authentication and authorization.
- **JWT**: Token-based security.
- **MySQL**: Efficient data management.

### Objectives

The objective of this project is to design and implement a robust Courier Management System that facilitates the management of couriers, customers, delivery agents, and administrative tasks. The system will improve operational efficiency, enhance user experience, and ensure secure management of sensitive data.

### Scope:

- Separate login pages for Admin, Customer, and Delivery Agent.
- Role-based access and functionality for each user type.
- JWT-based authentication and password encryption for security.
- Management of customers, agents, and orders through dedicated interfaces.
- Automatic assignment of orders to delivery agents.
- Order tracking and status updates for customers.

### Security Features:

- Passwords will be securely encrypted using hashing algorithms.
- JWT-based authentication will ensure secure access to APIs.
- Role-based authorization to prevent unauthorized access.

### Functional Requirements:

- **Admin:**
    - Manage customer and delivery agent profiles.
    - Monitor and update order statuses.
- **Customer:**
    - Register and log in to the system.
    - Place new courier orders.
    - Track order status.
    - View order history.
- **Delivery Agent:**
    - Register and log in to the system.
    - Accept orders.
    - Update order statuses (e.g. delivered).
    - Monitor earnings
    

---

## Team Members

1. Om 
2. Sarang
3. Vaibhav
4. Rohit

---

### ER Diagram Details:

1. **Entities:**
    - **Admin**: Represents admin users managing the system.
    - **Customer**: Represents users placing orders.
    - **DeliveryAgent**: Represents delivery agents managing deliveries.
    - **Orders**: Represents orders placed by customers and assigned to agents.
2. **Attributes:**
    - Each entity contains attributes like name, email, status, etc.
3. **Relationships:**
    - One-to-Many between **Customer** and **Orders**.
    - One-to-Many between **DeliveryAgent** and **Orders**.
    

---

## **Tools & Technology You Need to Install**

1. **IntelliJ IDEA**
    - IDE for efficient backend development.
2. **MySQL**
    - Relational database for managing application data.
3. **VS Code**
    - Lightweight and powerful editor for frontend development.

# **🚀 Build Series And Controllers🛠️**

---

## **👤 Customer Service**

1. **📝 POST `/customers`** 
    - **📝 Description:** Registers/Create a new user with the provided signup details.
    - **📥 Request Body:**
        - 🆕 `CustomerPojo` (contains customer registration details).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"User created successfully and return Customer"*
        - 📄 Authentication response object.
        
2. **🔑 POST `/customers/login`**
    - **📝 Description:** Login in a user using their email and password.
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `email` and `password`).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Token and customer id"*
        - 📄 Authentication response object.

1. **📝 POST `/customers/BookForBike`**
    - **📝 Description:** To Book a 2-wheeler courier service.
    - **📥 Request Body:**
        - 📧 `OrderPojo` (contains `order` details).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Return The Order details after saving in the database "*
        - 📄 Authentication response object.
        
2. **📝 POST `/customers/BookForTruck`**
    - **📝 Description:** To Book a Truck courier service.
    - **📥 Request Body:**
        - 📧 `OrderPojo` (contains `order` details).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Return The Order details after saving in the database "*
        - 📄 Authentication response object.
        
3. **📝 GET `/customers/getAllMyOrders/{id}`**
    - **📝 Description:** Return the list of orders details book  by that user.
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `customer_id` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"List of  Orders."*
        - 📄 Authentication response object.
        
4. **📝 PUT `/customers/{id}`**
    - **📝 Description:** Update the  customer profile.
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `customer` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Customer."*
        - 📄 Authentication response object.
        
5. **👤 GET `/customers/{id}`**
    - **📝 Description:** Find the user in the database using user_id
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `user_id` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Void"*
        - 📄 Authentication response object.
        

---

## **👤 Admin Service**

1. **🔑 POST `/admin/login`** 
    - **📝 Description:** Login as admin
    - **📥 Request Body:**
        - 📧 `AdminPojo` (contains `email` and `password`).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Return Token and Admin_id."*
        - 📄 Authentication response object.
        
2. **📝 POST `/customers`**
    - **📝 Description:** Registers/Create a new admin with the provided signup details .
    - **📥 Request Body:**
        - 🆕 `AdminPojo` (contains admin registration details).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Admin successful created."*
        - 📄 Authentication response object.
        
3. **📝 GET `/admin/customer`**
    - **📝 Description:** Send the List of Customer Details from database
    - **📥 Request Body:**
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns List of  Customers"*
        - 📄 Authentication response object.
        
4. **📝 GET `/admin/orders`**
    - **📝 Description:** Send the List of Orders Details from database
    - **📥 Request Body:**
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns List of  Orders"*
        - 📄 Authentication response object.
        
5. **📝 GET `/admin/agents`**
    - **📝 Description:** Send the List of Delivery Agents Details from database
    - **📥 Request Body:**
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns List of  Agents"*
        - 📄 Authentication response object.
6. **📝 PUT `/admin/orders/{id}`**
    - **📝 Description:** Accept the payments of Courier and update status of the orders from PENDING to IN_PROGRESS.
    - **📥 Request Body:**
        - 📧 `OrderPojo/Long` (contains `order_ID` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Order Details."*
        - 📄 Authentication response object.
7. **📝 PUT `/admin/agents/{id}`**
    - **📝 Description:** Can Delete the agents
    - **Request Body:**
        - 📧 `AgentPojo/Long` (contains `agents_ID` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"VOID."*
        - 📄 Authentication response object.
8. **📝 PUT `/admin/logout/{id}`**
    - **📝 Description:** Logout.
    - **📥 Request Body:**
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Void"*
        - 📄 Authentication response object.
9. **👤 GET `/admin/{id}`**
    - **📝 Description:**
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `email` and `password`).
    - **📤 Response:**
        - 🟢 Success message: *"Returns Token."*
        - 📄 Authentication response object.

---

## **👤 Delivery Agents Service**

1. **📝 POST `/delivery-agents`** 
    - **📝 Description:** Registers/Create a new user with the provided signup details.
    - **📥 Request Body:**
        - 🆕 `CustomerPojo` (contains customer registration details).
        - 
    - **📤 Response:**
        - 🟢 Success message: *"User created successfully."*
        - 📄 Authentication response object.
        
2. **🔑 POST `/delivery-agents/login`**
    - **📝 Description:** Logs in a user using their email and password.
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `email` and `password`).
    - **📤 Response:**
        - 🟢 Success message: *"Returns Token."*
        - 📄 Authentication response object.
3. **📝 PUT `/delivery-agents/logout/{id}`**
    - **📝 Description:** Logs in a user using their email and password.
    - **📥 Request Body:**
        - 📧 `CustomerPojo` (contains `email` and `password`).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Token."*
        - 📄 Authentication response object.
4. **📝 GET `/delivery-agents/getAllAvailableOrders`**
    - **📝 Description:** Returns the list of available Order to accept where `orderStatus` is equal to `IN_PROGESS` and `AssignAgent` is equal to `null`
    - **📥 Request Body:**
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns The List of Orders."*
        - 📄 Authentication response object.
5. **📝 PUT `/delivery-agents/acceptOrders/{orderid}`**
    - **📝 Description:** Accept orders to deliver Updates the orderStatus to `OUT_FOR_DELIVERY`.
    - **📥 Request Body:**
        - 📧 `AgentPojo` (contains `deliveryAgentId` and `orderID` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Orders."*
        - 📄 Authentication response object.
6. **📝 PUT `/delivery-agents/completeOrders/{orderid}`**
    - **📝 Description:** Updates the orderStatus to `Complete` and add 10% commission to agent earningss.
    - **📥 Request Body:**
        - 📧 `AgentPojo` (contains `deliveryAgentId` and `orderID` ).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Order."*
        - 📄 Authentication response object.
7. **📝 GET `/delivery-agents/myOrders/{id}`**
    - **📝 Description:** List of Order Accepted to delivery by that agent
    - **📥 Request Body:**
        - 📧 `AgentPojo` (contains `Agent_ID`).
        - 📧 `OrdersPojo` (contains `order_id` in URL (Long)).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns List of Accepted Orders."*
        - 📄 Authentication response object.
8. **📝 GET `/delivery-agents/my_DeliveredOrders/{id}`**
    - **📝 Description:** List of Order Completed to delivery by that agent
    - **📥 Request Body:**
        - 📧 `AgentPojo` (contains `Agent_ID`).
        - 📧 `OrdersPojo` (contains `order_id` in URL (Long)).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns List of  Delivered Orders."*
        - 📄 Authentication response object.
9. **👤 PUT `/delivery-agents/{id}`**
    - **📝 Description:** Update agent details.
    - **📥 Request Body:**
        - 📧 `AgentPojo` (contains `agents` Details).
        - **Header:** `"Authorization"` → JWT token
    - **📤 Response:**
        - 🟢 Success message: *"Returns Agents."*
        - 📄 Authentication response object.

---

# Application Properties

```yaml
spring.application.name=spring_boot_backend
spring.datasource.url=jdbc:mysql://localhost:3306/courier?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=manager
#JPA properties
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
logging.level.org.springframework.orm.hibernate5=DEBUG
logging.level.org.springframework.security=DEBUG
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
```

# POJOS

## Admin

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    private String name;
    private String email;
    private String password;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "registration_date")
    private LocalDateTime registrationDate;
    @Column(name = "LastOnline")
    private LocalDateTime LastOnline;
}
```

## Customer/User

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String name;
    private String email;
    private String phone;
    private String password;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "LastOnline")
    private LocalDateTime LastOnline;

    @Enumerated(EnumType.STRING)
    private Status status;
}
```

## DeliveryAgent

```java

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
```

## Orders

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String deliveryAddress;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "assigned_agent_id")
    private DeliveryAgent assignedAgent;

    @Enumerated(EnumType.STRING)
    private Type vehicleRequired;

    private Long price;

    @Column(name = "order_date")
    private LocalDateTime orderDate;
}
```

## Enums

```java
public enum Type {
    BIKE,
    TRUCK
}
public enum Status {
    ONLINE,
    OFFLINE
}
public enum OrderStatus {
    PENDING,
    IN_PROGRESS,
    OUT_FOR_DELIVERY,
    COMPLETED,
}
```

# SQL Queries

```sql
-- Table for Admin
CREATE TABLE Admin (
    adminId BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    status VARCHAR(50),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastOnline DATETIME
);

-- Table for Customer
CREATE TABLE Customer (
    customerId BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastOnline DATETIME,
    status VARCHAR(50)
);

-- Table for DeliveryAgent
CREATE TABLE DeliveryAgent (
    agentId BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    vehicleNo VARCHAR(20),
    vehicleType VARCHAR(50),
    status VARCHAR(50),
    earnings BIGINT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastOnline DATETIME
);

-- Table for Orders
CREATE TABLE Orders (
    orderId BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT,
    deliveryAddress VARCHAR(255),
    orderStatus VARCHAR(50),
    assigned_agent_id BIGINT,
    vehicleRequired VARCHAR(50),
    price BIGINT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(customerId),
    FOREIGN KEY (assigned_agent_id) REFERENCES DeliveryAgent(agentId)
);

```