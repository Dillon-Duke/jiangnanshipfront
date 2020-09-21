export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '姓名',
    prop: 'contName',
    search: true
  }, {
    label: '工号',
    prop: 'contNumber'
  }, {
    label: '电话',
    prop: 'contPhone'
  }, {
    label: '所属部门',
    prop: 'contDeptName'
  }]
}
