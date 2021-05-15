import {MyToolkit} from './mytoolkit.js';

new MyToolkit.Window(1000, 1000);

// Button that links to documentation
var docBtn = new MyToolkit.Button;
docBtn.move(700, 600);
docBtn.label("Link to JSDoc");
docBtn.onClick(function(e){
    window.open("out/mytoolkit.html");
})

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(50, 50);
btn.onClick(function(e){
    console.log("[Button] clicked", e);
});
btn.label("Click me!");
btn.onStateChange(function(e){
    if (e.type === 'mouseover'){
        console.log("[Button] Current state: Ready", e)
    }
    else if (e.type === 'click'){
        console.log("[Button] Current state: Execute", e)
    }
    else if (e.type === 'mouseout'){
        console.log("[Button] Current state: Idle", e)
    }
})


// Implement a MyToolkit Checkbox
var check = new MyToolkit.Checkbox;
check.move(50, 125);
check.onClick(function(e){
    console.log("[Checkbox] clicked", e);
});
check.onStateChange(function(e){
    var isChecked = check.getCheckedState();
    if (e.type === 'click'){
        if (isChecked){
            console.log("[Checkbox] Current state: Idle", e);
        }
        else{
            console.log("[Checkbox] Current state: Execute", e);
        }
    }
})
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
    console.log(e);
    console.log('Last button selected:', radios.getSelected());
});
radios.onStateChange(function(e){
    if (radios.getActive()){
        console.log("[Radio] Current state: Execute", e);
    }
})


// Implement a MyToolkit TextBox
var textbox = new MyToolkit.TextBox;
textbox.move(350, 50);
textbox.onKeyUp((function(e){
    console.log(e);
    console.log("Getting text:", textbox.getText())
}))
textbox.onStateChange((function(e){
    if (e.type === 'mouseover'){
        console.log("[Text box] Current state: Ready", e);
    }
    else if (e.type === 'mouseout'){
        console.log("[Text box] Current state: Idle", e);
    }
    else if (e.type === 'keyup'){
        console.log("[Text box] Current state: Execute", e);
    }
}))


// Implement a MyToolkit ScrollBar
var scrollbar = new MyToolkit.ScrollBar(200);
scrollbar.move(350, 125);
scrollbar.onMove((function(e){
    console.log(scrollbar.getScrollPosition());
    if (scrollbar.getDirection() != null){
        console.log(scrollbar.getDirection())
    }
}))
scrollbar.onStateChange((function(e){
    if (e.type === 'mousedown'){
        console.log("[Scroll bar] Current state: Ready", e);
    }
    else if (e.type === 'mousemove'){
        console.log("[Scroll bar] Current state: Execute", e);
    }
    else if (e.type === 'mouseup'){
        console.log("[Scroll bar] Current state: Idle", e);
    }
}))


// Implement a MyToolkit ProgressBar
var progressbar = new MyToolkit.ProgressBar;
progressbar.setWidth(300);
progressbar.move(350, 350);
progressbar.setInc(0);
console.log("Progress bar increment:", progressbar.getInc());
progressbar.increment(20)
setInterval(inc, 750);

let p = 0;
function inc(){
    p += 20;
    if (p > 300){
        p = 0;
        progressbar.increment(p)
    } else {
        progressbar.increment(20);
    }
    progressbar.onIncrement((function(e){
        console.log("[Progress bar] has incremented", e);
    }))
}

progressbar.onStateChange((function(e){
    if (e.type === 'mouseover'){
        console.log("[Progress bar] Current state: In Focus", e);
    }
    else if (e.type === 'mouseout'){
        console.log("[Progress bar] Current state: Out of Focus", e);
    }
}))

var flashcard = new MyToolkit.FlashCard;
flashcard.move(50, 450);
flashcard.setTerm("User Experience (UX)");
flashcard.setDefinition("How a user interacts with a product or service");