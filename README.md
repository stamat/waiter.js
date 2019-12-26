# waiter.js
Simple recursive function that waits for DOM changes (or virtually anything else)

## Usage

When you use thirdparty frontend plugins that inject DOM or data asynchoriniusly via with minified and uglified code and there is no hook to latch on, this simple piece of code provides a timed interval check for the changes you wish to monitor.

It can wait for a DOM object or data to appear infinitely or you can provide the number of tryes untill it fails, to prevent resource consumption.

Open up the code, it's supersimple and easy to understand! https://github.com/stamat/waiter.js/blob/master/waiter.js

### Example usage

Waiting for OKENDO code to load

```javascript
  waiter({
    selector: ".okeReviews-reviews-controls",
    iterations: 50, // check 50x
    //interval: 100, default interval
    success: function() {
      console.log('Yay!');
    },
    fail: function() {
      console.log('Nay!');
    }
  });
```

### Parameters
Property | Default | Accepts | Description
-------- | ------- | ------- | -----------
**selector** | null | string | DOM selector string, for the default condition function which checks the selection. This value is also used for indexing iteration counters, so please assign it a unique value if you are checking something other than DOM. **MANDATORY!**
**contiditon** | document.querySelectorAll | function(parameters, current_iteration) | Here you can assign a custom condition function to check for, parameter object is passed as the first argument and iteration count as the second.
**interval** | 100 | int | Time in ms for each check
**iterations** | null | int | How many times to run each check, if left null or 0 then infinite times
**events** | true | boolean | If you wish not to trigger document events set this to false. Event names are: "waiter-success: " + selector and "waiter-fail: " + selector; and the target is document.
**success** | null | function | Callback on success, only argument is parameters object
**fail** | null | function | Callback on fail if iterations property is set, only argument is parameters object

### Events

TO BE CONTINUED...
