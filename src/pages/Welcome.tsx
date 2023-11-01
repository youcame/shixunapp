import { PageContainer } from '@ant-design/pro-components';
import {Card, Col, Divider, message, Row, theme, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {getStatisticUsingGET} from "@/services/shixunapp/userDonateController";
import {G2, Pie} from '@ant-design/plots';
import {animated, useSpring} from "react-spring";

const AnimatedNumber = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 1000 }, // 调整动画持续时间
  });
  const roundedNumber = number.interpolate((val) => val.toFixed(2));
  return <animated.span style={{fontSize: '120px',color: 'orange'}}>{roundedNumber}</animated.span>;
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();

  const [statistic,setStatistic] = useState<API.StatisticVO>()

  const getStatisticInfo = async ()=>{
    const hide = message.loading('正在查找统计数据');
    try {
      const res = await getStatisticUsingGET();
      setStatistic(res?.data)
      hide();
      //message.success('查找成功');
      return true;
    } catch (error: any) {
      hide();
      message.error("查找失败",error?.message);
      return false;
    }
  }
  useEffect(()=>{
    getStatisticInfo();
  },[])


  const DemoPie = () => {
    const G = G2.getEngine('canvas');
    const data = [
      {
        type: '志愿者',
        value: statistic?.volunteerNum || 0,
      },
      {
        type: '儿童',
        value: statistic?.childrenNum||0,
      },
      {
        type: '捐助者',
        value: statistic?.donatorNum||0,
      },
    ];
    const cfg = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      legend: false,
      label: {
        type: 'spider',
        labelHeight: 40,
        formatter: (data, mappingData) => {
          const group = new G.Group({});
          group.addShape({
            type: 'circle',
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              r: 5,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: 'text',
            attrs: {
              x: 10,
              y: 8,
              text: `${data.type}`,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: 'text',
            attrs: {
              x: 0,
              y: 25,
              text: `${data.value}个 ${data.percent * 100}%`,
              fill: 'rgba(0, 0, 0, 0.65)',
              fontWeight: 700,
            },
          });
          return group;
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
    };
    const config = cfg;
    return <Pie {...config} />;
  };

  // @ts-ignore
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            // backgroundImage:
            //   "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 光明筑梦系统
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            光明筑梦系统 是一个致力于帮助贫困儿童的频道，在这里我们搭建了一个平台以便帮助贫困儿童。
            自平台开放以来共注册了{statistic?.donatorNum}名捐助者,{statistic?.childrenNum}名学生,{statistic?.volunteerNum}名志愿者。
            共有{statistic?.alreadyDonateNum}名捐助者总共捐赠了{statistic?.totalMoney}元，帮助了{statistic?.childrenNum}名贫困儿童！
          </p>
          <Divider type={"horizontal"}/>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
          </div>
          <Row>
            <Col span={12}>
              <p style={{fontSize: '30px'}}>获得捐款: <AnimatedNumber value={statistic?.totalMoney}/> 元</p>
            </Col>
            <Col span={12}>
              <Typography.Title>
                <DemoPie/>
              </Typography.Title>
            </Col>
          </Row>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
