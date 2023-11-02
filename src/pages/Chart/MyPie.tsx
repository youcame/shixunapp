import React from 'react';
import { Pie } from '@ant-design/plots';

const MyPieChart = ({pieData}) => {
  const config = {
    appendPadding: 10,
    data: pieData, // 使用从 chartData.ts 引入的数据
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        // style: {
        //   whiteSpace: 'pre-wrap',
        //   overflow: 'hidden',
        //   textOverflow: 'ellipsis',
        // },
        content: '地区',
      },
    }
  };

  return <Pie {...config} style={{padding: ["0","0","0","0"]}}/>;
};

export default MyPieChart;
