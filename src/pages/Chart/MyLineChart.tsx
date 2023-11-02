import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const MyLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://hzh-1318734603.cos.ap-shanghai.myqcloud.com/zhexian.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('加载数据失败', error);
      });
  };

  const config = {
    data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v: number) => `${(v / 1000).toFixed(1)} K`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  // @ts-ignore
  return <Line {...config} />;
};

export default MyLineChart;
