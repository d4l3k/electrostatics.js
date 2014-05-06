
var universe = new ES.Universe();
var size = 1;
for(var i=0;i< 100;i++){
    universe.add(new ES.PointCharge(ES.electron_mass, ES.elementary_charge * (Math.round(Math.random())*2-1),
        new ES.Vector(size*Math.random()-size/2,
            size*Math.random()-size/2,
            0
        ), new ES.Vector(0,0,0)
    ));
}

//universe.add( new ES.Electron(new ES.Vector(0.0,0.0,0.0)));
//universe.add( new ES.Electron(new ES.Vector(0.1,-0.05,0.0)));

//universe.add( new ES.PointCharge(1, ES.elementary_charge*10, new ES.Vector(0.0,0.0,0.0)));

var scale = 500;

var svg = d3.select("svg");
var circles = svg.selectAll("circle")
    .data(universe.particles)
    .enter()
    .append("circle");
function updatePosition(){
    circles.attr("cx", function(d, i){
        return d.position.x*scale+window.innerWidth/2;
    }).attr("cy", function(d, i){
        return d.position.y*scale+window.innerHeight/2;
    }).attr("r", function(d, i){
        return d.position.z*20+10;
    }).attr("fill", function(d, i){
        return d.charge > 0 ? "red" : "blue";
    });
}

var render_loop = function(){
    universe.steps(1); updatePosition();
    requestAnimationFrame(render_loop);
}
render_loop();
