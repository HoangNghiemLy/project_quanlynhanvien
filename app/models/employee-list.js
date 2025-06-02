class EmployeeList{
    constructor() {
        this.arr = [];
    }
    addEmployee(employee) {
        this.arr.push(employee);
    }
    findIndexEmployee(id) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++){
            const employee = this.arr[i];
            if (employee.id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    removeEmployee(id) {
        const index = this.findIndexEmployee(id);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }
    getEmployeeById(id) {
        const index = this.findIndexEmployee(id);
        if (index !== -1) {
            //tim thay nhan vien
            return this.arr[index];
        }
        return null;
    }
    updateEmployee(employee) {
        const index = this.findIndexEmployee(employee.id);
        if (index !== -1) {
            this.arr[index] = employee;
        }
    }
    searchEmployee(keyword) {
        let findEmployees = [];
        for (let i = 0; i < this.arr.length; i++){
            const employee = this.arr[i];
            const nameLowerCase = employee.loaiNV.toLowerCase();
            const keywordLowerCase = keyword.toLowerCase();

            const index = nameLowerCase.indexOf(keywordLowerCase);
            if (index !== -1) {
                findEmployees.push(employee);
            }
        }
        return findEmployees;
    }
}
export default EmployeeList;