// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var currentTime = dayjs()
  var plannerTime = dayjs().hour(9)
  var timeBlockDiv = $('.time-block-div')

  // Make time blocks 9-5
  while (true) {
    // Add past, present, future classes
    var pastTime = plannerTime.hour() < currentTime.hour()
    var presentTime = plannerTime.hour() === currentTime.hour()
    var futureTime = plannerTime.hour() > currentTime.hour()
     // Variable for event text we are pulling for local storage
     var plannerHour = plannerTime.hour()
     var eventText = localStorage.getItem('hour-' + plannerHour)
    // Append time-blocks
    timeBlockDiv.append(`
  <div id="hour-${plannerTime.hour()}" class="row time-block ${pastTime ? 'past' : presentTime ? 'present' : 'future'}">
        <div class="col-2 col-md-1 hour text-center py-3">${plannerTime.format('h A')}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${eventText || ""}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div> `
    )
    // Add one hour for the loop
    plannerTime = plannerTime.add(1, 'h')
    // Loop breaks at 17 hour, 5 PM
    if (plannerTime.hour() > 17) {
      break;
    }
  }

  var btns = $('.time-block button')
  // Fucntion to enter and save an event 
  function storeEvent() {
    // Refrencing the button that was clicked to save event 
    var saveButton = $(this)
    var textarea = saveButton.prev()
    var textareaValue = textarea.val() 
    // Tagret the hour id of the time-blcok that was saved with button click 
    var parentDiv = saveButton.parent()
    var id = parentDiv.attr('id')
    
    localStorage.setItem(id, textareaValue)

    console.log('Event saved to your schedule.')
  }
// If button is clicked run storeEvent function
  btns.click(storeEvent)

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var date = dayjs().format('dddd, MMMM, DD, YYYY')
  var currentDayParagraph = $('#currentDay')

  currentDayParagraph.append(date)

  console.log(date)
});

