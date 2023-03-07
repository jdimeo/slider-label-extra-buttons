/* global $, fieldProperties, setAnswer, getPluginParameter, getMetaData, setMetaData */

$('.ui-slider-handle').draggable()

// Declare some variables to use
var firstView = false
var lastView = false
var restView = false
var step = getPluginParameter('step')
var stepLabel = getPluginParameter('step_label')
var startValue = getPluginParameter('start_value')
var labelShow = getPluginParameter('label_show')

var currentValue = fieldProperties.CURRENT_ANSWER

// EXTRA BUTTONS

var formGroup = document.querySelector('.form-group')
var controlMessage = document.querySelector('.control-message')
var formattedSpan = document.querySelector('#slider-value')
var buttonContainer = document.querySelector('#buttons')
var warningContainer = document.querySelector('#warning')
var yesButton = document.querySelector('#yes')
var noButton = document.querySelector('#no')
var invalidBox = document.querySelector('.error-box')

var fieldType = fieldProperties.FIELDTYPE
var appearance = fieldProperties.APPEARANCE
var buttonsDisp = ''
var specialConstraint

if (fieldType === 'integer') {
  specialConstraint = new RegExp('^-?[0-9]+$')
  invalidBox.innerHTML = 'Invalid: Answer must be a valid integer.'
} else if (fieldType === 'decimal') {
  specialConstraint = new RegExp('^-?([0-9]+.?[0-9]*)|([0-9]*.?[0-9]+)$')
  invalidBox.innerHTML = 'Invalid: Answer must be a valid decimal number.'
} else { // All that should be left is "text"
  if (appearance.indexOf('numbers_phone') !== -1) {
    specialConstraint = new RegExp('^[0-9-+.#* ]+$')
    invalidBox.innerHTML = 'Invalid: Answer can only contain numbers, hyphens (-), plus signs (+), dots (.), hash signs (#), asterisks (*), and/or spaces.'
  } else if (appearance.indexOf('numbers_decimal') !== -1) {
    specialConstraint = new RegExp('^-?([0-9]+.?[0-9]*)|([0-9]*.?[0-9]+)$')
    invalidBox.innerHTML = 'Invalid: Answer must be a valid decimal number.'
  } else if (appearance.indexOf('numbers') !== -1) {
    specialConstraint = new RegExp('^[0-9-+. ]+$')
    invalidBox.innerHTML = 'Invalid: Answer can only contain numbers, hyphens (-), plus signs (+), dots (.), and/or spaces.'
  } else {
    specialConstraint = new RegExp('.+')
  }
}

// Get parameter values and set the max and min based on these
var enteredMin = getPluginParameter('min')
var enteredMax = getPluginParameter('max')
var labelMin = getPluginParameter('min_label')
var labelMax = getPluginParameter('max_label')
var enteredView = getPluginParameter('markers')
var displayValue = getPluginParameter('display_value')

if (step == null) {
    step = 1
}

if (stepLabel == null) {
    stepLabel = enteredMax - enteredMin
}

if (startValue == null) {
    startValue = (enteredMax - enteredMin)/2
}

if (labelShow == null){
  labelShow = 'label'
} if (labelShow == 'show'){
  labelShow = 'label'
} if (labelShow == 'hide'){
  labelShow = false
}

enteredMin = parseInt(enteredMin)
enteredMax = parseInt(enteredMax)
step = Number(step)

if (enteredView === 'yes') {
  firstView = 'pip'
  lastView = 'pip'
  restView = 'pip'
} else if (enteredView === 'labels') {
  firstView = 'label'
  lastView = 'label'
  restView = 'label'
} else if (enteredView === 'none') {
  firstView = false
  lastView = false
  restView = false
}

//These were in the original code, but I don't think they are needed
//as they will reset values which were set if they labels were null,
//thereby subverting the prupose of default 'if null' values.
// if (step != null) {
//     step = getPluginParameter('step')
// }

// if (stepLabel != null) {
//     stepLabel = getPluginParameter('step_label')
// }

if (labelMin != null) {
	$('#slider-min').html(labelMin)
}
if (labelMax != null) {
	$('#slider-max').html(labelMax)
}

function setCurrentValue(v, l) {
  if (v != currentValue) {
	currentValue = v
	$('.slider').slider('value', v)
	setAnswer(Number(v))
	setMetaData(l)
	  
	if (displayValue != null) {
	  $('#slider-value').html(v)
	}
  }
}

