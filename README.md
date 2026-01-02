# 🏥 Hospital Management System

A comprehensive Hospital Management Application built with React.js that helps manage patients, doctors, appointments, and medical records efficiently. This application features a modern, colorful UI with authentication and full CRUD operations.

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Sign up with name, email, and password
- **User Login** - Secure login with email and password
- **Session Management** - Uses localStorage for maintaining user sessions
- **Logout Functionality** - Secure logout with session clearing

### 🏠 Landing Page
- Professional homepage with gradient design
- Feature showcase section
- Benefits and value propositions
- Testimonials from users
- Clear call-to-action buttons
- Responsive navigation with Sign In/Sign Up buttons

### 📊 Dashboard
- **Statistics Overview**
  - Total Patients count with blue gradient card
  - Total Doctors count with purple gradient card
  - Appointments Today with pink gradient card
  - Total Medical Records with indigo gradient card
- **Quick Actions**
  - Add New Patient button
  - Add New Doctor button
- **Recent Activity Feed** with activity icons and timestamps

### 👥 Patient Management
- View all patients in a searchable table
- Add new patients with detailed information:
  - Name, Age, Gender
  - Contact Number, Email
  - Address, Blood Group
  - Medical History
- Edit existing patient records
- Delete patient records
- Search patients by name
- Professional blue gradient buttons and modals

### 👨‍⚕️ Doctor Management
- View all doctors in card-based layout
- Random doctor profile images (DiceBear avatars)
- Add new doctors with:
  - Name, Specialization
  - Contact Number, Email
  - Experience (years)
  - Qualification
- Edit doctor information
- Delete doctor records
- Search doctors by name or specialization
- Purple gradient themed UI with professional cards

### 📅 Appointments System
- View all appointments in a table format
- Filter appointments by status:
  - All Appointments
  - Scheduled
  - Completed
  - Cancelled
- Schedule new appointments with:
  - Patient selection
  - Doctor selection
  - Date and Time
  - Reason for visit
  - Status
- Edit appointment details
- Delete appointments
- Search appointments
- Pink-rose gradient themed buttons

### 📋 Medical Records
- Comprehensive medical records management
- View records in table format with:
  - Patient Name
  - Doctor Name
  - Visit Date
  - Diagnosis
  - Treatment
  - Prescription
  - Notes
- Add new medical records
- Edit existing records
- Delete records
- Detailed view modal for complete record information
- Compact professional search box
- Indigo-blue gradient themed UI

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **LocalStorage** - Client-side data persistence

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## 🚀 Installation & Setup

### 1. Clone or Download the Project

If you downloaded the ZIP file, extract it. If using git:

```bash
git clone git@github.com:sumankr0087/hospital-management.git
cd hospital-management-app
```

### 2. Install Dependencies

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

The application will automatically open in your browser at `http://localhost:3000`

## 👤 Default Login Credentials

Since this application uses localStorage, you need to register first:

1. Go to the landing page
2. Click on **"Sign Up"** in the navigation
3. Fill in the registration form with your details
4. After registration, you'll be automatically logged in
5. You can logout and login again with your credentials

**Note:** All data is stored in your browser's localStorage. Clearing browser data will reset the application.

## 📱 Available Routes

- `/` or `/home` - Landing page (accessible to all)
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard (requires authentication)
- `/patients` - Patient management (requires authentication)
- `/doctors` - Doctor management (requires authentication)
- `/appointments` - Appointment management (requires authentication)
- `/records` - Medical records management (requires authentication)

## 💾 Data Storage

This application uses **localStorage** for data persistence:

- **Users** - Stored in `hospital_users` key
- **Patients** - Stored in `hospital_patients` key
- **Doctors** - Stored in `hospital_doctors` key
- **Appointments** - Stored in `hospital_appointments` key
- **Medical Records** - Stored in `hospital_records` key
- **Current User** - Stored in `hospital_currentUser` key

## 🔧 Customization

### Changing Colors

Edit the `tailwind.config.js` file to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Adding More Features

1. Navigate to the appropriate page file in `src/pages/`
2. Add your new functionality
3. Update the form fields or UI components as needed

## 🐛 Troubleshooting

### Application won't start
- Make sure all dependencies are installed: `npm install`
- Check if port 3000 is available
- Try clearing npm cache: `npm cache clean --force`

### Data not persisting
- Check browser's localStorage is enabled
- Make sure you're not in incognito/private mode
- Try clearing localStorage and refreshing: Open DevTools → Application → Local Storage → Clear

### Buttons not visible in modals
- The submit buttons use gradient styles and should be visible
- Make sure Tailwind CSS is properly compiled
- Check browser console for any CSS errors

## 🚀 Future Enhancements

- Backend integration with Node.js/Express
- Database integration (MongoDB/PostgreSQL)
- Real-time notifications
- Advanced reporting and analytics
- PDF generation for medical records
- Email notifications for appointments
- Role-based access control (Admin, Doctor, Receptionist)
- Prescription printing
- Patient portal for appointment booking
- Medicine inventory management


**Built with using React.js and Tailwind CSS**
