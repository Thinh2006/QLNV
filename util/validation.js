function kiemTraChuoi(value, minLength, maxLength, selector, msg) {
    if (
        value.trim().length < minLength ||
        value.trim().length > Number(maxLength)
    ) {
        getelement(selector).innerHTML = msg;
        return false;
    }

    getelement(selector).innerHTML = "";
    return true;
}

function kiemTraTK(value, selector, msg, isEdit) {
    if (isEdit) return true;
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var tk = dsnv.arrNV[i].taikhoan;
        if (value === tk) {
            getelement(selector).innerHTML = msg;
            return false;
        }
    }
    getelement(selector).innerHTML = "";
    return true;
}

function kiemTraPattern(value, pattern, selector, msg) {
    if (!pattern.test(value)) {
        getelement(selector).innerHTML = msg;
        return false;
    }
    getelement(selector).innerHTML = "";
    return true;
}

function kiemtraSo(value, min, max, selector, msg1, msg2, msg3) {
    if (value === +"") {
        getelement(selector).innerHTML = msg1;
        return false;
    } else if (value <= min || value >= max) {
        getelement(selector).innerHTML = msg2;
        return false;
    }
    getelement(selector).innerHTML = "";
    return true;
}

function kiemtraCV(value, error, selector, msg) {
    if (value === error) {
        getelement(selector).innerHTML = msg;
        return false;
    }
    getelement(selector).innerHTML = "";
    return true;
}