$('.slider')
  .slider({
    min: enteredMin,
    max: enteredMax,
    step: step,
    value: startValue
  })
  .slider('pips', {
    first: labelShow,
    last: labelShow,
    rest: labelShow,
    step: stepLabel
  })
  .slider('float')
  .on('slidechange', function (e, ui) {
	
  setCurrentValue($('.slider').slider('value'))
	
  formGroup.classList.remove('has-error')
  controlMessage.innerHTML = ''

  if ((currentValue === '') || specialConstraint.test(currentValue)) {
    invalidBox.style.display = 'none'
    setMetaData('')
  } else {
    invalidBox.style.display = ''
  }
})

if (currentValue != null) {
  $('.slider').slider('value', currentValue)
}

// If the field is not marked readonly, then focus on the field
function setFocus () {
  if (!fieldProperties.READONLY) {
    $('.slider').focus()
  }
}

invalidBox.style.display = 'none'

for (var buttonNumber = 1; buttonNumber <= 100; buttonNumber++) {
  var buttonLabel = getPluginParameter('button' + String(buttonNumber))
  var buttonValue = getPluginParameter('value' + String(buttonNumber))
  if ((buttonLabel != null) && (buttonValue != null)) {
    var buttonHtml = '<button id="' + buttonLabel + '" class="altbutton button' + String(buttonNumber % 2) + '" value="' + buttonValue + '" dir="auto">' + buttonLabel + '</button>'
    buttonsDisp += buttonHtml
  } else {
    break // Stop looking for buttons when number in parameter name is not found
  }
}

buttonContainer.innerHTML = buttonsDisp
var allButtons = document.querySelectorAll('#buttons button')
var numButtons = allButtons.length

for (var b = 0; b < numButtons; b++) {
  var button = allButtons[b]
  buttonFontAdjuster(button)
  if (!fieldProperties.READONLY) {
    button.addEventListener('click', function (e) { // Adds event listener to buttons
      var currentInput = $('.slider').slider('value')
      if ((currentInput === '') || (currentInput == 0) || (String(e.target.value) === String(currentInput))) {
		setCurrentValue(e.target.value, e.target.innerHTML)
      } else {
        dispWarning(e.target.innerHTML, e.target.value)
      }
    })
  }
}

var yesButtonText = getPluginParameter('yes')
if (yesButtonText != null) {
  yesButton.innerHTML = yesButtonText
}

var noButtonText = getPluginParameter('no')
if (noButtonText != null) {
  noButton.innerHTML = noButtonText
}

var warningMessage = getPluginParameter('warning')
if (warningMessage == null) {
  warningMessage = 'Warning: This field already has a value. Are you sure you would like to replace it?'
} else {
  warningContainer.querySelector('#warning-message').innerHTML = warningMessage
}
warningContainer.style.display = 'none'

function buttonFontAdjuster (button) { // djusts size of the text of the buttons in case the text is too long
  var fontSize = parseInt(window.getComputedStyle(button, null).getPropertyValue('font-size'))
  var stopper = 50
  while (button.scrollHeight > button.clientHeight) {
    fontSize--
    button.style.fontSize = fontSize + 'px'
    stopper--
    if (stopper <= 0) {
      return
    }
  }
}

function cursorToEnd (el) { // oves cursor to end of text in text box (incondistent in non-text fields)
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.selectionEnd = el.value.length
  } else if (typeof el.createTextRange !== 'undefined') {
    el.focus()
    var range = el.createTextRange()
    range.collapse(false)
    range.select()
  }
}

function handleConstraintMessage (message) {
  formGroup.classList.add('has-error')
  controlMessage.innerHTML = message
  setFocus()
}

function handleRequiredMessage (message) {
  handleConstraintMessage(message)
}

function dispWarning (clickedLabel, clickedValue) { // Displays the warning when tapping a button when there is already content in the text box
  warningContainer.style.display = ''

  document.querySelector('#yes').addEventListener('click', function () {
	setCurrentValue(clickedValue, clickedLabel)
    warningContainer.style.display = 'none'
  })

  document.querySelector('#no').addEventListener('click', function () {
    warningContainer.style.display = 'none'
  })
}