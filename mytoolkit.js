import {SVG} from './svg.min.js';

/**
 * Custom widget library.
 * To get started, initialize a new window with the desired (width, height),
 * such as new MyToolkit.Window(1000, 1000);
 *
 * @author Kaeley Lenard
 * @namespace MyToolkit
 * @type {{Window: Window, RadioGroup: (function(Number): {getSelected: (function(): number), move: MyToolkit.RadioGroup.move, onClick: MyToolkit.RadioGroup.onClick, label: MyToolkit.RadioGroup.label}), Button: (function(): {onOut: function(Event): void, move: function(Number, Number): void, onClick: function(Event): void, label: function(String): void, onOver: function(Event): void, onUp: function(Event): void}), Checkbox: (function(): {onCheck: function(): boolean, move: function(Number, Number): void, onClick: function(Event): void, label: function(String): void}), TextBox: (function(): {move: function(Number, Number): void, getText: function(): String}), ProgressBar: (function(): {move: function(*=, *=): void}), ScrollBar: (function(Number): {move: function(Number, Number): void, getScrollPosition: function(): string})}}
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
     * @namespace Button
     * @memberOf MyToolkit
     * @returns {{onOut: onOut, move: move, onClick: onClick, label: label, onUp: onUp, onOver: onOver}}
     * @constructor
     */
    var Button = function(){
        var group = globalWindow.group();
        var rect = globalWindow.rect(100,50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        // State Changes
        var overEvent = null;
        var clickEvent = null;
        var upEvent = null;
        var outEvent = null;

        rect.click(function(event){
            console.log("[Click Event] Button is clicked. State: Execute");
            this.fill({ color: '#e0fbfc'});
            if(clickEvent != null)
                clickEvent(event);
        })
        rect.mouseover(function(event){
            console.log("[mouseOver Event] Button is not clicked. State: Ready");
            this.fill({ color: '#ffb5a7'});
            if (overEvent != null)
                overEvent(event);
        })
        rect.mouseout(function(event){
            console.log("[mouseOut Event] Button is not clicked. State: Idle");
            this.fill({ color: '#fcd5ce'});
            if (outEvent != null)
                outEvent(event);
        })
        rect.mouseup(function(event){
            console.log("[mouseUp Event] Button is not clicked. State: Execute")
            this.fill({ color: '#fcd5ce'});
            if (upEvent != null)
                upEvent(event);
        })

        return {
            /**
             * Moves the button to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.Button
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the button.
             * @param {Number} y The desired y coordinate of the button.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Captures the MouseEvent when the button is hovered upon.
             *
             * @memberOf MyToolkit.Button
             * @function onOver
             * @inner
             * @param {Event} overEventHandler Event fired upon mouse hover.
             */
            onOver: function(overEventHandler){
                overEvent = overEventHandler;
            },
            /**
             * Captures the MouseEvent when the button is clicked.
             *
             * @memberOf MyToolkit.Button
             * @function onClick
             * @inner
             * @param {Event} clickEventHandler Event fired upon mouse click.
             */
            onClick: function(clickEventHandler){
                clickEvent = clickEventHandler;
            },
            /**
             * Captures the MouseEvent when the button's click is released.
             *
             * @memberOf MyToolkit.Button
             * @function onUp
             * @inner
             * @param {Event} upEventHandler Event fired upon click release.
             */
            onUp: function(upEventHandler){
                upEvent = upEventHandler;
            },
            /**
             * Captures the MouseEvent when the cursor leaves the button.
             *
             * @memberOf MyToolkit.Button
             * @function onOut
             * @inner
             * @param {Event} outEventHandler Event fired upon mouse leaving the button.
             */
            onOut: function(outEventHandler){
                outEvent = outEventHandler;
            },
            /**
             * Allows the setting of a custom label on the button.
             *
             * @memberOf MyToolkit.Button
             * @function label
             * @inner
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
     * @namespace Checkbox
     * @memberOf MyToolkit
     * @returns {{onCheck: (function(): boolean), move: MyToolkit.Checkbox.move, onClick: MyToolkit.Checkbox.onClick, label: MyToolkit.Checkbox.label}}
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
        var checkState = 'Idle';
        var isChecked = false;

        rect.click(function(event) {
            if(clickEvent != null)
                clickEvent(event);

            if (isChecked === false) {
                this.fill({color: '#ffb5a7'});
                text.show(); // Add checkmark
                isChecked = true;
                checkState = 'Active';
            }
            else {
                this.fill({color: '#fcd5ce'});
                text.hide(); // Remove checkmark
                isChecked = false;
                checkState = 'Idle'
            }

            console.log("Checked state:", isChecked, "State:", checkState)
        })

        return {
            /**
             * Moves the checkbox to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.Checkbox
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the checkbox.
             * @param {Number} y The desired y coordinate of the checkbox.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Captures the MouseEvent when the checkbox is clicked.
             *
             * @memberOf MyToolkit.Checkbox
             * @function onClick
             * @inner
             * @param {Event} clickEventHandler Event fired upon mouse click.
             */
            onClick: function(clickEventHandler){
                clickEvent = clickEventHandler;
            },
            /**
             * Returns whether or not the checkbox is checked.
             *
             * @memberOf MyToolkit.Checkbox
             * @function onCheck
             * @inner
             * @returns {boolean} isChecked Returns true if the checkbox is checked and false if unchecked.
             */
            onCheck: function(){
                return isChecked;
            },
            /**
             * Allows the setting of a custom label on the checkbox.
             *
             * @memberOf MyToolkit.Checkbox
             * @function label
             * @inner
             * @param {String} string The text to be displayed to the right of the checkbox.
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
     * @namespace RadioGroup
     * @memberOf MyToolkit
     * @param {Number} numOptions The number of radio buttons in the group. Must be 2 or greater.
     * @returns {{getSelected: (function(): number), move: MyToolkit.RadioGroup.move, onClick: MyToolkit.RadioGroup.onClick, label: MyToolkit.RadioGroup.label}}
     * @constructor
     */
    var RadioGroup = function(numOptions) {
        if (numOptions < 2) {
            console.log("Error: You must specify 2 or more options in a RadioGroup");
        }
        else {
            var clickEvent = null;
            var radioState = 'Idle'
            console.log('State: Idle');
            var isSelected = false;
            var buttonSelected = 0;

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
                    isSelected = true;

                    var selectedCY = SVG(event.target).cy(); // The selected circle retrieved from the mouse click

                    var optionCounter = 0;
                    for (var child of group.children()){
                        if (child.cy() === selectedCY) {
                            buttonSelected = optionCounter + 1
                            radioState = 'Active'
                            console.log("Button selected:", buttonSelected, 'State: Active');
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
                /**
                 * Moves the radio group to a specific (x, y) coordinate in the window.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function move
                 * @inner
                 * @param {Number} x The desired x coordinate of the radio group.
                 * @param {Number} y The desired y coordinate of the radio group.
                 */
                move: function(x, y) {
                    group.move(x, y);
                },
                /**
                 * Captures the MouseEvent when the radio group is clicked.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function onClick
                 * @inner
                 * @param {Event} clickEventHandler Event fired upon mouse click.
                 */
                onClick: function(clickEventHandler){
                    clickEvent = clickEventHandler;
                },
                /**
                 * Returns which n button is selected, with the topmost button being 1. A value of 0 signifies that no button is selected.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function getSelected
                 * @inner
                 * @returns {number} buttonSelected The n option selected.
                 */
                getSelected: function(){
                    return buttonSelected;
                },
                /**
                 * Allows the setting of a custom label for each radio group button.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function label
                 * @inner
                 * @param {Number} optionNumber The n button to which the text is being added to.
                 * @param {String} string The text to be displayed to the right of the optionNumber button.
                 */
                label: function(optionNumber, string) {
                    if ((1 < optionNumber) && (optionNumber > numOptions)) {
                        console.log("Error: You must input a number from 1 to", numOptions);
                    }
                    else {
                        optionNumber -= 1;
                        var text = globalWindow.text(string);
                        text.center(text.cx() + group.children()[optionNumber].x() + 60, group.children()[optionNumber].cy()).font({family: 'Verdana'});
                        group.add(text);
                    }
                }
            }
        }
    }

    /**
     * Creates a text box.
     *
     * @namespace Textbox
     * @memberOf MyToolkit
     * @returns {{move: MyToolkit.Button.move, getText: (function(): *)}}
     * @constructor
     */
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
        caret.hide();

        frame.mouseover(function(){
            console.log("[mouseOver Event] State: Ready")
            caret.show();
            caret.x(caret.x() + 20);
            caret.y(caret.y() + 20);
        })

        frame.mouseout(function(){
            console.log("[mouseOut Event] State: Idle")
            caret.hide();
            caret.x(caret.x() - 20);
            caret.y(caret.y() - 20);
        })

        SVG.on(window, 'keyup', (event) => {
            console.log("[keyUp Event] State: Execute")
            if (event.code === 'Backspace') {
                var oldLength = text.length() // Remove last key; old and new lengths for cursor placement
                text.text(text.text().substring(0, text.text().length - 1))
                var newLength = text.length();
                caret.x(caret.x() - (oldLength - newLength))
            }
            else if (event.code === 'Space') {
                text.text(text.text() + "\xa0")
                caret.x(caret.x() + 5)
            }
            else if ((event.code === "ShiftLeft") || (event.code === "ShiftRight")){
                console.log("Shift pressed");
            }
            else {
                if (text.length() < 250) {
                    text.text(text.text() + event.key)
                    caret.x(frame.x() + text.length() + 20)
                    console.log("Text entered:", text.text());
                }
            }
        })

        return {
            /**
             * Moves the text box to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.Textbox
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the text box.
             * @param {Number} y The desired y coordinate of the text box.
             */
            move: function(x, y) {
                frame.move(x, y);
            },
            /**
             * Gets the text inputted by the user in the text box.
             *
             * @memberOf MyToolkit.Textbox
             * @function getText
             * @inner
             * @returns {String}
             */
            getText: function(){
                return text.text();
            }
        }
    }

    /**
     * Creates a scroll bar.
     *
     * @namespace Scrollbar
     * @memberOf MyToolkit
     * @param {Number} height The desired height of the scroll bar.
     * @returns {{move: MyToolkit.Button.move, getScrollPosition: (function(): string)}}
     * @constructor
     */
    var ScrollBar = function(height){
        var group = globalWindow.group();
        var rect = globalWindow.rect(50, height).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var slider = globalWindow.rect(50, height/3).fill('#ffb5a7').radius(10);
        group.add(slider);

        var mouseDown = false;
        var lastPosition = rect.y();

        slider.mousedown(function(event){
            console.log("Scrollbar state: Ready")
            mouseDown = true;
        })

        globalWindow.mouseup(function(){
            console.log("Scrollbar state: Idle")
            mouseDown = false;
        })

        slider.mousemove(function(event){
            if (mouseDown) {
                if (slider.y() < rect.y()){
                    slider.y(rect.y())
                }
                else if (slider.y() > rect.y() + height - height/3){
                    slider.y(rect.y() + height - height/3)
                }
                else{
                    if (((event.offsetY - 25) >= rect.y()) && ((event.offsetY - 25) <= rect.y() + height - height/3)){
                        slider.y(event.offsetY - 25);
                    }

                    if (event.offsetY > lastPosition) {
                        console.log("Scrollbar moved downwards. State: Execute");
                        lastPosition = event.offsetY;
                    }
                    else {
                        console.log("Scrollbar moved upwards. State: Execute");
                    }
                }
            }
        })

        return {
            /**
             * Moves the scroll bar to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.Scrollbar
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the scroll bar.
             * @param {Number} y The desired y coordinate of the scroll bar.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Returns the (x, y) coordinates of the slider within the scroll bar.
             *
             * @memberOf MyToolkit.Scrollbar
             * @function getScrollPosition
             * @inner
             * @returns {string}
             */
            getScrollPosition: function() {
                return "Slider position: " + "(" + slider.x() + "," + slider.y() + ")";
            }
        }
    }

    var ProgressBar = function(){
        var group = globalWindow.group();
        var rect = globalWindow.rect(300, 50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var progressRect = globalWindow.rect(10, 50).fill('#ffb5a7').radius(10);
        group.add(progressRect);

        var runner = progressRect.animate();

        runner.during(function(){
            progressRect.width(progressRect.width() + 1)
            if (progressRect.width() > rect.width()){
                progressRect.width(0);
            }
        })
        runner.loop();


        return {
            move: function(x, y) {
                group.move(x, y);
            }
        }
    }

    return {Window, Button, Checkbox, RadioGroup, TextBox, ScrollBar, ProgressBar}

}());

export{MyToolkit}