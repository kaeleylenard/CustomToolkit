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
                text.center(rect.cx(), rect.cy()).font({family: 'Montserrat'});
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
                text.center(text.cx() + rect.x() + 60, rect.cy()).font({family: 'Montserrat'})
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
                    text.center(text.cx() + group.children()[optionNumber].x() + 60, group.children()[optionNumber].cy()).font({family: 'Montserrat'});
                    group.add(text);
                }
            }
        }
    }

    return {Button, Checkbox, RadioGroup}

}());

export{MyToolkit}