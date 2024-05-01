const switchService = (i, j) => {
  let tabs = document.querySelectorAll(".btns .tab");
  tabs = [...tabs];
  tabs.map((e, idx) => {
    if (idx == i) e.classList.add("activeTab");
    else e.classList.remove("activeTab");
  });
  if (j === "studentServices") {
    document.getElementById("teacherServices").classList.add("hidden");
    document.getElementById("studentServices").classList.remove("hidden");
  }
  if (j === "teacherServices") {
    document.getElementById("teacherServices").classList.remove("hidden");
    document.getElementById("studentServices").classList.add("hidden");
  }
};
$(function(){
  $('.dropdown').hover(function() {
    $(this).find('.dropdown-menu').first().addClass('show');
  }, function() {
    $(this).find('.dropdown-menu').first().removeClass('show');
  });  
});



// cards

// Sample faculty details array
const facultyDetails = [
  { name: "John Doe", department: "Computer Science", designation: "Professor" },
  { name: "Jane Smith", department: "Electrical Engineering", designation: "Associate Professor" },
  // Add more faculty details as needed
];

// Function to create a card for each faculty detail
function createFacultyCards() {
  const facultyContainer = document.getElementById("facultyContainer");

  // Clear existing content
  facultyContainer.innerHTML = "";

  // Create card for each faculty detail
  facultyDetails.forEach(faculty => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Add faculty details to the card
      card.innerHTML = `
          <h3>${faculty.name}</h3>
          <p>Department: ${faculty.department}</p>
          <p>Designation: ${faculty.designation}</p>
      `;

      // Append card to the container
      facultyContainer.appendChild(card);
  });
}

// Call the function to create the cards
createFacultyCards();
