export const getTypeAction = (isView: boolean, isUpdate: boolean) => {
    if (isView) return 'Chi tiết nhân viên'
    if (isUpdate) return 'Chỉnh sửa nhân viên'
    return 'Thêm mới nhân viên'
}