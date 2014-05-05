var charge_a = new ES.Electron(new ES.Vector(0.0,0.0,0.0));
var charge_b = new ES.Electron(new ES.Vector(0.1,-0.05,0.0));
var charge_c = new ES.PointCharge(1, ES.elementary_charge, new ES.Vector(0.05,0.1,0.0));

var universe = new ES.Universe();
universe.add(charge_a);
universe.add(charge_b);
universe.add(charge_c);

var scale = 1000;

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
    }).attr("r", 5);
}
updatePosition();

var interval = setInterval(function(){
    universe.step(); updatePosition();
},10);
