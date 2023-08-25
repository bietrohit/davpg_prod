student = [{name:"Registration",image:"/assets/img/reg.png",Link:"/registration"},
           {name:"University Calender",image:"/assets/img/cal.png",Link:"http://ddugu.ac.in/academic_calendar.aspx"},
           {name:"Feedback Form",image:"/assets/img/feed.png",Link:"/Feedback"},
           {name:"Grivance Redressal",image:"/assets/img/griev.png",Link:"https://docs.google.com/forms/d/e/1FAIpQLSc47HWKe9dJx8C6XJsTDibN6zXNr9972P88WqVKuiaZryTAvw/viewform?vc=0&c=0&w=1&flr=0&pli=1"},
           {name:"Creative Corner",image:"/assets/img/creative.png",Link:".c_corner"},
           {name:"Syllabus",image:"/assets/img/syll.png",Link:"/syllabus"},
           {name:"Time Table",image:"/assets/img/timetable.png",Link:"/timetable"}
          ]
admission = [{name:"Procpectus",image:"/assets/img/broucher.png",Link:"/admission"},
          {name:"Admission Procedure",image:"/assets/img/admission.png",Link:"/assets/docs/prospectus-2023.pdf"}
         ]
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

onload = () => {
  for (let i = 0; i < 7; i++) {
    console.log(document.getElementById("studentServices").innerHTML)
    document.getElementById(
      "studentServices"
    ).innerHTML += '<span><a href='+student[i].Link+' target="_blank"><img src='+student[i].image+'><p>'+student[i].name+'</p></a></span>';
  }
  for (let i = 0; i < 2; i++) {
  document.getElementById(
      "teacherServices"
    ).innerHTML += '<span><a href='+admission[i].Link+' target="_blank"><img src='+admission[i].image+'><p>'+admission[i].name+'</p></a></span>';
  }

  //setTimeout(() => {scrollForever(0)}, 3000)
};
