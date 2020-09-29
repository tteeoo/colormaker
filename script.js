function invertColor(hex) {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
	}
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid HEX color.');
	}
	var r = parseInt(hex.slice(0, 2), 16);
	var g = parseInt(hex.slice(2, 4), 16);
	var b = parseInt(hex.slice(4, 6), 16);
	var total = r+g+b;
	if (total > 383) {
		return "#000000"
	} else {
		return "#ffffff"
	}
}

colorNames = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "bright-black", "bright-red", "bright-green", "bright-yellow", "bright-blue", "bright-magenta", "bright-cyan", "bright-white"]
var colors = [];

function updateMass() {
	var data = "";
	for (i = 0; i < colors.length; i++) {
		data += CP.HEX(colors[i].get()) + "\n";
	}
	document.getElementById("mass").value = data;
}

function onChange(r, g, b) {
	this.source.value = this.color(r, g, b);
	this.source.style.color = invertColor(CP.HEX(this.get()));
	var list = document.getElementsByClassName(this.colorClass);
	for (var name of list) {
		name.style.backgroundColor = CP.HEX(this.get());
	}
	list = document.getElementsByClassName(this.colorClass + "-fg");
	for (var name of list) {
		name.style.color = CP.HEX(this.get());
	}
	updateMass();
}

function onInputChange() {
	this.set.apply(this, CP.HEX(this.source.value)).enter();
	this.source.style.color = invertColor(CP.HEX(this.get()));
	var list = document.getElementsByClassName(this.colorClass);
	for (var name of list) {
		name.style.backgroundColor = CP.HEX(this.get());
	}
	list = document.getElementsByClassName(this.colorClass + "-fg");
	for (var name of list) {
		name.style.color = CP.HEX(this.get());
	}
	updateMass();
}

for (i = 0; i < colorNames.length; i++) {
	colors[i] = new CP(document.getElementById(colorNames[i] + "-id"));
	colors[i].colorClass = colorNames[i];
}

for (i = 0; i < colors.length; i++) {
	colors[i].on('change', onChange);
	['cut', 'paste', 'keyup', 'input'].forEach(function(name) {
		colors[i].source.addEventListener(name, onInputChange.bind(colors[i]), false);
	});
}
