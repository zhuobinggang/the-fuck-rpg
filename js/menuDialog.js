/**
 * Created by zhuo on 2017/9/3.
 */
var menuDialog = new ListBox(5);
menuDialog.textGroup = null;
menuDialog.font = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
menuDialog.init = function () {
    menuDialog.textGroup = game.add.group();
    menuDialog.textGroup.visible = false;

    menuDialog.list.push(roleDialog.getMenuItem());
    menuDialog.list.push(itemDialog.getMenuItem());

    menuDialog.thePointer = 0;
    menuDialog.displayListStart = 0;
    menuDialog.maxDisplayLength = 5;

    //init display list
    menuDialog.displayList = menuDialog.list.slice(0, 5);
};
menuDialog.render = function () {
    var style = menuDialog.font;

    menuDialog.textGroup.removeAll();
    (function updateTexts() {
        var list = menuDialog.displayList;
        for (var i = list.length - 1; i >= 0; i--) {
            var text = game.add.text(0, 0, list[i].name, style);
            text.setTextBounds(0, i * 100, 500, 100);
            text.fixedToCamera = true;
            menuDialog.textGroup.add(text);
        }
    })();

    var barY = (menuDialog.thePointer - menuDialog.displayListStart) * 100;
    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, barY, 500, 100);
    bar.fixedToCamera = true;
    menuDialog.textGroup.add(bar);
};

menuDialog.reOpen = function () {
    menuDialog.render();
    menuDialog.setVisible(true);
};
menuDialog.setVisible = function (visible) {
    menuDialog.textGroup.visible = visible;
};
menuDialog.goUp = function () {
    menuDialog.thePointer--;
    menuDialog.displayListUpdate();
    menuDialog.render();
};
menuDialog.goDown = function () {
    menuDialog.thePointer++;
    menuDialog.displayListUpdate();
    menuDialog.render();
};
menuDialog.aDown = function () {
    //click OK
    var selected = menuDialog.getSelectedItem();
    console.info('selected item=' + selected.name);
    selected.aDown();
};
menuDialog.bDown = function () {
    menuDialog.dialogClose();
};
menuDialog.dialogClose = function () {
    menuDialog.setVisible(false);
    currentCustomState = mainState;
};
