window.onload = function(){
    canv=document.getElementById("snake");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/10);
}
x_player=y_player=10;
grid_size=tile_count=20; 
x_food=y_food=15;
x_velocity=y_velocity=0; 
trail = [];
tail = 3;
high = 0;

function game(){
    x_player+=x_velocity;
    y_player+=y_velocity;
    if(x_player<0){
        x_player= tile_count-1;
    }
    if(x_player>tile_count-1){
        x_player=0;
    }
    if(y_player<0){
        y_player = tile_count-1;
    }
    if(y_player>tile_count-1){
        y_player = 0;
    }

    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++){
        ctx.fillRect(trail[i].x*grid_size, trail[i].y*grid_size, grid_size-2, grid_size-2); //trail[i].x/trail[i].y is x/y axis i.e location of head
        if(trail[i].x==x_player && trail[i].y==y_player){ //Restart of snake
            if(tail > high){
                high = tail-2;
            document.getElementById("high").innerHTML = high; //high score
            }
            tail = 2;
        }
    }

    trail.push({x:x_player, y:y_player});
    
    while(trail.length>tail){
        trail.shift();
    }

    document.getElementById("score").innerHTML = tail-2; //print the score
    
    if(x_food==x_player && y_food==y_player){
        tail++;
        x_food=Math.floor(Math.random()*tile_count);
        y_food=Math.floor(Math.random()*tile_count);
    }
    
    ctx.fillStyle="blue";
    ctx.fillRect(x_food*grid_size, y_food*grid_size, grid_size-2, grid_size-2);

}
function keyPush(evt){
    switch (evt.keyCode){
        case 37:
             x_velocity=-1;y_velocity=0;
                 break;
        case 38: 
             x_velocity=0;y_velocity=-1;
                 break;  
        case 39: 
             x_velocity=1;y_velocity=0;
                 break; 
        case 40: 
            x_velocity=0;y_velocity=1;
                 break;      
    }
     
}