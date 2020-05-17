// 使用 Mock
const Mock = require('mockjs');

const barData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    },
  ],
});

module.exports = {
  // 'GET /mock/api/goods/list': barData,

  'POST /api/foo'(req, res) {
    res.json({
      list: [
        { id: 1, age: 29, name: 'anan', job: '前端组长' },
        { id: 2, age: 36, name: 'andy', job: 'BOSS' },
        { id: 3, age: 28, name: 'kevin', job: '前端开发' },
      ],
    });
  },


  'GET /mock/api/data/goods/list': {
    success: true, // 网关层数据返回
    traceId: 'xxxxxxx',
    result: {
      success: true,
      result: {
        list: [{
          id: 1,
          name: 'goods-1'
        }],
        size: '10',
        pageSize: '1',
        total: '100',
      }
    }
  },

};
