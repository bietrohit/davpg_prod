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


const mediaQuery = window.matchMedia('(min-width: 770px)');
if (mediaQuery.matches) {
  $(function(){
    $('.dropdown:not(.nav-item)').hover(function() {
      $(this).children('.dropdown-menu').addClass('dropdown-menu-align-right');
    }, function() {
      $(this).children('.dropdown-menu').removeClass('dropdown-menu-align-right');
  });  
  $(function(){
    $('.dropdown').hover(function() {
      $(this).children('.dropdown-menu').addClass('show');
    }, function() {
      $(this).children('.dropdown-menu').removeClass('show');
    });  
  });
  });
}

$(document).ready(function(){
  $(".dashboard-nav-icon").click(function(){
    $(".faculty_menu").toggle();
  });
});
