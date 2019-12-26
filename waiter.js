function waiter(o, flag) {
	var defaults = {
		selector: null, //string - [MANDATORY] DOM element you wait for to appear
		iterations: null, //int - how many times to try, if blank then infinite untill found
		success: null, //function - callback on success
		fail: null, //function - callback on fail
		interval: 100, //int - in ms duration of each try
		events: true, //bool - Fire DOM events; name of event === 'waiter-success: ' + selector || 'waiter-fail: ' + selector,
		condition: function(selector) {
			var elem = document.querySelectorAll(o.selector);
			return elem.length;
		}
	}

	if (!flag) {
		for (var k in defaults) {
			if (!o.hasOwnProperty(k)) {
				o[k] = defaults[k];
			}
		}
	}

	if (o.iterations) {
		if (!window.hasOwnProperty('__waiter_iteration_index')) {
			window.__waiter_iteration_index = {};
		}

		if (!window.__waiter_iteration_index.hasOwnProperty(o.selector)) {
			window.__waiter_iteration_index[o.selector] = 0;
		}
		window.__waiter_iteration_index[o.selector]++;
	}

	var iter = o.iterations ? window.__waiter_iteration_index[o.selector] : undefined;
	var valid = o.condition(o, iter);

	var trigger = function(prefix, suffix) {
		var e = document.createEvent('Event');
		e.initEvent(prefix + suffix, true, true);
		document.dispatchEvent(e);
	};

	if (!valid) {
		if (o.iterations && window.__waiter_iteration_index[o.selector] > o.iterations) {
			if (o.events) {
				trigger('waiter-fail: ', o.selector);
			}
			if (o.fail) {
				o.fail(o);
			}

			window.__waiter_iteration_index[o.selector] = 0;
			return;
		}

		setTimeout(function(){
			waiter(o, true);
		}, o.interval);
	} else {
		if (o.events) {
			trigger('waiter-success: ', o.selector);
		}
		if (o.success) {
			o.success(o);
		}
	}
}
