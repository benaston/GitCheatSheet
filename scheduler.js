var coordinator = {};
var latch = false; // Set when a request is "in flight".
var callQueue = [];

/**
 * On removal, any
 * pending requests for that tile
 * must be destroyed to avoid a
 * memory leak.
 */
eventBus.on('onRemoval', function(tileId) {
	callQueue = callQueue.filter(function(i) {
		return i.ps._tileId !== tileId;
	});
});

coordinator.schedule = function(ps, options) {
	/**
	 * When a request is scheduled, any
	 * pending requests for that tile
	 * must be destroyed to avoid a
	 * memory leak.
	 */
	callQueue = callQueue.filter(function(i) {
		return i.ps !== ps;
	});

	callQueue.push(getFnForQueue(ps, options));

	if (!latch) {
		return callQueue.shift()();
	}
};

function getFnForQueue(ps, options) {
	var fn = function() {
		if (latch) {
			throw 'Method on queue invoked while previous call inFlight.';
		}

		go(ps, options);
	};

	fn.ps = ps;

	return fn;
}

function go(ps, options) {
	try {
		latch = true;
		options.done = options.fail = openLatchAndDrainOne;
		ps.doTheAction(options);
	} catch (err) {
		openLatchAndDrainOne();
	}
}

function openLatchAndDrainOne() {
	latch = false;
	(callQueue.length && callQueue.shift()());
}

export default coordinator;
