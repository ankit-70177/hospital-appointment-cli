const readline = require("readline");
const fs = require("fs");

let doctors = JSON.parse(fs.readFileSync("data/doctors.json"));
let patients = JSON.parse(fs.readFileSync("data/patients.json"));
let appointments = JSON.parse(fs.readFileSync("data/appointments.json"));
let waitlist = JSON.parse(fs.readFileSync("data/waitlist.json"));

function saveData() {
    fs.writeFileSync("data/doctors.json", JSON.stringify(doctors, null, 2));
    fs.writeFileSync("data/patients.json", JSON.stringify(patients, null, 2));
    fs.writeFileSync("data/appointments.json", JSON.stringify(appointments, null, 2));
    fs.writeFileSync("data/waitlist.json", JSON.stringify(waitlist, null, 2));
}

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
              saveData();
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
        saveData();
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


    const waitingPatient = waitlist.find(
  (entry) => entry.doctorId === appointment.doctorId
);

if (waitingPatient) {
  const patient = patients.find(
    (p) => p.id === waitingPatient.patientId
  );

  console.log(`Assigning slot to ${patient.name}`);

  const newAppointment = {
    id: `A${appointments.length + 1}`,
    patientId: patient.id,
    doctorId: doctor.id,
    slot: appointment.slot
  };

  appointments.push(newAppointment);

  waitlist = waitlist.filter(
    (entry) => entry !== waitingPatient
  );

} else {
  doctor.availableSlots.push(appointment.slot);
}

    appointments = appointments.filter(
      (a) => a.id !== appointmentId
    );
    saveData();
    console.log("Appointment cancelled successfully.");

    showMenu();
  });
}

function viewWaitlist() {
  if (waitlist.length === 0) {
    console.log("Waitlist is empty.");
    showMenu();
    return;
  }

  console.log("\n========== Waitlist ==========");

  for (const entry of waitlist) {
    const patient = patients.find(
      (p) => p.id === entry.patientId
    );

    const doctor = doctors.find(
      (d) => d.id === entry.doctorId
    );

    console.log("----------------------------");
    console.log(`Patient: ${patient.name}`);
    console.log(`Patient ID: ${patient.id}`);
    console.log(`Doctor: ${doctor.name}`);
    console.log(`Doctor ID: ${doctor.id}`);
    console.log(`Specialization: ${doctor.specialization}`);
  }

  console.log("----------------------------");

  showMenu();
}

function suggestSlot() {
    rl.question("Enter Doctor ID: ", (doctorId) => {

        const doctor = doctors.find(
            (d) => d.id === doctorId
        );

        if (!doctor) {
            console.log("Doctor not found.");
            showMenu();
            return;
        }

        if (doctor.availableSlots.length === 0) {
            console.log("No slots available for this doctor.");
            showMenu();
            return;
        }

        const suggestedSlot = doctor.availableSlots[0];

        console.log(`Suggested slot for ${doctor.name}: ${suggestedSlot}`);

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
      if (doctor.availableSlots.length === 0) {
  console.log("No slots available for this doctor.");

  rl.question("Do you want to join the waitlist? (yes/no): ", (answer) => {

    if (answer.toLowerCase() === "yes") {
      waitlist.push({
        patientId: patientId,
        doctorId: doctorId
      });
      saveData();
      console.log("You have been added to the waitlist.");
    } else {
      console.log("You were not added to the waitlist.");
    }

    showMenu();
  });

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
saveData();
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
  cancelAppointment()
}else if (choice === "8") {
  viewWaitlist()
}else if (choice === "9") {
  suggestSlot()
}else if (choice === "10") {
  rl.close();
}
  });
}

showMenu();