export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 250,
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
    label: '工程编号',
    prop: 'proCode',
    search: true
  }, {
    label: '物品类别',
    prop: 'goodsType'
  }, {
    label: '分段编号',
    prop: 'goodsCode'
  }, {
    label: '物品重量',
    prop: 'goodsWeight'
  }, {
    label: '物品长',
    prop: 'goodsLength'
  }, {
    label: '物品宽',
    prop: 'goodsWidth'
  }, {
    label: '物品高',
    prop: 'goodsHigh'
  }, {
    label: '物品图片',
    prop: 'goodsSource',
    type: 'upload',
    width: 100,
    listType: 'picture-img'
  }, {
    label: '是否大型分段',
    prop: 'isBigGoods',
    dicData: [
      {
        label: '是',
        value: 1
      }, {
        label: '否',
        value: 0
      }
    ]
  }, {
    label: '是否超长宽高',
    prop: 'isOverSize',
    dicData: [
      {
        label: '正常',
        value: 0
      }, {
        label: '超高',
        value: 1
      }, {
        label: '超宽',
        value: 2
      }, {
        label: '超高宽',
        value: 3
      }
    ]
  }]
}
