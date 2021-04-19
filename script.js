var workSchedule = [];

for (time = 9; time <= 17; time++) {
  var id = time - 9;
  var schedule = "";
  var hour = 0;
  var ampm = "";

  if (time === 12) {
    hour = 12;
    ampm = "pm";
  } else if (time > 12) {
    hour = time - 12;
    ampm = "pm";
  } else if (time < 12) {
    hour = time;
    ampm = "am";
  }
  hour = hour.toString();

  schedule = {
    id: id,
    hour: hour,
    time: time,
    ampm: ampm,
    schedule: schedule,
  };
  workSchedule.push(schedule);
}

function today() {
  var todaysD = moment().format("dddd, MMMM Do");
  $("#currentDay").text(todaysD);
}

function storeInfo() {
  localStorage.setItem("dayPlanner", JSON.stringify(workSchedule));
}

function plannerDataDisplay() {
  workSchedule.forEach(function (hour) {
    $("#" + hour.id).val(hour.schedule);
  });
}


function information() {
  var dataLoad = JSON.parse(localStorage.getItem("dayPlanner"));
  if (dataLoad) {
    workSchedule = dataLoad;
  }
  storeInfo();
  plannerDataDisplay();
}

workSchedule.forEach(function (hour) {
  var tRow = $("<form>");
  tRow.addClass("row");
  $(".container").append(tRow);

  var tField = $("<div>");
  tField.addClass("col-md-2 hour");
  tField.text(hour.hour + hour.ampm);

  var hInput = $("<div>");
  hInput.addClass("col-md-9 description p-0");

  var hData = $("<textarea>");
  hData.attr("id", hour.id);


  if (hour.time == moment().format("HH")) {
    hData.addClass("present");
  } else if (hour.time < moment().format("HH")) {
    hData.addClass("past");
  } else if (hour.time > moment().format("HH")) {
    hData.addClass("future");
  }
  hInput.append(hData);

  var saveIcon = $("<i class='far fa-save fa-lg'></i>");
  var saveEnd = $("<button>").addClass("col-md-1 saveBtn");

  saveEnd.append(saveIcon);
  tRow.append(tField, hInput, saveEnd);
});


$(".saveBtn").on("click", function (event) {
  event.preventDefault();

  var saveIndex = $(this).siblings(".description").children().attr("id");
  workSchedule[saveIndex].schedule = $(this)
    .siblings(".description")
    .children()
    .val();

  storeInfo();
  plannerDataDisplay();
});

today();

information();