import React, {useEffect} from "react";
import jQuery from 'jquery';

const Payment = (effect, deps) => {
    useEffect(() => {
        const jquery = document.createElement('script');
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement('script');
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, [])
    const onClickPayment = () => {
        const IMP = window.IMP;
        IMP.init('imp72861691'); // 가맹점 식별코드
        const data = {
            pg: 'html5_inicis',                                     // PG사
            pay_method: 'card',                                     // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,            // 주문번호
            name: "결제 테스트",                                     // 주문명
            amount: 1000,                                           // 결제금액
            buyer_name: "조경은",                                    // 구매자 이름
            buyer_email: "kyeongni@gmail.com",                      // 구매자 이메일
            buyer_tel: "01056365269",                               // 구매자 전화번호
            buyer_addr: "서울특별시 마포구 서교동",                    // 구매자 주소
            buyer_postcode: "04039"                                 // 구매자 우편번호
        };
        // 결제 창 호출하기
        IMP.request_pay(data, callback);
    }
    function callback(response) {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        console.log(response);
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
                console.log(data);



            });
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    }
    return (
        <>
            <button onClick={onClickPayment}>결제하기</button>
        </>
    );
}
export default Payment;
