import { getEle } from "./../controller/main.js";
class Validation{
    checkEmpty(value, idNoti, mess) {
        if (value === "") {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkCharacterLength(value, idNoti, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkIdExist(value, idNoti, mess, arr) {
        let isExist = false;
        for (let i = 0; i < arr.length; i++){
            const employee = arr[i];
            if (employee.id === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkString(value, idNoti, mess) {
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkEmail(value, idNoti, mess) {
        const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkPassword(value, idNoti, mess) {
        const letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(letter)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkDate(value, idNoti, mess) {
        const letter = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (value.match(letter)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkSelectOption(idSelect, idNoti, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }
    checkLuong(value, idNoti, mess) {
        const luongcb = Number(value);
        if (isNaN(luongcb) || luongcb < 1000000 || luongcb > 20000000) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    checkGiolam(value, idNoti, mess) {
        const giolam = Number(value);
        if (isNaN(giolam) || giolam < 80 || giolam > 200) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
}
export default Validation;