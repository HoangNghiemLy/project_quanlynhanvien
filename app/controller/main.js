import Employee from "./../models/employee.js";
import EmployeeList from "./../models/employee-list.js";
import Validation from "./../models/validation.js";
const validation = new Validation();
//tao doi tuong employeelist tu lop doi tuong EmployeeList
const employeeList = new EmployeeList();

//dom
export const getEle = (id) => {
    return document.getElementById(id);
}
const getValue = () => {
    //lay thong tin nguoi dung
    const id = getEle("id").value
    const tknv = getEle("tknv").value
    const name = getEle("name").value
    const email = getEle("email").value
    const password = getEle("password").value
    const ngaylam = getEle("datepicker").value
    const luongcb = getEle("luongCB").value
    const chucvu = getEle("chucvu").value
    const giolam = getEle("gioLam").value
    //tao flag
    let isValid = true;
    /**
    * Validation
    */
    //validation id
    isValid &= validation.checkEmpty(id, "tbID", "(*) Vui lòng nhập ID") && validation.checkIdExist(id, "tbID", "(*) ID đã tồn tại", employeeList.arr);
    //validation tai khoan
    isValid &= validation.checkEmpty(tknv, "tbTKNV", "(*) Vui lòng nhập tài khoản") && validation.checkCharacterLength(tknv, "tbTKNV", "(*) Tên tài khoản từ 4-6 ký số", 4, 6)
    //validation ten nhan vien
    isValid &= validation.checkEmpty(name, "tbTen", "(*) Vui lòng nhập tên") && validation.checkString(name, "tbTen", "(*) Tên nhân viên phải là chữ cái");
    //validation email
    isValid &= validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập email") && validation.checkEmail(email, "tbEmail", "(*) Vui lòng nhập đúng định dạng email");
    //validation password
    isValid &= validation.checkEmpty(password,"tbMatKhau","(*) Vui lòng nhập mật khẩu") && validation.checkPassword(password,"tbMatKhau","(*) Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt") && validation.checkCharacterLength(password,"tbMatKhau","(*) Mật khẩu từ 6-10 ký tự",6,10)
    //check date
    isValid &= validation.checkEmpty(ngaylam, "tbNgay", "(*) Vui lòng nhập ngày làm") && validation.checkDate(ngaylam, "tbNgay", "(*) Vui lòng nhập đúng định dạng mm/dd/yyyy");
    //check luong cb
    isValid &=
        validation.checkEmpty(luongcb, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản") && validation.checkLuong(luongcb, "tbLuongCB", "(*) Lương cơ bản phải từ 1.000.000 đến 20.000.000");
    //check select
    isValid &= validation.checkSelectOption("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ hợp lệ");
    //check gio lam
    isValid &= validation.checkEmpty(giolam, "tbGiolam", "(*) Vui lòng nhập giờ làm") && validation.checkGiolam(giolam, "tbGiolam", "(*) Số giờ làm trong tháng phải từ 80 - 200 giờ");


    if (!isValid) return;
    //tao doi tuong employee tu lop doi tuong Employee

    const employee = new Employee(
        id,
        tknv,
        name,
        email,
        password,
        ngaylam,
        luongcb,
        chucvu,
        giolam
    );
    //goi phuong thuc tinh tuong luong va xep loai
    employee.tinhTongLuong();
    employee.xepLoai();
    return employee;
}
/**
 * resetForm()
 */
const resetForm = () => {
    getEle("employeeForm").reset();
}
/**
 * render list employee
 */
const renderEmployeeList = (data) => {
    /**
     * Hien thi danh sach nhan vien
     * 0. Tao bien contentHTML = ""
     * 1. Duyet mang arr
     *  1.1. Lay duoc employee tu mang arr (employee=arr[i])
     *  1.2. Tao dong & cot => tich luy vao contentHTML += <tr></tr>
     * 2. Dom toi body gan contentHTML vao
     */
    let contentHTML = ""
    let stt = 0;
    for (let i = 0; i < data.length; i++) {
        stt++;
        const employee = data[i];
        contentHTML += `
            <tr>
                <td>${stt}</td>
                <td>${employee.id}</td>
                <td>${employee.tknv}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.ngaylam}</td>
                <td>${employee.chucvu}</td>
                <td>${employee.tongluong}</td>
                <td>${employee.loaiNV}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="onEditEmployee('${employee.id}')">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="onDeleteEmployee('${employee.id}')" >Delete</button>
                </td>
            </tr>
        `
        getEle("tableDanhSach").innerHTML = contentHTML;
    }
}
/**
 * Luu du lieu xuong localStorage
 */
const setLocalStorage = (data) => {
    const dataString = JSON.stringify(data);
    localStorage.setItem("EMPLOYEE_LIST", dataString);
}
/**
 * Lay du lieu tu localStorage len
 */
const getLocalStorage = (key) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) {
        return;
    }
    //chuyen string thanh mang
    const dataJSon = JSON.parse(dataString);
    //gan du lieu vao mang arr cua employeeList
    employeeList.arr = dataJSon;
    //goi lai ham renderEmployeeList de hien thi lai ds 
    renderEmployeeList(employeeList.arr);
}
/**
 * Add new employee
 */
