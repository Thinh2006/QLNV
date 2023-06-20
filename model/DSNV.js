function DSNV() {
    this.arrNV = [];

    this.timNV = function (taikhoan) {
        for (var i = 0; i < this.arrNV.length; i++) {
            if (this.arrNV[i].taikhoan === taikhoan) {
                return i;
            }
        }
        return -1;
    };

    this.themNV = function (nhanvien) {
        this.arrNV.push(nhanvien);
    };

    this.xoaNV = function (taikhoan) {
        var index = this.timNV(taikhoan);
        if (index !== -1) {
            this.arrNV.splice(index, 1);
        }
    };

    this.capnhatNV = function (nhanvien) {
        var index = this.timNV(nhanvien.taikhoan);
        if (index !== -1) {
            this.arrNV[index] = nhanvien;
        } else {
            alert(`So tai khoan ${nhanvien.taikhoan} khong ton tai`);
        }
    };

}
