class Employee{
    constructor(_id, _tknv, _name, _email, _password, _ngaylam, _luongcb, _chucvu, _giolam) {
        this.id = _id;
        this.tknv = _tknv;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.ngaylam = _ngaylam;
        this.luongcb = + _luongcb;
        this.chucvu = _chucvu;
        this.giolam = + _giolam;
        this.tongluong = 0;
        this.loaiNV = '';
    }
    tinhTongLuong() {
        switch (this.chucvu) {
            case "Giám đốc":
                this.tongluong = this.luongcb * 3;
                break;
            case "Trưởng phòng":
                this.tongluong = this.luongcb * 2;
                break;
            default:
                this.tongluong = this.luongcb;
        }
    }
    xepLoai() {
        if (this.giolam >= 192) this.loaiNV = "Xuất sắc";
        else if (this.giolam >= 176) this.loaiNV = "Giỏi";
        else if (this.giolam >= 160) this.loaiNV = "Khá";
        else this.loaiNV = "Trung bình";
    }
}
export default Employee;