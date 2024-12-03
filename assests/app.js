const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = "admin.html"; // Redirect to admin dashboard
  } catch (error) {
    loginMessage.textContent = "Invalid login credentials!";
  }
});
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", async () => {
  try {
    await auth.signOut();
    window.location.href = "index.html"; // Redirect to login page
  } catch (error) {
    alert("Error logging out. Please try again.");
  }
});
const classForm = document.getElementById("classForm");
const classList = document.getElementById("classList");
const classMessage = document.getElementById("classMessage");

// Add class to Firestore
classForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const className = document.getElementById("className").value;
  const teacherName = document.getElementById("teacherName").value;
  const schedule = document.getElementById("schedule").value;
  const section = document.getElementById("section").value;
  const course = document.getElementById("course").value;
  const batch = document.getElementById("batch").value;

  try {
    await db.collection("classes").add({
      className,
      teacherName,
      schedule,
      section,
      course,
      batch,
    });
    classMessage.textContent = "Class added successfully!";
    classForm.reset();
    fetchClasses();
  } catch (error) {
    classMessage.textContent = "Error adding class!";
  }
});

// Fetch and display classes
const fetchClasses = async () => {
  const snapshot = await db.collection("classes").get();
  classList.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${data.className} - ${data.teacherName}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteClass('${doc.id}')">Delete</button>
    `;
    classList.appendChild(li);
  });
};

// Delete a class
const deleteClass = async (id) => {
  try {
    await db.collection("classes").doc(id).delete();
    fetchClasses();
  } catch (error) {
    alert("Error deleting class!");
  }
};

// Load classes on page load
fetchClasses();
const markAttendance = async (rollNumber, status) => {
    const classId = "selected_class_id"; // Replace with dynamic class selection
    const studentRef = db.collection("students").doc(rollNumber);
  
    try {
      const studentDoc = await studentRef.get();
      if (!studentDoc.exists) {
        alert("Student not found!");
        return;
      }
  
      const currentDate = new Date().toISOString().split("T")[0]; // Today's date (YYYY-MM-DD)
  
      await db
        .collection("attendance")
        .doc(classId)
        .collection("records")
        .doc(currentDate)
        .set(
          {
            [rollNumber]: { status, timestamp: firebase.firestore.FieldValue.serverTimestamp() },
          },
          { merge: true }
        );
  
      alert(`Attendance marked as ${status} for ${rollNumber}`);
    } catch (error) {
      alert("Error marking attendance!");
    }
  };
  
  // Example usage
  document.getElementById("markAttendanceBtn")?.addEventListener("click", () => {
    const rollNumber = document.getElementById("rollNumberInput").value;
    const status = document.getElementById("statusSelect").value; // Dropdown with Present/Absent/Late
    markAttendance(rollNumber, status);
  });

  

  