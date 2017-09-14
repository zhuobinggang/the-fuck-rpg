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
Map.prototype.initObjsTileMap = function (numMap,height,width,cb) {
    var obj_tile_map = [];
    for (var i = height - 1; i >= 0; i--) {
        obj_tile_map[i] = [];
    }

    for(var i = numMap.length - 1;i>=0;i--){
        var col = i % width;
        var row = Math.floor(i / width);
        obj_tile_map[col][row] = cb(numMap[i]);
    }

    return obj_tile_map;
}

var Maps = {
    plain1: new Map('plain1', stonesMap.plain1, {x: 4, y: 0}),
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
    // this.layer_lives = this.map.createLayer('lives');
    this.layer_lives = game.add.group();
    this.layer_objs = this.map.createLayer('objs');

    //init obj map
    this.initObjsTileMap();

    //set current map
    map = this;
}
// Maps.plain1.getPlayerTile = function () {
//     return this.map.getTile(2, 0, this.layer_lives);
// }
Maps.plain1.getPlayerTile = function () {
    var x = this.playerPosition.x;
    var y = this.playerPosition.y;
    var tile = this.map.getTile(x,y);
    var texture = game.add.image(tile.worldX,tile.worldY,'GM',1);
    // this.layer_lives.addChild(texture);
    this.layer_lives.add(texture);
    return {
        x : x,
        y : y,
        texture: texture,
        changeFrame: function (frame) {
            player.tile.texture.frame = frame;
        }
    };
}
Maps.plain1.resizeWorld = function () {
    this.layer_bridge.resizeWorld();
}
Maps.plain1.initObjsTileMap = function () {
    var obj_tile_map = Map.prototype.initObjsTileMap.call(this,this.stoneMap,25,25,function (num) {
        if(num == 1)return {isStone:true};
        return {isStone:false};
    })
    this.obj_tile_map = obj_tile_map;
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

    //move : set player tile xy and texture
    player.tile.x = nextX;
    player.tile.y = nextY;
    var nextTile = this.map.getTile(nextX,nextY);
    // player.tile.texture.x = nextTile.worldX - game.camera.x;
    // player.tile.texture.y = nextTile.worldY - game.camera.y;

    player.tile.texture.x = nextTile.worldX;
    player.tile.texture.y = nextTile.worldY;

    return true;
}