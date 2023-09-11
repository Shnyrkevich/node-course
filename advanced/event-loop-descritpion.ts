// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];


myFile.runConcepts();

function shouldContinue() {
	// Check one: Any pending setTimeout, setInterval, setImmediate?
	// Check two: Any pending OS tasks? (Like server listening to port)
	// Check three: Any pending long running operations? (Like fs module)
	return pendingOSTasks.length || pendingTimers.length || pendingOperations.length;
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
	// 1) Node looks at pendingTimers and see if any functions
	// are ready to be called (setTimeout, setInterval)

	// 2) Node looks at pendingOSTasks and pending operations 
	// and calls relevant callbacks

	// 3) Pause execution. Continue when...
	// - a new pending task is done
	// - a new pendingOSOperation is done.
	// - a timer is about to complete

	// 4) Look at pendingTimers with timer `setImmdediate`

	// 5) Handle any 'close' events for example close readable
	// stream
}

// End of the event loop