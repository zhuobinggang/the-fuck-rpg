/**
 * Created by zhuo on 2017/9/13.
 */
function Map(name, stoneMap, playerPosition) {
    this.name = name || "无名地图";
    this.stoneMap = stoneMap || [0];
    this.playerPosition = playerPosition || {x: 0, y: 0};
    this.map = null;
}
Map.prototype.init = function () {
    console.info('Map:' + this.name + '准备初始化');
}

var Maps = {
    plain1: new Map('plain1', stonesMap.plain1, {x: 2, y: 0}),
}
Maps.plain1.reOpen = function () {
    this.map = game.add.tilemap('tile_map');

    // link loaded tileset image to map
    this.map.addTilesetImage('west_rpg', 'tiles1');
    this.map.addTilesetImage('the_man_set', 'tiles2');

    // create laye for said tileset and map now!
    this.layer_glass = this.map.createLayer('glass');
    this.layer_lava = this.map.createLayer('lava');
    this.layer_bridge = this.map.createLayer('bridge');
    this.layer_lives = this.map.createLayer('lives');
    this.layer_objs = this.map.createLayer('objs');

    //init obj map
    this.initObjsTileMap();

    //set current map
    map = this;
}
Maps.plain1.getPlayerTile = function () {
    return this.map.getTile(2, 0, this.layer_lives);
}
Maps.plain1.resizeWorld = function () {
    this.layer_lives.resizeWorld();
}
Maps.plain1.initObjsTileMap = function () {
    this.obj_tile_map = [];
    for (var i = this.map.height - 1; i >= 0; i--) {
        this.obj_tile_map[i] = [];
    }

    function stoneInit(row, col) {
        var me = Maps.plain1;
        // console.info('col: ' + col + ' row: ' + row);
        if (!me.obj_tile_map[row][col]) {
            me.obj_tile_map[row][col] = {};
        }
        me.obj_tile_map[row][col].isStone = true;
    }

    for (var i = this.stoneMap.length - 1; i >= 0; i--) {
        if (this.stoneMap[i] === 0)continue;
        var col = i % this.map.width;
        var row = Math.floor(i / this.map.width);
        // console.info('col: ' + col + ' row: ' + row);
        stoneInit(col, row);
    }
}
Maps.plain1.checkStone = function (x, y) {

}
Maps.plain1.playerGoTo = function (offsetX, offsetY) {
    var nextX = player.tile.x + offsetX;
    if (nextX < 0 || nextX >= this.map.width)return false;

    var nextY = player.tile.y + offsetY;
    if (nextY < 0 || nextY >= this.map.height)return false;

    //check stone
    if (this.obj_tile_map[nextX][nextY] && this.obj_tile_map[nextX][nextY].isStone)return false;

    //move
    var tile = this.map.putTile(player.tile, nextX, nextY, this.layer_lives);
    this.map.putTile(null, player.tile.x, player.tile.y, this.layer_lives);//remove
    player.tile = tile;

    return true;
}