import { ref } from 'vue';

export default function useinputValid() {
    const isValid = ref(false);
    const inp = ref('');
    // const isPhoneValid = ref(false);
    // const isEmailValid = ref(false);
    // const emailPattern = ref('/^[^s@]+@[^s@]+.[^s@]+$/');
    // const phonePattern = ref('/^d{3}-d{3}-d{4}$/');

    function iValid() {
        if (inp.value === '') {
            isValid.value = false;
        } else isValid = true;
    }

    function uValid() {
        isValid.value = true;
    }

    // function emailValid(parm) {
    //     if (emailPattern.value === parm) {
    //         isEmailValid.value = true;
    //     } else isEmailValid.value = false;
    // }
    // function phoneValid(pharm) {
    //     if (phonePatternPattern.value === pharm) {
    //         isPhoneValid.value = true;
    //     } else isPhoneValid.value = false;
    // }

    return {
        isValid,
        inp,
        iValid,
        uValid
        // emailValid,
        // phoneValid,
        // emailPattern,
        // phonePattern
    };
}
