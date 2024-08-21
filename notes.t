// onMounted(() => {
    //     console.log(proccesedValue);

    //     const noa = async () =>
    //         DataService.getNoas(proccesedValue)
    //             .then((response) => {
    //                 noaNum.value = response.data.result;
    //                 console.log(response);
    //             })
    //             .catch((e) => {
    //                 error.value = e;
    //                 console.log(error.value);
    //             });
    //     noa();
    //     console.log(noaNum.value);
    //     return noaNum.value;
    // });
  // const noas = computedAsync(
    //     async () => {
    //         return await DataService.getNoas()
    //             .then((response) => {
    //                 noaNum.value = response.data.result;
    //                 console.log(response);
    //                 finish();
    //             })
    //             .catch((e) => {
    //                 error.value = e;
    //                 console.log(error.value);
    //             });
    //     },
    //     null,
    //     { lazy: true, evaluating }
    //     // initial state
    // );

    // onMounted(() => {
    //     const noa = async () =>
    //         await DataService.getNoas()
    //             .then((response) => {
    //                 noaNum.value = response.data.result;
    //                 console.log(response);
    //             })
    //             .catch((e) => {
    //                 error.value = e;
    //                 console.log(error.value);
    //             });
    //     noa();
    //     finish();
    //     return noaNum.value;
    // });

    // function getdata() {
    //     const noa = async () =>
    //         DataService.getNoas()
    //             .then((response) => {
    //                 noaNum.value = response.data;
    //                 console.log(response.data, noaNum.value);
    //             })
    //             .catch((e) => {
    //                 error.value = e;
    //                 console.log(error.value);
    //             });
    //     noa();

    //     finish();
    //     console.log(noaNum.value);
    //     return noaNum.value;
    // }

// function reactives(target) {
//     console.log(inputshingle._object.inputshingle);

//     const handler = {
//         // for (let i = 0; )
//         get(target, key, receiver) {
//             console.log(key, target, receiver);
//             return Reflect.get(target, key, receiver);
//         }
//     };
//     return new Proxy(target, handler);
// }
// let newShingle = inputshingle._object.inputshingle;
// let prod = reactives(newShingle);




const selectedDeck = ref();
        const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);

