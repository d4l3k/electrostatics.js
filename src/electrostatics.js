(function(){
    ES = {
        objects: []
    };
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
    Vector.prototype.clone = function(){
        return new Vector(this.x, this.y, this.z);
    }
    ES.Vector = Vector




    window.ES = ES;
})();
