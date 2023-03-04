# Slider with labels (with buttons!)
![Preview - slider with different markers](/extras/preview.jpg)


# Description
Allows for a slider with an option for markers or labels.

[![Download now](extras/download-button.png)](https://github.com/jdimeo/slider-label-extra-buttons/raw/master/slider-label-buttons.fieldplugin.zip)

# Features
* Display a slider with markers
* Allow for varying step size
* Allow for displaying the value
* Add extra buttons to *text*, *integer*, and/or *decimal* field.
* Customize button value and text
* Add as many buttons as needed
* Warning if button pressed when field has a value

# Data Format
The field value will be the last value indicated on the slider. This will be an integer for an [integer field](https://docs.surveycto.com/02-designing-forms/01-core-concepts/03f.field-types-integer.html) or a decimal for a [decimal field](https://docs.surveycto.com/02-designing-forms/01-core-concepts/03g.field-types-decimal.html).

If one of the buttons was pressed, the field value will be the value associated with that button.

# Default SurveyCTO feature support

| Feature / Property | Support |
|------------------|---------|
| Supported field type(s) |	integer, decimal |
| Default values | Yes |
| Constraint message | Uses default behavior |
| Required message | Uses default behavior |
| Read only	| Yes (shows the current value, if present) |
| media:image | Yes |
| media:audio | Yes |
| media:video | Yes |

# How to use

1. Download the test form [extras/sample-form](https://github.com/jdimeo/slider-label-buttons/raw/master/extras/sample-form/slider-label-buttons-sample.xlsx) from this repo and upload it to your SurveyCTO server.
1. Download the [slider-label-buttons.fieldplugin.zip](https://github.com/jdimeo/slider-label-buttons/raw/master/slider-label-buttons.fieldplugin.zip) file from this repo, and attach it to the test form on your SurveyCTO server.
1. Make sure to provide the correct parameters (see below).

# Parameters
The plugin can take the following parameters:

|**Name**|**Description**|
|---|---|
| `min` | The lowest value in the range of permitted values. |
| `max` | The greatest value in the range of permitted values. |
| `markers` | can take three values: `none` slider will have no markers, `yes` slider will have markers at set intervals (determined by the step parameter), `labels` slider will have labels and markers. |
| `step` | The step attribute is a number that specifies the granularity that the value must adhere to. The default is 1 for integer and 0.1 for decimals. |
|`button#` (required)|See [button parameters](#button-parameters) below to learn more.|
|`value#` (required)|See [button parameters](#button-parameters) below to learn more.|
|`warning` (optional)|Used to customize the warning message that will appear when the enumerator presses a button when the field already has a value. The value of this parameter will be displayed instead of the default warning message.|
|`yes` (optional)|What will be displayed instead of "Yes" in the confirmation.|
|`no` (optional)|What will be displayed instead of "No" in the confirmation.|
|`step_label`(optional)|Will place labels at intervals of every `step_label`. Default is to place labels only at the `min` and `max` values of the slider.|
|`start_value`(optional)|Determines the starting value of the handle of the slider. Default is to place the handle in the center of the slider.|
|`label_show`(optional)|Toggles the labels in general showing them: `show`, or hiding them: `hide`. Default is to show labels.|

##### Button parameters

For each extra button you would like to add, you will need a label, called "button", and a "value". For the parameter name, take the parameter name, and add the button number. For example, the parameter for the label of the first button will be `button1`, the parameter for the label of the second button will be `button2`, and so on. The parameter for the value for the first button will be `value1`, the parameter for the value of the second button will be `value2`, and so on. You can add as many or as few buttons as you'd like.

Be sure to update your *constraint* so it accepts the button values as values.

Examples usage is as follows:

`custom-slider-label-buttons(min="0", max="100", markers="none")`  
`custom-slider-label-buttons(min="0", max="100", markers="yes")`  
`custom-slider-label-buttons(min="0", max="100", markers="labels")`  
`custom-slider-label-buttons(min="0", max="1", markers="labels", step=0.1)`  
`custom-slider-label-buttons(min="0", max="10", markers="labels", step=1)`  
`custom-slider-label-buttons(min="0", max="10", button1="No answer", value1=999)`

# More resources
### Sample form
You can find a form definition in this repo here: [extras/sample_form](https://github.com/jdimeo/slider-label-buttons/raw/master/extras/sample-form/slider-label-buttons-sample.xlsx). This form will help you create a sample form to test the functionality of the field plug-in.

### Developer documentation   
* **Source resources** <br>
This field plug-in uses [Slider Pips](https://simeydotme.github.io/jQuery-ui-Slider-Pips/#styling-circles) which you can use for further customization.
* **Developer documentation for field plug-ins** <br>
More instructions for developing and using field plug-ins. https://github.com/surveycto/Field-plug-in-resources
