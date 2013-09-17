WOD
=========

wod is a node.js module to generate a CrossFit Workout Of the Day (WOD)

Keynote
-------

Get a random WOD from 16 WODs categories:

* 	Weightlifting
*   Endurance
*   Bodyweight
*   AMRAP...

Based on the awesome 5.071 unique WODs of <a href="http://www.wodshop.org/wods.html">THEWODSHOP</a>.
This is not sponsored, supported, or affiliated with THEWODSHOP.

Installation
------------

You can install `wod` and its dependencies with npm: 

`npm install wod`.


Usage
-----
	var wod = require('wod');	

	// Generate a random WOD from all workouts
	wod.getone(function(err,workouts){
		if (err) console.log(err);
		var random_wod = workouts[0];
		console.log(random_wod);
	});
	
	// Generate a list of random WODs from input categories
	var wodsCat = ['weightlifting','bodyweight','emotm'];
	wod.random(function(err,workouts){
		if (err) console.log(err);
		for(var i=0;i<workouts.length;i++)
			console.log(workouts[i]);
	});

Methods
-------

	wod.random([categories], callback);
	wod.getone(callback);

With 

* `categories`, optional, array containing list of WODs categories
* `callback` with error return and WODs results.

 
Callback receives `(error, response)`.


Running tests
-------------

To run the tests under node you will need `mocha` and `should` installed (it's listed as a
`devDependencies` so `npm install` from the checkout should be enough), then do

    $ npm test

Project status
--------------
wod is currently maintained by Yassine Azzout.


Authors and contributors
------------------------
### Current
* [Yassine Azzout][] (Creator, Building keeper)

[Yassine Azzout]: http://www.92bondstreet.com


License
-------
[MIT license](http://www.opensource.org/licenses/Mit)
