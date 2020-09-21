export const tableOption = {
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 200,
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
    label: '流程定义Key',
    prop: 'definitionKey'
  }, {
    label: '节点名称',
    prop: 'instanceName'
  }, {
    label: '角色名称',
    prop: 'roleName'
  }, {
    label: '用户/角色',
    prop: 'userRole',
    type: 'select',
    dicData: [
      {
        label: '角色',
        value: 2
      }, {
        label: '用户',
        value: 1
      }
    ]
  }, {
    label: '节点标识',
    prop: 'assignCandidate'
  }]
}
