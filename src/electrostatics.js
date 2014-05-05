(function(){
    ES = {
        objects: [],
        k: 8.99*Math.pow(10,9),
        electron_mass: 9.11*Math.pow(10,-31),
        elementary_charge: 1.602176487*Math.pow(10,-19)
    };
    // ES.Vector utility class.
    function Vector(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.prototype.add = function(){
        if(arguments.length==3){
            this.x += arguments[0];
            this.y += arguments[1];
            this.z += arguments[2];
        } else {
            var vec = arguments[0];
            this.x += vec.x;
            this.y += vec.y;
            this.z += vec.z;
        }
        return this;
    }
    Vector.prototype.subtract = function(){
        if(arguments.length==3){
            this.x -= arguments[0];
            this.y -= arguments[1];
            this.z -= arguments[2];
        } else {
            var vec = arguments[0];
            this.x -= vec.x;
            this.y -= vec.y;
            this.z -= vec.z;
        }
        return this;
    }
    Vector.prototype.multiply = function(scalar){
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    Vector.prototype.dot = function(vec){
        return (this.x*vec.x + this.y*vec.y + this.z*vec.z);
    }
    Vector.prototype.magnitude = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    Vector.prototype.normalize = function(){
        this.multiply(1/this.magnitude());
        return this;
    }
    Vector.prototype.clone = function(){
        return new Vector(this.x, this.y, this.z);
    }
    // Convenience function
    Vector.prototype.distance = function(vec){
        return this.clone().subtract(vec).magnitude();
    }
    ES.Vector = Vector

    // ES.PointCharge
    function PointCharge(mass, charge, position, velocity, static){
        this.mass = mass;
        this.charge = charge || 0;
        this.position = position || new Vector(0,0,0);
        this.velocity = velocity || new Vector(0,0,0);
        this.static = static || false;
        self.type = "PointCharge"
    }
    PointCharge.prototype.force = function(other){
        if(other.constructor.name == "PointCharge"){
            return -ES.k * this.charge * other.charge /
                Math.pow(this.position.distance(other.position), 2);
        } else {
            throw "ERROR: Only can calculate force between PointCharges";
        }
    }
    PointCharge.prototype.forceVector = function(other){
        if(other.constructor.name == "PointCharge"){
            return other.position.clone().subtract(this.position).normalize()
                .multiply(this.force(other));
        }
    }
    PointCharge.prototype.accelerationVector = function(other){
        if(other.constructor.name == "PointCharge"){
            return this.forceVector(other).multiply(1/this.mass);
        }
    }
    ES.PointCharge = PointCharge;

    // ES.Electron - Helper function to create an electron.
    function Electron(position, velocity){
        return new PointCharge(ES.electron_mass, -ES.elementary_charge, position, velocity);
    }
    ES.Electron = Electron;

    // ES.Universe - Core of the engine
    function Universe(step_size){
        this.particles = [];
        this.step_size = step_size || 0.00001;
    }
    Universe.prototype.add = function(particle){
        this.particles.push(particle);
    }
    Universe.prototype.steps = function(steps){
        for(var i=0;i<steps;i++){
            this.step();
        }
    }
    Universe.prototype.step = function(){
        _.each(this.particles, function(particle){
            _.each(this.particles, function(particle2){
                if(particle != particle2){
                    var acceleration = particle.accelerationVector(particle2);
                    particle.velocity.add(acceleration.multiply(this.step_size));
                }
            }, this);
        }, this);
        // We have to wait until all of the velocities are calculated before moving the particles otherwise the distances get all screwed up.
        _.each(this.particles, function(particle){
            particle.position.add(particle.velocity.clone().multiply(this.step_size))
        }, this);
    }
    ES.Universe = Universe;

    window.ES = ES;
})();
