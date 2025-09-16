import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDeferredValue } from "react"; // React 18+

type InputEl = HTMLInputElement | HTMLTextAreaElement;

export function useInput(initialValue = "") {
  

    // Trạng thái hiện tại
    const [value, setValue] = useState(initialValue);

    // Lưu "giá trị khởi tạo" vào ref để reset nhanh, không lệ thuộc vào render
    const initialRef = useRef(initialValue);

    // (Tuỳ chọn) Nếu prop initialValue thay đổi từ cha -> đồng bộ hoá
    useEffect(() => {
        initialRef.current = initialValue;
        setValue(initialValue);
    }, [initialValue]);

    // Handler ổn định (không tạo mới mỗi render)
    const onChange = useCallback(
        (e: ChangeEvent<InputEl>) => {
            setValue(e.target.value);
        },
        [], // setValue là stable
    );

    const reset = useCallback(() => {
        setValue(initialRef.current);
    }, []);

    // Tránh tạo object mới gây re-render ở child nhận {...bind}
    const bind = useMemo(() => ({ value, onChange }), [value, onChange]);

    // Bản "trì hoãn" để dùng cho tính toán/render nặng (list lớn, filter, v.v.)
    const deferredValue = useDeferredValue(value);

    // Tiện ích nhỏ
    const isDirty = value !== initialRef.current;

    return {
        value,
        setValue,
        onChange,
        reset,
        bind,
        deferredValue,
        isDirty,
    };
}