const { types, typeSize, holdSize } = useDripSize;

 const selectedValue = ref(null);
 // const { hold, types, error, holdSize, typeSize } = useDripSize();
        // const { slopes, slopetypeless, slopetypemore, isSlopeLessFour, isSlopeMoreFour, isSelectVisible1, validateSlope, isSelectVisible2 } = useSlope(slope.value);
        const selectDripEdge = ref();
        const selectDripEdgeSize = ref();
        const selectedless = ref();
        const selectedmore = ref();

        const selectedAttachment = ref(null);

        // watchEffect(() => {
        //     if (selectedValue.value) {
        //         if (selectedValue.value.label === 'Galvanized Steel Metal ¹') {
        //             typeSize.value = holdSize.value.size1;
        //         }
        //         if (selectedValue.value.label === 'Stainless Steel Metal ²') {
        //             typeSize.value = holdSize.value.size2;
        //         }
        //         if (selectedValue.value.label === 'Aluminum Metal ³') {
        //             typeSize.value = holdSize.value.size3;
        //         }
        //         if (selectedValue.value.label === 'Copper Metal ⁴') {
        //             typeSize.value = holdSize.value.size4;
        //         }
        //     } else {
        //         console.log('The element not mounted yet');
        //     }

        // });



        return {
            valueEntered,
            onMounted,
            selectedValue,
            selectedAttachment,
            selectedless,
            selectedmore,

            selectDripEdgeSize,

            selectDripEdge,
            isDialog,
            selectedDeck,
            type,
            slope,
            height,
            area

        };

  // function finish() {
        // results.value = noaNum.value;
        // let use = noaNum.value.forEach((item, index) => {
        //     let num = Number(input.value);
        //     console.log(item, num);
        //     if (item.noa === num) {
        //         (shingleData.applicant = item.applicant), (shingleData.material = item.material), (shingleData.description = item.description), (shingleData.expiration_date = item.expiration_date);
        //     }
        // });
        // return use;
    // }
    // finish();
     // payload = JSON.stringify(containerNoa.value);
        // console.log(payload);
        // const noa = async () =>
        //     DataService.getNoas(18061905)
        //         .then((response) => {
        //             console.log(response);
        //             noaNum.value = response.data.result;
        //             console.log(noaNum.value);
        //         })
        //         .catch((e) => {
        //             error.value = e;
        //             console.log(error.value);
        //         });
        // noa();
        // console.log(noaNum.value);
        // return noaNum.value;
   //     console.log(values);
    //     if (values) {
    //         for (let i = 0; i < values.length; i++) {
    //             results.value.push({
    //                 noa: values[i].noa,
    //                 applicant: values[i].applicant,
    //                 material: values[i].material,
    //                 description: values[i].description,
    //                 expiration_date: values[i].expiration_date
    //             });
    //         }
    //         console.log(results.value);
    //     } else {
    //         console.log('No values found');
    //     }
    // }

   // const apiUrl = `https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/shinglenoa?noa=${payload.value}`;

        // ld = axios
        //     .get(apiUrl)
        //     .then(function (response) {
        //         noaNum.value = response.data;
        //         console.log(response.data, noaNum.value);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });



  function callServerlessFunction() {
        try {
            const response = fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': 'LduI7j9z7Iwppo1AbxE9TBz2z2lJFZZFF3MU5ZFCbfxHU8wMlyCjvz0pWMByVH5n' // Optional, if required
                },
                body: JSON.stringify({
                    param: proccesedValue.value // Body parameters
                })
            });

            const data = response;
            console.log('Function response:', data);
        } catch (error) {
            console.error('Error calling function:', error);
        }
    }


        //      syst.forEach((item, index) => {
                //     console.log(item, index);
                // });


        // if (selectedBur.value === '') {
        //     syst = '';
        // } else if (selectedBur.value === 'SBS Modified Hot-Mopped Applied Systems') {
        //     syst = sys[0].systemHM;
        // } else if (selectedBur.value === 'SBS/APP Modified Heat-Weld Bitumen Membrane') {
        // syst = sys[0].systemHW;
        // } else if (selectedBur.value === 'SBS Modified Bitumen Self-Adhered Membrane') {
        //     console.log(selectedSystem.value);

        // let iterator1 = syst.entries();

        // console.log(sys.findIndex(selectedSystem.value));
        // syst = sys[0].systemSA;
        // syst.forEach((item, index) => {
        //     console.log(item, index);
        // });

        //     this.burSyss = this.system.systemSA
        //     let s = selectedSystem.value
        //     console.log(s)
        //     if (s <= 4) {
        //         this.savedPrime = this.system.p1_four
        //         this.savedPerimeter = this.system.p2_four

        //     }
        //     else if (4 > s) {
        //         this.savedPrime = this.system.p1_five
        //         this.savedPerimeter = this.system.p2_five

        //     }

 <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                        fill="var(--primary-color)"
                    />
                    <mask id="mask0_1413_1551" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">
                        <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="var(--primary-color)" />
                    </mask>
                    <g mask="url(#mask0_1413_1551)">
                        <path
                            d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z"
                            fill="var(--primary-color)"
                        />
                    </g> -->
                </svg>


// const email = useField('email', function (value) {
//     if (!value) return 'this field is required';

//     const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!regex.test(String(value).toLowerCase())) {
//         return 'Please enter a valid email address';
//     }
//     return { email: email.value, emailError: email.errorMessage };
// });

// const [email, emailAttrs] = defineField('email');
// const phone = defineField('phone');
// const folio = defineField('folio');
// const muni = defineField('muni');
// const permit = defineField('address');
// const processnumber = defineField('address');
// const address = defineField('address');

// const passwordConfirm = defineField('passwordConfirm');
// const selectedApplication = ref();

