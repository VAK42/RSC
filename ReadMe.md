# Ryan Sports Club (RSC) - Comprehensive Technical Documentation

## 1. Project Overview & Architectural Vision

This Documentation Provides An Exhaustive Technical Analysis Of **Ryan Sports Club (RSC)**, A Specialized Web Application Designed For A Sports Club Management System. The Platform Is Engineered To Facilitate User Engagement Through Event Registrations, Membership Management, E-Commerce Capabilities For Sports Gear, & A Comprehensive Administration Dashboard.

The System Adopts A Decoupled Architecture, Leveraging **Remix (React)** For A High-Performance, Server-Side Rendered Frontend, & A **Native PHP** Backend Serving As A RESTful API. This Hybrid Approach Ensures SEO Optimization & Fast Initial Loads Via Remix, While Maintaining A Flexible & Widely Compatible Backend Infrastructure Using PHP & MySQL.

From An Architectural Standpoint, The Application Is Split Into Two Distinct Repositories: The Frontend (`FE`) Which Handles All User Interactions & Routing, & The Backend (`BE`) Which Manages Data Persistence, Authentication, & Business Logic. The Project Demonstrates Advanced Integration Techniques Including CORS Handling, Session Management, & Real-Time Data Visualization.

---

## 2. Technology Stack & Infrastructure Decisions

### 2.1 Backend Infrastructure (Server-Side)

The Server-Side Logic Is Built Using Native PHP, Chosen For Its Simplicity & Ubiquity In Web Hosting Environments.

* **Language**: **PHP 8+**
    * **Strategic Rationale**: Native PHP Scripts Are Used To Handle HTTP Requests. Each Script Functions As An Individual API Endpoint, Providing JSON Responses To The Frontend.
    * **Implementation Details**: The Backend Heavily Utilizes `json_decode` & `json_encode` To Process RESTful Payloads. It Implements Robust CORS Headers To Allow Secure Cross-Origin Communication With The Remix Frontend.
* **Database Management System**: **MySQL**
    * **Deployment Strategy**: A Relational Database System Storing All Application Data. The Schema Is Normalized To Handle Users, Products, Events, & Admin Configurations.
    * **Connection Method**: The `mysqli` Extension Is Used For Database Connectivity, Ensuring Secure Parameterized Queries To Prevent SQL Injection.
* **Authentication Security**: **Password Hashing** & **Tokens**
    * **Security Model**: User Passwords Are Hashed Using `password_hash` (Bcrypt). Admin Authentication Is Token-Based, Generated Via `bin2hex(random_bytes(32))`, While User Sessions Are Managed Via Local Storage On The Client & Database Verification.
* **Email Services**: **PHPMailer**
    * **Functionality**: Integrated To Handle Password Reset Functionalities Via SMTP (Gmail), Providing Users With Secure Recovery Codes.

### 2.2 Frontend Client (Client-Side)

The Frontend Is A Modern SPA/SSR Hybrid Built With The Remix Framework.

* **Core Framework**: **Remix** (v2)
    * **Architectural Choice**: Remix Is Utilized For Its Ability To Handle Data Loading & Mutations Seamlessly. It Uses The App Router Pattern Where File Paths In `app/routes` Correspond To URL Routes.
* **Runtime Environment**: **Node.js** (v20+)
    * **Usage**: Powers The Remix Development Server & Build Process.
* **UI Library**: **Material-UI (MUI)** (v7)
    * **Component System**: Provides The Core Visual Components Such As `Table`, `TextField`, `Button`, & `Card`. A Custom Theme Provider Wraps The Application To Enforce Brand Consistency.
* **Styling Framework**: **Tailwind CSS** (v4)
    * **Integration**: Used For Layouts, Spacing, & Responsive Design Utilities. Configured Via Vite & PostCSS.
* **HTTP Client**: **Axios**
    * **Role**: Handles Asynchronous HTTP Requests From The React Frontend To The PHP Backend.
* **Data Visualization**: **Recharts**
    * **Analytics**: Powers The Admin Dashboard Charts, Visualizing Visitor Trends & Revenue Data.

---

## 3. Comprehensive Database Schema Definition

The Database Schema Is Defined In `RSC.sql` & Consists Of Relational Tables To Manage Content & Users.

