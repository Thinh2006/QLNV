function Nhanvien(
    _taikhoan,
    _hoten,
    _email,
    _matkhau,
    _ngaylam,
    _luongcb,
    _chucvu,
    _giolamtt
) {
    this.taikhoan = _taikhoan;
    this.hoten = _hoten;
    this.email = _email;
    this.matkhau = _matkhau;
    this.ngaylam = _ngaylam;
    this.luongcb = _luongcb;
    this.chucvu = _chucvu;
    this.giolamtt = _giolamtt;
    this.tinhluong = function(){
        if (this.chucvu === "Sếp") {
            return this.luongcb * 3;
        } else if (this.chucvu === "Trưởng phòng") {
            return this.luongcb * 2;
        } else {
            return this.luongcb;
        }
    };
    this.xeploai = function(){
        if (this.giolamtt >= 192) {
            return "Xuất sắc";
        } else if (this.giolamtt >= 176) {
            return "Giỏi";
        } else if (this.giolamtt >= 160) {
            return "Khá";
        } else {
            return "Trung bình";
        }
    };
}
