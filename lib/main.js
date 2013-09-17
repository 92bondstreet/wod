(
	function()
	{
		/*
		*	WOD Generator
		*/
		var WodGenerator = {

			gr_categories:[],
			gr_callback:"",
			

		  /**
			* Generate a random WOD for each input categories
			*
			* @method random 			
			* @param {Array} 		[categories]			List of WODs categories	 
			* @param {Function} 	callback				function	 
			*/

			random:function(categories, callback){

				// 0. (In)Valid arguments checkers				
				if( arguments.length!==1 && arguments.length!==2 )
    				throw new Error('No valid args for random([categories], callback)');  
    			else{
    				// init parameters 
    				var callback = WodGenerator.checkCallback(categories) ? categories : callback;
    				var categories  = WodGenerator.checkCallback(categories) ? [] : categories;
   					
   					// 0.1 Check parameters
    				if(!WodGenerator.checkCallback(callback))
    					throw new Error('No valid args for callback parameters | random([categories], callback)');  
    			}

    			// 2. Success on args
    			gr_categories = categories;
    			gr_callback = callback;
    			
    			return true;

    			
   			},
			/**
			* Test callback function
			*
			* @method 				checkCallback
			* @param {Function} 	callback				function
			*/
			checkCallback:function (callback){
				
				if (callback && typeof(callback) === "function")  
					return true;
				else
					return false;	
			}
		};

		exports.random = WodGenerator.random;
	}
)();