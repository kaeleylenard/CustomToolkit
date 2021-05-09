import {SVG} from './svg.min.js';

/**
 * Custom widget library.
 *
 * @author Kaeley Lenard
 * @type {{RadioGroup: (function(*=): {move: function(*=, *=): void, onclick: function(*): void, label: function(*, *=): void}), Button: (function(): {move: function(Number, Number): void, onclick: function(MouseEvent): void, label: function(*=): void}), Checkbox: (function(): {move: function(Number, Number): void, onclick: function(MouseEvent): void, label: function(*=): void}), TextBox: (function(): {move: function(*=, *=): void}), ScrollBar: (function(*=): {move: function(*=, *=): void})}}
 */
var MyToolkit = (function() {
    var globalWindow = SVG().addTo('body').size('100%', '100%');
    var globalGroup = globalWindow.group();

    var Window = function(width, height){
        globalWindow.size(width, height);
    }

    /**
     * Creates a button.
     *
     * @returns {{move, onclick, label}}
     * @constructor
     */
    var Button = function(){
        var group = globalWindow.group();
        var rect = globalWindow.rect(100,50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);
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
            this.fill({ color: '#e0fbfc'});
            if(clickEvent != null)
                clickEvent(event);
        })

        return {
            /**
             * Moves the button to a specific (x, y) coordinate on the page.
             *
             * @param {Number} x The desired x coordinate of the button.
             * @param {Number} y The desired y coordinate of the button.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Captures the MouseEvent when the button is clicked.
             *
             * @param {MouseEvent} eventHandler
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /**
             * Allows the setting of a custom label on the button.
             *
             * @param {String} string The text to be displayed on the button.
             */
            label: function(string) {
                var text = globalWindow.text(string);
                rect.width(rect.width() + text.length() + 100); // Responsive button sized based on text length
                text.move(rect.cx(), rect.cy() - 10).font({family: 'Verdana', anchor: 'middle'});
                group.add(text);
            }
        }
    }

    /**
     * Creates a checkbox.
     *
     * @returns {{move, onclick, label}}
     * @constructor
     */
    var Checkbox = function() {
        var group = globalWindow.group();
        var rect = globalWindow.rect(50, 50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var text = globalWindow.text('✓');
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
                text.show(); // Add checkmark
                isClicked = true;
            }
            else {
                this.fill({color: '#fcd5ce'});
                text.hide(); // Remove checkmark
                isClicked = false;
            }
        })

        return {
            /**
             * Moves the button to a specific (x, y) coordinate on the page.
             *
             * @param {Number} x The desired x coordinate of the button.
             * @param {Number} y The desired y coordinate of the button.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Captures the MouseEvent when the button is clicked.
             *
             * @param {MouseEvent} eventHandler
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /**
             * Allows the setting of a custom label on the button.
             *
             * @param {String} string The text to be displayed on the button.
             */
            label: function(string) {
                var text = globalWindow.text(string);
                text.center(text.cx() + rect.x() + 60, rect.cy()).font({family: 'Verdana'}) // 60 = 50 (width of checkbox) + 10 (for margin)
                group.add(text);
            }
        }
    }

    /**
     * Creates a group of 2+ radio buttons.
     *
     * @param {Number} numOptions The number of radio buttons to be present (must be greater than 2).
     * @returns {{move, onclick, label}}
     * @constructor
     */
    var RadioGroup = function(numOptions) {
        if (numOptions >= 2) {
            console.log("Created radio group with", numOptions, "options");
        }
        else {
            console.log("Error: You must specify 2 or more options in a RadioGroup");
        }

        var clickEvent = null

        var group = globalWindow.group()
        var currentY = globalWindow.y();
        for (var i = 0; i < numOptions; i++){
            var circle = globalWindow.circle(30).fill('#fcd5ce').move(globalWindow.x(), currentY);
            group.add(circle);
            globalGroup.add(group);
            currentY += 40;
        }

        group.click(function(event) {
            if(clickEvent != null)
                clickEvent(event);

            if (SVG(event.target).type === "circle"){
                SVG(event.target).fill('#e0fbfc');

                var selectedCY = SVG(event.target).cy(); // The selected circle retrieved from the mouse click

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
                    var text = globalWindow.text(string);
                    text.center(text.cx() + group.children()[optionNumber].x() + 60, group.children()[optionNumber].cy()).font({family: 'Verdana'});
                    group.add(text);
                }
            }
        }
    }

    var TextBox = function() {
        var frame = globalWindow.group()
        frame.rect(300, 50).stroke({width: 3, color: '#fcd5ce'}).fill('white').radius(10);
        frame.click(function(event) {
            console.log("Window", event)
        })
        frame.move(3, 3); // To prevent stroke edges from cutting off
        globalGroup.add(frame);

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
                if (text.length() < 250) {
                    text.text(text.text() + event.key)
                    caret.x(frame.x() + text.length() + 20)
                    console.log(event);
                }
            }
        })


        return {
            move: function(x, y) {
                frame.move(x, y);
            }
        }
    }


    var ScrollBar = function(height){
        var group = globalWindow.group();
        var rect = globalWindow.rect(50, height).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var clickEvent = null

        var slider = globalWindow.rect(50, height/3).fill('#ffb5a7').radius(10);
        group.add(slider);
        console.log("Scroll thumb position:", slider.x(), slider.y());

        var mouseDown = false;
        var downEvent;

        slider.mousedown(function(event){
            mouseDown = true;
            downEvent = event;
        })

        globalWindow.mouseup(function(){
            mouseDown = false;
        })

        slider.mousemove(function(event){
            console.log(slider.y(), rect.y());
            if (mouseDown) {
                if (slider.y() < rect.y()){
                    slider.y(rect.y())
                }
                else if (slider.y() > rect.y() + height - height/3){
                    slider.y(rect.y() + height - height/3)
                }
                else{
                    if (((event.offsetY - 25) >= rect.y()) && ((event.offsetY - 25) <= rect.y() + height - height/3))
                    slider.y(event.offsetY - 25);
                }
            }
        })

        return {
            move: function(x, y) {
                group.move(x, y);
            }
        }
    }

    return {Window, Button, Checkbox, RadioGroup, TextBox, ScrollBar}

}());

export{MyToolkit}