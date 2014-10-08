(
  function() {
    var fs = require('fs');
    var async = require('async');
    var needle = require('needle');
    var random_ua = require('random-ua');
    var cheerio = require('cheerio');

    /*
     * 	Load wodshop.org JSON file definition
     */
    var wodShopJson = {};
    var all_categories = [];
    try {
      wodShopJson = JSON.parse(fs.readFileSync(__dirname + '/wodshop.json'));
      for (var key in wodShopJson)
        all_categories.push(key);
    } catch (e) {
      wodShopJson = {};
    }

    // wodshop JSON definition
    var wodshop = {
      json: wodShopJson,
      categories: all_categories,
      url: "http://94.76.238.50:8080/workout-service/getWod"
    }

    /*
     *	WOD Generator
     */
    var WodGenerator = {

      self_categories: [],
      self_callback: "",

      /**
       * Generate a random WOD for each input categories
       *
       * @method random
       * @param {Array} 		[categories]			List of WODs categories
       * @param {Function} 	callback				function
			 * @return {Boolean}
       */
      random: function(categories, callback) {

        // 0. (In)Valid arguments checkers
        if (arguments.length !== 1 && arguments.length !== 2)
          throw new Error('No valid args for random([categories], callback)');
        else {
          // init parameters
          var callback = WodGenerator.checkCallback(categories) ? categories : callback;
          var categories = WodGenerator.checkCallback(categories) ? [] : categories;

          // 0.1 Check parameters
          if (!WodGenerator.checkCallback(callback))
            throw new Error('No valid args for callback parameters | random([categories], callback)');
        }

        // 2. Success on args
        self_categories = categories;
        self_callback = callback;

        WodGenerator.generate();

        return true;
      },
      /**
       * Generate a random WOD
       *
       * @method random
       * @param {Function} 	callback				function
			 * @return {Boolean}
       */
      getone: function(callback) {

        WodGenerator.random(['the-hopper'], callback);
        return true;
      },
      generate: function() {

        var categories = [];
        if (self_categories.length === 0) {
          // get a random WOD for each categories
          categories = wodshop.categories;
        } else {
          // get a random WOD for input categories
          categories = self_categories;
        }

        async.map(categories, WodGenerator.asyncPostWodShop, WodGenerator.asyncWorkouts);
      },
      /**
       * Test callback function
       *
       * @method 				checkCallback
       * @param {Function} 	callback				function
			 * @return {Boolean}
       */
      checkCallback: function(callback) {

        if (callback && typeof(callback) === "function")
          return true;
        else
          return false;
      },
      /**
       * Call POST url for category
       *
       * @method 				asyncPostWodShop
       * @param {String} 		category				name
       * @param {Function} 	callback				function
			 * @return this
       */
      asyncPostWodShop: function(category, callback) {

        var wodshopDef = wodshop.json[category];
        var type = wodshopDef.post.type;

        needle.get(wodshop.url + '?type=' + type, {
          user_agent: random_ua.generate()
        }, function(error, response, body) {
          if (error)
            callback(error);
          else {
            var wod = {
              'title': wodshopDef.title,
              'tagline': wodshopDef.tagline,
              'exercices': WodGenerator.getWod(body)
            };

            callback(null, wod);
          }
        });

				return this;
      },
      /**
       * Merge workouts result from different async post calling
       *
       * @method 				asyncPostWodShop
       * @param {Error} 		error
       * @param {Array} 		workouts				List of random workouts
			 * @return {Function} callback
       */
      asyncWorkouts: function(error, workouts) {
        if (error) {
          return self_callback(error);
        }
        return self_callback(null, workouts);
      },
      /**
       * Parse HTML response to get wod
       *
       * @method 						getWod
       * @param {Object} 		wod				response from wodshops
       * @return {Object}		exercices		Exercices in html format
       */
      getWod: function(wod) {

        var exercices = '<span>';

        // Build html exercice
        if (wod.duration !== null && wod.duration.length > 0) {
          exercices += wod.duration + '<br>';
        }
        if (wod.exercise_notes !== null && wod.exercise_notes.length > 0) {
          exercices += wod.exercise_notes + '<br>';
        }

        for (var i in wod.exercises) {
          if (wod.exercises[i] !== null) {
            exercices += wod.exercises[i] + '<br/>';
          }
        }

				exercices += '</span>';

        return exercices;
      }
    };

    exports.random = WodGenerator.random;
    exports.getone = WodGenerator.getone;
  }
)();
