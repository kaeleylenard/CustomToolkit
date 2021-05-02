import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
//btn.move(100, 100);
btn.onclick(function(e){
    console.log(e);
});
btn.label("Click!");

// Implement a MyToolkit Checkbox
var check = new MyToolkit.Checkbox;
//check.move(100,100);
check.onclick(function(e){
    console.log(e);
});
//check.label("Really long text as an example for the checkbox.")
check.label("hi")

// Implement a MyToolkit RadioGroup
var radios = new MyToolkit.RadioGroup(5);
//radios.move(150, 150);
radios.label(1, "Choice 1");
radios.label(2, "Choice 2");
radios.label(3, "Choice 3");
radios.label(4, "Choice 4");
radios.label(5, "Choice 5");
radios.onclick(function(e){
    console.log(e);
});
