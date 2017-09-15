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
    plain1: new Map('plain1', stonesMap.plain1, {x: 2, y: 0}),
    home1: null,
}
Maps.plain1.reOpen = function () {
    //init obj map
    this.initObjsTileMap(this.stoneMap);

    //render
    this.render();

    //set current map
    map = this;
}
Maps.plain1.render = function () {
    this.map = game.add.tilemap('tile_map');

    // link loaded tileset image to map
    this.map.addTilesetImage('west_rpg', 'tiles1');
    this.map.addTilesetImage('the_man_set', 'tiles2');

    // create laye for said tileset and map now!
    this.layer_glass = this.map.createLayer('glass');
    this.layer_lava = this.map.createLayer('lava');
    this.layer_bridge = this.map.createLayer('bridge');
    this.layer_lives = game.add.group();//player in
    this.layer_objs = this.map.createLayer('objs');
}
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
Maps.plain1.initObjsTileMap = function (stoneMap) {
    var obj_tile_map = Map.prototype.initObjsTileMap.call(this,stoneMap,25,25,function (num) {
        var result = {isStone:false,encounterChance:0};
        if(num == 1){
            result.isStone = true;
        }else if(num == 2){//草地怪物
            result.encounterChance = 30;
            result.enemies = [];//初始化可刷怪物列表
        }
        return result;
    })
    this.obj_tile_map = obj_tile_map;
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
    player.tile.texture.x = nextTile.worldX;
    player.tile.texture.y = nextTile.worldY;

    //encounter enemies
    this.encounter(nextX,nextY);

    return true;
}
Maps.plain1.encounter = function (x,y) {
    var tile = this.obj_tile_map[x][y];
    if(tile.encounterChance <= 0)return;
    var rand = Math.floor(Math.random()*100);
    console.info('摇到概率为'+rand);
    if(rand < tile.encounterChance){
        fightState.reOpen(['你爸爸']);
    }
}