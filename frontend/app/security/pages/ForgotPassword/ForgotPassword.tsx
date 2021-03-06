import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form, Icon, Input, PageHeader, Spin} from 'antd';

import {selectIsLoading} from 'reducers';
import {useInjectSecurityReducer} from 'utils/injectReducer';
import {useInjectSaga} from 'utils/injectSaga';
import PageContent from 'components/PageContent';

import {forgotPassword} from 'security/actions';
import saga from 'security/sagas/forgotPassword';


export default function ForgotPassword() {
  useInjectSecurityReducer();
  useInjectSaga({ key: 'forgotPassword', saga: saga });

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const emailInput: any = useRef(null);

  // Not gonna declare event types here. No need. any is fine
  const handleSubmit = (evt?: any) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    const payload = {
      email: emailInput.current.state.value,
    };
    dispatch(forgotPassword.request(payload));
  };

  return (
    <PageContent>
      <Spin tip="Loading..." spinning={isLoading}>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            marginBottom: '20px',
          }}
          title="Forgot Password"
          subTitle="Please enter your email"
        />
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            <Input
              ref={emailInput}
              type="email"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          </Form.Item>
          <Button type="primary" size="default" htmlType="submit">
            Send password reset link
          </Button>
        </Form>
      </Spin>
    </PageContent>
  );
}
