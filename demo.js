import {MyToolkit} from './mytoolkit.js';

new MyToolkit.Window(1000, 1000);


// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(50, 50);
btn.onOver(function(e){
    console.log("mouseOver Event", e);
});
btn.onClick(function(e){
    console.log("mouseClick Event", e);
});
btn.onUp(function(e){
    console.log("mouseUp Event", e);
});
btn.onOut(function(e){
    console.log("mouseOut Event", e);
});
btn.label("Click me!");


// Implement a MyToolkit Checkbox
var check = new MyToolkit.Checkbox;
check.move(50, 125);
check.onClick(function(e){
    console.log("mouseClick Event", e);
});
console.log("Checked state:", check.onCheck());
check.label("I am a student.")


// Implement a MyToolkit RadioGroup
var radios = new MyToolkit.RadioGroup(5);
radios.move(50, 200);
radios.label(1, "Choice 1");
radios.label(2, "Choice 2");
radios.label(3, "Choice 3");
radios.label(4, "Choice 4");
radios.label(5, "Choice 5");
radios.onClick(function(e){
    console.log("mouseClick Event", e);
});


// Implement a MyToolkit TextBox
var textbox = new MyToolkit.TextBox;
textbox.move(350, 50);
console.log("Getting text:", textbox.getText())


// Implement a MyToolkit ScrollBar
var scrollbar = new MyToolkit.ScrollBar(200);
scrollbar.move(350, 125);
console.log(scrollbar.getScrollPosition());

// Implement a MyToolkit ProgressBar
var progressbar = new MyToolkit.ProgressBar;
progressbar.move(350, 350)
