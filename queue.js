var factory = {
	create,
};

function create() {
	var backing = [];

	return {
		enqueue,
		dequeue,
	};

	function enqueue(o) {
		return backing.push(o);
	}

	function dequeue() {
		return backing.shift();
	}
}

export default factory;
