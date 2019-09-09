
export var testSun = function(x, y, angle, distance) {
    var result = {};
    angle += 180
    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);

    return result;
}
    