### 3.1 User Management
* **`users` Table**: Stores Customer Credentials.
    * `user_id`: `INT` (PK, Auto Increment).
    * `email`, `username`, `fullname`, `phone`: `VARCHAR`.
    * `password`: `VARCHAR(250)` (Hashed).
* **`admin` Table**: Stores The Authentication Token For Administrative Access.
    * `token`: `VARCHAR(255)`.
* **`rspwd` Table**: Manages Password Reset Tokens.
    * `email`, `token`, `exp`: Used For Verifying Reset Requests.

### 3.2 Content Management
* **`store` Table**: The Product Catalog.
    * `img`: Path To Product Image.
    * `name`: Product Name.
    * `path`: URL Slug (e.g., `/store/item-1`).
    * `price`: `INT`.
    * `description`: `TEXT`.
* **`events` Table**: Stores Upcoming Club Events.
    * `img`, `img2`: Event Banners.
    * `name`, `path`, `description`.
* **`membership` Table**: Defines Membership Tiers.
    * `name`: Tier Name (e.g., Gold, Silver).
    * `ft1` - `ft5`: Feature Lists.
    * `price`: Cost Per Tier.

### 3.3 Operational Tables
* **`users2` Table**: Functions As A Cart/Order Table Linking Users To Products.
    * `pd_name`, `qtt` (Quantity), `price`, `total`.
    * `user_id`: Foreign Key To `users`.
* **`feedback` Table**: Stores User Inquiries.
    * `name`, `email`, `feedback`.
* **`dashboard` Table**: Stores Analytics Data For The Admin Panel.
    * `date`, `week`, `visitors`, `revenue`, `purchasedCustomer`, `totalCustomers`.
* **`cts`, `cts2` Table**: Stores Contact Information & Embedded Map Configuration.

---

## 4. Extensive API Documentation (Backend)

The Backend Exposes Several Endpoints To Manage Data Flow.

### 4.1 Public Content Endpoints (GET)
* **`store.php`**: Returns All Products Available In The Store As A JSON Array.
* **`events.php`**: Fetches The List Of Active Events.
* **`mbs.php`**: Retrieves Membership Tier Details.
* **`cts.php` & `cts2.php`**: Provides Contact Details, Social Icons, & Map Configurations.

### 4.2 Authentication Endpoints (POST)
* **`login.php`**: Validates Credentials.
    * **Logic**: Checks If The User Is "Admin" Or A Regular User. If Admin, Generates & Returns An Admin Token. If User, Returns User Profile Data.
* **`signup.php`**: Registers A New User.
    * **Validation**: Checks If The Email Already Exists & If Passwords Match. Hashes The Password Before Insertion.
* **`pwd*.php` Series**: Handles The Password Reset Flow.
    * `pwd2.php`: Verifies Email & Sends Reset Code.
    * `pwd4.php`: Validates The Reset Code.
    * `pwd6.php`: Updates The User's Password In The Database.

### 4.3 Administrative Endpoints (POST)
These Endpoints Are Used By The Admin Dashboard To Update Content.
* **`store2.php`**: Replaces The Entire Product Catalog With A New JSON Payload.
* **`events2.php`**: Updates The List Of Events via Transactional Queries (Truncate & Insert).
* **`mbs4.php`**: Updates Membership Plans.
* **`cts4.php` & `cts6.php`**: Updates Contact Info, Descriptions, & Text Content via `UPDATE` Queries.
* **`dashboard.php` (GET)**: Aggregates Data For The Admin Charts.

### 4.4 Transactional Endpoints
* **`checkout.php` (POST)**: Processes User Orders.
    * **Logic**: Iterates Through The Cart Payload. Checks If The Item Already Exists In `users2` For That User. If Yes, Updates Quantity & Total. If No, Inserts A New Record. Finally, Returns Updated User Data.
* **`fb4.php` (POST)**: Submits User Feedback To The Database.

---

## 5. Frontend Architecture & Component Breakdown

### 5.1 Public Routes
* **Home (`_index.tsx`)**: The Landing Page Featuring An Image Slider (`IMG_Slide`) & Sections For Facilities, Membership, & Events. Fetches Data From Multiple Backend Endpoints On Mount.
* **Store (`store._index.tsx` & `store.$pd.tsx`)**:
    * Displays Products In A Grid Layout With Search Functionality.
    * Dynamic Routing (`$pd`) Renders Individual Product Pages With Add-To-Cart Functionality.
