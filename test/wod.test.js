(
	function()
	{
		var should = require('should');
		var wod = require('../lib/main');

		var traceError = function (error, retval) {
		  if (error) {
		    console.log(error);
		    return;
		  }
		  console.log(retval);
		}


	  /**
 		*    DEFINITION OF OBJECT PARAMETER
 		*/
 		var categories = ['weightlifting','bodyweight','emotm'];
 		var category = 'girls';

 	   /*
 		* 		Random method calling
 		*/
 		describe('random', function() {
 			describe('with no arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		          	wod.random();
		          }).should.throw();
		        });
		    });

		    describe('More than 2 arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		           wod.random("","","");
		          }).should.throw();
		        });

		         it('throw ERROR', function() {
		          (function () {
		           wod.random("","","","");
		          }).should.throw();
		        });
		    });

		    describe('With 2 invalids arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		             wod.random("","");
		          }).should.throw();
		        });
		    });

		    describe('With 1 valids arguments', function() {
		        //it('return OK if args are correct', function() {
          		//	wod.random(traceError).should.be.true;
        		//});

		         it('return a random WOD from all categories', function(done) {
		         	this.timeout(50000);
		         	var wod_categories = 17;
		        	wod.random(function(err,workouts){
             			if (err)
             				console.log(err);
             			else{
             				workouts.should.have.length(wod_categories);
		          			for(var i=0;i<workouts.length;i++){
		          				workouts[i].should.have.property('title');
		          				workouts[i].should.have.property('tagline');
		          				workouts[i].should.have.property('exercices');
											workouts[i]['exercices'].should.be.ok;
		          			}
             			}
            			done();
          			});
        		});
		    });

			describe('With 2 valids arguments', function() {
		        it('return OK if args are correct', function() {
          			wod.random(categories,traceError).should.be.true;
        		});

        		it('return WODs according input categories', function(done) {
        			this.timeout(50000);
        			wod.random(categories,function(err,workouts){
             			if (err)
             				console.log(err);
             			else{
             				workouts.should.have.length(categories.length);
		          			for(var i=0;i<workouts.length;i++){
		          				workouts[i].should.have.property('title');
		          				workouts[i].should.have.property('tagline');
		          				workouts[i].should.have.property('exercices');
											workouts[i]['exercices'].should.be.ok;
		          			}
             			}
            			done();
          			});
        		});
		    });
 		});


	   /*
 		* 		getone method calling
 		*/

 		describe('getone', function() {
 			describe('with no arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		          	wod.getone();
		          }).should.throw();
		        });
		    });

		    describe('More than 1 arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		           wod.getone("","","");
		          }).should.throw();
		        });

		         it('throw ERROR', function() {
		          (function () {
		           wod.getone("","","","");
		          }).should.throw();
		        });
		    });

		    describe('With 1 invalids arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		             wod.getone("");
		          }).should.throw();
		        });
		    });

			describe('With 1 valids arguments', function() {
		        it('return OK if args are correct', function() {
          			wod.getone(traceError).should.be.true;
        		});

        		it('return random WOD', function(done) {
        			this.timeout(50000);
        			wod.getone(function(err,workouts){
             			if (err)
             				console.log(err);
             			else{
             				var workout = workouts[0];
	          				workout.should.have.property('title');
	          				workout.should.have.property('tagline');
	          				workout.should.have.property('exercices');
										workout['exercices'].should.be.ok;
             			}
            			done();
          			});
        		});
		    });
 		});


	}
)();
