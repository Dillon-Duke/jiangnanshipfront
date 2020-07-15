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
    label: '图片缩略',
    prop: 'sourceImage',
    type: 'upload',
    width: 300,
    listType: 'picture-img'
  }, {
    label: '图片名称',
    prop: 'customName',
    search: true
  }, {
    label: '是否应用',
    prop: 'isUse',
    dicData: [
      {
        label: '应用',
        value: 1
      }, {
        label: '未应用',
        value: 0
      }
    ]
  }]
}
