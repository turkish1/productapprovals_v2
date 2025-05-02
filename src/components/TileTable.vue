<template>
    <div class="lg:w-full min-h-[10px] flex flex-row gap-18" style="margin-left: 10px">
        <table width="100%" align="left">
            <tbody>
                <tr>
                    <td valign="middle">
                        <table style="margin: auto; font-size: large; font-weight: bold; font-family: arial">
                            <tbody>
                                <tr>
                                    <td>Zone 1:</td>
                                    <td><input ref="zone1" readonly="" size="4" name="p1" value="" /> x λ &nbsp;</td>
                                    <td><input ref="lambda1" readonly="" size="4" name="lambda1" value="" /> - Mg:&nbsp;</td>
                                    <td><input ref="mg1" readonly="" size="4" name="mg1" value="" /> = Mr1:&nbsp;</td>
                                    <td><input ref="mr1" readonly="" size="4" name="mr1" value="" /> NOA Mf:&nbsp;</td>
                                    <td>
                                        <input ref="mf1" readonly="" size="4" name="mf1" value="" />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Zone 2:</td>
                                    <td><input ref="zone2" readonly="" size="4" name="p2" value="" /> x λ &nbsp;</td>
                                    <td><input ref="lambda2" readonly="" size="4" name="lambda2" value="" /> - Mg:&nbsp;</td>
                                    <td><input ref="mg2" readonly="" size="4" name="mg2" value="" /> = Mr2:&nbsp;</td>
                                    <td><input ref="mr2" readonly="" size="4" name="mr2" value="" /> NOA Mf:&nbsp;</td>
                                    <td>
                                        <input ref="mf2" readonly="" size="4" name="mf32" value="" />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Zone 3:</td>
                                    <td><input ref="zone3" readonly="" size="4" name="p3" value="" /> x λ</td>
                                    <td><input ref="lambda3" readonly="" size="4" name="lambda3" value="" /> - Mg:&nbsp;</td>
                                    <td><input ref="mg3" readonly="" size="4" name="mg5" value="" /> = Mr3:&nbsp;</td>
                                    <td><input ref="mr3" readonly="" size="4" name="mr3" value="" /> NOA Mf:&nbsp;</td>
                                    <td>
                                        <input ref="mf3" readonly="" size="4" name="mf3" value="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import useExposurec from '@/composables/Tiletables/exposure_c';

import { reactive, ref, watch } from 'vue';
const value = ref(null);

const { zoneData, tables, results, slopes } = useExposurec();
console.log(results);
const zoneone = reactive({
    zone1: '',
    lambda1: '',
    mg1: '',
    mr1: '',
    mf1: ''
});

const zonetwo = reactive({
    zone2: '',
    lambda2: '',
    mg2: '',
    mr2: '',
    mf2: ''
});
const zonethree = reactive({
    zone3: '',
    lambda3: '',
    mg3: '',
    mr3: '',
    mf3: ''
});
watch(zoneone, zonetwo, zonethree, () => {});
</script>

<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 250px;
    /* min-width: 600px; */
    top: 10vh;
}
.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 0;
    border: 1px solid var(--p-inputtext-border-color);
    background: transparent;
    outline-offset: -2px;
    outline-color: transparent;
    border-right: 0 none;
    transition: outline-color 0.3s;
    color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
    outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: var(--p-inputtext-border-color);
}
</style>