getLocalStorage("EMPLOYEE_LIST");
getEle("btnThemNV").onclick = function () {
    //goi toi phuong thuc addEmployee() de them nhan vien moi vao danh sach
    const employee = getValue();

    if (!employee) return;
    //goi phuong thuc addEmployee() de them nhan vien moi vao danh sach
    employeeList.addEmployee(employee);
    //render ra ds
    renderEmployeeList(employeeList.arr);
    //luu du lieu xuong localStorage 
    setLocalStorage(employeeList.arr);
    //reset form
    resetForm();
    //close modal
    document.getElementById("btnDong").click();
}
/**
 * Xu ly khi click them nhan vien thi nut cap nhat nhan vien bien mat
 */
getEle("btnThem").onclick = function () {
    //an di nut cap nhat
    getEle("btnCapNhat").style.display = "none";
    //Hien thi title cua modal
    getEle("header-title").innerHTML = "Thêm nhân viên";
    //hien thi nut them 
    getEle("btnThemNV").style.display = "block";
    //xu ly id
    getEle("id").disabled = false;
    //clear form
    resetForm();
}
/**
 * Ham xu ly su kien cap nhat han vien
 */
const onEditEmployee = (id) => {
    //cap nhat title cua modal
    getEle("header-title").innerHTML = "Cập nhật nhân viên";
    //ẩn nút thêm
    getEle("btnThemNV").style.display = "none";
    //hiển thị nút cập nhật
    getEle("btnCapNhat").style.display = "block";
    //lay thong tin chi tiet cua nhan vien mong muon cap nhat bang id
    const employee = employeeList.getEmployeeById(id);
    if (employee) {
        //dom toi cac the input tren modal => show du lieu cua employee
        getEle("id").value = employee.id;
        //dom toi id => disabled (khong duoc sua id)
        getEle("id").disabled = true;
        getEle("tknv").value = employee.tknv;
        getEle("name").value = employee.name;
        getEle("email").value = employee.email;
        getEle("password").value = employee.password;
        getEle("datepicker").value = employee.ngaylam;
        getEle("luongCB").value = employee.luongcb;
        getEle("chucvu").value = employee.chucvu;
        getEle("gioLam").value = employee.giolam;
    }
}
/**
 * Khai bap onEditEmployee() ra doi tuong window
 */
window.onEditEmployee = onEditEmployee;
/**
 * cap nhat nhan vien
 */
getEle("btnCapNhat").onclick = function () {
    const employee = getValue();
    //cap nhat thong tin nhan vien
    employeeList.updateEmployee(employee);
    //render lai danh sach
    renderEmployeeList(employeeList.arr);
    //luu lai data moi xuong localStorage
    setLocalStorage(employeeList.arr);
    //close modal
    document.getElementById("btnDong").click();
}
/**
 * Ham xu ly su kien xoa nhan vien
 */
const onDeleteEmployee = (id) => {
    employeeList.removeEmployee(id);
    //goi lai ham render
    renderEmployeeList(employeeList.arr);
    //luu du lieu vao localStorage
    setLocalStorage(employeeList.arr);
}
/**
 * Khai bao onDeleteEmployee() ra doi tuong window
 */
window.onDeleteEmployee = onDeleteEmployee;
/**
 * tim kiem nhan vien theo loai
 */
getEle("searchName").addEventListener("keyup", () => {
    const keyword = getEle("searchName").value;
    const findEmployees = employeeList.searchEmployee(keyword);
    renderEmployeeList(findEmployees);
});