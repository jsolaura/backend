import React, { useEffect, useState } from "react";
import jQuery from "jquery";
import styled from "styled-components";
import 'antd/dist/antd.css';
import './payment.css';
import {Form, Button, Input, Select, Switch} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import {userCode} from "config";
import {METHODS_FOR_INICIS, PGS, QUOTAS_FOR_INICIS_AND_KCP} from "./constans";
import {getMethods, getQuotas} from "./utils";
import {useNavigate} from "react-router-dom";

const { Option } = Select;

function PaymentTemplate () {

    const [methods, setMethods] = useState(METHODS_FOR_INICIS);
    const [quotas, setQuotas] = useState(QUOTAS_FOR_INICIS_AND_KCP);
    const [isQuotaRequired, setIsQuotaRequired] = useState(true);
    const [isDigitalRequired, setIsDigitalRequired] = useState(false);
    const [isVbankDueRequired, setIsVbankDueRequired] = useState(false);
    const [isBizNumRequired, setIsBizNumRequired] = useState(false);
    const [form] = Form.useForm();
    // useEffect(() => {
    //     const jquery = document.createElement('script');
    //     jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    //     const iamport = document.createElement('script');
    //     iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    //     document.head.appendChild(jquery);
    //     document.head.appendChild(iamport);
    //     return () => {
    //         document.head.removeChild(jquery);
    //         document.head.removeChild(iamport);
    //     }
    // }, [])
    function onFinish (values) {
        // 결제 데이터
        const {
            pg, pay_method, merchant_uid, name, amount, buyer_name, buyer_tel, buyer_email,
            escrow, card_quota, biz_num, vbank_due, digital,
        } = values;

        const data = {pg, pay_method, merchant_uid, name, amount, buyer_name, buyer_tel, buyer_email, escrow,}
        if (pay_method === 'vbank') {
            data.vbank_due = vbank_due;
            if (pg === 'danal_tpay') {
                data.biz_num = biz_num;
            }
        }
        if (pay_method === 'card') {
            if (card_quota !== 0) {
                data.digital = { card_quota: card_quota === 1 ? [] : card_quota}
            }
        }
        if (pay_method === 'phone') {
            data.digital = digital;
        }
        console.log(data);

        const { IMP } = window;
        IMP.init(userCode);
        IMP.request_pay(data, callback);
    }
    function callback(response) {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        console.log(response)
        if (success) {
            alert('결제 성공');
            jQuery.ajax({
                url: "/payments/complete",
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
    function onChangePg(value) {
        // 결제수단
        const methods = getMethods(value);
        setMethods(methods);
        form.setFieldsValue({ pay_method: methods[0].value });

        // 할부개월수 설정
        const pay_method = form.getFieldsValue().pay_method;
        handleQuotas(value, pay_method);

        /* 사업자번호/입금기한 설정 */
        let isBizNumRequired = false;
        let isVbankDueRequired = false;

        if (pay_method === 'vbank') {
            if (value === 'danal_tpay') {
                isBizNumRequired = true;
            }
            isVbankDueRequired = true;
        }
        setIsBizNumRequired(isBizNumRequired);
        setIsVbankDueRequired(isVbankDueRequired);
    }
    function onChangePayMethod(value) {
        const pg = form.getFieldsValue().PG;
        let isQuotaRequired = false;
        let isDigitalRequired = false;
        let isVbankDueRequired = false;
        let isBizNumRequired = false;
        switch (value) {
            case 'card': {
                isQuotaRequired = true;
                break;
            }
            case 'phone': {
                isDigitalRequired = true;
                break
            }
            case 'vbank': {
                if (pg === 'danal_tpay') {
                    isBizNumRequired = true;
                }
                isVbankDueRequired = true;
                break;
            }
            default:
                break;
        }
        setIsQuotaRequired(isQuotaRequired);
        setIsDigitalRequired(isDigitalRequired);
        setIsVbankDueRequired(isVbankDueRequired);
        setIsBizNumRequired(isBizNumRequired);

        // 할부 개월수 설정
        handleQuotas(pg, value);
    }
    function handleQuotas(pg, pay_method) {
        const { isQuotaRequired, quotas } = getQuotas(pg, pay_method);
        setIsQuotaRequired(isQuotaRequired);
        setQuotas(quotas);
        form.setFieldsValue({ card_quota: quotas[0].value });
    }
    function onChangeSwitch(checked) {
        console.log(`switch to ${checked}`);
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


            <Wrapper className="paymentWrap">
            <div className="historyContainer">
                <button onClick={goBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
                {/*<button onClick={goHome}>HOME</button>*/}
            </div>
            <Header>
                <h1>IMPORT Payment Test</h1>
            </Header>
            <FormContainer
                form={form}
                onFinish={onFinish}
                initialValues={{
                    pg: 'html5_inicis',
                    name: '아임포트 결제 데이터 분석',
                    amount: '39000',
                    merchant_uid: `min_${new Date().getTime()}`,
                    buyer_name: '홍길동',
                    buyer_tel: '01012341234',
                    buyer_email: 'example@example.com',
                }}>
                <Form.Item name="PG" label="PG사">
                    <Select showSearch optionFilterProp="children" onChange={onChangePg} placeholder="PG사를 선택하세요">
                        {PGS.map(pg => {
                            const { value, label } = pg;
                            return <Option value={value} key={value}>{label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="pay_method" label="결제수단">
                    <Select onChange={onChangePayMethod} placeholder="결제수단을 선택하세요">
                        {methods.map(pg => {
                            const { value, label } = pg;
                            return <Option value={value} key={value}>{label}</Option>
                        })}
                    </Select>
                </Form.Item>
                {isQuotaRequired && (
                    <Form.Item name="card_quota" label="할부개월수">
                        <Select size="large" placeholder="할부개월수를 선택하세요">
                            {quotas.map(quota => {
                                const { value, label } = quota;
                                return <Option value={value} key={value}>{label}</Option>
                            })}
                        </Select>
                    </Form.Item>
                )}
                {isVbankDueRequired && (
                    <Form.Item name="vbank_due" label="입금기한" rules={[{ required: true, message: '입금기한은 필수입력입니다' }]}>
                        <Input type="number" placeholder="YYYYMMDDhhmm" />
                    </Form.Item>
                )}
                {isBizNumRequired && (
                    <Form.Item name="biz_num" label="사업자번호" rules={[{ required: true, message: '사업자번호는 필수입력입니다' }]}>
                        <Input type="number" />
                    </Form.Item>
                )}
                {isDigitalRequired && (
                    <Form.Item name="digital" label="실물여부" className="toggle-container" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                )}
                <Form.Item name="escrow" label="에스크로" className="toggle-container" valuePropName="checked">
                    <Switch onChange={onChangeSwitch} />
                </Form.Item>
                <Form.Item name="name" label="주문명" rules={[{ required: true, message: '주문명은 필수입력입니다' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="amount" label="결제금액" rules={[{ required: true, message: '결제금액은 필수입력입니다' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="merchant_uid" label="주문번호" rules={[{ required: true, message: '주문번호는 필수입력입니다' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="buyer_name" label="이름" rules={[{ required: true, message: '구매자 이름은 필수입력입니다' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="buyer_tel" label="전화번호" rules={[{ required: true, message: '구매자 전화번호는 필수입력입니다' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="buyer_email" label="이메일" rules={[{ required: true, message: '구매자 이메일은 필수입력입니다' }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">결제하기</Button>
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

export default PaymentTemplate;