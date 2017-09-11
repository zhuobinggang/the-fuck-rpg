/**
 * Created by zhuo on 2017/9/3.
 */

var itemDialog = new ListBox(5);
itemDialog.group = null;
itemDialog.init = function () {
    itemDialog.group = game.add.group();
    // itemDialog.list.push(Items.stick,Items.egg);
    //从用户背包初始化
    itemDialog.list = player.itemList;
    itemDialog.displayList = itemDialog.list.slice(itemDialog.thePointer,itemDialog.maxDisplayLength);
}
itemDialog.reOpen = function () {
    //重新更新显示位置
    itemDialog.thePointer = 0;
    itemDialog.displayListStart = 0;
    itemDialog.displayList = itemDialog.list.slice(itemDialog.thePointer,itemDialog.maxDisplayLength);

    currentCustomState = itemDialog;
    menuDialog.setVisible(false);
    itemDialog.setVisible(true);
    itemDialog.render();
}
itemDialog.render = function () {
    var style = menuDialog.font;

    itemDialog.group.removeAll();
    (function updateTexts() {
        var list = itemDialog.displayList;
        for (var i = list.length - 1; i >= 0; i--) {
            var text = game.add.text(0, 0, list[i].name, style);
            text.setTextBounds(0, i * 100, 500, 100);
            text.fixedToCamera = true;
            itemDialog.group.add(text);
        }
    })();

    var barY = (itemDialog.thePointer - itemDialog.displayListStart) * 100;
    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, barY, 500, 100);
    bar.fixedToCamera = true;
    itemDialog.group.add(bar);
}
itemDialog.setVisible = function (visible) {
    itemDialog.group.visible = visible;
}
itemDialog.close = function () {
    //change current custom state
    currentCustomState = menuDialog;
    itemDialog.setVisible(false);
    menuDialog.setVisible(true);
}
itemDialog.goDown = function () {
    itemDialog.thePointer ++;
    itemDialog.displayListUpdate();
    itemDialog.render();
}
itemDialog.goUp = function () {
    itemDialog.thePointer --;
    itemDialog.displayListUpdate();
    itemDialog.render();
}
itemDialog.aDown = function () {
    // console.info('seleted item is:'+itemDialog.getSelectedItem().name);
    var selected = itemDialog.getSelectedItem();
    if(! selected)return;
    itemShowDialog.reSetItem(selected);
    itemShowDialog.reOpen();
}
itemDialog.bDown = function () {
    itemDialog.close();
}
itemDialog.getMenuItem = function () {
    return {
        name: '道具',
        aDown: itemDialog.reOpen,
    }
}

/**
 * Created by zhuo on 2017/9/5.
 */
var itemShowDialog = new ListBox(5);
itemShowDialog.group = null;
itemShowDialog.currentItem = Items.excalibur;
itemShowDialog.descFont = {font: "bold 22px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"};
itemShowDialog.rightFont = {font: "bold 22px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

itemShowDialog.init = function () {
    itemShowDialog.group = game.add.group();
    itemShowDialog.list = itemShowDialog.currentItem.opers.slice();
    itemShowDialog.displayList = itemShowDialog.list.slice(itemShowDialog.thePointer,itemShowDialog.maxDisplayLength);
}
itemShowDialog.reSetItem = function (item) {
    itemShowDialog.currentItem = item || Items.excalibur;
    itemShowDialog.list = itemShowDialog.currentItem.opers.slice();
    itemShowDialog.thePointer = 0;
    itemShowDialog.displayListStart = 0;
    itemShowDialog.displayList = itemShowDialog.list.slice(itemShowDialog.thePointer,itemShowDialog.maxDisplayLength);
}
itemShowDialog.reOpen = function (item) {
    currentCustomState = itemShowDialog;
    itemDialog.setVisible(false);
    itemShowDialog.setVisible(true);
    itemShowDialog.render();
}
itemShowDialog.render = function () {
    itemShowDialog.group.removeAll();

    var leftStyle = itemShowDialog.descFont;
    var rightStyle = itemShowDialog.rightFont;

    //黑框
    // game.add.graphics().beginFill(0x000000,1).drawRect(0,0,500,500);

    //左边描述栏
    var desc = game.add.text(0,0,itemShowDialog.currentItem.desc,leftStyle);
    desc.setTextBounds(0,0,250,250);
    desc.fixedToCamera = true;
    itemShowDialog.group.add(desc);

    //右边选择栏
    (function updateTexts() {
        var list = itemShowDialog.displayList;
        for (var i = list.length - 1; i >= 0; i--) {
            var text = game.add.text(0, 0, list[i].name, rightStyle);
            text.setTextBounds(250, i * 100, 250, 100);
            text.fixedToCamera = true;
            itemShowDialog.group.add(text);
        }
    })();

    var barY = (itemShowDialog.thePointer - itemShowDialog.displayListStart) * 100;
    var bar = game.add.graphics();
    bar.beginFill(0xFFFFFF, 0.2);
    bar.drawRect(250, barY, 250, 100);
    bar.fixedToCamera = true;
    itemShowDialog.group.add(bar);
}
itemShowDialog.setVisible = function (visible) {
    itemShowDialog.group.visible = visible;
}
itemShowDialog.close = function () {
    //change current custom state
    currentCustomState = itemDialog;
    itemShowDialog.setVisible(false);
    itemDialog.setVisible(true);
}
itemShowDialog.goDown = function () {
    itemShowDialog.thePointer ++;
    itemShowDialog.displayListUpdate();
    itemShowDialog.render();
}
itemShowDialog.goUp = function () {
    itemShowDialog.thePointer --;
    itemShowDialog.displayListUpdate();
    itemShowDialog.render();
}
itemShowDialog.aDown = function () {
    var selected = itemShowDialog.getSelectedItem();
    if(! selected)return;
    selected.confirm(itemShowDialog.currentItem,player,player);

    currentCustomState = mainState;
    itemShowDialog.setVisible(false);
}
itemShowDialog.bDown = function () {
    itemShowDialog.close();
}
