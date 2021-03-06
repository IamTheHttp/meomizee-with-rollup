(function () {
	'use strict';

	// eslint-disable-next-line no-empty-function
	var noop$1 = function () {};

	var _undefined$1 = noop$1(); // Support ES3 engines

	var isValue = function (val) { return val !== _undefined$1 && val !== null; };

	var forEach$2 = Array.prototype.forEach, create$b = Object.create;

	var process$1 = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1/*, …options*/) {
		var result = create$b(null);
		forEach$2.call(arguments, function (options) {
			if (!isValue(options)) return;
			process$1(Object(options), result);
		});
		return result;
	};

	var isImplemented$7 = function () {
		var sign = Math.sign;
		if (typeof sign !== "function") return false;
		return sign(10) === 1 && sign(-20) === -1;
	};

	var shim$5 = function (value) {
		value = Number(value);
		if (isNaN(value) || value === 0) return value;
		return value > 0 ? 1 : -1;
	};

	var sign = isImplemented$7() ? Math.sign : shim$5;

	var abs$1   = Math.abs
	  , floor$1 = Math.floor;

	var toInteger = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if (value === 0 || !isFinite(value)) return value;
		return sign(value) * floor$1(abs$1(value));
	};

	var max$2       = Math.max;

	var toPosInteger = function (value) { return max$2(0, toInteger(value)); };

	var resolveLength = function (optsLength, fnLength, isAsync) {
		var length;
		if (isNaN(optsLength)) {
			length = fnLength;
			if (!(length >= 0)) return 1;
			if (isAsync && length) return length - 1;
			return length;
		}
		if (optsLength === false) return false;
		return toPosInteger(optsLength);
	};

	var validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var bind                    = Function.prototype.bind
	  , call$3                    = Function.prototype.call
	  , keys$2                    = Object.keys
	  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	var _iterate = function (method, defVal) {
		return function (obj, cb/*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(validValue(obj));
			validCallable(cb);

			list = keys$2(obj);
			if (compareFn) {
				list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== "function") method = list[method];
			return call$3.call(method, list, function (key, index) {
				if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
				return call$3.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};

	var forEach$1 = _iterate("forEach");

	var registeredExtensions = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var isImplemented$6 = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
	};

	var isImplemented$5 = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
			return false;
		}
	};

	var keys$1 = Object.keys;

	var shim$4 = function (object) { return keys$1(isValue(object) ? Object(object) : object); };

	var keys = isImplemented$5() ? Object.keys : shim$4;

	var max$1   = Math.max;

	var shim$3 = function (dest, src/*, …srcn*/) {
		var error, i, length = max$1(arguments.length, 2), assign;
		dest = Object(validValue(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

	var assign = isImplemented$6() ? Object.assign : shim$3;

	var map$1 = { function: true, object: true };

	var isObject = function (value) { return (isValue(value) && map$1[typeof value]) || false; };

	var custom = createCommonjsModule(function (module) {

	var captureStackTrace = Error.captureStackTrace;

	module.exports = function (message/*, code, ext*/) {
		var err = new Error(message), code = arguments[1], ext = arguments[2];
		if (!isValue(ext)) {
			if (isObject(code)) {
				ext = code;
				code = null;
			}
		}
		if (isValue(ext)) assign(err, ext);
		if (isValue(code)) err.code = code;
		if (captureStackTrace) captureStackTrace(err, module.exports);
		return err;
	};
	});

	var defineProperty$3           = Object.defineProperty
	  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
	  , getOwnPropertyNames      = Object.getOwnPropertyNames
	  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

	var mixin = function (target, source) {
		var error, sourceObject = Object(validValue(source));
		target = Object(validValue(target));
		getOwnPropertyNames(sourceObject).forEach(function (name) {
			try {
				defineProperty$3(target, name, getOwnPropertyDescriptor(source, name));
			} catch (e) { error = e; }
		});
		if (typeof getOwnPropertySymbols === "function") {
			getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
				try {
					defineProperty$3(target, symbol, getOwnPropertyDescriptor(source, symbol));
				} catch (e) { error = e; }
			});
		}
		if (error !== undefined) throw error;
		return target;
	};

	var _defineLength = createCommonjsModule(function (module) {



	var test = function (arg1, arg2) { return arg2; };

	var desc, defineProperty, generate, mixin$1;

	try {
		Object.defineProperty(test, "length", {
			configurable: true,
			writable: false,
			enumerable: false,
			value: 1
		});
	}
	catch (ignore) {}

	if (test.length === 1) {
		// ES6
		desc = { configurable: true, writable: false, enumerable: false };
		defineProperty = Object.defineProperty;
		module.exports = function (fn, length) {
			length = toPosInteger(length);
			if (fn.length === length) return fn;
			desc.value = length;
			return defineProperty(fn, "length", desc);
		};
	} else {
		mixin$1 = mixin;
		generate = (function () {
			var cache = [];
			return function (length) {
				var args, i = 0;
				if (cache[length]) return cache[length];
				args = [];
				while (length--) args.push("a" + (++i).toString(36));
				// eslint-disable-next-line no-new-func
				return new Function(
					"fn",
					"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
				);
			};
		})();
		module.exports = function (src, length) {
			var target;
			length = toPosInteger(length);
			if (src.length === length) return src;
			target = generate(length)(src);
			try { mixin$1(target, src); }
			catch (ignore) {}
			return target;
		};
	}
	});

	// ES3 safe
	var _undefined = void 0;

	var is$4 = function (value) { return value !== _undefined && value !== null; };

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	var is$3 = function (value) {
		if (!is$4(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};

	var is$2 = function (value) {
		if (!is$3(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};

	var is$1 = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !is$2(value);
	};

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	var is = function (value) {
		if (!is$1(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};

	var str = "razdwatrzy";

	var isImplemented$4 = function () {
		if (typeof str.contains !== "function") return false;
		return str.contains("dwa") === true && str.contains("foo") === false;
	};

	var indexOf$1 = String.prototype.indexOf;

	var shim$2 = function (searchString/*, position*/) {
		return indexOf$1.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$4() ? String.prototype.contains : shim$2;

	var d_1 = createCommonjsModule(function (module) {



	var d = (module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (is$4(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOptions(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!is$4(get)) {
			get = undefined;
		} else if (!is(get)) {
			options = get;
			get = set = undefined;
		} else if (!is$4(set)) {
			set = undefined;
		} else if (!is(set)) {
			options = set;
			set = undefined;
		}
		if (is$4(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};
	});

	var eventEmitter = createCommonjsModule(function (module, exports) {

	var apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		validCallable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d_1(on),
		once: d_1(once),
		off: d_1(off),
		emit: d_1(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	eventEmitter.methods;

	var isImplemented$3 = function () {
		var from = Array.from, arr, result;
		if (typeof from !== "function") return false;
		arr = ["raz", "dwa"];
		result = from(arr);
		return Boolean(result && result !== arr && result[1] === "dwa");
	};

	var isImplemented$2 = function () {
		if (typeof globalThis !== "object") return false;
		if (!globalThis) return false;
		return globalThis.Array === Array;
	};

	var naiveFallback = function () {
		if (typeof self === "object" && self) return self;
		if (typeof window === "object" && window) return window;
		throw new Error("Unable to resolve global `this`");
	};

	var implementation = (function () {
		if (this) return this;

		// Unexpected strict mode (may happen if e.g. bundled into ESM module)

		// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
		// In all ES5+ engines global object inherits from Object.prototype
		// (if you approached one that doesn't please report)
		try {
			Object.defineProperty(Object.prototype, "__global__", {
				get: function () { return this; },
				configurable: true
			});
		} catch (error) {
			// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
			return naiveFallback();
		}
		try {
			// Safari case (window.__global__ is resolved with global context, but __global__ does not)
			if (!__global__) return naiveFallback();
			return __global__;
		} finally {
			delete Object.prototype.__global__;
		}
	})();

	var globalThis_1 = isImplemented$2() ? globalThis : implementation;

	var validTypes = { object: true, symbol: true };

	var isImplemented$1 = function () {
		var Symbol = globalThis_1.Symbol;
		var symbol;
		if (typeof Symbol !== "function") return false;
		symbol = Symbol("test symbol");
		try { String(symbol); }
		catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};

	var isSymbol = function (value) {
		if (!value) return false;
		if (typeof value === "symbol") return true;
		if (!value.constructor) return false;
		if (value.constructor.name !== "Symbol") return false;
		return value[value.constructor.toStringTag] === "Symbol";
	};

	var validateSymbol = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};

	var create$a = Object.create, defineProperty$2 = Object.defineProperty, objPrototype = Object.prototype;

	var created = create$a(null);
	var generateName = function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || "")]) ++postfix;
		desc += postfix || "";
		created[desc] = true;
		name = "@@" + desc;
		defineProperty$2(
			objPrototype,
			name,
			d_1.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty$2(this, name, d_1(value));
				ie11BugWorkaround = false;
			})
		);
		return name;
	};

	var NativeSymbol$1 = globalThis_1.Symbol;

	var standardSymbols = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			// To ensure proper interoperability with other native functions (e.g. Array.from)
			// fallback to eventual native implementation of given symbol
			hasInstance: d_1(
				"", (NativeSymbol$1 && NativeSymbol$1.hasInstance) || SymbolPolyfill("hasInstance")
			),
			isConcatSpreadable: d_1(
				"",
				(NativeSymbol$1 && NativeSymbol$1.isConcatSpreadable) ||
					SymbolPolyfill("isConcatSpreadable")
			),
			iterator: d_1("", (NativeSymbol$1 && NativeSymbol$1.iterator) || SymbolPolyfill("iterator")),
			match: d_1("", (NativeSymbol$1 && NativeSymbol$1.match) || SymbolPolyfill("match")),
			replace: d_1("", (NativeSymbol$1 && NativeSymbol$1.replace) || SymbolPolyfill("replace")),
			search: d_1("", (NativeSymbol$1 && NativeSymbol$1.search) || SymbolPolyfill("search")),
			species: d_1("", (NativeSymbol$1 && NativeSymbol$1.species) || SymbolPolyfill("species")),
			split: d_1("", (NativeSymbol$1 && NativeSymbol$1.split) || SymbolPolyfill("split")),
			toPrimitive: d_1(
				"", (NativeSymbol$1 && NativeSymbol$1.toPrimitive) || SymbolPolyfill("toPrimitive")
			),
			toStringTag: d_1(
				"", (NativeSymbol$1 && NativeSymbol$1.toStringTag) || SymbolPolyfill("toStringTag")
			),
			unscopables: d_1(
				"", (NativeSymbol$1 && NativeSymbol$1.unscopables) || SymbolPolyfill("unscopables")
			)
		});
	};

	var registry = Object.create(null);

	var symbolRegistry = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			for: d_1(function (key) {
				if (registry[key]) return registry[key];
				return (registry[key] = SymbolPolyfill(String(key)));
			}),
			keyFor: d_1(function (symbol) {
				var key;
				validateSymbol(symbol);
				for (key in registry) {
					if (registry[key] === symbol) return key;
				}
				return undefined;
			})
		});
	};

	var NativeSymbol         = globalThis_1.Symbol;

	var create$9 = Object.create
	  , defineProperties$2 = Object.defineProperties
	  , defineProperty$1 = Object.defineProperty;

	var SymbolPolyfill, HiddenSymbol, isNativeSafe;

	if (typeof NativeSymbol === "function") {
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	} else {
		NativeSymbol = null;
	}

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	var polyfill = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create$9(HiddenSymbol.prototype);
		description = description === undefined ? "" : String(description);
		return defineProperties$2(symbol, {
			__description__: d_1("", description),
			__name__: d_1("", generateName(description))
		});
	};

	standardSymbols(SymbolPolyfill);
	symbolRegistry(SymbolPolyfill);

	// Internal tweaks for real symbol producer
	defineProperties$2(HiddenSymbol.prototype, {
		constructor: d_1(SymbolPolyfill),
		toString: d_1("", function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties$2(SymbolPolyfill.prototype, {
		toString: d_1(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
		valueOf: d_1(function () { return validateSymbol(this); })
	});
	defineProperty$1(
		SymbolPolyfill.prototype,
		SymbolPolyfill.toPrimitive,
		d_1("", function () {
			var symbol = validateSymbol(this);
			if (typeof symbol === "symbol") return symbol;
			return symbol.toString();
		})
	);
	defineProperty$1(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d_1("c", "Symbol"));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty$1(
		HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d_1("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
	);

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty$1(
		HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d_1("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
	);

	var es6Symbol = isImplemented$1()
		? globalThis_1.Symbol
		: polyfill;

	var objToString$2 = Object.prototype.toString
	  , id$1 = objToString$2.call((function () { return arguments; })());

	var isArguments = function (value) { return objToString$2.call(value) === id$1; };

	var objToString$1 = Object.prototype.toString
	  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

	var isFunction = function (value) {
		return typeof value === "function" && isFunctionStringTag(objToString$1.call(value));
	};

	var objToString = Object.prototype.toString, id = objToString.call("");

	var isString = function (value) {
		return (
			typeof value === "string" ||
			(value &&
				typeof value === "object" &&
				(value instanceof String || objToString.call(value) === id)) ||
			false
		);
	};

	var iteratorSymbol = es6Symbol.iterator
	  , isArray$1        = Array.isArray
	  , call$2           = Function.prototype.call
	  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
	  , defineProperty = Object.defineProperty;

	// eslint-disable-next-line complexity, max-lines-per-function
	var shim$1 = function (arrayLike/*, mapFn, thisArg*/) {
		var mapFn = arguments[1]
		  , thisArg = arguments[2]
		  , Context
		  , i
		  , j
		  , arr
		  , length
		  , code
		  , iterator
		  , result
		  , getIterator
		  , value;

		arrayLike = Object(validValue(arrayLike));

		if (isValue(mapFn)) validCallable(mapFn);
		if (!this || this === Array || !isFunction(this)) {
			// Result: Plain array
			if (!mapFn) {
				if (isArguments(arrayLike)) {
					// Source: Arguments
					length = arrayLike.length;
					if (length !== 1) return Array.apply(null, arrayLike);
					arr = new Array(1);
					arr[0] = arrayLike[0];
					return arr;
				}
				if (isArray$1(arrayLike)) {
					// Source: Array
					arr = new Array((length = arrayLike.length));
					for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
					return arr;
				}
			}
			arr = [];
		} else {
			// Result: Non plain array
			Context = this;
		}

		if (!isArray$1(arrayLike)) {
			if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
				// Source: Iterator
				iterator = validCallable(getIterator).call(arrayLike);
				if (Context) arr = new Context();
				result = iterator.next();
				i = 0;
				while (!result.done) {
					value = mapFn ? call$2.call(mapFn, thisArg, result.value, i) : result.value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, i, desc);
					} else {
						arr[i] = value;
					}
					result = iterator.next();
					++i;
				}
				length = i;
			} else if (isString(arrayLike)) {
				// Source: String
				length = arrayLike.length;
				if (Context) arr = new Context();
				for (i = 0, j = 0; i < length; ++i) {
					value = arrayLike[i];
					if (i + 1 < length) {
						code = value.charCodeAt(0);
						// eslint-disable-next-line max-depth
						if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
					}
					value = mapFn ? call$2.call(mapFn, thisArg, value, j) : value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, j, desc);
					} else {
						arr[j] = value;
					}
					++j;
				}
				length = j;
			}
		}
		if (length === undefined) {
			// Source: array or array-like
			length = toPosInteger(arrayLike.length);
			if (Context) arr = new Context(length);
			for (i = 0; i < length; ++i) {
				value = mapFn ? call$2.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
			}
		}
		if (Context) {
			desc.value = null;
			arr.length = length;
		}
		return arr;
	};

	var from_1 = isImplemented$3() ? Array.from : shim$1;

	var isArray = Array.isArray;

	var toArray = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from_1(arrayLike); };

	var slice$1 = Array.prototype.slice, resolveArgs;

	resolveArgs = function (args) {
		return this.map(function (resolve, i) {
			return resolve ? resolve(args[i]) : args[i];
		}).concat(slice$1.call(args, this.length));
	};

	var resolveResolve = function (resolvers) {
		resolvers = toArray(resolvers);
		resolvers.forEach(function (resolve) {
			if (isValue(resolve)) validCallable(resolve);
		});
		return resolveArgs.bind(resolvers);
	};

	var resolveNormalize = function (userNormalizer) {
		var normalizer;
		if (typeof userNormalizer === "function") return { set: userNormalizer, get: userNormalizer };
		normalizer = { get: validCallable(userNormalizer.get) };
		if (userNormalizer.set !== undefined) {
			normalizer.set = validCallable(userNormalizer.set);
			if (userNormalizer.delete) normalizer.delete = validCallable(userNormalizer.delete);
			if (userNormalizer.clear) normalizer.clear = validCallable(userNormalizer.clear);
			return normalizer;
		}
		normalizer.set = normalizer.get;
		return normalizer;
	};

	var ee               = eventEmitter.methods;

	var apply$2 = Function.prototype.apply
	  , call$1 = Function.prototype.call
	  , create$8 = Object.create
	  , defineProperties$1 = Object.defineProperties
	  , on = ee.on
	  , emit = ee.emit;

	var configureMap = function (original, length, options) {
		var cache = create$8(null)
		  , conf
		  , memLength
		  , get
		  , set
		  , del
		  , clear
		  , extDel
		  , extGet
		  , extHas
		  , normalizer
		  , getListeners
		  , setListeners
		  , deleteListeners
		  , memoized
		  , resolve;
		if (length !== false) memLength = length;
		else if (isNaN(original.length)) memLength = 1;
		else memLength = original.length;

		if (options.normalizer) {
			normalizer = resolveNormalize(options.normalizer);
			get = normalizer.get;
			set = normalizer.set;
			del = normalizer.delete;
			clear = normalizer.clear;
		}
		if (options.resolvers != null) resolve = resolveResolve(options.resolvers);

		if (get) {
			memoized = _defineLength(function (arg) {
				var id, result, args = arguments;
				if (resolve) args = resolve(args);
				id = get(args);
				if (id !== null) {
					if (hasOwnProperty.call(cache, id)) {
						if (getListeners) conf.emit("get", id, args, this);
						return cache[id];
					}
				}
				if (args.length === 1) result = call$1.call(original, this, args[0]);
				else result = apply$2.call(original, this, args);
				if (id === null) {
					id = get(args);
					if (id !== null) throw custom("Circular invocation", "CIRCULAR_INVOCATION");
					id = set(args);
				} else if (hasOwnProperty.call(cache, id)) {
					throw custom("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache[id] = result;
				if (setListeners) conf.emit("set", id, null, result);
				return result;
			}, memLength);
		} else if (length === 0) {
			memoized = function () {
				var result;
				if (hasOwnProperty.call(cache, "data")) {
					if (getListeners) conf.emit("get", "data", arguments, this);
					return cache.data;
				}
				if (arguments.length) result = apply$2.call(original, this, arguments);
				else result = call$1.call(original, this);
				if (hasOwnProperty.call(cache, "data")) {
					throw custom("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache.data = result;
				if (setListeners) conf.emit("set", "data", null, result);
				return result;
			};
		} else {
			memoized = function (arg) {
				var result, args = arguments, id;
				if (resolve) args = resolve(arguments);
				id = String(args[0]);
				if (hasOwnProperty.call(cache, id)) {
					if (getListeners) conf.emit("get", id, args, this);
					return cache[id];
				}
				if (args.length === 1) result = call$1.call(original, this, args[0]);
				else result = apply$2.call(original, this, args);
				if (hasOwnProperty.call(cache, id)) {
					throw custom("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache[id] = result;
				if (setListeners) conf.emit("set", id, null, result);
				return result;
			};
		}
		conf = {
			original: original,
			memoized: memoized,
			profileName: options.profileName,
			get: function (args) {
				if (resolve) args = resolve(args);
				if (get) return get(args);
				return String(args[0]);
			},
			has: function (id) { return hasOwnProperty.call(cache, id); },
			delete: function (id) {
				var result;
				if (!hasOwnProperty.call(cache, id)) return;
				if (del) del(id);
				result = cache[id];
				delete cache[id];
				if (deleteListeners) conf.emit("delete", id, result);
			},
			clear: function () {
				var oldCache = cache;
				if (clear) clear();
				cache = create$8(null);
				conf.emit("clear", oldCache);
			},
			on: function (type, listener) {
				if (type === "get") getListeners = true;
				else if (type === "set") setListeners = true;
				else if (type === "delete") deleteListeners = true;
				return on.call(this, type, listener);
			},
			emit: emit,
			updateEnv: function () { original = conf.original; }
		};
		if (get) {
			extDel = _defineLength(function (arg) {
				var id, args = arguments;
				if (resolve) args = resolve(args);
				id = get(args);
				if (id === null) return;
				conf.delete(id);
			}, memLength);
		} else if (length === 0) {
			extDel = function () { return conf.delete("data"); };
		} else {
			extDel = function (arg) {
				if (resolve) arg = resolve(arguments)[0];
				return conf.delete(arg);
			};
		}
		extGet = _defineLength(function () {
			var id, args = arguments;
			if (length === 0) return cache.data;
			if (resolve) args = resolve(args);
			if (get) id = get(args);
			else id = String(args[0]);
			return cache[id];
		});
		extHas = _defineLength(function () {
			var id, args = arguments;
			if (length === 0) return conf.has("data");
			if (resolve) args = resolve(args);
			if (get) id = get(args);
			else id = String(args[0]);
			if (id === null) return false;
			return conf.has(id);
		});
		defineProperties$1(memoized, {
			__memoized__: d_1(true),
			delete: d_1(extDel),
			clear: d_1(conf.clear),
			_get: d_1(extGet),
			_has: d_1(extHas)
		});
		return conf;
	};

	var plain = function self(fn /*, options */) {
		var options, length, conf;

		validCallable(fn);
		options = Object(arguments[1]);

		if (options.async && options.promise) {
			throw new Error("Options 'async' and 'promise' cannot be used together");
		}

		// Do not memoize already memoized function
		if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;

		// Resolve length;
		length = resolveLength(options.length, fn.length, options.async && registeredExtensions.async);

		// Configure cache map
		conf = configureMap(fn, length, options);

		// Bind eventual extensions
		forEach$1(registeredExtensions, function (extFn, name) {
			if (options[name]) extFn(options[name], conf, options);
		});

		if (self.__profiler__) self.__profiler__(conf);

		conf.updateEnv();
		return conf.memoized;
	};

	var primitive = function (args) {
		var id, i, length = args.length;
		if (!length) return "\u0002";
		id = String(args[i = 0]);
		while (--length) id += "\u0001" + args[++i];
		return id;
	};

	var getPrimitiveFixed = function (length) {
		if (!length) {
			return function () {
				return "";
			};
		}
		return function (args) {
			var id = String(args[0]), i = 0, currentLength = length;
			while (--currentLength) {
				id += "\u0001" + args[++i];
			}
			return id;
		};
	};

	var isImplemented = function () {
		var numberIsNaN = Number.isNaN;
		if (typeof numberIsNaN !== "function") return false;
		return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
	};

	var shim = function (value) {
		// eslint-disable-next-line no-self-compare
		return value !== value;
	};

	var isNan = isImplemented() ? Number.isNaN : shim;

	var indexOf           = Array.prototype.indexOf
	  , objHasOwnProperty = Object.prototype.hasOwnProperty
	  , abs               = Math.abs
	  , floor             = Math.floor;

	var eIndexOf = function (searchElement/*, fromIndex*/) {
		var i, length, fromIndex, val;
		if (!isNan(searchElement)) return indexOf.apply(this, arguments);

		length = toPosInteger(validValue(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInteger(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < length; ++i) {
			if (objHasOwnProperty.call(this, i)) {
				val = this[i];
				if (isNan(val)) return i; // Jslint: ignore
			}
		}
		return -1;
	};

	var create$7 = Object.create;

	var get = function () {
		var lastId = 0, map = [], cache = create$7(null);
		return {
			get: function (args) {
				var index = 0, set = map, i, length = args.length;
				if (length === 0) return set[length] || null;
				if ((set = set[length])) {
					while (index < length - 1) {
						i = eIndexOf.call(set[0], args[index]);
						if (i === -1) return null;
						set = set[1][i];
						++index;
					}
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) return null;
					return set[1][i] || null;
				}
				return null;
			},
			set: function (args) {
				var index = 0, set = map, i, length = args.length;
				if (length === 0) {
					set[length] = ++lastId;
				} else {
					if (!set[length]) {
						set[length] = [[], []];
					}
					set = set[length];
					while (index < length - 1) {
						i = eIndexOf.call(set[0], args[index]);
						if (i === -1) {
							i = set[0].push(args[index]) - 1;
							set[1].push([[], []]);
						}
						set = set[1][i];
						++index;
					}
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
					}
					set[1][i] = ++lastId;
				}
				cache[lastId] = args;
				return lastId;
			},
			delete: function (id) {
				var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
				if (length === 0) {
					delete set[length];
				} else if ((set = set[length])) {
					while (index < length - 1) {
						i = eIndexOf.call(set[0], args[index]);
						if (i === -1) {
							return;
						}
						path.push(set, i);
						set = set[1][i];
						++index;
					}
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					id = set[1][i];
					set[0].splice(i, 1);
					set[1].splice(i, 1);
					while (!set[0].length && path.length) {
						i = path.pop();
						set = path.pop();
						set[0].splice(i, 1);
						set[1].splice(i, 1);
					}
				}
				delete cache[id];
			},
			clear: function () {
				map = [];
				cache = create$7(null);
			}
		};
	};

	var get1 = function () {
		var lastId = 0, argsMap = [], cache = [];
		return {
			get: function (args) {
				var index = eIndexOf.call(argsMap, args[0]);
				return index === -1 ? null : cache[index];
			},
			set: function (args) {
				argsMap.push(args[0]);
				cache.push(++lastId);
				return lastId;
			},
			delete: function (id) {
				var index = eIndexOf.call(cache, id);
				if (index !== -1) {
					argsMap.splice(index, 1);
					cache.splice(index, 1);
				}
			},
			clear: function () {
				argsMap = [];
				cache = [];
			}
		};
	};

	var create$6  = Object.create;

	var getFixed = function (length) {
		var lastId = 0, map = [[], []], cache = create$6(null);
		return {
			get: function (args) {
				var index = 0, set = map, i;
				while (index < length - 1) {
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) return null;
					set = set[1][i];
					++index;
				}
				i = eIndexOf.call(set[0], args[index]);
				if (i === -1) return null;
				return set[1][i] || null;
			},
			set: function (args) {
				var index = 0, set = map, i;
				while (index < length - 1) {
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
						set[1].push([[], []]);
					}
					set = set[1][i];
					++index;
				}
				i = eIndexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
				}
				set[1][i] = ++lastId;
				cache[lastId] = args;
				return lastId;
			},
			delete: function (id) {
				var index = 0, set = map, i, path = [], args = cache[id];
				while (index < length - 1) {
					i = eIndexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					path.push(set, i);
					set = set[1][i];
					++index;
				}
				i = eIndexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				id = set[1][i];
				set[0].splice(i, 1);
				set[1].splice(i, 1);
				while (!set[0].length && path.length) {
					i = path.pop();
					set = path.pop();
					set[0].splice(i, 1);
					set[1].splice(i, 1);
				}
				delete cache[id];
			},
			clear: function () {
				map = [[], []];
				cache = create$6(null);
			}
		};
	};

	var call     = Function.prototype.call;

	var map = function (obj, cb/*, thisArg*/) {
		var result = {}, thisArg = arguments[2];
		validCallable(cb);
		forEach$1(obj, function (value, key, targetObj, index) {
			result[key] = call.call(cb, thisArg, value, key, targetObj, index);
		});
		return result;
	};

	var ensureCallable = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

	var byObserver = function (Observer) {
		var node = document.createTextNode(''), queue, currentQueue, i = 0;
		new Observer(function () {
			var callback;
			if (!queue) {
				if (!currentQueue) return;
				queue = currentQueue;
			} else if (currentQueue) {
				queue = currentQueue.concat(queue);
			}
			currentQueue = queue;
			queue = null;
			if (typeof currentQueue === 'function') {
				callback = currentQueue;
				currentQueue = null;
				callback();
				return;
			}
			node.data = (i = ++i % 2); // Invoke other batch, to handle leftover callbacks in case of crash
			while (currentQueue) {
				callback = currentQueue.shift();
				if (!currentQueue.length) currentQueue = null;
				callback();
			}
		}).observe(node, { characterData: true });
		return function (fn) {
			ensureCallable(fn);
			if (queue) {
				if (typeof queue === 'function') queue = [queue, fn];
				else queue.push(fn);
				return;
			}
			queue = fn;
			node.data = (i = ++i % 2);
		};
	};

	var nextTick = (function () {
		// Node.js
		if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
			return process.nextTick;
		}

		// queueMicrotask
		if (typeof queueMicrotask === "function") {
			return function (cb) { queueMicrotask(ensureCallable(cb)); };
		}

		// MutationObserver
		if ((typeof document === 'object') && document) {
			if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
			if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
		}

		// W3C Draft
		// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
		if (typeof setImmediate === 'function') {
			return function (cb) { setImmediate(ensureCallable(cb)); };
		}

		// Wide available standard
		if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
			return function (cb) { setTimeout(ensureCallable(cb), 0); };
		}

		return null;
	}());

	var slice = Array.prototype.slice, apply$1 = Function.prototype.apply, create$5 = Object.create;

	registeredExtensions.async = function (tbi, conf) {
		var waiting = create$5(null)
		  , cache = create$5(null)
		  , base = conf.memoized
		  , original = conf.original
		  , currentCallback
		  , currentContext
		  , currentArgs;

		// Initial
		conf.memoized = _defineLength(function (arg) {
			var args = arguments, last = args[args.length - 1];
			if (typeof last === "function") {
				currentCallback = last;
				args = slice.call(args, 0, -1);
			}
			return base.apply(currentContext = this, currentArgs = args);
		}, base);
		try { mixin(conf.memoized, base); }
		catch (ignore) {}

		// From cache (sync)
		conf.on("get", function (id) {
			var cb, context, args;
			if (!currentCallback) return;

			// Unresolved
			if (waiting[id]) {
				if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback];
				else waiting[id].push(currentCallback);
				currentCallback = null;
				return;
			}

			// Resolved, assure next tick invocation
			cb = currentCallback;
			context = currentContext;
			args = currentArgs;
			currentCallback = currentContext = currentArgs = null;
			nextTick(function () {
				var data;
				if (hasOwnProperty.call(cache, id)) {
					data = cache[id];
					conf.emit("getasync", id, args, context);
					apply$1.call(cb, data.context, data.args);
				} else {
					// Purged in a meantime, we shouldn't rely on cached value, recall
					currentCallback = cb;
					currentContext = context;
					currentArgs = args;
					base.apply(context, args);
				}
			});
		});

		// Not from cache
		conf.original = function () {
			var args, cb, origCb, result;
			if (!currentCallback) return apply$1.call(original, this, arguments);
			args = from_1(arguments);
			cb = function self(err) {
				var cb, args, id = self.id;
				if (id == null) {
					// Shouldn't happen, means async callback was called sync way
					nextTick(apply$1.bind(self, this, arguments));
					return undefined;
				}
				delete self.id;
				cb = waiting[id];
				delete waiting[id];
				if (!cb) {
					// Already processed,
					// outcome of race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
					return undefined;
				}
				args = from_1(arguments);
				if (conf.has(id)) {
					if (err) {
						conf.delete(id);
					} else {
						cache[id] = { context: this, args: args };
						conf.emit("setasync", id, typeof cb === "function" ? 1 : cb.length);
					}
				}
				if (typeof cb === "function") {
					result = apply$1.call(cb, this, args);
				} else {
					cb.forEach(function (cb) { result = apply$1.call(cb, this, args); }, this);
				}
				return result;
			};
			origCb = currentCallback;
			currentCallback = currentContext = currentArgs = null;
			args.push(cb);
			result = apply$1.call(original, this, args);
			cb.cb = origCb;
			currentCallback = cb;
			return result;
		};

		// After not from cache call
		conf.on("set", function (id) {
			if (!currentCallback) {
				conf.delete(id);
				return;
			}
			if (waiting[id]) {
				// Race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
				if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback.cb];
				else waiting[id].push(currentCallback.cb);
			} else {
				waiting[id] = currentCallback.cb;
			}
			delete currentCallback.cb;
			currentCallback.id = id;
			currentCallback = null;
		});

		// On delete
		conf.on("delete", function (id) {
			var result;
			// If false, we don't have value yet, so we assume that intention is not
			// to memoize this call. After value is obtained we don't cache it but
			// gracefully pass to callback
			if (hasOwnProperty.call(waiting, id)) return;
			if (!cache[id]) return;
			result = cache[id];
			delete cache[id];
			conf.emit("deleteasync", id, slice.call(result.args, 1));
		});

		// On clear
		conf.on("clear", function () {
			var oldCache = cache;
			cache = create$5(null);
			conf.emit(
				"clearasync", map(oldCache, function (data) { return slice.call(data.args, 1); })
			);
		});
	};

	var forEach = Array.prototype.forEach, create$4 = Object.create;

	// eslint-disable-next-line no-unused-vars
	var primitiveSet = function (arg/*, …args*/) {
		var set = create$4(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};

	// Deprecated

	var isCallable = function (obj) { return typeof obj === "function"; };

	var validateStringifiable = function (stringifiable) {
		try {
			if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
			return String(stringifiable);
		} catch (e) {
			throw new TypeError("Passed argument cannot be stringifed");
		}
	};

	var validateStringifiableValue = function (value) { return validateStringifiable(validValue(value)); };

	var safeToString = function (value) {
		try {
			if (value && isCallable(value.toString)) return value.toString();
			return String(value);
		} catch (e) {
			return "<Non-coercible to string value>";
		}
	};

	var reNewLine = /[\n\r\u2028\u2029]/g;

	var toShortStringRepresentation = function (value) {
		var string = safeToString(value);
		// Trim if too long
		if (string.length > 100) string = string.slice(0, 99) + "…";
		// Replace eventual new lines
		string = string.replace(reNewLine, function (char) {
			return JSON.stringify(char).slice(1, -1);
		});
		return string;
	};

	var isPromise_1 = isPromise;
	var default_1 = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}
	isPromise_1.default = default_1;

	var create$3 = Object.create
	  , supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");

	registeredExtensions.promise = function (mode, conf) {
		var waiting = create$3(null), cache = create$3(null), promises = create$3(null);

		if (mode === true) {
			mode = null;
		} else {
			mode = validateStringifiableValue(mode);
			if (!supportedModes[mode]) {
				throw new TypeError("'" + toShortStringRepresentation(mode) + "' is not valid promise mode");
			}
		}

		// After not from cache call
		conf.on("set", function (id, ignore, promise) {
			var isFailed = false;

			if (!isPromise_1(promise)) {
				// Non promise result
				cache[id] = promise;
				conf.emit("setasync", id, 1);
				return;
			}
			waiting[id] = 1;
			promises[id] = promise;
			var onSuccess = function (result) {
				var count = waiting[id];
				if (isFailed) {
					throw new Error(
						"Memoizee error: Detected unordered then|done & finally resolution, which " +
							"in turn makes proper detection of success/failure impossible (when in " +
							"'done:finally' mode)\n" +
							"Consider to rely on 'then' or 'done' mode instead."
					);
				}
				if (!count) return; // Deleted from cache before resolved
				delete waiting[id];
				cache[id] = result;
				conf.emit("setasync", id, count);
			};
			var onFailure = function () {
				isFailed = true;
				if (!waiting[id]) return; // Deleted from cache (or succeed in case of finally)
				delete waiting[id];
				delete promises[id];
				conf.delete(id);
			};

			var resolvedMode = mode;
			if (!resolvedMode) resolvedMode = "then";

			if (resolvedMode === "then") {
				var nextTickFailure = function () { nextTick(onFailure); };
				// Eventual finally needs to be attached to non rejected promise
				// (so we not force propagation of unhandled rejection)
				promise = promise.then(function (result) {
					nextTick(onSuccess.bind(this, result));
				}, nextTickFailure);
				// If `finally` is a function we attach to it to remove cancelled promises.
				if (typeof promise.finally === "function") {
					promise.finally(nextTickFailure);
				}
			} else if (resolvedMode === "done") {
				// Not recommended, as it may mute any eventual "Unhandled error" events
				if (typeof promise.done !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'done' " +
							"in 'done' mode"
					);
				}
				promise.done(onSuccess, onFailure);
			} else if (resolvedMode === "done:finally") {
				// The only mode with no side effects assuming library does not throw unconditionally
				// for rejected promises.
				if (typeof promise.done !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'done' " +
							"in 'done:finally' mode"
					);
				}
				if (typeof promise.finally !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'finally' " +
							"in 'done:finally' mode"
					);
				}
				promise.done(onSuccess);
				promise.finally(onFailure);
			}
		});

		// From cache (sync)
		conf.on("get", function (id, args, context) {
			var promise;
			if (waiting[id]) {
				++waiting[id]; // Still waiting
				return;
			}
			promise = promises[id];
			var emit = function () { conf.emit("getasync", id, args, context); };
			if (isPromise_1(promise)) {
				if (typeof promise.done === "function") promise.done(emit);
				else {
					promise.then(function () { nextTick(emit); });
				}
			} else {
				emit();
			}
		});

		// On delete
		conf.on("delete", function (id) {
			delete promises[id];
			if (waiting[id]) {
				delete waiting[id];
				return; // Not yet resolved
			}
			if (!hasOwnProperty.call(cache, id)) return;
			var result = cache[id];
			delete cache[id];
			conf.emit("deleteasync", id, [result]);
		});

		// On clear
		conf.on("clear", function () {
			var oldCache = cache;
			cache = create$3(null);
			waiting = create$3(null);
			promises = create$3(null);
			conf.emit("clearasync", map(oldCache, function (data) { return [data]; }));
		});
	};

	var apply = Function.prototype.apply;

	registeredExtensions.dispose = function (dispose, conf, options) {
		var del;
		validCallable(dispose);
		if ((options.async && registeredExtensions.async) || (options.promise && registeredExtensions.promise)) {
			conf.on("deleteasync", del = function (id, resultArray) {
				apply.call(dispose, null, resultArray);
			});
			conf.on("clearasync", function (cache) {
				forEach$1(cache, function (result, id) {
	 del(id, result);
	});
			});
			return;
		}
		conf.on("delete", del = function (id, result) {
	 dispose(result);
	});
		conf.on("clear", function (cache) {
			forEach$1(cache, function (result, id) {
	 del(id, result);
	});
		});
	};

	var maxTimeout = 2147483647;

	var validTimeout = function (value) {
		value = toPosInteger(value);
		if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
		return value;
	};

	var noop = Function.prototype, max = Math.max, min = Math.min, create$2 = Object.create;

	registeredExtensions.maxAge = function (maxAge, conf, options) {
		var timeouts, postfix, preFetchAge, preFetchTimeouts;

		maxAge = validTimeout(maxAge);
		if (!maxAge) return;

		timeouts = create$2(null);
		postfix =
			(options.async && registeredExtensions.async) || (options.promise && registeredExtensions.promise)
				? "async"
				: "";
		conf.on("set" + postfix, function (id) {
			timeouts[id] = setTimeout(function () { conf.delete(id); }, maxAge);
			if (typeof timeouts[id].unref === "function") timeouts[id].unref();
			if (!preFetchTimeouts) return;
			if (preFetchTimeouts[id]) {
				if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
			}
			preFetchTimeouts[id] = setTimeout(function () {
				delete preFetchTimeouts[id];
			}, preFetchAge);
			if (typeof preFetchTimeouts[id].unref === "function") preFetchTimeouts[id].unref();
		});
		conf.on("delete" + postfix, function (id) {
			clearTimeout(timeouts[id]);
			delete timeouts[id];
			if (!preFetchTimeouts) return;
			if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
			delete preFetchTimeouts[id];
		});

		if (options.preFetch) {
			if (options.preFetch === true || isNaN(options.preFetch)) {
				preFetchAge = 0.333;
			} else {
				preFetchAge = max(min(Number(options.preFetch), 1), 0);
			}
			if (preFetchAge) {
				preFetchTimeouts = {};
				preFetchAge = (1 - preFetchAge) * maxAge;
				conf.on("get" + postfix, function (id, args, context) {
					if (!preFetchTimeouts[id]) {
						preFetchTimeouts[id] = "nextTick";
						nextTick(function () {
							var result;
							if (preFetchTimeouts[id] !== "nextTick") return;
							delete preFetchTimeouts[id];
							conf.delete(id);
							if (options.async) {
								args = from_1(args);
								args.push(noop);
							}
							result = conf.memoized.apply(context, args);
							if (options.promise) {
								// Supress eventual error warnings
								if (isPromise_1(result)) {
									if (typeof result.done === "function") result.done(noop, noop);
									else result.then(noop, noop);
								}
							}
						});
					}
				});
			}
		}

		conf.on("clear" + postfix, function () {
			forEach$1(timeouts, function (id) { clearTimeout(id); });
			timeouts = {};
			if (preFetchTimeouts) {
				forEach$1(preFetchTimeouts, function (id) { if (id !== "nextTick") clearTimeout(id); });
				preFetchTimeouts = {};
			}
		});
	};

	var create$1 = Object.create, hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	var lruQueue = function (limit) {
		var size = 0, base = 1, queue = create$1(null), map = create$1(null), index = 0, del;
		limit = toPosInteger(limit);
		return {
			hit: function (id) {
				var oldIndex = map[id], nuIndex = ++index;
				queue[nuIndex] = id;
				map[id] = nuIndex;
				if (!oldIndex) {
					++size;
					if (size <= limit) return;
					id = queue[base];
					del(id);
					return id;
				}
				delete queue[oldIndex];
				if (base !== oldIndex) return;
				while (!hasOwnProperty$1.call(queue, ++base)) continue; //jslint: skip
			},
			delete: del = function (id) {
				var oldIndex = map[id];
				if (!oldIndex) return;
				delete queue[oldIndex];
				delete map[id];
				--size;
				if (base !== oldIndex) return;
				if (!size) {
					index = 0;
					base = 1;
					return;
				}
				while (!hasOwnProperty$1.call(queue, ++base)) continue; //jslint: skip
			},
			clear: function () {
				size = 0;
				base = 1;
				queue = create$1(null);
				map = create$1(null);
				index = 0;
			}
		};
	};

	registeredExtensions.max = function (max, conf, options) {
		var postfix, queue, hit;

		max = toPosInteger(max);
		if (!max) return;

		queue = lruQueue(max);
		postfix = (options.async && registeredExtensions.async) || (options.promise && registeredExtensions.promise)
			? "async" : "";

		conf.on("set" + postfix, hit = function (id) {
			id = queue.hit(id);
			if (id === undefined) return;
			conf.delete(id);
		});
		conf.on("get" + postfix, hit);
		conf.on("delete" + postfix, queue.delete);
		conf.on("clear" + postfix, queue.clear);
	};

	var create = Object.create, defineProperties = Object.defineProperties;

	registeredExtensions.refCounter = function (ignore, conf, options) {
		var cache, postfix;

		cache = create(null);
		postfix = (options.async && registeredExtensions.async) || (options.promise && registeredExtensions.promise)
			? "async" : "";

		conf.on("set" + postfix, function (id, length) {
	 cache[id] = length || 1;
	});
		conf.on("get" + postfix, function (id) {
	 ++cache[id];
	});
		conf.on("delete" + postfix, function (id) {
	 delete cache[id];
	});
		conf.on("clear" + postfix, function () {
	 cache = {};
	});

		defineProperties(conf.memoized, {
			deleteRef: d_1(function () {
				var id = conf.get(arguments);
				if (id === null) return null;
				if (!cache[id]) return null;
				if (!--cache[id]) {
					conf.delete(id);
					return true;
				}
				return false;
			}),
			getRefCount: d_1(function () {
				var id = conf.get(arguments);
				if (id === null) return 0;
				if (!cache[id]) return 0;
				return cache[id];
			})
		});
	};

	var memoizee = function (fn/*, options*/) {
		var options = normalizeOptions(arguments[1]), length;

		if (!options.normalizer) {
			length = options.length = resolveLength(options.length, fn.length, options.async);
			if (length !== 0) {
				if (options.primitive) {
					if (length === false) {
						options.normalizer = primitive;
					} else if (length > 1) {
						options.normalizer = getPrimitiveFixed(length);
					}
				} else if (length === false) options.normalizer = get();
					else if (length === 1) options.normalizer = get1();
					else options.normalizer = getFixed(length);
			}
		}

		// Assure extensions
		if (options.async) 
		if (options.promise) 
		if (options.dispose) 
		if (options.maxAge) 
		if (options.max) 
		if (options.refCounter) 

		return plain(fn, options);
	};

	const foo = memoizee(() => {});

	foo();
	foo();

}());
