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
 		var categories = ['weighlifting','bodyweight','emotm'];

 		describe('random', function() {
 			describe('with no arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		          	var workout = wod.random();		            
		          }).should.throw();  
		        });
		    });

		    describe('More than 2 arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		           var workout = wod.random("","","");		
		          }).should.throw();
		        });

		         it('throw ERROR', function() {
		          (function () {
		           var workout = wod.random("","","","");		
		          }).should.throw();
		        });
		    });

		    describe('With 2 invalids arguments', function() {
		        it('throw ERROR', function() {
		          (function () {
		            var workout = wod.random("","");		
		          }).should.throw();
		        });
		    });

		    describe('With 1 valids arguments', function() {
		         it('return OK if args are correct', function() {                  			
          			wod.random(traceError).should.be.true;
        		});

		         it('return a random WOD from all categories', function() { 
		         	var wod_categories = 16;
		         	var workouts = wod.random(traceError);                			
          			workouts.length.should.have.length(wod_categories);
          			for(var i=0;i<workouts.length;i++){
          				workouts[i].should.have.property('title');	
          				workouts[i].should.have.property('tagline');	
          				workouts[i].should.have.property('exercices');	
          			}
        		});
		    });

			describe('With 2 valids arguments', function() {
		        it('return OK if args are correct', function() {                  			
          			wod.random(categories,traceError).should.be.true;
        		});

        		it('return WODs according input categories', function() {                  			
          			var workouts = wod.random(categories,traceError);
          			workouts.length.should.have.length(categories.length);
          			for(var i=0;i<workouts.length;i++){
          				workouts[i].should.have.property('title');	
          				workouts[i].should.have.property('tagline');	
          				workouts[i].should.have.property('exercices');	
          			}
        		});
		    });



 		});

	}
)();