// const type = ref([
//     { name: '', code: ' ' },
//     { name: 'Roofing Permit', code: 'RP' },
//     { name: 'Doors Permit', code: 'DP' },
//     { name: 'Windows Permit', code: 'WP' }
// ]);
 <div class="flex flex-col md:flex-row gap-8" style="margin-left: 320px">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="container">
                    <div class="row">
                        <div class="card flex flex-col gap-4">
                            <div class="font-semibold text-xl">Permit Application</div>
                            <div class="card flex justify-center">
                                <Select v-model="selectedApplication" :options="type" showClear optionLabel="name" placeholder="Select a permit type" class="w-full md:w-56" />
                            </div>
                            <div class="card flex flex-col gap-4">
                                <div class="flex flex-wrap gap-4">
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="addr">Property Address</label>
                                        <InputText id="addr" type="text" v-model="address" placeholder="address" />
                                        <Message severity="error">Property Address Required</Message>
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="muni">Municipality</label>
                                        <InputText id="muni" v-model="muni" type="text" placeholder="municipality" />
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="folio">Folio</label>
                                        <InputText id="folio" v-model="folio" type="text" placeholder="folio" />
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="contractor">Contractor Name</label>
                                        <InputText id="zip" v-model="contractor" type="text" placeholder="name" />
                                        <Message severity="error">Contractor Name Required</Message>
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="permit">Master Permit</label>
                                        <InputText id="permit" type="text" placeholder="20000000" />
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="processnum">mEProcess Number</label>
                                        <InputText id="processnum" v-model="processnumber" type="text" placeholder="process number" />
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="phone">Phone Number</label>
                                        <InputText id="phone" v-model="phone" :error="phoneError" type="text" placeholder="phone" />
                                        <!-- <Message severity="error">Phone Required</Message> -->
                                    </div>

                                    <div class="flex flex-col grow basis-0 gap-3">
                                        <label for="email1">Email</label>
                                        <!-- label="Email" type="email" v-model="email"  id="email1" v-model="email" :error="emailError" type="text"-->
                                        <InputText label="Email" type="email" v-model="email" :error="emailError" placeholder="email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



        const validations = {
            email: (value) => {
                if (value) return 'This is required';
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(String(value).toLowerCase())) {
                    return 'Please enter a valid email address';
                }
                return true;
            },
            name: (value) => {
                const requiredMessage = 'This field is required';
                if (value === undefined || value === null) return requiredMessage;
                if (!String(value).length) return requiredMessage;
                return true;
            },
            address: (value) => {
                const requiredMessage = 'This field is required';
                if (value === undefined || value === null) return requiredMessage;
                if (!String(value).length) return requiredMessage;
                return true;
            }
        };
        console.log(validations);
        const { handleSubmit, errors } = useForm({
            validationSchema: validations
        });

        const { value: email, handleChange } = useField('email');
        const { value: name } = useField('name');
        const { value: address } = useField('address');
        console.log(email);

        const submit = handleSubmit((values) => {
            console.log('submit', values);
        });
        return {
            email,
            name,
            address,

            submit
        };
    }
};


  // function getDrip() {
        //     DataService.getdeMaterial()
        //         .then((response) => {
        //             hold.value = response.data.result.Drip_Edge_Material_Type;
        //             for (let i = 0; i < hold.value.length; i++) {
        //                 types.value.push(hold.value[i]);

        //             }
        //         })
        //         .catch((e) => {
        //             error.value = e;
        //             console.log(error.value);
        //         });
        // }

 <form @submit="submit">
        <BaseInput label="Contractor Name" type="text" v-model="name" :error="errors.name" />

        <BaseInput label="Property Address" type="text" v-model="address" :error="errors.address" />

        <BaseInput label="Municipality" type="text" v-model="municipality" :error="municipalityError" />

        <BaseInput label="Folio" type="text" v-model="folio" />

        <BaseInput label="Email" type="email" :modelValue="email" @change="handleChange" :error="errors.email" />

        <BaseInput label="Phone" type="text" v-model="phone" />

        <BaseInput label="Master Permit" type="text" v-model="permit" />

        <BaseInput label="mEProcess" type="text" v-model="number" />

        <BaseButton type="submit" class="-fill-gradient"> Submit </BaseButton>
    </form>
