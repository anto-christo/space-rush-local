var universe = new Phaser.Game(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.CANVAS);

var game = function(){
    console.log("running!!!");
}

game.prototype = {
    preload:preload,
    create:create,
    update:update
};

universe.state.add('game',game);
universe.state.start('game');

var pl = [];
var st = [];
var randX, randY, l=150, h=60;
var rocket;
var fuel,bmd,background, k = 0;

//-------------------------------------------------------------------------------------------------------------------------------------------
function preload(){

     universe.load.image('pn1','img/planet1.png');
     // universe.load.image('pn2','img/planet2.png');
     // universe.load.image('pn3','img/planet3.png');
     // universe.load.image('pn4','img/planet4.png');
     // universe.load.image('pn5','img/planet5.png');
     // universe.load.image('pn6','img/planet6.png');
     // universe.load.image('pn7','img/planet7.png');
     // universe.load.image('pn8','img/planet10.png');
     // universe.load.image('pn9','img/planet11.png');
     // universe.load.image('pn10','img/planet12.png');
     // universe.load.image('pn11','img/planet13.png');
     // universe.load.image('pn12','img/planet14.png');
     // universe.load.image('pn13','img/planet15.png');
     // universe.load.image('pn14','img/planet16.png');
     // universe.load.image('pn15','img/planet17.png');
     // universe.load.image('pn16','img/planet18.png');
     // universe.load.image('pn17','img/planet19.png');
     // universe.load.image('pn18','img/planet20.png');
     universe.load.image('star','img/light.png');
     universe.load.image('bg','img/space_bg.jpg');
     universe.load.image('ship','img/spaceship.png');
}


//-------------------------------------------------------------------------------------------------------------------------------
function create(){
     background = universe.add.tileSprite(0, 0, 1365, 625, 'bg');


     universe.physics.startSystem(Phaser.Physics.ARCADE);
     

     rocket = universe.add.sprite(100, 100, 'ship');
     rocket.scale.setTo(0.25,0.25);
     universe.physics.arcade.enable(rocket);
     rocket.body.collideWorldBounds = true;
     rocket.body.drag.set(1000);
     rocket.body.maxVelocity.set(300);
     rocket.anchor.set(0.5);
     
//-------------------------------------------------------------------------------------------------------------------

    
     star = universe.add.group();
     star.enableBody = true;

     for(var i=0;i<100;i++){
            randX = 1200+Math.floor(Math.random()*100);
            randY = 100+Math.floor(Math.random()*400);
            st[i] = star.create(randX + k, randY, 'star');
            st[i].scale.setTo(0.5, 0.5);
            k+=1000;
     }

      planets = universe.add.group();
     planets.enableBody = true;

     for(var i=0;i<400;i++){

        pl[i] = planets.create(1000 + Math.cos(0), 300 + Math.sin(0), 'pn1');

        if(i%4==0){
            l=150;
            h=60;
        }

        var r;
        r = Math.random()*h+l; 
        var s;
        s = Math.random()*1+0.5;

        var temp = Math.round(Math.random()*1);

        if(temp == 0)
            pl[i].dir = -1;

        else
            pl[i].dir = 1;

        pl[i].radius = r;

        l=l+h+20;

        pl[i].speed = s;
        pl[i].angle = 0;
        pl[i].scale.setTo(0.18,0.18);

        pl[i].body.immovable = true;
        
     }

     cursors = universe.input.keyboard.createCursorKeys();
     ctrl = universe.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

}


//--------------------------------------------------------------------------------------------------------------------
function update(){

    var i,j,q=0;

    for(i=0;i<100;i++){
        for(j=q;j<q+4;j++){
            pl[j].x = st[i].position.x + Math.cos(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            pl[j].y = st[i].position.y + Math.sin(pl[j].angle+=pl[j].dir*pl[j].speed/150)*pl[j].radius;
            st[i].body.velocity.x = -250;
        }
        q=j;
    }

    

    if (cursors.up.isDown)
    {
        universe.physics.arcade.accelerationFromRotation(rocket.rotation, 300, rocket.body.acceleration);
    }
    else if(cursors.down.isDown)
    {
        universe.physics.arcade.accelerationFromRotation(rocket.rotation, -300, rocket.body.acceleration);
    }
    else
    {
        rocket.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        rocket.body.angularVelocity = -100;
    }

    else if (cursors.right.isDown)
    {
        rocket.body.angularVelocity = 100;
    }

    else
    {
        rocket.body.angularVelocity = 0;
    }
    

       universe.physics.arcade.overlap(rocket, planets);

}
//---------------------------------------------------------------------------------------------------------------------------

