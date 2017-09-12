/**
 * Created by zhuo on 2017/9/11.
 */
var roleDialog = new ListBox(5);
roleDialog.group = null;
roleDialog.init = function () {
    roleDialog.group = game.add.group();
    // roleDialog.list.push(Items.stick,Items.egg);
    //从用户背包初始化
    roleDialog.list = player.equipmentList;
    roleDialog.displayList = roleDialog.list.slice(roleDialog.thePointer, roleDialog.maxDisplayLength);
}
roleDialog.reOpen = function () {
    //重新更新显示位置
    roleDialog.thePointer = 0;
    roleDialog.displayListStart = 0;
    roleDialog.list = player.equipmentList;
    roleDialog.displayList = roleDialog.list.slice(roleDialog.thePointer, roleDialog.maxDisplayLength);

    //state change
    currentCustomState = roleDialog;
    menuDialog.setVisible(false);
    roleDialog.setVisible(true);
    roleDialog.render();
}
roleDialog.render = function () {
    var style = menuDialog.font;
    roleDialog.group.removeAll();

    function showUICorrect(ui) {
        ui.fixedToCamera = true;
        roleDialog.group.add(ui);
    }

    (function renderPlayerStatus() {
        var padding = 50;
        var text = game.add.text(0, 0, '生命上限\t' + player.maxHealth, style);
        text.setTextBounds(0, 0 * padding, 250, padding);
        showUICorrect(text);
        text = game.add.text(0, 0, '生命值\t' + player.health, style);
        text.setTextBounds(0, 1 * padding, 250, padding);
        showUICorrect(text);
        text = game.add.text(0, 0, '力量\t' + player.pysicPower, style);
        text.setTextBounds(0, 2 * padding, 250, padding);
        showUICorrect(text);
        text = game.add.text(0, 0, '魔力\t' + player.magicPower, style);
        text.setTextBounds(0, 3 * padding, 250, padding);
        showUICorrect(text);
        text = game.add.text(0, 0, '物防\t' + player.pysicDefense, style);
        text.setTextBounds(0, 4 * padding, 250, padding);
        showUICorrect(text);
        text = game.add.text(0, 0, '魔防\t' + player.magicDefense, style);
        text.setTextBounds(0, 5 * padding, 250, padding);
        showUICorrect(text);
    })();

    (function updateEquipments() {
        var list = roleDialog.displayList;
        for (var i = list.length - 1; i >= 0; i--) {
            var text = game.add.text(0, 0, list[i].name, style);
            text.setTextBounds(250, i * 100, 250, 100);
            showUICorrect(text);
        }
    })();

    var barY = (roleDialog.thePointer - roleDialog.displayListStart) * 100;
    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(250, barY, 250, 100);
    showUICorrect(bar);
}
roleDialog.setVisible = function (visible) {
    roleDialog.group.visible = visible;
}
roleDialog.close = function () {
    //change current custom state
    currentCustomState = menuDialog;
    roleDialog.setVisible(false);
    menuDialog.setVisible(true);
}
roleDialog.goDown = function () {
    roleDialog.thePointer++;
    roleDialog.displayListUpdate();
    roleDialog.render();
}
roleDialog.goUp = function () {
    roleDialog.thePointer--;
    roleDialog.displayListUpdate();
    roleDialog.render();
}
roleDialog.aDown = function () {
    // console.info('seleted item is:'+roleDialog.getSelectedItem().name);
    // var selected = roleDialog.getSelectedItem();
    // if (!selected)return;
    // itemShowDialog.reSetItem(selected);
    // itemShowDialog.reOpen();
}
roleDialog.bDown = function () {
    roleDialog.close();
}
roleDialog.getMenuItem = function () {
    return {
        name: '角色',
        aDown: roleDialog.reOpen,
    }
}
