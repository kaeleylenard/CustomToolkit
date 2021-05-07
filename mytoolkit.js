import {SVG} from './svg.min.js';

var MyToolkit = (function() {

    var Button = function(){
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();
        var rect = draw.rect(100,50).fill('#fcd5ce').radius(10);
        group.add(rect);

        var clickEvent = null;

        rect.mouseover(function(){
            this.fill({ color: '#ffb5a7'});
        })
        rect.mouseout(function(){
            this.fill({ color: '#fcd5ce'});
        })
        rect.mouseup(function(){
            this.fill({ color: '#fcd5ce'});
        })
        rect.click(function(event){
            this.fill({ color: '#fec89a'});
            if(clickEvent != null)
                clickEvent(event);
        })
        return {
            move: function(x, y) {
                console.log("Rectangle X/Y before move", rect.x(), rect.y());
                rect.move(x, y);
                console.log("Rectangle X/Y after move", rect.x(), rect.y());
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            label: function(string) {
                var text = draw.text(string);
                // Responsive button sized based on text length
                rect.width(rect.width() + text.length() + 100);
                text.move(rect.cx(), rect.cy() - 10).font({family: 'Verdana', anchor: 'middle'});
                console.log("Text center", text.cx(), text.cy());
                group.add(text);
            }
        }
    }

    var Checkbox = function() {
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group();
        var rect = draw.rect(50, 50).fill('#fcd5ce').radius(10);
        group.add(rect);

        // Checkmark
        var text = draw.text('✓');
        text.center(rect.cx(), rect.cy());
        group.add(text);
        text.hide();

        var clickEvent = null;
        var isClicked = false;

        rect.click(function(event) {
            if(clickEvent != null)
                clickEvent(event);
            if (isClicked === false) {
                this.fill({color: '#ffb5a7'});
                // Add checkmark
                text.show();
                isClicked = true;
            }
            else {
                this.fill({color: '#fcd5ce'});
                // Remove checkmark
                text.hide();
                isClicked = false;
            }

        })

        return {
            move: function(x, y) {
                rect.move(x, y);
                text.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            label: function(string) {
                var text = draw.text(string);
                console.log("Rect X", rect.x(), "Rect Y", rect.y());
                // 60 = 50 (width of checkbox) + 10 (for margin)
                text.center(text.cx() + rect.x() + 60, rect.cy()).font({family: 'Verdana'})
                console.log("Text X", text.x(), "Text Y", text.y());
                group.add(text);
            }
        }
    }

    var RadioGroup = function(numOptions) {
        // checking if 2 or more options are specified
        if (numOptions >= 2) {
            console.log("Created radio group with", numOptions, "options");
        }
        else {
            console.log("Error: You must specify 2 or more options in a RadioGroup")
        }

        var clickEvent = null

        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group()
        var currentY = draw.y();
        // for loop to create radio buttons
        for (var i = 0; i < numOptions; i++){
            var circle = draw.circle(30).fill('#fcd5ce').move(draw.x(), currentY);
            group.add(circle);
            currentY += 40;
            // SVG draw space has to expand
            draw.size('100%', draw.height() + 50);
        }

        group.click(function(event) {
            if(clickEvent != null)
                clickEvent(event);
            // Color circles only, not text
            if (SVG(event.target).type === "circle"){
                SVG(event.target).fill('#ffb5a7');

                // The selected circle retrieved from the mouse click
                var selectedCY = SVG(event.target).cy();

                var optionCounter = 0;
                for (var child of group.children()){
                    if (child.cy() === selectedCY) {
                        console.log("You selected Choice", optionCounter + 1)
                    }
                    else {
                        if (child.type === "circle") {
                            child.fill('#fcd5ce');
                        }
                    }
                    optionCounter += 1;
                }

            }
        })

        return {
            move: function(x, y) {
                group.move(x, y);
                // 100 safety num - edit later?
                var heightAddition = numOptions * 100;
                draw.size('100%', heightAddition);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            label: function(optionNumber, string) {
                // Configuring option number
                if ((1 < optionNumber) && (optionNumber > numOptions)) {
                    console.log("Error: You must input a number from 1 to", numOptions);
                }
                else {
                    optionNumber -= 1;
                    // Adding caption
                    var text = draw.text(string);
                    text.center(text.cx() + group.children()[optionNumber].x() + 60, group.children()[optionNumber].cy()).font({family: 'Verdana'});
                    group.add(text);
                }
            }
        }
    }

    var TextBox = function() {
        var draw = SVG().addTo('body').size('750px', '100px');
        var frame = draw.group()
        frame.rect(500, 50).stroke({width: 3, color: '#fcd5ce'}).fill('white').radius(10);
        frame.click(function(event) {
            console.log("Window", event)
        })

        var text = frame.text("").move(20, frame.cy() - 15).font({family: 'Verdana', anchor: 'start'});
        var caret = frame.rect(2, 15).move(20, frame.cy() - 7);
        var runner = caret.animate().width(0);
        runner.loop(1000, 1, 0);


        SVG.on(window, 'keyup', (event) => {
            if (event.code === 'Backspace') {
                // Remove last key; old and new lengths for cursor placement
                var oldLength = text.length()
                text.text(text.text().substring(0, text.text().length - 1))
                var newLength = text.length();
                caret.x(caret.x() - (oldLength - newLength))
            }
            else if (event.code === 'Space') {
                text.text(text.text() + "\xa0")
                caret.x(caret.x() + 5)
                console.log(event)
            }
            else if ((event.code === "ShiftLeft") || (event.code === "ShiftRight")){
                console.log("Shift pressed");
            }
            else {
                console.log(caret.x());
                if (caret.x() <= 475) {
                    text.text(text.text() + event.key)
                    caret.x(frame.x() + text.length() + 20)
                    console.log(event);
                }
            }
        })

        frame.move(10, 10);


        return {
            move: function(x, y) {
                frame.move(x, y);
            }
        }
    }


    var ScrollBar = function(height){
        var draw = SVG().addTo('body').size('100%', height);
        var group = draw.group();
        var rect = draw.rect(50, height).fill('#fcd5ce').radius(10);
        group.add(rect);

        var clickEvent = null

        // 25 is width of scrollbar
        var slider = draw.rect(50, 100).fill('#ffb5a7').radius(10);
        group.add(slider);
        console.log("Scroll thumb position:", slider.x(), slider.y());

        var mouseDown = false;
        var downEvent;

        slider.mousedown(function(event){
            mouseDown = true;
            downEvent = event;
        })

        draw.mouseup(function(){
            mouseDown = false;
        })

        slider.mousemove(function(event){
            if (mouseDown) {
                if (slider.y() < 0){
                    slider.y(0);
                }
                else if (slider.y() > rect.height() - slider.height()){
                    slider.y(rect.height() - slider.height());
                }
                else{
                    if (((event.offsetY - 25) >= 0) && ((event.offsetY - 25) <= rect.height() - slider.height())){
                        slider.y(event.offsetY - 25);
                    }
                }
            }
        })

        return {
            move: function(x, y) {
                group.move(x, y);
            }
        }
    }

    return {Button, Checkbox, RadioGroup, TextBox, ScrollBar}

}());

export{MyToolkit}