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
    label: '员工头像',
    prop: 'sourceImage',
    type: 'upload',
    width: 100,
    listType: 'picture-img'
  }, {
    label: '用户名',
    prop: 'username',
    search: true
  }, {
    label: '真实姓名',
    prop: 'realName',
    search: true
  }, {
    label: '性别',
    prop: 'sex',
    dicData: [
      {
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 2
      }
    ]
  }, {
    label: '年龄',
    prop: 'age'
  }, {
    label: '手机号码',
    prop: 'phone'
  }, {
    label: '员工角色',
    prop: 'userRoleName'
  }, {
    label: '所属部门',
    prop: 'userDeptName'
  }]
}
