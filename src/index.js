const readline = require("readline");

let doctors = [];
let patients = [];
let appointments = [];



function addDoctor() {
  rl.question("Enter Doctor ID: ", (doctorId) => {
    rl.question("Enter Doctor Name: ", (doctorName) => {
      rl.question("Enter Specialization: ", (specialization) => {
        rl.question("Enter available slot 1: ", (slot1) => {
          rl.question("Enter available slot 2: ", (slot2) => {
            rl.question("Enter available slot 3: ", (slot3) => {

              const doctor = {
                id: doctorId,
                name: doctorName,
                specialization: specialization,
                availableSlots: [slot1, slot2, slot3],
              };

              doctors.push(doctor);

              console.log("Doctor added successfully!");
              // console.log(doctors);

              showMenu()
            });
          });
        });
      });
    });
  });
}

function addPatient() {
  rl.question("Enter Patient ID: ", (patientId) => {
    rl.question("Enter Patient Name: ", (patientName) => {
      rl.question("Enter Patient Age: ", (patientAge) => {

        const patient = {
          id: patientId,
          name: patientName,
          age: patientAge
        };

        patients.push(patient);

        console.log("Patient added successfully!");

        showMenu();
      });
    });
  });
}

function viewPatients() {
  if (patients.length === 0) {
    console.log("No patients available.");
    showMenu();
    return;
  }

  console.log("\n========== Patients ==========");

  for (const patient of patients) {
    console.log("----------------------------");
    console.log(`Patient ID: ${patient.id}`);
    console.log(`Name: ${patient.name}`);
    console.log(`Age: ${patient.age}`);
  }

  console.log("----------------------------");

  showMenu();
}

function viewDoctors() {
  if (doctors.length === 0) {
    console.log("No doctors available.");
    showMenu();
    return;
  }

  console.log("\n========== Doctors ==========");

  for (const doctor of doctors) {
    console.log("----------------------------");
    console.log(`Doctor ID: ${doctor.id}`);
    console.log(`Name: ${doctor.name}`);
    console.log(`Specialization: ${doctor.specialization}`);
    console.log(`Available Slots: ${doctor.availableSlots.join(", ")}`);
  }

  console.log("----------------------------");

  showMenu();
}

function viewAppointments() {
  if (appointments.length === 0) {
    console.log("No appointments available.");
    showMenu();
    return;
  }

  console.log("\n========== Appointments ==========");

  for (const appointment of appointments) {
    const patient = patients.find((p) => p.id === appointment.patientId);
    const doctor = doctors.find((d) => d.id === appointment.doctorId);

    console.log("----------------------------");
    console.log(`Appointment ID: ${appointment.id}`);
    console.log(`Patient: ${patient.name}`);
    console.log(`Doctor: ${doctor.name}`);
    console.log(`Specialization: ${doctor.specialization}`);
    console.log(`Time: ${appointment.slot}`);
  }

  console.log("----------------------------");

  showMenu();
}

function cancelAppointment() {
  rl.question("Enter Appointment ID: ", (appointmentId) => {

    const appointment = appointments.find(
      (a) => a.id === appointmentId
    );

    if (!appointment) {
      console.log("Appointment not found.");
      showMenu();
      return;
    }

    const doctor = doctors.find(
      (d) => d.id === appointment.doctorId
    );

    doctor.availableSlots.push(appointment.slot);

    appointments = appointments.filter(
      (a) => a.id !== appointmentId
    );

    console.log("Appointment cancelled successfully.");

    showMenu();
  });
}
function bookAppointment() {
  rl.question("Enter Patient ID: ", (patientId) => {
    rl.question("Enter Doctor ID: ", (doctorId) => {

      const patient = patients.find((p) => p.id === patientId);
      const doctor = doctors.find((d) => d.id === doctorId);

      if (!patient) {
        console.log("Patient not found.");
        showMenu();
        return;
      }

      if (!doctor) {
        console.log("Doctor not found.");
        showMenu();
        return;
      }

      console.log(`Available slots for ${doctor.name}:`);

      doctor.availableSlots.forEach((slot, index) => {
        console.log(`${index + 1}. ${slot}`);
      });

      rl.question("Choose a slot: ", (slotChoice) => {
        const slotIndex = Number(slotChoice) - 1;

        if (slotIndex < 0 || slotIndex >= doctor.availableSlots.length) {
          console.log("Invalid slot choice.");
          showMenu();
          return;
        }

       const selectedSlot = doctor.availableSlots[slotIndex];

const appointment = {
  id: `A${appointments.length + 1}`,
  patientId: patient.id,
  doctorId: doctor.id,
  slot: selectedSlot
};
doctor.availableSlots.splice(slotIndex, 1);

appointments.push(appointment);

console.log("Appointment booked successfully!");
console.log(appointment);

showMenu();

      
      });
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("================================");
  console.log("  Hospital Appointment System");
  console.log("================================");

  console.log("1. Add Doctor");
  console.log("2. Add Patient");
  console.log("3. View Doctors");
  console.log("4. View Patients");
  console.log("5. Book Appointment");
console.log("6. View Appointments");
console.log("7. Cancel Appointment");
console.log("8. View Waitlist");
console.log("9. Suggest Slot");
console.log("10. Exit");

  rl.question("Enter your choice: ", (choice) => {

   if (choice === "1") {
  addDoctor();

} else if (choice === "2") {
  addPatient();

} else if (choice === "3") {
  viewDoctors();

} else if (choice === "4") {
  viewPatients();

} else if (choice === "5") {
  bookAppointment();

} else if (choice === "6") {
  viewAppointments();

} else if (choice === "7") {
  cancelAppointment();
}else if (choice === "10") {
  rl.close();
}
  });
}

showMenu();