import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100, 100);
btn.onclick(function(e){
    console.log(e);
});
btn.label("Click!");

// Implement a MyToolkit Checkbox
var check = new MyToolkit.Checkbox;
check.move(100,100);
check.onclick(function(e){
    console.log(e);
});
//check.label("Really long text as an example for the checkbox.")
check.label("hi")
