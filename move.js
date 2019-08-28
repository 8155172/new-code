function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name]
    } else {
        return getComputedStyle(obj, false)[name]
    }
}
// -----------------------------------------------------------------

function startMove(obj,json,fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for (var attr in json){
            var cur = 0
            if (attr == "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
            } else {
                cur = parseInt(getStyle(obj, attr))
            }
            var speed = (json[attr] - cur) / 10
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 设置运动
            if (json[attr] == cur) {
                clearInterval(obj.timer)
                if (fnEnd) {
                    fnEnd()
                }
            } else {
                if (attr == "opacity") {
                    cur += speed;
                    obj.style.opacity = cur / 100
                    obj.style.filter = " alpha(opacity=" + cur + ");"
                } else {
                    obj.style[attr] = cur + speed + 'px'
                }
            }
        }

    }, 30)
}