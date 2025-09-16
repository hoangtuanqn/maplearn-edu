import { KeyboardEvent, useState } from "react";

export default function useCapsLockWarning() {
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        const caps = e.getModifierState && e.getModifierState("CapsLock");
        setIsCapsLockOn(caps);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setIsFocused(false);
        setIsCapsLockOn(false); // reset khi blur
    };

    return {
        isCapsLockOn: isFocused && isCapsLockOn,
        handleKeyEvent,
        handleFocus,
        handleBlur,
    };
}
