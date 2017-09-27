'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
function $Promise(executor) {
    if (typeof executor !== 'function') throw new TypeError('/executor.+function/i');

    this._state = 'pending';
    this._value = {};
    console.log(this)	 
   
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(data) {
    // let args = [].slice.call(arguments)
    // console.log(data);
    // console.log('our args', args);
    // console.log('our this from _resolve', this);

    if (this._state !== 'rejected' && this._state === 'pending') {
        this._value = data;
        this._state = 'fulfilled';
    }

};

$Promise.prototype._internalReject = function(reason) {
    if (this._state !== 'fulfilled' && this._state === 'pending') {
        this._value = reason;
        this._state = 'rejected';
    }
};


// let promise = new $Promise(function())




/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/