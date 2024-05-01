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

$(function () {
  $('.dropdown:not(.nav-item)').hover(function () {
    $(this).children('.dropdown-menu').addClass('dropdown-menu-align-right');
  }, function () {
    $(this).children('.dropdown-menu').removeClass('dropdown-menu-align-right');
  });
  $(function () {
    $('.dropdown').hover(function () {
      $(this).children('.dropdown-menu').addClass('show');
    }, function () {
      $(this).children('.dropdown-menu').removeClass('show');
    });
  });
});

const mediaQuery2 = window.matchMedia('(max-width: 770px)');
if (mediaQuery2.matches) {
  $(function () {
    $('.dropdown > a').click(function (e) {
      e.preventDefault();
      const dropdownMenu = $(this).siblings('.dropdown-menu');
      $(this).parent().siblings().find('.dropdown-menu').hide();
      dropdownMenu.toggle();
    });
    $(document).click(function (e) {
      const target = $(e.target);
      if (!target.closest('.dropdown').length) {
        $('.dropdown-menu').hide();
      }
    });
  });
}

$(document).ready(function () {
  $(".dashboard-nav-icon").click(function () {
    $(".faculty_menu").toggle();
  });
});