* **Events (`events._index.tsx` & `events.$vnt.tsx`)**: Lists Events & Provides Detailed Views For Specific Events via Loaders.
* **Cart (`cart._index.tsx`)**: Manages Local Cart State. Allows Users To Increase/Decrease Quantity Or Remove Items. Submits Orders To `checkout.php`.
* **Authentication**:
    * `_auth.login.tsx`: Login Form With Admin Redirection Logic.
    * `_auth.signup.tsx`: Registration Form With Client-Side Validation.
    * `_auth.fgpwd.tsx`: Multi-Step Password Reset Flow (Send Code -> Verify -> Reset).

### 5.2 Admin Dashboard (`admin.tsx`)
* **Security**: The Root Admin Route Checks For The Existence Of An Admin Token In LocalStorage. If Absent, Access Is Denied.
* **Layout**: Utilizes `Admin_Sidebar` For Navigation Within The Admin Panel.
* **Sub-Routes**:
    * `admin._index.tsx`: Visualizes Dashboard Data Using Recharts (Line, Bar, & Pie Charts).
    * `admin.store.tsx`: Editable Table For Products. Supports Creating New Products & Uploading Images.
    * `admin.events.tsx`: Editable Table For Events management.
    * `admin.membership.tsx`: Interface To Modify Membership Tiers & Pricing.
    * `admin.home.tsx` & `admin.cts.tsx`: Text Editors To Update Home Page Content & Contact Information.

---

## 6. Installation & Setup Guide

### 6.1 Prerequisites
* **Node.js**: Version 20 Or Higher.
* **PHP**: Version 8.0 Or Higher.
* **MySQL**: Running Instance.
* **Composer**: (Optional) For Managing PHP Dependencies (PHPMailer).

### 6.2 Backend Setup
1.  **Database Configuration**:
    * Create A Database Named `rsc`.
    * Import The Schema From `RSC.sql`.
    * Configure Credentials In `BE/config.php` (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`).
2.  **Email Configuration**:
    * Update `SMTP_USER` & `SMTP_PASS` In `BE/config.php` With Valid Gmail Credentials For PHPMailer.
3.  **Server Deployment**:
    * Host The `BE` Folder On An Apache Or Nginx Server (e.g., XAMPP/WAMP) At `http://localhost/rsc/`.

### 6.3 Frontend Setup
1.  **Navigate To Directory**:
    ```bash
    cd FE
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    * Ensure All Axios Calls In The Code Point To The Correct Backend URL (`http://localhost/rsc/`).
4.  **Launch Development Server**:
    ```bash
    npm run dev
    ```
    *Access The Application At `http://localhost:5173`.*

---

## 7. Directory Structure Deep Dive

### Frontend (`FE/app`)
* **`routes/`**: Defines The Application Routes. Files Ending In `_index.tsx` Are Base Routes, While `$` Denotes Dynamic Parameters.
* **`components/`**:
    * `Header.tsx`: Main Navigation Bar with Logic For User Account Access.
    * `Footer.tsx`: Static Footer Component.
    * `Admin_Sidebar.tsx`: Dedicated Navigation For The Admin Panel.
    * `IMG_Slide.tsx`: Hero Banner Component For The Homepage with Animations.
    * `Theme.ts`: MUI Theme Configuration (Primary Color: `#065F46`).
* **`RSC.css`**: Global CSS Containing Custom Keyframe Animations (`anmt2`, `anmt8`, `waves`) For Visual Effects.

### Backend (`BE/`)
* **`PHPMailer/`**: Library Files For Email Functionality.
* **Data Handlers**: Scripts Like `store.php`, `events.php` Fetch Data.
* **Action Handlers**: Scripts Like `checkout.php`, `signup.php` Perform Mutations.
* **Config**: `config.php` Centralizes Database & Mail Settings.

---

## 8. Future Enhancements

* **Payment Gateway**: Integration With Stripe Or PayPal For Real Payment Processing In `checkout.php`.
* **Image Hosting**: Move From Local File Paths To Cloud Storage (AWS S3) For Product Images.
* **Middleware**: Implement JWT Middleware On The PHP Backend For More Granular Security Beyond Simple Tokens.
* **Types**: Centralize TypeScript Interfaces Into A Shared `types` Folder For Better Code Maintainability.

---

## 9. License

This Project Is Proprietary Software Developed For **Ryan Sports Club**. Unauthorized Distribution Is Prohibited.
