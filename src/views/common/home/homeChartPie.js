export const optionPie = {
  title: {
    text: '车辆状态统计',
    left: 'center',
    top: '3%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      // 必须要my开头
      myDateChooseTool: {
        show: true,
        title: '请选择车辆类型',
        iconStyle: {
          borderColor: '#6e6e6e'
        },
        icon: 'path://M512,400v51c0,33.636-27.384,61-61.044,61H400c-11.046,0-20-8.954-20-20s8.954-20,20-20h50.956  C462.56,472,472,462.58,472,451v-51c0-11.046,8.954-20,20-20S512,388.954,512,400z M494.343,18.583C482.733,6.6,467.324,0,450.956,0  H400c-11.046,0-20,8.954-20,20s8.954,20,20,20h50.956C462.363,40,472,50.075,472,62v51c0,11.046,8.954,20,20,20s20-8.954,20-20V62  C512,45.755,505.729,30.336,494.343,18.583z M113,472H61.044C49.44,472,40,462.58,40,451v-51c0-11.046-8.954-20-20-20  s-20,8.954-20,20v51c0,33.636,27.384,61,61.044,61H113c11.046,0,20-8.954,20-20S124.046,472,113,472z M113,0H61.044  C44.676,0,29.267,6.6,17.657,18.583C6.271,30.336,0,45.755,0,62v51c0,11.046,8.954,20,20,20s20-8.954,20-20V62  c0-11.925,9.637-22,21.044-22H113c11.046,0,20-8.954,20-20S124.046,0,113,0z M296,236h-20v-20c0-11.046-8.954-20-20-20  s-20,8.954-20,20v20h-20c-11.046,0-20,8.954-20,20v0c0,11.046,8.954,20,20,20h20v20c0,11.046,8.954,20,20,20s20-8.954,20-20v-20h20  c11.046,0,20-8.954,20-20v0C316,244.954,307.046,236,296,236z',
        onclick: function () {
        }
      },
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      magicType: {
        show: true,
        type: ['pie', 'funnel']
      },
      saveAsImage: {
        show: true,
        title: '保存'
      }
    }
  },
  series: {
    name: '数量',
    type: 'pie',
    radius: ['50%', '70%'],
    avoidLabelOverlap: false,
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '20',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: []
  }
}
