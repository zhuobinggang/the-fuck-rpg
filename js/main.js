/**
 * Created by zhuo on 2017/9/1.
 */
var game;
var map;
var layer_glass;//the ground
var layer_lava;//the river,lava,stone
var layer_bridge;
var layer_lives;
var layer_objs;
var cursor;
var player;
var obj_tile_map;//all interactive objs
var currentCustomState;
var oper_cold_down_time = 20;
var current_cold_down_time = 20;

window.onload = function () {
    var config = {//the main state config
        preload: mainState.preload,
        create: mainState.create,
        render: mainState.render,
        update: update,
    }

    game = new Phaser.Game(500, 500, Phaser.AUTO, 'fuck');
    game.state.add('field', config);
    game.state.start('field');

    //init dialogs
    currentCustomState = mainState;
}
function update() {
    current_cold_down_time--;
    if (current_cold_down_time > 0)return;

    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        currentCustomState.goLeft();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        // console.log('D down');
        currentCustomState.goRight();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        currentCustomState.goUp();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        currentCustomState.goDown();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.J)) {
        currentCustomState.aDown();
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.K)) {
        currentCustomState.bDown();
    } else return;

    current_cold_down_time = oper_cold_down_time;
}
