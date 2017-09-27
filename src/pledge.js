'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
// function isPending(state){
//     return this._state = 'pending'
// }
function isFn(thing){
    return typeof thing === "function";
}
function $Promise(executor) {
    if (typeof executor !== 'function') throw new TypeError('/executor.+function/i');

    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = []

    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._settle =function(newState, newValue){
    if (this._state === 'pending') {
        this._state = newState;
        this._value = newValue;
    };
    this._callHandlers();
}


$Promise.prototype._internalResolve = function(data) {
    this._settle('fulfilled', data)
};

$Promise.prototype._internalReject = function(reason) {
    this._settle('rejected', reason)
};

$Promise.prototype.then = function(successCb, errorCb) {
    this._handlerGroups.push({
        successCb: isFn(successCb) ? successCb : null ,
        errorCb: isFn(errorCb) ? errorCb : null  });

    this._callHandlers();
};

$Promise.prototype._callHandlers = function(){
    if(this._state === 'pending') return;
    let cbType = this._state === 'fulfilled' ? 'successCb' : 'errorCb';
    this._handlerGroups.forEach(handlerGroup=>{
        if(handlerGroup[cbType]) handlerGroup[cbType](this._value);
    });
    this._handlerGroups = [];
};

$Promise.prototype.catch = function (errorCb) {
    this.then(null, errorCB)
};



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/