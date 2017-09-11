/**
 * Created by zhuo on 2017/9/4.
 */
class ListBox {
    constructor(maxLength) {
        maxLength = maxLength || 5;
        this.list = [];
        this.displayList = [];
        this.thePointer = 0;
        this.displayListStart = 0;
        this.maxDisplayLength = maxLength;
    }

    displayListUpdate() {
        var max = this.maxDisplayLength;
        var start = this.displayListStart;
        var end = start + max;

        //fix pointer
        if(this.list.length == 0){
            this.thePointer = 0;
        } else if (this.thePointer < 0) {
            this.thePointer = 0;
        } else if (this.thePointer >= this.list.length) {
            this.thePointer = this.list.length - 1;
        }

        //fix display list
        if (this.thePointer < start) {
            this.displayListStart = this.thePointer;
        } else if (this.thePointer >= end) {
            this.displayListStart = this.thePointer - max + 1;
        } else {
            return;//display true
        }
        var newStart = this.displayListStart;
        this.displayList = this.list.slice(newStart, newStart + max);
    }

    init(){

    }

    goLeft() {
    };

    goRight() {
    };

    goUp() {
        this.thePointer--;
        this.displayListUpdate();
    };

    goDown() {
        this.thePointer++;
        this.displayListUpdate();
    };

    aDown() {
    };

    bDown() {
    };

    getSelectedItem(){
        var selected = this.list[this.thePointer - this.displayListStart];
        return selected;
    };
}