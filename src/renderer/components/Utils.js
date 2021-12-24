window.DrawingBoard = typeof DrawingBoard !== "undefined" ? DrawingBoard : {};


DrawingBoard.Utils = {};

export function EventS(){

	let _events = {};

	return {
		bind(event, fct){
			_events[event] = _events[event]	|| [];
			_events[event].push(fct);
		},
		unbind(event, fct){
			if( event in _events === false  ) {
				return;
			}

			_events[event].splice(_events[event].indexOf(fct), 1);
		},
		trigger(event){
			if( event in _events === false  ) {
				return;
			}

			for(var i = 0; i < _events[event].length; i++){
				_events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	}
};

DrawingBoard.Utils._boxBorderSize = function($el, withPadding, withMargin, direction) {
	withPadding = !!withPadding || true;
	withMargin = !!withMargin || false;
	var width = 0,
		props;
	if (direction == "width") {
		props = ['border-left-width', 'border-right-width'];
		if (withPadding) props.push('padding-left', 'padding-right');
		if (withMargin) props.push('margin-left', 'margin-right');
	} else {
		props = ['border-top-width', 'border-bottom-width'];
		if (withPadding) props.push('padding-top', 'padding-bottom');
		if (withMargin) props.push('margin-top', 'margin-bottom');
	}
	for (var i = props.length - 1; i >= 0; i--)
		width += parseInt($el.css(props[i]).replace('px', ''), 10);
	return width;
};

DrawingBoard.Utils.boxBorderWidth = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'width');
};

DrawingBoard.Utils.boxBorderHeight = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'height');
};

DrawingBoard.Utils.isColor = function(string) {
	if (!string || !string.length) return false;
	return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(string) || $.inArray(string.substring(0, 3), ['rgb', 'hsl']) !== -1;
};

/**
 * Packs an RGB color into a single integer.
 */
DrawingBoard.Utils.RGBToInt = function(r, g, b) {
	var c = 0;
	c |= (r & 255) << 16;
	c |= (g & 255) << 8;
	c |= (b & 255);
	return c;
};

/**
 * Returns informations on the pixel located at (x,y).
 */
DrawingBoard.Utils.pixelAt = function(image, x, y) {
	var i = (y * image.width + x) * 4;
	var c = DrawingBoard.Utils.RGBToInt(
		image.data[i],
		image.data[i + 1],
		image.data[i + 2]
	);

	return [
		i, // INDEX
		x, // X
		y, // Y
		c  // COLOR
	];
};

/**
 * Compares two colors with the given tolerance (between 0 and 255).
 */
DrawingBoard.Utils.compareColors = function(a, b, tolerance) {
	if (tolerance === 0) {
		return (a === b);
	}

	var ra = (a >> 16) & 255, rb = (b >> 16) & 255,
		ga = (a >> 8) & 255, gb = (b >> 8) & 255,
		ba = a & 255, bb = b & 255;

	return (Math.abs(ra - rb) <= tolerance)
		&& (Math.abs(ga - gb) <= tolerance)
		&& (Math.abs(ba - bb) <= tolerance);
};

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
}());
