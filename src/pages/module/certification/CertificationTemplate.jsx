import React, {useEffect} from "react";
import jQuery from "jquery";
import './certification.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button , Form, Input, Select, Switch } from "antd";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userCode } from "config";

function CertificationTemplate() {
    const [form] = Form.useForm();

    function onFinish(values) {
        const {
            merchant_uid, name, phone, min_age
        } = values;
        const data = { merchant_uid };
        if (name) {
            data.name = name;
        }
        if (phone) {
            data.phone = phone;
        }
        if (min_age) {
            data.min_age = min_age;
        }
        console.log(data)
        const { IMP } = window;
        IMP.init(userCode);
        IMP.certification(data, callback);
    }
    function callback(response) {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        console.log(response)
        if (success) {
            alert('결제 성공');
            jQuery.ajax({
                url: "/certifications",
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: {
                    imp_uid: response.imp_uid,
                    merchant_uid: response.merchant_uid
                }
            }).done(function (data) {
                // console.log(data);
            });
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    }

    let navigate = useNavigate();
    function goHome () {
        navigate("/");
    }
    function goBack () {
        navigate(-1);
    }
    return (
        <>
            <Wrapper className="certificationWrap">
                <div className="historyContainer">
                    <button onClick={goBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
                </div>
                <Header>
                    <h1>IMPORT Certification Test</h1>
                </Header>
                <FormContainer
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                        merchant_uid: `min_${new Date().getTime()}`,
                }}>
                    <Form.Item name="merchant_uid" label="주문번호" rules={[{ required: true, message: '주문번호는 필수입력입니다.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="이름">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="전화번호">
                        <Input />
                    </Form.Item>
                    <Form.Item name="min_age" label="최소연령">
                        <Input type="number" placeholder="허용 최소 만 나이" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">본인인증하기</Button>
                </FormContainer>
            </Wrapper>
        </>
    )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 2rem;
`;

const FormContainer = styled(Form)`
  width: 400px;
  border-radius: 3px;
  background: #fff;
  padding: 2rem !important;
  color: #333;

  .ant-row {
    margin-bottom: 1rem;
  }
  .ant-form-item {
    display: flex;
    align-items: center;
  }
  .ant-col.ant-form-item-label {
    width: 30%;
    padding: 0 11px;
    text-align: left;
    label {
      color: #888;
      font-size: 0.9rem;
    }
    & + .ant-col.ant-form-item-control-wrapper {
      .ant-form-item-control {
        width: 70%;
        line-height: inherit;
      }
    }
  }
  .ant-col.ant-form-item-label > label::after {
    display: none;
  }
  .ant-row.ant-form-item.toggle-container .ant-form-item-control {
    .ant-form-item-control-input-content {
      flex: none;
      justify-content: flex-start;
        .ant-switch {
          margin: 0;
        }
    }
  
  }

  .ant-form-explain {
    margin-top: 0.5rem;
    margin-left: 9rem;
  }

  .ant-input-group-addon:first-child {
    text-align: left;
    color: #888;
    border: none;
    background-color: inherit;
  }
  .ant-input-group > .ant-input:last-child {
    border-radius: 4px;
  }

  button[type='submit'] {
    width: 100%;
    height: 5rem;
    font-size: 1.6rem;
    margin-top: 2rem;
  }
`;

export default CertificationTemplate;