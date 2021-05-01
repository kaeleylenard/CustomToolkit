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

    return {Button, Checkbox}

}());

export{MyToolkit}