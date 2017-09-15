/**
 * Created by zhuo on 2017/9/13.
 */

var fightState = new ListBox();
fightState.enemies = [];
fightState.fightLog = [];
fightState.lastState = mainState;//上一个场景
fightState.init = function () {
    fightState.list = [operItems.checkEnemies,operItems.use,operItems.skill,operItems.escape];
}
fightState.reOpen = function (enemies) {
    fightState.enemies = enemies || [];
    console.info('进入战斗！\n遭遇' + enemies.length + '个敌人!');
}


/**
 * 战斗系统
 */
var FightSystem = {
    
    onPlayerMove: function (test) {
        // console.info('player moved: '+test);

    }
}