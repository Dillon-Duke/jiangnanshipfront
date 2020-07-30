export const tableOption = {
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
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
    label: '流程名称',
    prop: 'actDeployNameValue',
    search: true
  }, {
    label: '流程Key',
    prop: 'actDeployKeyValue'
  }, {
    label: '流程压缩包名',
    prop: 'actZipValue'
  }, {
    label: '流程路径',
    prop: 'actUrlValue'
  }, {
    label: '流程版本',
    prop: 'version'
  }]
}
