import { PageContainer } from '@ant-design/pro-components';
import {Card, Col, Divider, message, Row, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {getStatisticUsingGET} from "@/services/shixunapp/userDonateController";
import {animated, useSpring} from "react-spring";
import MyRador from './Chart/MyRador';
import MyLineChart from "@/pages/Chart/MyLineChart";
import MyBar from "@/pages/Chart/MyBar";
import MyPie from './Chart/MyPie';
import { pieData,pieData2,pieData3,pieData4 } from '@/constant/chart';

// @ts-ignore
const AnimatedNumber = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 1000 }, // 调整动画持续时间
  });
  const roundedNumber = number.interpolate((val) => val.toFixed(2));
  return <animated.span style={{fontSize: '55px',color: 'orange'}}>{roundedNumber}</animated.span>;
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

  // @ts-ignore
  return (
    <PageContainer>

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
          <Row gutter={16} style={{height: "30px"}} align={"top"}>
            <Col span={16} className="gutter-row">
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
                共有{statistic?.alreadyDonateNum}名捐助者总共捐赠了{statistic?.totalMoney}元，帮助了{statistic?.alreadyReceiveNum}名贫困儿童！
              </p>
            </Col>
            <Col span={8} className="gutter-row">
              <p style={{fontSize: '20px'}}>获得捐款: <AnimatedNumber value={statistic?.totalMoney}/> 元</p>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
          </div>
          <Divider type={"horizontal"}/>
          <Row gutter={[16,16]} style={{height: "30px"}} align={"top"}>
            {/*1*/}
            <Col span={24} className="gutter-row">
              <Card>
                {"数据总览"}
                <MyLineChart/>
              </Card>
            </Col>

            {/*2*/}
            <Col span={16}>
              <Card>
                {"各地区捐款情况"}
                <MyBar/>
              </Card>
            </Col>
            <Col span={8} className="gutter-row">
              <Card>
                {"捐款用途详解"}
                <MyRador/>
              </Card>
            </Col>

              {/*3*/}
            <Col span={6} className="gutter-row">
              <Card size={"small"}>
                <div className="custom-content">儿童地区分布</div>
                <MyPie pieData={pieData}/>
              </Card>
            </Col>

            <Col span={6} className="gutter-row">
              <Card size={"small"}>
                <div className="custom-content">儿童地区分布</div>
                <MyPie pieData={pieData2}/>
              </Card>
            </Col>

            <Col span={6} className="gutter-row">
              <Card size={"small"}>
                <div className="custom-content">儿童地区分布</div>
                <MyPie pieData={pieData3}/>
              </Card>
            </Col>

            <Col span={6} className="gutter-row">
              <Card size={"small"}>
                <div className="custom-content">儿童地区分布</div>
                <MyPie pieData={pieData4}/>
              </Card>
            </Col>
          </Row>
        </div>
    </PageContainer>
  );
};

export default Welcome;
