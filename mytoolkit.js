import {SVG} from './svg.min.js';

/**
 * Custom widget library.
 * To get started, initialize a new window with the desired (width, height),
 * such as new MyToolkit.Window(1000, 1000);
 *
 * @author Kaeley Lenard
 * @namespace MyToolkit
 * @type {{Window: Window, RadioGroup: (function(Number): {getSelected: (function(): *), move: MyToolkit.RadioGroup.move, onClick: MyToolkit.RadioGroup.onClick, getActive: (function(): boolean), onStateChange: MyToolkit.RadioGroup.onStateChange, label: MyToolkit.RadioGroup.label}), Button: (function(): {move: function(Number, Number): void, onClick: function(Event): void, onStateChange: function(Event): void, label: function(String): void}), Checkbox: (function(): {move: function(Number, Number): void, onClick: function(Event): void, onStateChange: function(Event): void, label: function(String): void, getCheckedState: function(): boolean}), TextBox: (function(): {move: function(Number, Number): void, onKeyUp: function(Event): void, getText: function(): String, onStateChange: function(Event): void}), ProgressBar: (function(): {getInc: function(): Number, move: function(Number, Number): void, increment: function(Number): void, setWidth: function(Number): void, setInc: function(Number): void}), ScrollBar: (function(Number): {move: function(Number, Number): void, getDirection: function(): String, onStateChange: function(Event): void, onMove: function(Event): void, getScrollPosition: function(): String})}}
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
     * @returns {{move: MyToolkit.Button.move, onClick: MyToolkit.Button.onClick, onStateChange: MyToolkit.Button.onStateChange, label: MyToolkit.Button.label}}
     * @constructor
     */
    var Button = function(){
        var group = globalWindow.group();
        var rect = globalWindow.rect(100,50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var clickEvent = null;
        var currentEvent = null;

        rect.click(function(event){
            this.fill({ color: '#fec89a'});
            if(clickEvent != null)
                clickEvent(event);
            if(currentEvent != null)
                currentEvent(event);
        })
        rect.mouseover(function(event){
            this.fill({ color: '#ffb5a7'});
            if(currentEvent != null)
                currentEvent(event);
        })
        rect.mouseout(function(event){
            this.fill({ color: '#fcd5ce'});
            if(currentEvent != null)
                currentEvent(event);
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
             * Captures the Event when the button is clicked.
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
             * Captures the Event when the button's state is changed.
             *
             * @memberOf MyToolkit.Button
             * @function onStateChange
             * @inner
             * @param {Event} currentEventHandler Event fired upon button state change.
             */
            onStateChange: function(currentEventHandler){
                currentEvent = currentEventHandler;
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
     * @returns {{move: MyToolkit.Checkbox.move, onClick: MyToolkit.Checkbox.onClick, onStateChange: MyToolkit.Checkbox.onStateChange, label: MyToolkit.Checkbox.label, getCheckedState: (function(): boolean)}}
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
        var currentEvent = null;
        var isChecked = false;

        rect.click(function(event) {
            if(clickEvent != null)
                clickEvent(event);
            if(currentEvent != null)
                currentEvent(event);

            if (isChecked === false) {
                this.fill({color: '#ffb5a7'});
                text.show(); // Add checkmark
                isChecked = true;
            }
            else {
                this.fill({color: '#fcd5ce'});
                text.hide(); // Remove checkmark
                isChecked = false;
            }
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
             * Captures the Event when the checkbox's state is changed.
             *
             * @memberOf MyToolkit.Checkbox
             * @function onStateChange
             * @inner
             * @param {Event} currentEventHandler Event fired upon checkbox state change.
             */
            onStateChange: function(currentEventHandler){
                currentEvent = currentEventHandler;
            },
            /**
             * Returns true if the checkbox is checked, false if unchecked.
             *
             * @memberOf MyToolkit.Checkbox
             * @function getCheckedState
             * @inner
             * @returns {boolean} isChecked
             */
            getCheckedState: function(){
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
     * Creates a group of radio buttons with 2+ options as specified by the user.
     *
     * @namespace RadioGroup
     * @memberOf MyToolkit
     * @param {Number} numOptions The number of buttons to be present in the radio group.
     * @returns {{getSelected: (function(): *), move: MyToolkit.RadioGroup.move, onClick: MyToolkit.RadioGroup.onClick, getActive: (function(): boolean), onStateChange: MyToolkit.RadioGroup.onStateChange, label: MyToolkit.RadioGroup.label}}
     * @constructor
     */
    var RadioGroup = function(numOptions) {
        if (numOptions < 2) {
            console.log("Error: You must specify 2 or more options in a RadioGroup");
        }
        else {
            var clickEvent = null;
            var currentEvent = null;
            var isSelected = false;
            var buttonSelected;

            var group = globalWindow.group()
            var currentY = globalWindow.y();
            for (var i = 0; i < numOptions; i++){
                var circle = globalWindow.circle(30).fill('#fcd5ce').move(globalWindow.x(), currentY);
                group.add(circle);
                globalGroup.add(group);
                currentY += 40;
            }

            group.click(function(event) {
                if (SVG(event.target).type === "circle"){
                    if(clickEvent != null)
                        clickEvent(event);
                    if(currentEvent != null)
                        currentEvent(event);

                    SVG(event.target).fill('#fec89a');
                    isSelected = true;

                    var selectedCY = SVG(event.target).cy(); // The selected circle retrieved from the mouse click

                    var optionCounter = 0;
                    for (var child of group.children()){
                        if (child.cy() === selectedCY) {
                            buttonSelected = optionCounter + 1
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
                    isSelected = true;
                    clickEvent = clickEventHandler;
                },
                /**
                 * Captures the Event when the radio group's state is changed.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function onStateChange
                 * @inner
                 * @param {Event} currentEventHandler Event fired upon radio group state change.
                 */
                onStateChange: function(currentEventHandler){
                    currentEvent = currentEventHandler;
                },
                /**
                 * Returns the last n button selected.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function getSelected
                 * @inner
                 * @returns {Number}
                 */
                getSelected: function(){
                    return buttonSelected;
                },
                /**
                 * Returns true if the radio group is active, meaning that one button is selected. False if no buttons are selected.
                 *
                 * @memberOf MyToolkit.RadioGroup
                 * @function getActive
                 * @inner
                 * @returns {boolean} isSelected
                 */
                getActive: function(){
                    return isSelected;
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
     * @namespace TextBox
     * @memberOf MyToolkit
     * @returns {{move: MyToolkit.Textbox.move, onKeyUp: MyToolkit.TextBox.onKeyUp, getText: (function(): *), onStateChange: MyToolkit.TextBox.onStateChange}}
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
        var keyUpEvent = null;
        var currentEvent = null;

        frame.mouseover(function(event){
            caret.show();
            caret.x(caret.x() + 20);
            caret.y(caret.y() + 20);
            if(currentEvent != null)
                currentEvent(event);
        })

        frame.mouseout(function(event){
            caret.hide();
            caret.x(caret.x() - 20);
            caret.y(caret.y() - 20);
            if(currentEvent != null)
                currentEvent(event);
        })

        SVG.on(window, 'keyup', (event) => {
            if (keyUpEvent != null)
                keyUpEvent(event)
            if(currentEvent != null)
                currentEvent(event);

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

            }
            else {
                if (text.length() < 250) {
                    text.text(text.text() + event.key)
                    caret.x(frame.x() + text.length() + 20)
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
             * Captures the Event when a key is released.
             *
             * @memberOf MyToolkit.TextBox
             * @function onKeyUp
             * @inner
             * @param {Event} keyUpEventHandler Event fired upon key release.
             */
            onKeyUp: function(keyUpEventHandler){
                keyUpEvent = keyUpEventHandler;
            },
            /**
             * Captures the Event when the textbox's state is changed.
             *
             * @memberOf MyToolkit.TextBox
             * @function onStateChange
             * @inner
             * @param {Event} currentEventHandler Event fired upon text box state change.
             */
            onStateChange: function(currentEventHandler){
                currentEvent = currentEventHandler;
            },
            /**
             * Gets the text inputted by the user in the text box.
             *
             * @memberOf MyToolkit.TextBox
             * @function getText
             * @inner
             * @returns {String} string
             */
            getText: function(){
                return text.text();
            }
        }
    }

    /**
     * Creates a scroll bar.
     *
     * @namespace ScrollBar
     * @memberOf MyToolkit
     * @param {Number} height The desired height of the scroll bar.
     * @returns {{move: MyToolkit.ScrollBar.move, getDirection: (function(): *), onStateChange: MyToolkit.ScrollBar.onStateChange, onMove: MyToolkit.ScrollBar.onMove, getScrollPosition: (function(): string)}}
     * @constructor
     */
    var ScrollBar = function(height){
        var group = globalWindow.group();
        var rect = globalWindow.rect(50, height).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var slider = globalWindow.rect(50, height/3).fill('#ffb5a7').radius(10);
        group.add(slider);
        var moveEvent = null;
        var currentEvent = null;

        var mouseDown = false;
        var lastPosition = rect.y();
        var direction;

        slider.mousedown(function(event){
            if (currentEvent != null)
                currentEvent(event)
            mouseDown = true;
        })

        slider.mouseup(function(){
            if (currentEvent != null)
                currentEvent(event)
            mouseDown = false;
        })

        slider.mousemove(function(event){
            if(moveEvent != null)
                moveEvent(event)
            if (currentEvent != null)
                currentEvent(event)

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
                        direction = "Downwards"
                        //console.log("Scrollbar moved downwards. State: Execute");
                        lastPosition = event.offsetY;
                    }
                    else {
                        direction = "Upwards"
                        //console.log("Scrollbar moved upwards. State: Execute");
                    }
                }
            }
        })

        return {
            /**
             * Moves the scroll bar to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.ScrollBar
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
             * @memberOf MyToolkit.ScrollBar
             * @function getScrollPosition
             * @inner
             * @returns {String}
             */
            getScrollPosition: function() {
                return "(" + slider.x() + "," + slider.y() + ")";
            },
            /**
             * Captures the Event when the mouse is moved.
             *
             * @memberOf MyToolkit.ScrollBar
             * @function onMove
             * @inner
             * @param {Event} moveEventHandler Event fired upon mouse move.
             */
            onMove: function(moveEventHandler){
                moveEvent = moveEventHandler
            },
            /**
             * Gets the direction of the scroll bar's movement, upwards or downwards.
             *
             * @memberOf MyToolkit.ScrollBar
             * @function getDirection
             * @inner
             * @returns {String} direction
             */
            getDirection: function(){
                return direction;
            },
            /**
             * Captures the Event when the scroll bar's state is changed.
             *
             * @memberOf MyToolkit.ScrollBar
             * @function onStateChange
             * @inner
             * @param {Event} currentEventHandler Event fired upon scroll bar state change.
             */
            onStateChange: function(currentEventHandler){
                currentEvent = currentEventHandler;
            }
        }
    }

    /**
     * Creates a progress bar.
     *
     * @namespace ProgressBar
     * @memberOf MyToolkit
     * @returns {{getInc: (function(): number), onIncrement: MyToolkit.ProgressBar.onIncrement, move: MyToolkit.ProgressBar.move, increment: MyToolkit.ProgressBar.increment, onStateChange: MyToolkit.ProgressBar.onStateChange, setWidth: MyToolkit.ProgressBar.setWidth, setInc: MyToolkit.ProgressBar.setInc}}
     * @constructor
     */
    var ProgressBar = function(){
        var group = globalWindow.group();
        var rect = globalWindow.rect(300, 50).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var progressRect = globalWindow.rect(0, 50).fill('#ffb5a7').radius(10);
        group.add(progressRect);
        var incValue = 0;

        var incrementEvent = null;
        var currentEvent = null;

        progressRect.mouseover(function(event){
            this.fill({ color: '#fec89a'});
            if(currentEvent != null)
                currentEvent(event);
            if(incrementEvent != null)
                incrementEvent(event);
        })

        progressRect.mouseout(function(event){
            this.fill({ color: '#ffb5a7'});
            if(currentEvent != null)
                currentEvent(event);
        })

        return {
            /**
             * Moves the progress bar to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the progress bar.
             * @param {Number} y The desired y coordinate of the progress bar.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the width of the progress bar.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function setWidth
             * @inner
             * @param {Number} width The desired width of the progress bar.
             */
            setWidth: function(width){
                rect.width(width);
            },
            /**
             * Sets the increment value of the progress bar.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function setInc
             * @inner
             * @param {Number} increment The desired increment value of the progress bar.
             */
            setInc: function(increment){
                if ((increment <= 100) && (increment >= 0)){
                    progressRect.width(rect.width() * (increment / 100))
                }
                incValue = increment;
            },
            /**
             * Gets the increment value of the progress bar.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function getInc
             * @inner
             * @returns {Number} incValue
             */
            getInc: function(){
                return incValue;
            },
            /**
             * Used to increment the progress bar with a timer.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function increment
             * @inner
             * @param {Number} incValue A value between 0-100 to increment the value of the progress bar.
             */
            increment: function(incValue){
                if ((progressRect.width() + incValue) <= rect.width()){
                    progressRect.width(progressRect.width() + incValue);
                }
                else{
                    progressRect.width(0);
                }
            },
            /**
             * Captures the Event when the progress bar's state is changed.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function onStateChange
             * @inner
             * @param {Event} currentEventHandler Event fired upon progress bar state change.
             */
            onStateChange: function(currentEventHandler){
                currentEvent = currentEventHandler;
            },
            /**
             * Captures the Event when the progress bar is incremented. Viewable only when the progress bar's state is in focus.
             *
             * @memberOf MyToolkit.ProgressBar
             * @function onIncrement
             * @inner
             * @param {Event} incrementEventHandler Event fired upon progress bar incrementation.
             */
            onIncrement: function(incrementEventHandler){
                if (progressRect.width() != incValue){
                    incrementEvent = incrementEventHandler;
                }
            },
        }
    }

    /**
     * Creates a flash card.
     *
     * @namespace FlashCard
     * @memberOf MyToolkit
     * @returns {{move: MyToolkit.FlashCard.move, setDefinition: setDefinition, setTerm: setTerm}}
     * @constructor
     */
    var FlashCard = function(){
        var group = globalWindow.group()
        var rect = globalWindow.rect(300, 200).fill('#fcd5ce').radius(10);
        group.add(rect);
        globalGroup.add(group);

        var term = globalWindow.text("Term").font({family: 'Verdana', anchor: 'middle'});
        term.center(rect.cx(), rect.cy());
        group.add(term);

        var definition = globalWindow.text(function(add) {
            add.tspan('Lorem ipsum lorem ipsum').newLine().font({family: 'Verdana'});
            add.tspan('Lorem ipsum lorem ipsum').newLine().font({family: 'Verdana'});
        })

        definition.center(rect.cx(), rect.cy());
        group.add(definition);
        definition.hide();

        var isFlipped = false;

        rect.click(function(event){
            if (isFlipped === false) {
                this.fill({ color: '#fec89a'});
                term.hide();
                definition.show();
                isFlipped = true;
            }
            else {
                this.fill({ color: '#fcd5ce'});
                definition.hide();
                term.show();
                isFlipped = false;
            }
        })

        return {
            /**
             * Moves the flash card to a specific (x, y) coordinate in the window.
             *
             * @memberOf MyToolkit.FlashCard
             * @function move
             * @inner
             * @param {Number} x The desired x coordinate of the flash card.
             * @param {Number} y The desired y coordinate of the flash card.
             */
            move: function(x, y){
                group.move(x, y);
            },
            /**
             * Sets the front-facing term of the flash card.
             *
             * @memberOf MyToolkit.FlashCard
             * @function setTerm
             * @inner
             * @param {String} string The term, limited to 25 characters.
             */
            setTerm: function(string){
                term.text(string.substring(0, 26))
            },
            /**
             * Sets the back-facing definition of the flash card.
             *
             * @memberOf MyToolkit.FlashCard
             * @function setDefinition
             * @inner
             * @param {String} string The definition, limited to 50 characters.
             */
            setDefinition: function(string){
                var lastSpace1 = string.substring(0, 24).lastIndexOf(" ");
                definition.children()[0].text(string.substring(0, lastSpace1));
                definition.children()[1].text(string.substring(lastSpace1 + 1, 49))
            }
        }
    }

    return {Window, Button, Checkbox, RadioGroup, TextBox, ScrollBar, ProgressBar, FlashCard}

}());

export{MyToolkit}