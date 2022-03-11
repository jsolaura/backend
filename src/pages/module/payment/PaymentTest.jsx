import React, {useState} from "react";
import { withUserAgent } from "react-useragent";
import { withRouter } from "react-router-dom";
// import * as queryString from "querystring";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Payment from "../../../components/Payment";

import { PGS, METHODS_FOR_INICIS, QUOTAS_FOR_INICIS_AND_KCP } from "./constans";
import { getMethods, getQuotas } from "./utils";

import {Form, Select, Input, Switch, Button} from 'antd';
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const { Item } = Form;
const { Option } = Select;

function PaymentTest ({ form }) {
    const [methods, setMethods] = useState(METHODS_FOR_INICIS);
    const [quotas, setQuotas] = useState(QUOTAS_FOR_INICIS_AND_KCP);
    const [isQuotaRequired, setIsQuotaRequired] = useState(true);
    const [isDigitalRequired, setIsDigitalRequired] = useState(false);
    const [isVbankDueRequired, setIsVbankDueRequired] = useState(false);
    const [isBizNumRequired, setIsBizNumRequired] = useState(false);
    const { getFieldDecorator, validateFieldsAndScroll, setFieldsValue, getFieldsValue } = form;

    function handleSubmit(e) {
        e.preventDefault();
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                // 가맹점 식별코드
                const userCode = 'imp72861691';
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
            }
        })
    }
    function onChangePg(value) {
        // 결제수단
        const methods = getMethods(value);
        setMethods(methods);
        setFieldsValue({ pay_method: methods[0].value });

        // 할부개월수 설정
        const {pay_method} = getFieldsValue();
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
        const { pg } = getFieldsValue();
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
                    isVbankDueRequired = true;
                }
                isVbankDueRequired = true;
                break
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
        setFieldsValue({ card_quota: quotas[0].value });
    }


    // function callback(response) {
    //     const query = queryString.stringify(response);
    //     history.push(`/payment/result?${query}`);
    // }



    return (
        <div className="paymentTest">
            <p>???</p>

            <Form onSubmit={handleSubmit}>
                <Item label="PG사">
                    {getFieldDecorator('pg', {
                        initialValue: 'html5_inicis',
                    }) (
                        <Select size="large"
                                onChange={onChangePg}
                                suffixIcon={<FontAwesomeIcon icon={faCheck} />}>
                            {PGS.map(pg => {
                                const { value, label } = pg;
                                return <Option value={value} key={value}>{label}</Option>
                            })}
                        </Select>
                    )}
                </Item>
                <Item label="결제수단">
                    {getFieldDecorator('pay_method', {
                        initialValue: 'card',
                    }) (
                        <Select size="large"
                                onChange={onChangePayMethod}
                                suffixIcon={<FontAwesomeIcon icon={faCheck} />}>
                            {methods.map(pg => {
                                const { value, label } = pg;
                                return <Option value={value} key={value}>{label}</Option>
                            })}
                        </Select>
                    )}
                </Item>
                {isQuotaRequired && (
                    <Item label="할부개월수">
                        {getFieldDecorator('card_quota', {
                            initialValue: 0,
                        }) (
                            <Select size="large"
                                    suffixIcon={<FontAwesomeIcon icon={faCheck} />}>
                                {quotas.map(quota => {
                                    const { value, label } = quotas
                                    return <Option value={value} key={value}>{label}</Option>
                                })}
                            </Select>
                        )}
                    </Item>
                )}
                {isVbankDueRequired && (
                    <Item>
                        {getFieldDecorator('vbank_due', {
                            rules: [{ required: true, message: '입금기한은 필수입력입니다' }],
                        }) (
                            <Input size="large" type="number" addonBefore="입금기한" placeholder="YYYYMMDDhhmm" />,
                        )}
                    </Item>
                )}
                {isBizNumRequired && (
                    <Item>
                        {getFieldDecorator('biz_num', {
                            rules: [{ required: true, message: '사업자번호는 필수입력입니다' }],
                        })(
                            <Input size="large" type="number" addonBefore="사업자번호" />,
                        )}
                    </Item>
                )}
                {isDigitalRequired && (
                    <Item label="실물여부" className="toggle-container">
                        {getFieldDecorator('digital', {
                            valuePropName: 'checked',
                        })(<Switch />)}
                    </Item>
                )}
                <Item label="에스크로" className="toggle-container">
                    {getFieldDecorator('escrow', {
                        valuePropName: 'checked',
                    })(<Switch />)}
                </Item>
                <Item>
                    {getFieldDecorator('name', {
                        initialValue: '아임포트 결제 데이터 분석',
                        rules: [{ required: true, message: '주문명은 필수입력입니다' }],
                    })(
                        <Input size="large" addonBefore="주문명" />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('amount', {
                        initialValue: '39000',
                        rules: [{ required: true, message: '결제금액은 필수입력입니다' }],
                    })(
                        <Input size="large" type="number" addonBefore="결제금액" />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('merchant_uid', {
                        initialValue: `min_${new Date().getTime()}`,
                        rules: [{ required: true, message: '주문번호는 필수입력입니다' }],
                    })(
                        <Input size="large" addonBefore="주문번호" />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyer_name', {
                        initialValue: '홍길동',
                        rules: [{ required: true, message: '구매자 이름은 필수입력입니다' }],
                    })(
                        <Input size="large" addonBefore="이름" />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyer_tel', {
                        initialValue: '01012341234',
                        rules: [{ required: true, message: '구매자 전화번호는 필수입력입니다' }],
                    })(
                        <Input size="large" type="number" addonBefore="전화번호" />,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyer_email', {
                        initialValue: 'example@example.com',
                        rules: [{ required: true, message: '구매자 이메일은 필수입력입니다' }],
                    })(
                        <Input size="large" addonBefore="이메일" />,
                    )}
                </Item>
                <Button type="primary" htmlType="submit">결제하기</Button>
            </Form>
        </div>
    )
}

// const PaymentForm = Form.create({name: 'paymentTest'})(PaymentTest);
export default PaymentTest;