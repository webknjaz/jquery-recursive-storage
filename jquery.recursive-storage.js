/**
 * Recursive Storage
 * 
 * The idea of recursive storage was born at #KyivHack 2012 event (at #Ciklum). 
 * First drafts were written then. It was almost finished at #DOUhack event 
 * (in #Lviv at #GlobalLogic). After, I was making some small enhancements when 
 * I had free time (at #PortaOne). At Sep 30, 2012 it was published on GitHub.
 * 
 * 
 * @name Recursive Storage
 * @cat Plugins/Storage
 * @copyright: (c) 2012, #DOUhack #Lviv #GlobalLogic (August, 25th-26th) & #KyivHack #Ciklum (July, 14th-15th)
 * @author: Svyatoslav Sydorenko
 * @version: 1.0.2
 * @url http://webknjaz.com/code/jquery-recursive-storage/
 * @license: GNU/GPL v3
 * @license: MIT
 * @depends on: JQuery and $.totalStorage plugin
 * @TODO: $.storage.purge() or clearall
 * @TODO: $.storage.rm() or delete
 * @TODO: $.storage.regex() or findall
 * @TODO: $.storage.sed() or replace
 * 
 * 
 * USAGE:
 * 
 * @desc assuming there is following entry in localStorage:
 * @desc test     |   {'ololo': 100500, 'tmp': {'sdf': 'ololo', 'k': 'v'}}
 * @example $.storage.get('test.tmp.k')
 * @desc will return "v"
 * 
 * @example $.storage.set('test.tmp.foo': 'bar')
 * @desc will change previous to
 * @desc test     |   {'ololo': 100500, 'tmp': {'sdf': 'ololo', 'k': 'v', 'foo': 'bar'}}
 * 
 * @example $.storage.inc('test.ololo', 100500)
 * @desc will change previous to
 * @desc test     |   {'ololo': 201000, 'tmp': {'sdf': 'ololo', 'k': 'v', 'foo': 'bar'}}
 * 
 * jquery.recursive-storage.js
 * 
 * vim: set sw=2 sts=2 ts=8 et syntax=javascript:
 */

;(function($) {

    if (typeof $.totalStorage == 'undefined' || $.totalStorage == null)
        console.log('$.totalStorage is not defined. jquery-total-storage plugin is a strict requirement.')

    /* Make the methods public */

    $.storage = {
            'version': '1.0.2',
            'author': 'webknjaz',
            'get': function(path) {
                // First, we split subobjects' names from path.
                var spath = path.split('.');
                
                // It should not be empty.
                if (spath.length < 1)
                    return null;
                
                // Assuming Local Storage is a key-value
                // database we should extract the main
                // key.
                var res = $.totalStorage(spath.shift());
                
                if (typeof(res) === 'undefined')
                    return null;
                
                if (spath.length < 1)
                    return res;
                
                // Following given path recursively.
                while (typeof(p = spath.shift()) !== 'undefined')
                {
                    // Path validation hotfix#1
                    if (typeof(res) === 'undefined' || res === null)
                        return null;
                    res = res[p];
                    // Path validation hotfix#2
                    if (typeof(res) === 'undefined')
                        return null;
                }
                
                // No comments.
                return res;
            },
            'set': function(path, value) {
                // Doing same actions as usual.
                var spath = path.split('.');
                var key = spath.shift();
                // Checking the main key value.
                var val = $.totalStorage(key);
                
                // Trying to perform basic input validation.
                if (typeof(val) === 'number' && val >= 10000000000000000)
                    throw new Error('Out of range');
                
                var v = value;

                // Packing given value into an object.
                while (typeof(p = spath.pop()) !== 'undefined')
                {
                    var tmp = v;
                    v = {};
                    v[p] = tmp;
                }
                
                // Extending it with exsiting one. This 
                // action performs 'putting' into right 
                // tree branch. (defined by path)
                val = $.extend(true, {}, val, v);
                
                // No comments.
                $.totalStorage(key, val);
            },
            'inc': function(path, inc) {
                // Converting inc value/type into a number.
                switch (typeof(inc))
                {
                    case 'undefined':
                        inc = 1;
                        break;
                    case 'number':
                        break;
                    default:
                        if (inc == null)
                            inc = 0;
                        else
                            inc = parseInt(inc);
                }

                // Getting previous value. It should also 
                // be a number.
                var prev = $.storage.get(path);
                switch (typeof(prev))
                {
                    case 'undefined':
                        prev = 0;
                        break;
                    case 'number':
                        break;
                    default:
                        if (prev == null)
                            prev = 0;
                        else
                            prev = parseInt(prev);
                }
                
                // Making what it is designed for ^_^
                var res = prev + inc;
                
                // If serialized number is stringified in 
                // Ne+M from. This check performs another 
                // basic validation.
                if (res == prev)
                    throw new Error('Out of range');

                // No comments.
                $.storage.set(path, res);
            }
    };
})(jQuery);