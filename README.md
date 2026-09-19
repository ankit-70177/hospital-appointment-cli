# Hospital Appointment CLI

Hospital Appointment CLI is a command-line application built with Node.js for managing doctors, patients, and hospital appointments.

The system allows users to add doctors and patients, book and cancel appointments, manage a waitlist when no slots are available, and get a suggested available slot. The application stores its data in JSON files so that the data remains available after restarting the program.

## Features

- Add and view doctors
- Add and view patients
- Book appointments
- View appointments
- Cancel appointments
- Automatic waitlist handling
- Automatically assign a cancelled slot to a waitlisted patient
- Suggest an available slot
- JSON-based data persistence
- Duplicate doctor ID validation
- Duplicate patient ID validation
- Empty ID validation

## Technologies Used

- JavaScript
- Node.js
- Node.js `readline`
- JSON
- File System (`fs`)

## Project Structure

```text
hospital-appointment-cli/
├── data/
│   ├── doctors.json
│   ├── patients.json
│   ├── appointments.json
│   └── waitlist.json
├── src/
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

How to Run
1. Clone the repository
git clone https://github.com/ankit-70177/hospital-appointment-cli.git
2. Open the project folder
cd hospital-appointment-cli
3. Install dependencies
npm install
4. Start the application
npm start
How the System Works

The application follows a simple appointment management flow:

Doctor
   ↓
Available Slots
   ↓
Patient
   ↓
Book Appointment
   ↓
All Slots Unavailable
   ↓
Waitlist
   ↓
Appointment Cancellation
   ↓
Waitlisted Patient Gets the Slot

When an appointment is booked, the selected slot is removed from the doctor's available slots.

When an appointment is cancelled:

If a patient is waiting for that doctor, the cancelled slot is automatically assigned to the first waitlisted patient.
If there is no waitlisted patient, the cancelled slot is added back to the doctor's available slots.
Data Storage

The application uses JSON files for storing data:

doctors.json - stores doctor information and available slots.
patients.json - stores patient information.
appointments.json - stores booked appointments.
waitlist.json - stores patients waiting for an available slot.

This allows the application data to persist between program runs.

Main Menu
1. Add Doctor
2. Add Patient
3. View Doctors
4. View Patients
5. Book Appointment
6. View Appointments
7. Cancel Appointment
8. View Waitlist
9. Suggest Slot
10. Exit
Appointment IDs

Each appointment receives a unique appointment ID such as:

A001
A002
A003

The application also restores the next appointment ID from the existing appointment data when the program is restarted.

Validation

The application performs basic validation such as:

Preventing duplicate doctor IDs
Preventing duplicate patient IDs
Preventing empty doctor IDs
Preventing empty patient IDs
Checking whether a doctor exists before booking
Checking whether a patient exists before booking
Checking whether the selected appointment slot is valid
Slot Suggestion

The system includes a basic slot suggestion feature that suggests an available slot for a selected doctor.

Author

Ankit Kumar

B.Tech Computer Science & Artificial Intelligence

