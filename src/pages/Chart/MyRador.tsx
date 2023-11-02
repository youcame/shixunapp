import React from 'react';
import { Radar } from '@ant-design/plots';

const MyRadar = () => {
  // 数据更新于 2021.01.09
  const data = [
    {
      name: '学习',
      star: 10371,
    },
    {
      name: '吃穿',
      star: 14212,
    },
    {
      name: '体育',
      star: 7414,
    },
    {
      name: '娱乐',
      star: 4321,
    },
    {
      name: '住行',
      star: 8874,
    },
    {
      name: '其他',
      star: 4231,
    },
  ];
  const config = {
    title: "捐款用途",
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: 'name',
    yField: 'star',
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: 'star 数量',
        min: 0,
        nice: true,
        formatter: (v: any) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };

  return <Radar {...config} />;
};

export default MyRadar;
