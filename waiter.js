function waiter(o, flag) {
	var defaults = {
		selector: null, //string - [MANDATORY] DOM element you wait for to appear or a UID if you wait for anything else
		iterations: null, //int - how many times to try, if blank then infinite untill found
		success: null, //function - callback on success
		fail: null, //function - callback on fail
		timeout: 100, //int - in ms duration of each try
		events: true, //bool - Fire DOM events; name of event === 'waiter-success: ' + selector || 'waiter-fail: ' + selector,
		condition: function(selector) { //default compare function checking the appearance of DOM by selector. Change if you wait for something custom...
			var elem = document.querySelectorAll(selector);
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

	var valid = o.condition(o.selector);

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
				o.fail();
			}
			return;
		}

		setTimeout(function(){
			waiter(o, true);
		}, o.timeout);
	} else {
		if (o.events) {
			trigger('waiter-success: ', o.selector);
		}
		if (o.success) {
			o.success();
		}
	}
}
