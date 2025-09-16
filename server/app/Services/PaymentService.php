<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

abstract class PaymentService
{
    public static function createInvoiceVNPAY($amount, $transactionCode, $urlCallback)
    {
        $vnp_TmnCode    = env('VNPAY_TMN_CODE');
        $vnp_HashSecret = env('VNPAY_HASH_SECRET');
        $vnp_Url        = env('VNPAY_URL');
        $vnp_ReturnUrl  = $urlCallback;

        $vnp_TxnRef   = $transactionCode; //Mã giao dịch thanh toán tham chiếu của merchant
        $vnp_Amount   = (int)$amount; // Số tiền thanh toán
        $vnp_Locale   = 'vn'; //Ngôn ngữ chuyển hướng thanh toán
        $vnp_BankCode = ""; //Mã phương thức thanh toán
        $vnp_IpAddr   = request()->ip(); //IP Khách hàng thanh toán
        $startTime    = date("YmdHis");
        $expire       = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));
        $inputData    = [
            "vnp_Version"    => "2.1.0",
            "vnp_TmnCode"    => $vnp_TmnCode,
            "vnp_Amount"     => $vnp_Amount * 100,
            "vnp_Command"    => "pay",
            "vnp_CreateDate" => $startTime,
            "vnp_CurrCode"   => "VND",
            "vnp_IpAddr"     => $vnp_IpAddr,
            "vnp_Locale"     => $vnp_Locale,
            "vnp_OrderInfo"  => "Thanh toan GD:" . $vnp_TxnRef,
            "vnp_OrderType"  => "other",
            "vnp_ReturnUrl"  => $vnp_ReturnUrl,
            "vnp_TxnRef"     => $vnp_TxnRef,
            "vnp_ExpireDate" => $expire,
        ];

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query    = "";
        $i        = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret); //
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        return [
            'success'     => true,
            'url_payment' => $vnp_Url,
            'message'     => 'Tạo liên kết thanh toán thành công',
        ];
    }

    public static function handleReturnVNPAY(Request $request)
    {
        $vnp_HashSecret = env('VNPAY_HASH_SECRET');
        $inputData      = [];
        $vnp_SecureHash = $request->vnp_SecureHash;
        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i        = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i        = 1;
            }
        }

        $transaction_code = $inputData['vnp_TxnRef'] ?? null;
        if (!$transaction_code) {
            return response()->json(['error' => 'Mã giao dịch không hợp lệ'], 400);
        }
        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        $status = $inputData['vnp_ResponseCode'] ?? null;
        // dd($secureHash == $vnp_SecureHash);
        if ($secureHash == $vnp_SecureHash) {

            if ($status == '00') {
                return [
                    'success'          => true,
                    'transaction_code' => $transaction_code,
                    'message'          => 'Xác minh thành công',
                ];
            } else {
                return [
                    'success'          => false,
                    'transaction_code' => $transaction_code,
                    'message'          => 'Thanh toán thất bại!',
                ];
            }
        } else {
            return [
                'success'          => false,
                'transaction_code' => $transaction_code,
                'message'          => 'Mã bảo mật không hợp lệ',
            ];
        }
    }

    // ZALO PAY
    public static function createInvoiceZaloPay($amount, $transactionCode, $urlCallback)
    {
        $app_id   = env('ZALOPAY_APP_ID');
        $key1     = env('ZALOPAY_KEY1');
        $endpoint = env('ZALOPAY_ENDPOINT');

        $transId    = $transactionCode . "_" . Str::random(4);
        $amount     = (int)$amount;
        $app_user   = "MapLearn"; // ngẫu nhiên, ko quan trọng
        $embed_data = json_encode(["redirecturl" => $urlCallback]);
        $items      = json_encode(['']);

        $data = [
            "appid"       => (int)$app_id,
            "appuser"     => $app_user,
            "apptime"     => round(microtime(true) * 1000), // milliseconds
            "amount"      => $amount,
            "apptransid"  => $transId,
            "embeddata"   => $embed_data,
            "item"        => $items,
            "description" => "Thanh toán đơn hàng #" . $transId,
            "bankcode"    => "zalopayapp",
        ];

        // Tạo chữ ký
        $raw_data    = $data["appid"] . "|" . $data["apptransid"] . "|" . $data["appuser"] . "|" . $data["amount"] . "|" . $data["apptime"] . "|" . $data["embeddata"] . "|" . $data["item"];
        $data["mac"] = hash_hmac("sha256", $raw_data, $key1);

        // Gửi request HTTP POST
        $response = Http::asForm()->post($endpoint, $data);

        $result = $response->json();

        if (isset($result['orderurl'])) {
            return [
                'success'     => true,
                'url_payment' => $result['orderurl'],
                'message'     => 'Tạo liên kết thanh toán thành công',
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Không thể tạo liên kết thanh toán',
                '$result' => $result,
            ];
        }
    }

    public static function handleReturnZaloPay(Request $request)
    {
        $key2 = env('ZALOPAY_KEY2');

        $validated = $request->validate([
            'appid'          => 'required',
            'apptransid'     => 'required',
            'pmcid'          => 'required',
            'bankcode'       => 'nullable',
            'amount'         => 'required',
            'discountamount' => 'required',
            'status'         => 'required',
            'checksum'       => 'required',
        ]);

        $checksumData = implode('|', [
            $validated['appid'],
            $validated['apptransid'],
            $validated['pmcid'],
            $validated['bankcode'],
            $validated['amount'],
            $validated['discountamount'],
            $validated['status'],
        ]);

        $calculatedChecksum = hash_hmac('sha256', $checksumData, $key2);

        if ($calculatedChecksum !== $validated['checksum']) {
            return [
                'success' => false,
                'message' => 'Checksum không hợp lệ',
            ];
        }

        $transaction_code = explode("_", $validated['apptransid'])[0];

        if ($validated['status'] == 1) {
            return [
                'success'          => true,
                'transaction_code' => $transaction_code,
                'message'          => 'Thanh toán thành công',
            ];
        } else {
            return [
                'success'          => false,
                'transaction_code' => $transaction_code,
                'message'          => 'Thanh toán thất bại',
            ];
        }
    }

    // MOMO
    public static function createInvoiceMomo($amount, $transactionCode, $urlCallback)
    {

        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

        $partnerCode = env("MOMO_PARTNER_CODE");
        $accessKey   = env("MOMO_ACCESS_KEY");
        $secretKey   = env("MOMO_SECRET_KEY");
        $orderInfo   = "Thanh toán qua MoMo";
        $amount      = (int)$amount;
        $orderId     = $transactionCode . "_" . Str::random(4);
        $requestId   = $orderId . time() . rand(1, 10000);
        $requestType = "payWithMethod";
        $returnUrl   = $urlCallback;
        $notifyurl   = env("APP_URL_FRONT_END") . "/invoices/notify/momo"; // Chưa quan trọng trên enviroment dev

        // Encode extraData đúng chuẩn base64
        $extraData = base64_encode(json_encode(["merchantName" => "MoMo Partner"]));

        // Tạo chữ ký theo đúng định dạng MoMo yêu cầu
        $rawHash   = "accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$notifyurl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$returnUrl&requestId=$requestId&requestType=$requestType";
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        // Dữ liệu gửi đi
        $data = [
            'partnerCode'  => $partnerCode,
            'partnerName'  => 'Mapstudy.edu.vn - Định vị tri thức - dẫn lối tư duy',
            'storeId'      => $partnerCode . '_1',
            'requestId'    => $requestId,
            'amount'       => $amount,
            'orderId'      => $orderId,
            'orderInfo'    => $orderInfo,
            'redirectUrl'  => $returnUrl,
            'ipnUrl'       => $notifyurl,
            'lang'         => 'vi',
            'requestType'  => $requestType,
            'autoCapture'  => true,
            'extraData'    => $extraData,
            'signature'    => $signature,
            'orderGroupId' => '',
        ];

        $response   = Http::post($endpoint, $data);
        $jsonResult = json_decode($response->getBody(), true);
        if (isset($jsonResult['payUrl'])) {
            return [
                'success'     => true,
                'url_payment' => $jsonResult['payUrl'],
                'message'     => 'Tạo liên kết thanh toán thành công',
            ];
        }
        return [
            'success' => false,
            'message' => 'Không tạo được URL thanh toán MoMo',
        ];
    }
    public static function handleReturnMomo(Request $request)
    {
        $accessKey = env("MOMO_ACCESS_KEY");
        $secretKey = env("MOMO_SECRET_KEY");

        // Lấy tất cả dữ liệu từ MoMo gửi về qua query string
        $data = $request->only([
            'partnerCode',
            'orderId',
            'requestId',
            'amount',
            'orderInfo',
            'orderType',
            'transId',
            'resultCode',
            'message',
            'payType',
            'responseTime',
            'extraData',
            'signature',
        ]);

        // Tạo rawHash theo đúng thứ tự MoMo yêu cầu
        $rawHash = "accessKey={$accessKey}&amount={$data['amount']}&extraData={$data['extraData']}&message={$data['message']}&orderId={$data['orderId']}&orderInfo={$data['orderInfo']}&orderType={$data['orderType']}&partnerCode={$data['partnerCode']}&payType={$data['payType']}&requestId={$data['requestId']}&responseTime={$data['responseTime']}&resultCode={$data['resultCode']}&transId={$data['transId']}";

        // Tính lại chữ ký
        $calculatedSignature = hash_hmac("sha256", $rawHash, $secretKey);

        // So sánh chữ ký
        if ($data['signature'] !== $calculatedSignature) {
            return [
                'success' => false,
                'message' => 'Chữ ký không hợp lệ. Dữ liệu có thể đã bị thay đổi.',
            ];
        }

        // Kiểm tra trạng thái giao dịch
        $transaction_code = explode("_", $data['orderId'])[0];

        // Kiểm tra trạng thái giao dịch
        if ($data['resultCode'] == '0') {
            return [
                'success'          => true,
                'transaction_code' => $transaction_code,
                'message'          => 'Thanh toán thành công!',
            ];
        } else {
            return [
                'success'          => false,
                'transaction_code' => $transaction_code,
                'message'          => 'Thanh toán thất bại!',
            ];
        }
    }
}
