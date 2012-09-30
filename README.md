Recursive Storage
====================

## What is a Recursive Storage?
 
 It's a plugin for JQuery to store and access objects in a good way. Using it you may 
 simplify storing any typed objects. Subobjects are accessible via their own period-
 seperated pathes.
 
## Some examples  
 * @desc assuming there is following entry in localStorage:
	test     |   {'ololo': 100500, 'tmp': {'sdf': 'ololo', 'k': 'v'}}
 * @example $.storage.get('test.tmp.k')
 * @desc will return "v"

 * @example $.storage.set('test.tmp.foo': 'bar')
 * @desc will change previous to
	test     |   {'ololo': 100500, 'tmp': {'sdf': 'ololo', 'k': 'v', 'foo': 'bar'}}

 * @example $.storage.inc('test.ololo', 100500)
 * @desc will change previous to
	test     |   {'ololo': 201000, 'tmp': {'sdf': 'ololo', 'k': 'v', 'foo': 'bar'}}

## The stats:
 * @name $.storage
 * @cat Plugins/Storage
 * @author Svyatoslav Sydorenko
 * @version: 1.0.2
 * @url http://webknjaz.com/code/jquery-recursive-storage/
 
## Some background:
### Why?

I was inspired by $.totalStorage plugin, but it doesn't implement the whole 
functionality I need. So, I've found a solution.

### Lots of thanks to:
Jared Novack who had written $.totalStorage. His plugin provides ability to store 
serialized objects on client side (using localStorage or cookies depending on browser). 
Also thanks to my DOU Hackaton team co-members (#douhack #11 in Lviv) — 
@zasadnyy (Vitaliy Zasadnyy), @g3d (Bohdan Viter) and @vessi (Mykhaylo Bortnyk).