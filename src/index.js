const readline = require("readline");

let doctors = [];



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
              console.log(doctors);

              rl.close();
            });
          });
        });
      });
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("================================");
console.log("  Hospital Appointment System");
console.log("================================");

console.log("1. Add Doctor");
console.log("2. Add Patient");
console.log("3. View Doctors");
console.log("4. View Patients");
console.log("5. Book Appointment");
console.log("6. Cancel Appointment");
console.log("7. View Waitlist");
console.log("8. Suggest Slot");
console.log("9. Exit");

// rl.question("Enter your choice: ", (choice) => {
//     console.log("You selected:", choice);
//     rl.close();
// });

rl.question("Enter your choice: ", (choice) => {
  if (choice === "1") {
    addDoctor();
  } else {
    console.log("You selected:", choice);
    rl.close();
  }
});
