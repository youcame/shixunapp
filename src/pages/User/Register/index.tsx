import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import {userRegisterUsingPOST} from "@/services/shixunapp/userController";
import {useEmotionCss} from "@ant-design/use-emotion-css";
import { SYSTEM_LOGO } from '@/constant';

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  //提交表单
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    //验证
    const {userPassword, checkPassword} = values;
    if(userPassword !== checkPassword){
      const defaultRegisterFailedMessage = '注册失败，两次密码输入的不一样~';
      message.error(defaultRegisterFailedMessage);
      return;
    }
    try {
      // 注册
      const res = await userRegisterUsingPOST(values);
      if (res?.data && res?.data >= 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        //原本为“redirect || '/'”
        history.push('/user/login');
        return;
      }else{
        throw new Error(`register error id = ${res?.data}`);
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <div>
        <LoginForm
          style={{textAlign: "center"}}
          submitter={{
            searchConfig:{
              submitText:'注册'
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="用户注册"
          subTitle={'在这里注册你的账户呦~'}
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs activeKey={type} onChange={setType} centered>
            <Tabs.TabPane key="account" tab={'用户注册页面'} style={{justifyContent: "center"}}/>
          </Tabs>

          {status === 'error' && (
            <RegisterMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },

                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码必须大于8位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder="请确认输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入确认密码！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '确认密码必须大于8位！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
