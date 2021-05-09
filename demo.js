import {MyToolkit} from './mytoolkit.js';

new MyToolkit.Window(1000, 1000);

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(50, 50);
btn.onclick(function(e){
    console.log(e);
});
btn.label("Click me!");

// Implement a MyToolkit Checkbox
var check = new MyToolkit.Checkbox;
check.move(50, 125);
check.onclick(function(e){
    console.log(e);
});
check.label("I am a student.")

// Implement a MyToolkit RadioGroup
var radios = new MyToolkit.RadioGroup(5);
radios.move(50, 200);
radios.label(1, "Choice 1");
radios.label(2, "Choice 2");
radios.label(3, "Choice 3");
radios.label(4, "Choice 4");
radios.label(5, "Choice 5");
radios.onclick(function(e){
    console.log(e);
});

// Implement a MyToolkit TextBox
var textbox = new MyToolkit.TextBox;
textbox.move(350, 50);

// Implement a MyToolkit ScrollBar
var scrollbar = new MyToolkit.ScrollBar(200);
scrollbar.move(350, 125)

//var scrollbar2 = new MyToolkit.ScrollBar(200);
