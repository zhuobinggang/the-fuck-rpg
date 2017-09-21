/**
 * Created by zhuo on 2017/9/1.
 */
var game;
var map;
var layer_glass;//the ground
var layer_lava;//the river,lava,stone
var currentMap;
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
    // var config = {//the main state config
    //     preload: mainState.preload,
    //     create: mainState.create,
    //     render: mainState.render,
    //     update: update,
    // }

    game = new Phaser.Game(500, 500, Phaser.AUTO, 'fuck');
    game.state.add('field', mainState);
    game.state.start('field');

    //init dialogs
    currentCustomState = mainState;
}
