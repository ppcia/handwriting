Function.prototype.bind = function(context){
    if(typeof this !== 'function'){
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }

    var self = this

    var args = Array.prototype.slice.call(arguments, 1)

    var fNOP = function(){}

    var fBound = function(){
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof FNOP ? this:context, args.concat(bindArgs))
    }

    FNOP.prototype = this.prototype
    fBound.prototype = new FNOP()
    return fBound
}