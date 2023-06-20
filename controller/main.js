function getelement(selector) {
    return document.querySelector(selector);
}

var dsnv = new DSNV();
getLocalStorage();

function laythongtin(isEdit) {
    var taikhoan = getelement("#tknv").value;
    var hoten = getelement("#name").value;
    var email = getelement("#email").value;
    var matkhau = getelement("#password").value;
    var ngaylam = getelement("#datepicker").value;
    var luongcb = +getelement("#luongCB").value;
    var chucvu = getelement("#chucvu").value;
    var giolamtt = +getelement("#gioLam").value;

    var nhanvien = new Nhanvien(
        taikhoan,
        hoten,
        email,
        matkhau,
        ngaylam,
        luongcb,
        chucvu,
        giolamtt
    );

    // var isValid = true;

    isValid =
        // Kiem tra tai khoan
        kiemTraChuoi(
            taikhoan,
            1,
            undefined,
            "#tbTKNV",
            "Tài khoản không được bỏ trống"
        ) &&
        kiemTraChuoi(
            taikhoan,
            4,
            6,
            "#tbTKNV",
            "Tài khoản phải từ 4 đến 6 ký số"
        ) &&
        kiemTraTK(taikhoan, "#tbTKNV", "Tài khoản đã tồn tại", isEdit) &&
        kiemTraPattern(
            taikhoan,
            /^[0-9]+$/,
            "#tbTKNV",
            "Tài khoản chỉ bao gồm số"
        ) &&
        // Kiem tra ten nhan vien
        kiemTraChuoi(
            hoten,
            1,
            undefined,
            "#tbTen",
            "Tên nhân viên không được bỏ trống"
        ) &&
        kiemTraPattern(
            hoten,
            /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
            "#tbTen",
            "Tên nhân viên phải là chữ"
        ) &&
        // Kiem tra email
        kiemTraChuoi(
            email,
            1,
            undefined,
            "#tbEmail",
            "Email không được bỏ trống"
        ) &&
        kiemTraPattern(
            email,
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "#tbEmail",
            "Không đúng định dạng (vd: ...@gmail.com)"
        ) &&
        // Kiem tra mat khau
        kiemTraChuoi(
            matkhau,
            1,
            undefined,
            "#tbMatKhau",
            "Mật khẩu không được bỏ trống"
        ) &&
        kiemTraChuoi(
            matkhau,
            6,
            10,
            "#tbMatKhau",
            "Mật khẩu phải từ 6-10 ký tự"
        ) &&
        kiemTraPattern(
            matkhau,
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            "#tbMatKhau",
            "Mật khẩu phải chứa ít nhất 1 ký tự thường, 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt"
        ) &&
        // Kiem tra ngay lam
        kiemTraChuoi(
            ngaylam,
            1,
            undefined,
            "#tbNgay",
            "Ngày làm không được bỏ trống"
        ) &&
        kiemTraPattern(
            ngaylam,
            /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/,
            "#tbNgay",
            "Ngày làm phải có định dạng mm/dd/yyyy"
        ) &&
        // Kiem tra luong co ban
        kiemtraSo(
            luongcb,
            1000000,
            20000000,
            "#tbLuongCB",
            "Lương cơ bản không được bỏ trống",
            "Lương cơ bản phải từ 1 000 000 - 20 000 000"
        ) &&
        kiemTraPattern(
            luongcb,
            /^[0-9]+$/,
            "#tbLuongCB",
            "Lương cơ bản phải là số"
        ) &&
        // Kiem tra chuc vu
        kiemtraCV(chucvu, "Chọn chức vụ", "#tbChucVu", "Chưa chọn chức vụ") &&
        // Kiem tra gio lam
        kiemtraSo(
            giolamtt,
            80,
            200,
            "#tbGiolam",
            "Giờ làm không được bỏ trống",
            "Giờ làm phải từ 80 - 200"
        ) &&
        kiemTraPattern(giolamtt, /^[0-9]+$/, "#tbGiolam", "Giờ làm phải là số");

    return isValid ? nhanvien : undefined;
}

getelement("#btnThemNV").onclick = function () {
    var nhanvien = laythongtin(false);

    if (nhanvien) {
        dsnv.themNV(nhanvien);
        hienthi();
        setLocalStorage();
        getelement("#formNV").reset();
    }
};

function hienthi(arrNV = dsnv.arrNV) {
    var content = "";

    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i];
        content += `
            <tr>
                <td>${nv.taikhoan}</td>
                <td>${nv.hoten}</td>
                <td>${nv.email}</td>
                <td>${nv.ngaylam}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tinhluong()}</td>
                <td>${nv.xeploai()}</td>
                <td>
                    <button class = 'btn btn-danger mb-1' onclick = "removeNV('${
                        nv.taikhoan
                    }')">Delete</button>
                    <button data-toggle="modal" data-target="#myModal" class = 'btn btn-success' onclick = "updateNV('${
                        nv.taikhoan
                    }')">Edit</button>
                </td>
            </tr>`;
    }

    getelement("#tableDanhSach").innerHTML = content;
}

function setLocalStorage() {
    var data = JSON.stringify(dsnv.arrNV);
    localStorage.setItem("DSNV", data);
}
function getLocalStorage() {
    var data = localStorage.getItem("DSNV");
    var parsedata = JSON.parse(data);
    if (parsedata) {
        var arr = [];
        for (var i = 0; i < parsedata.length; i++) {
            var nhanvien = parsedata[i];
            var nv = new Nhanvien(
                nhanvien.taikhoan,
                nhanvien.hoten,
                nhanvien.email,
                nhanvien.matkhau,
                nhanvien.ngaylam,
                nhanvien.luongcb,
                nhanvien.chucvu,
                nhanvien.giolamtt
            );
            arr.push(nv);
        }

        dsnv.arrNV = arr;
        hienthi();
    }
}

function removeNV(taikhoan) {
    dsnv.xoaNV(taikhoan);
    hienthi();
    setLocalStorage();
}

function updateNV(taikhoan) {
    var index = dsnv.timNV(taikhoan);
    var nv = dsnv.arrNV[index];

    getelement("#tknv").value = nv.taikhoan;
    getelement("#name").value = nv.hoten;
    getelement("#email").value = nv.email;
    getelement("#password").value = nv.matkhau;
    getelement("#datepicker").value = nv.ngaylam;
    getelement("#luongCB").value = nv.luongcb;
    getelement("#chucvu").value = nv.chucvu;
    getelement("#gioLam").value = nv.giolamtt;
}

getelement("#btnCapNhat").onclick = function () {
    var nhanvien = laythongtin(true);
    dsnv.capnhatNV(nhanvien);
    hienthi();
    setLocalStorage();
    getelement("#formNV").reset();
};

function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

function searching() {
    var arrSearch = [];
    var searchValue = getelement("#searchName").value.toLowerCase();
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var loaiNV = removeAccents(dsnv.arrNV[i].xeploai().toLowerCase());
        if (loaiNV.indexOf(searchValue) !== -1) {
            arrSearch.push(dsnv.arrNV[i]);
        }
    }
    hienthi(arrSearch);
}

getelement("#searchName").addEventListener("keyup", searching);
