<!-- PermitApplicationPage1.vue -->
<script setup>
import useMuniapp from '@/composables/Postdata/usePostMuniapp';
import SignaturePad from 'signature_pad'; // npm install signature_pad
import { computed, onMounted, reactive, ref, watch } from 'vue';
/**
 * Model matches the visible first-page fields/sections in the PDF:
 * - Permit Request (multi-select)
 * - Property Information (single select)
 * - Applicant Information + Property Address
 * - Permit Type (single select)
 * - Code timeline opt-in/out (F.S.553.79(16)) selection
 * - Work description + valuation + sq ft
 * - Owner/qualifier signatures + notary acknowledgements
 */
const { postMuniAppData } = useMuniapp();
const datas = ref(null);
const data = ref('');
const error = ref(null);
const loading = ref(false);

const form = reactive({
    // CHANGED: From object of booleans to a single string
    permitRequest: [],

    propertyInformation: 'residential',

    property: {
        propertyAddress: '',
        unit: '',
        city: '',
        state: 'FL',
        zip: '',
        parcelFolio: '',
        masterPermit: '',
        recertOrViolationNo: ''
    },

    applicant: {
        applicantType: '',
        name: '',
        licenseNumber: '',
        contractorLicenseNumber: '',
        driversLicenseOrStateId: '',
        address: '',
        suite: '',
        city: '',
        state: 'FL',
        zip: '',
        daytimePhone: '',
        email: ''
    },

    permitType: 'building',

    timelineElection: '',
    typeOfWork: '',
    work: {
        valueOfWork: 0,
        areaOfWorkSqFt: '',
        // CHANGED: Grouped into a single selection
        // typeOfWork: '',
        descriptionOfWork: '',
        occupancyClassification: ''
    },

    owner: {
        name: '',
        email: '',
        daytimePhone: '',
        signatureName: '',
        signatureDate: ''
    },

    masterPermitContractorOfRecord: {
        name: '',
        licenseNumber: '',
        email: '',
        daytimePhone: ''
    },

    signatures: {
        ownerAgentOrGC: '',
        qualifier: '',
        printedOwnerAgentOrGC: '',
        printedQualifier: ''
    },

    notary1: {
        state: '',
        county: '',
        day: '',
        month: '',
        year: '',
        byName: '',
        physicalPresence: true,
        onlineNotarization: false,
        notarySignature: '',
        notaryPrintedName: '',
        seal: false,
        personallyKnown: '',
        producedIdentification: ''
    },

    notary2: {
        state: '',
        county: '',
        day: '',
        month: '',
        year: '',
        byName: '',
        physicalPresence: true,
        onlineNotarization: false,
        notarySignature: '',
        notaryPrintedName: '',
        seal: false,
        personallyKnown: '',
        producedIdentification: ''
    }
});
const formStagingData = reactive({
    address: '',
    muni: '',
    license: '',
    folio: '',
    contractor: '',
    permit: '',
    processNumber: '',
    phNumber: '',
    emails: '',
    muniProc: '',
    historic: Boolean,
    date: new Date(),
    checkIfBeach: 0
});
const permitMuniAppPdf = reactive({
    dba: '',
    applicantLicense: '',
    jobaddress: '',
    municipality: '',
    muniprocessnumber: '',
    processnumber: '',
    masterpermit: '',
    license: '',
    email: '',
    name: '',
    driversLicense: '',
    state: '',
    zip: '',
    contractorLic: '',
    permitType: '',
    propertyUse: '',
    timelineElection: '',
    workValue: '',
    descriptionOfWork: '',
    areaOfWork: '',
    signature: ''
});
const errors = reactive({ timelineElection: '' });
const inputAddress = ref('');

const isValid = computed(() => {
    return !!form.timelineElection; // PDF shows it as Required
});
watch(
    () => form.permitRequest,
    (newVal) => {
        console.log('permitRequest changed:', newVal, form.permitRequest.newPermit);
    },
    { immediate: true }
);
// Add this to your <script setup>
watch(
    () => form.notary1.physicalPresence,
    (val) => {
        if (val) form.notary1.onlineNotarization = false;
    }
);
watch(
    () => form.notary1.onlineNotarization,
    (val) => {
        if (val) form.notary1.physicalPresence = false;
    }
);

// Repeat for notary2 if they are separate signers
watch(
    () => form.notary2.physicalPresence,
    (val) => {
        if (val) form.notary2.onlineNotarization = false;
    }
);
watch(
    () => form.notary2.onlineNotarization,
    (val) => {
        if (val) form.notary2.onlineNotarization = false;
    }
);
watch(
    () => form.property,
    (newVal) => {
        console.log('property changed:', newVal, form.property.propertyAddress);
    },
    { immediate: true }
);
function validate() {
    errors.timelineElection = form.timelineElection ? '' : 'Required: select Opt IN or Opt OUT per F.S.553.79(16).';
    return !errors.timelineElection;
}

async function submit() {
    if (!validate()) return;
    form.property.propertyAddress = inputAddress.value;

    Object.assign(permitMuniAppPdf, {
        applicantLicense: form.applicant.licenseNumber,
        jobaddress: form.property.propertyAddress,
        municipality: form.property.city,
        email: form.applicant.email,
        name: form.applicant.name,
        driversLicense: form.applicant.driversLicenseOrStateId,
        state: form.applicant.state,
        zip: form.applicant.zip,
        contractorLic: form.applicant.contractorLicenseNumber,
        permitType: form.permitType,
        typeOfWork: form.typeOfWork,
        propertyUse: form.propertyInformation,
        timelineElection: form.timelineElection,
        workValue: form.work.valueOfWork,
        descriptionOfWork: form.work.descriptionOfWork,
        areaOfWork: form.work.areaOfWorkSqFt,
        notary1: form.notary1,
        notary2: form.notary2,
        signature: form.signatures
    });

    await postMuniAppData(permitMuniAppPdf);
    console.log('Payload:', JSON.parse(JSON.stringify(form)));
}
async function fetchData(url) {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(url);
        datas.value = await response.json();
        data.value = datas.value.body.MinimumPropertyInfos[0];
        console.log('Property Info', data.value);
        // formData.contractor = glAccount.dba;
        // formData.license = data.value.secondary_status;
        formStagingData.muni = data.value.Municipality;
        formStagingData.folio = data.value.Strap;
        form.property.city = formStagingData.muni;
        form.property.parcelFolio = formStagingData.folio;
        // It seems that I need to add the address in all caps for the historic function work properly.
        // Further investigation pending 08112025
        // isHistoric.value = await datas.value.body.isHistoric;
        // console.log(isHistoric.value);
        // checkV.value = formData.folio;
    } catch (err) {
        alert('No data found or enter correct address!');
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

async function load() {
    try {
        loading.value = true;
        const addr = form.property.propertyAddress.toUpperCase();
        const url = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${addr}`;

        const response = await fetch(url);
        const resData = await response.json();
        const propInfo = resData.body.MinimumPropertyInfos[0];

        form.property.city = propInfo.Municipality;
        form.property.parcelFolio = propInfo.Strap;
    } catch (err) {
        alert('No data found or enter correct address!');
    } finally {
        loading.value = false;
    }
}
function reset() {
    // Simple reset: reload page state by clearing key user-entered fields
    Object.keys(form.permitRequest).forEach((k) => (form.permitRequest[k] = false));
    form.propertyInformation = 'residential';

    Object.assign(form.property, {
        propertyAddress: '',
        unit: '',
        city: '',
        state: 'FL',
        zip: '',
        parcelFolio: '',
        masterPermit: '',
        recertOrViolationNo: ''
    });

    Object.assign(form.applicant, {
        applicantType: 'contractor',
        name: '',
        licenseNumber: '',
        contractorLicenseNumber: '',
        driversLicenseOrStateId: '',
        address: '',
        suite: '',
        city: '',
        state: 'FL',
        zip: '',
        daytimePhone: '',
        email: ''
    });

    form.permitType = 'building';
    form.timelineElection = '';
    Object.assign(form.work, {
        valueOfWork: 0,
        areaOfWorkSqFt: '',
        newConstructionAdditions: false,
        alterationsReconfig: false,
        descriptionOfWork: '',
        occupancyClassification: ''
    });

    Object.assign(form.owner, { name: '', email: '', daytimePhone: '', signatureName: '', signatureDate: '' });
    Object.assign(form.masterPermitContractorOfRecord, { name: '', licenseNumber: '', email: '', daytimePhone: '' });

    Object.assign(form.signatures, {
        ownerAgentOrGC: '',
        qualifier: '',
        printedOwnerAgentOrGC: '',
        printedQualifier: ''
    });

    Object.assign(form.notary1, {
        state: '',
        county: '',
        day: '',
        month: '',
        year: '',
        byName: '',
        physicalPresence: true,
        onlineNotarization: false,
        notarySignature: '',
        notaryPrintedName: '',
        seal: false,
        personallyKnown: '',
        producedIdentification: ''
    });

    Object.assign(form.notary2, JSON.parse(JSON.stringify(form.notary1)));
    errors.timelineElection = '';
}
// Signature Logic
const sigCanvas = ref(null);
let signaturePad = null;

onMounted(() => {
    // Initialize the pad
    signaturePad = new SignaturePad(sigCanvas.value, {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)'
    });
});

const clearSig = () => signaturePad.clear();

const saveSig = () => {
    if (signaturePad.isEmpty()) return alert('Please sign first');

    // Convert to Base64 Image
    const dataURL = signaturePad.toDataURL();
    console.log(dataURL);
    // To make it VERIFIABLE:
    // You store this dataURL AND the user's metadata (IP, timestamp)
    // in your database. DocuSeal does this automatically if you use their API.
    form.signatures.ownerAgentOrGC = dataURL;
    // form.signatures.qualifier = dataURL;
    alert('Signature captured and hashed.');
};
const saveQualifierSig = () => {
    if (signaturePad.isEmpty()) return alert('Please sign first');

    // Convert to Base64 Image
    const dataURL = signaturePad.toDataURL();
    console.log(dataURL);
    // To make it VERIFIABLE:
    // You store this dataURL AND the user's metadata (IP, timestamp)
    // in your database. DocuSeal does this automatically if you use their API.
    form.signatures.qualifier = dataURL;
    alert('Signature captured and hashed.');
};
</script>

<template>
    <div class="permit-page">
        <!-- Header -->
        <header class="top-header">
            <div class="dept">
                <div class="dept-title">Building Department</div>
                <div class="dept-sub">
                    1700 Convention Center Drive, 2nd Floor<br />
                    Miami Beach, Florida 33139<br />
                    Ph: 305.673.7610<br />
                    miamibeachfl.gov/city-hall/building
                </div>
            </div>
            <div class="page-title">
                <div class="doc-title">Permit Application</div>
                <div class="code-in-effect">Code in Effect: Florida Building Code (FBC), 8th Edition (2023)</div>
            </div>
        </header>

        <!-- Two-column top: Permit Request + Property Information -->
        <section class="grid-2">
            <div class="card">
                <div class="card-title">Permit Request (select all that apply)</div>
                <div class="check-grid">
                    <label class="chk"><input type="checkbox" value="newPermit" v-model="form.permitRequest" /> New Permit</label>
                    <label class="chk"><input type="checkbox" value="permitRevision" v-model="form.permitRequest" /> Permit Revision</label>
                    <label class="chk"><input type="checkbox" value="permitRenewal" v-model="form.permitRequest" /> Permit Renewal</label>
                    <label class="chk"><input type="checkbox" value="permitExtension" v-model="form.permitRequest" /> Permit Extension</label>
                    <label class="chk"><input type="checkbox" value="changeOfArchEng" v-model="form.permitRequest" /> Change of Arch/Engr</label>
                    <label class="chk"><input type="checkbox" value="changeOfOwner" v-model="form.permitRequest" /> Change of Owner</label>
                    <label class="chk"><input type="checkbox" value="changeOfContractor" v-model="form.permitRequest" /> Change of Contractor</label>

                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Private Provider</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> City Project</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Affordable Housing</label>
                    <!-- <label class="chk"><input type="checkbox" v-model="form.permitRequest.reprievePermit" /> Reprieve Permit</label> -->
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Reprieve Permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Interior, Non-Structural</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> LEED</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> (SEAL)</label>

                    <div class="divider"></div>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Phased Permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Sub-permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Roofing</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Electrical</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Mechanical</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Plumbing</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Fire</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Generator</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Temp Structure</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Demo year-built</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest" /> Shop Drawings</label>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Property Information (select one)</div>

                <div class="radio-row">
                    <label class="rad">
                        <input type="radio" value="residential" v-model="form.propertyInformation" />
                        Residential: Single-Family Residence/Duplex
                    </label>
                    <label class="rad">
                        <input type="radio" value="commercial" v-model="form.propertyInformation" />
                        Commercial/Condominium
                    </label>
                </div>

                <div class="card-subtitle">Florida Statute 553.79 (16) regarding permit timelines. Please select one (Required):</div>
                <div class="radio-row">
                    <label class="rad">
                        <input type="radio" value="optIn" v-model="form.timelineElection" />
                        Opt IN
                    </label>
                    <label class="rad">
                        <input type="radio" value="optOut" v-model="form.timelineElection" />
                        Opt OUT
                    </label>
                </div>
                <div v-if="errors.timelineElection" class="error">{{ errors.timelineElection }}</div>

                <div
                    class="hint"
                    v-tooltip.bottom="
                        '(16) Except as provided in paragraph (e), a building permit for a single-family residential dwelling must be issued within 30 business days after receiving the permit application unless the permit application fails to satisfy the Florida Building Code or the enforcing agency’s laws or ordinances.(a) If a local enforcement agency fails to issue a building permit for a single-family residential dwelling within 30 business days after receiving the permit application, it must reduce the building permit fee by 10 percent for each business day that it fails to meet the deadline. Each 10-percent reduction shall be based on the original amount of the building permit fee.(b) A local enforcement agency does not have to reduce the building permit fee if it provides written notice to the applicant, by e-mail or United States Postal Service, within 30 business days after receiving the permit application, that specifically states the reasons the permit application fails to satisfy the Florida Building Code or the enforcing agency’s laws or ordinances. The written notice must also state that the applicant has 10 business days after receiving the written notice to submit revisions to correct the permit application and that failure to correct the application within 10 business days will result in a denial of the application.(c) The applicant has 10 business days after receiving the written notice to address the reasons specified by the local enforcement agency and submit revisions to correct the permit application. If the applicant submits revisions within 10 business days after receiving the written notice, the local enforcement agency has 10 business days after receiving such revisions to approve or deny the building permit unless the applicant agrees to a longer period in writing. If the local enforcement agency fails to issue or deny the building permit within 10 business days after receiving the revisions, it must reduce the building permit fee by 20 percent for the first business day that it fails to meet the deadline unless the applicant agrees to a longer period in writing. For each additional business day, but not to exceed 5 business days, that the local enforcement agency fails to meet the deadline, the building permit fee must be reduced by an additional 10 percent. Each reduction shall be based on the original amount of the building permit fee.(d) If any building permit fees are refunded under this subsection, the surcharges provided in s. 468.631 or s. 553.721 must be recalculated based on the amount of the building permit fees after the refund.(e) A building permit for a single-family residential dwelling applied for by a contractor licensed in this state on behalf of a property owner who participates in a Community Development Block Grant–Disaster Recovery program administered by the Department of Economic Opportunity must be issued within 15 working days after receipt of the application unless the permit application fails to satisfy the Florida Building Code or the enforcing agency’s laws or ordinances.'
                    "
                >
                    For more information, hover this text or see attached F.S.553.79(16)
                </div>
            </div>
        </section>

        <!-- Property + Applicant -->
        <!-- <section class="card">
            <div class="card-title">Property Address / Identifiers</div>
            <div class="form-grid">
                <div class="field">
                    <label>Property Address</label>
                    <input v-model="form.property.propertyAddress" type="text" />
                </div>
                <Button type="button" severity="contrast" icon="pi pi-search" style="padding: 0.25rem 0.5rem; width: 20px; height: 30px; margin-top: 20px" :loading="loading" @click="load" />
                <div class="field">
                    <label>Parcel/Folio Number</label>
                    <input v-model="form.property.parcelFolio" type="text" />
                </div>

                <div class="field">
                    <label>City</label>
                    <input v-model="form.property.city" type="text" />
                </div>
                <div class="field xsmall">
                    <label>State</label>
                    <input v-model="form.property.state" type="text" maxlength="2" />
                </div>
                <div class="field small">
                    <label>Zip Code</label>
                    <input v-model="form.property.zip" type="text" />
                </div>

                <div class="field">
                    <label>Master Permit (If applicable)</label>
                    <input v-model="form.property.masterPermit" type="text" />
                </div>
                <div class="field">
                    <label>Recertification and/or Violation No. (If applicable)</label>
                    <input v-model="form.property.recertOrViolationNo" type="text" />
                </div>
            </div>
        </section> -->
        <section class="card">
            <div class="card-title">Property Address / Identifiers</div>
            <div class="form-grid-property">
                <div class="field-property field-address">
                    <label>Property Address</label>
                    <input v-model="form.property.propertyAddress" type="text" />
                </div>

                <Button type="button" severity="contrast" icon="pi pi-search" class="search-btn" :loading="loading" @click="load" />

                <div class="field-property field-parcel">
                    <label>Parcel/Folio Number</label>
                    <input v-model="form.property.parcelFolio" type="text" />
                </div>

                <div class="field-property field-city">
                    <label>City</label>
                    <input v-model="form.property.city" type="text" />
                </div>
                <div class="field-property field-state">
                    <label>State</label>
                    <input v-model="form.property.state" type="text" maxlength="2" />
                </div>
                <div class="field-property field-zip">
                    <label>Zip Code</label>
                    <input v-model="form.property.zip" type="text" />
                </div>
                <div style="grid-column: span 3"></div>

                <div class="field-property field-half">
                    <label>Master Permit (If applicable)</label>
                    <input v-model="form.property.masterPermit" type="text" />
                </div>
                <div class="field-property field-half">
                    <label>Recertification and/or Violation No. (If applicable)</label>
                    <input v-model="form.property.recertOrViolationNo" type="text" />
                </div>
            </div>
        </section>

        <section class="card">
            <div class="card-title">Applicant Information</div>

            <div class="radio-row">
                <label class="rad"><input type="radio" value="contractor" v-model="form.applicant.applicantType" /> Contractor</label>
                <label class="rad"><input type="radio" value="owner" v-model="form.applicant.applicantType" /> Property Owner</label>
                <label class="rad"><input type="radio" value="architect" v-model="form.applicant.applicantType" /> Architect</label>
                <label class="rad"><input type="radio" value="engineer" v-model="form.applicant.applicantType" /> Structural Engineer</label>
            </div>

            <div class="form-grid">
                <div class="field">
                    <label>Name</label>
                    <input v-model="form.applicant.name" type="text" />
                </div>
                <div class="field">
                    <label>License Number</label>
                    <input v-model="form.applicant.licenseNumber" type="text" />
                </div>
                <div class="field">
                    <label>Contractor License Number</label>
                    <input v-model="form.applicant.contractorLicenseNumber" type="text" />
                </div>
                <div class="field">
                    <label>Driver’s License/State Identification</label>
                    <input v-model="form.applicant.driversLicenseOrStateId" type="text" />
                </div>

                <div class="field">
                    <label>Address</label>
                    <input v-model="form.applicant.address" type="text" />
                </div>
                <div class="field small">
                    <label>Suite</label>
                    <input v-model="form.applicant.suite" type="text" />
                </div>
                <div class="field">
                    <label>City</label>
                    <input v-model="form.applicant.city" type="text" />
                </div>
                <div class="field xsmall">
                    <label>State</label>
                    <input v-model="form.applicant.state" type="text" maxlength="2" />
                </div>
                <div class="field small">
                    <label>Zip Code</label>
                    <input v-model="form.applicant.zip" type="text" />
                </div>

                <div class="field">
                    <label>Daytime phone</label>
                    <input v-model="form.applicant.daytimePhone" type="tel" />
                </div>
                <div class="field">
                    <label>E-Mail Address (REQUIRED)</label>
                    <input v-model="form.applicant.email" type="email" />
                </div>
            </div>
        </section>

        <!-- Permit Type + Work -->
        <section class="grid-2">
            <div class="card">
                <div class="card-title">Permit Type (select one)</div>
                <div class="radio-col">
                    <label class="rad"><input type="radio" value="building" v-model="form.permitType" /> Building</label>
                    <label class="rad"><input type="radio" value="electrical" v-model="form.permitType" /> Electrical</label>
                    <label class="rad"><input type="radio" value="mechanical" v-model="form.permitType" /> Mechanical</label>
                    <label class="rad"><input type="radio" value="plumbing" v-model="form.permitType" /> Plumbing</label>
                    <label class="rad"><input type="radio" value="roofing" v-model="form.permitType" /> Roofing</label>
                    <label class="rad"><input type="radio" value="fire" v-model="form.permitType" /> Fire</label>
                </div>

                <div class="field" style="margin-top: 10px">
                    <label>Occupancy Classification</label>
                    <input v-model="form.work.occupancyClassification" type="text" />
                </div>
            </div>

            <div class="card">
                <div class="card-title">Value of Work / Area</div>
                <div class="form-grid">
                    <div class="field">
                        <label>Value of Work ($)</label>
                        <input v-model="form.work.valueOfWork" type="number" placeholder="This amount cannot be changed once submitted" />
                        <div class="hint">Attach a copy of the construction cost affidavit to this form</div>
                    </div>
                    <div class="field">
                        <label>Area of Work (SqFt)</label>
                        <input v-model="form.work.areaOfWorkSqFt" type="text" />
                    </div>
                </div>

                <div class="card-title" style="margin-top: 10px">Type of Work</div>

                <div class="radio-row">
                    <label class="rad">
                        <input type="radio" value="newconstruction" v-model="form.typeOfWork" />
                        New Construction/Additions
                    </label>
                    <label class="rad">
                        <input type="radio" value="alterations" v-model="form.typeOfWork" />
                        Alterations/Reconfig of space
                    </label>
                </div>
                <div class="field">
                    <label>Description of Work</label>
                    <textarea v-model="form.work.descriptionOfWork" rows="4" />
                </div>
            </div>
        </section>

        <!-- Master permit contractor of record -->
        <section class="card">
            <div class="card-title">Master Permit Contractor of Record (For sub-permit / change of contractor)</div>
            <div class="form-grid">
                <div class="field">
                    <label>Name</label>
                    <input v-model="form.masterPermitContractorOfRecord.name" type="text" />
                </div>
                <div class="field">
                    <label>License Number</label>
                    <input v-model="form.masterPermitContractorOfRecord.licenseNumber" type="text" />
                </div>
                <div class="field">
                    <label>E-Mail Address</label>
                    <input v-model="form.masterPermitContractorOfRecord.email" type="email" />
                </div>
                <div class="field">
                    <label>Daytime phone</label>
                    <input v-model="form.masterPermitContractorOfRecord.daytimePhone" type="tel" />
                </div>
            </div>
        </section>

        <!-- Warning + Notice -->
        <section class="card warning">
            <div class="warning-title">WARNING TO OWNER</div>
            <p class="warning-text">
                Your failure to record a Notice of Commencement may result in you paying twice for improvements to your property. A Notice of Commencement is required for any work with cost exceeding $5,000.00 and must be posted at the jobsite prior
                to first inspection.
            </p>
            <div class="card-title" style="margin-top: 8px">Notice & Certification</div>
            <p class="notice">
                This application is hereby made to obtain a permit to do the work and installations as indicated. I certify that all work will be performed to meet the standards of all laws and construction regulations in this jurisdiction. I
                understand separate permits may be required for Electrical, Elevator, Fire, Mechanical, Plumbing, Signs, Wells, Pools, etc. Under penalties of perjury, I declare the facts stated are true.
            </p>
        </section>

        <!-- Signatures -->
        <section class="grid-2">
            <div class="card">
                <div class="card-title">Signatures</div>
                <div class="field">
                    <label>Signature of Owner/Agent or GC (for Sub-permits)</label>
                    <input v-model="form.signatures.ownerAgentOrGC" type="text" placeholder="Type full name for e-signature" />
                </div>
                <div class="field">
                    <label>PRINT NAME</label>
                    <input v-model="form.signatures.printedOwnerAgentOrGC" type="text" />
                </div>
            </div>

            <div class="card">
                <div class="card-title">Qualifier</div>
                <div class="field">
                    <label>Signature of Qualifier</label>
                    <input v-model="form.signatures.qualifier" type="text" placeholder="Type full name for e-signature" />
                </div>
                <div class="field">
                    <label>PRINT NAME</label>
                    <input v-model="form.signatures.printedQualifier" type="text" />
                </div>
            </div>
        </section>

        <!-- Notary blocks (two, as shown on page) -->
        <section class="grid-2">
            <div class="card">
                <div class="card-title">Notary Acknowledgement (1)</div>
                <div class="form-grid">
                    <div class="field"><label>State</label><input v-model="form.notary1.state" /></div>
                    <div class="field"><label>County</label><input v-model="form.notary1.county" /></div>

                    <div class="field small"><label>Day</label><input v-model="form.notary1.day" /></div>
                    <div class="field"><label>Month</label><input v-model="form.notary1.month" /></div>
                    <div class="field small"><label>Year</label><input v-model="form.notary1.year" /></div>

                    <div class="field" style="grid-column: 1 / -1">
                        <label>By</label>
                        <input v-model="form.notary1.byName" />
                    </div>

                    <div class="radio-row" style="grid-column: 1 / -1">
                        <label class="rad"><input type="radio" v-model="form.notary1.physicalPresence" /> physical presence</label>
                        <label class="rad"><input type="radio" v-model="form.notary1.onlineNotarization" /> online notarization</label>
                    </div>

                    <div class="field">
                        <label>Personally known</label>
                        <input v-model="form.notary1.personallyKnown" />
                    </div>
                    <div class="field">
                        <label>Produced Identification</label>
                        <input v-model="form.notary1.producedIdentification" />
                    </div>

                    <div class="field">
                        <label>Signature of Notary Public</label>
                        <input v-model="form.notary1.notarySignature" />
                    </div>
                    <div class="field">
                        <label>PRINT NAME</label>
                        <input v-model="form.notary1.notaryPrintedName" />
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Notary Acknowledgement (2)</div>
                <div class="form-grid">
                    <div class="field"><label>State</label><input v-model="form.notary2.state" /></div>
                    <div class="field"><label>County</label><input v-model="form.notary2.county" /></div>

                    <div class="field small"><label>Day</label><input v-model="form.notary2.day" /></div>
                    <div class="field"><label>Month</label><input v-model="form.notary2.month" /></div>
                    <div class="field small"><label>Year</label><input v-model="form.notary2.year" /></div>

                    <div class="field" style="grid-column: 1 / -1">
                        <label>By</label>
                        <input v-model="form.notary2.byName" />
                    </div>

                    <div class="radio-row" style="grid-column: 1 / -1">
                        <label class="rad"><input type="radio" v-model="form.notary2.physicalPresence" /> physical presence</label>
                        <label class="rad"><input type="radio" v-model="form.notary2.onlineNotarization" /> online notarization</label>
                    </div>

                    <div class="field">
                        <label>Personally known</label>
                        <input v-model="form.notary2.personallyKnown" />
                    </div>
                    <div class="field">
                        <label>Produced Identification</label>
                        <input v-model="form.notary2.producedIdentification" />
                    </div>

                    <div class="field">
                        <label>Signature of Notary Public</label>
                        <input v-model="form.notary2.notarySignature" />
                    </div>
                    <div class="field">
                        <label>PRINT NAME</label>
                        <input v-model="form.notary2.notaryPrintedName" />
                    </div>
                </div>
            </div>
        </section>
        <div class="signature-container">
            <section class="card">
                <div class="card-title">Applicant Signature (Verifiable)</div>
                <div class="signature-wrapper" style="border: 1px solid #000; width: 250px; height: 120px">
                    <canvas ref="sigCanvas" width="230" height="100"></canvas>
                </div>
                <div class="actions" style="margin-top: 5px">
                    <button type="button" @click="clearSig">Clear</button>
                    <button type="button" @click="saveSig">Lock Signature</button>
                </div>
            </section>
            <section class="card">
                <div class="card-title">Qualifier Signature (Verifiable)</div>
                <div class="signature-wrapper" style="border: 1px solid #000; width: 250px; height: 120px">
                    <canvas ref="sigCanvas" width="230" height="100"></canvas>
                </div>
                <div class="actions" style="margin-top: 5px">
                    <button type="button" @click="clearSig">Clear</button>
                    <button type="button" @click="saveQualifierSig">Lock Signature</button>
                </div>
            </section>
        </div>
        <!-- Actions -->
        <footer class="actions">
            <button class="btn" :disabled="!isValid" @click="submit">Submit</button>
            <button class="btn secondary" @click="reset">Reset</button>
        </footer>
    </div>
</template>

<style scoped>
.permit-page {
    max-width: 1350px;
    margin: 18px auto;
    padding: 18px;
    background: #fff;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
}

.top-header {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 12px;
    padding-bottom: 10px;
    border-bottom: 2px solid #111;
}

.dept-title {
    font-weight: 800;
    font-size: 18px;
}
.dept-sub {
    font-size: 12px;
    line-height: 1.25;
    margin-top: 6px;
}
.page-title {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.doc-title {
    font-size: 22px;
    font-weight: 900;
}
.code-in-effect {
    font-size: 12px;
    margin-top: 10px;
}

.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
}

.card {
    border: 1px solid #bfbfbf;
    border-radius: 10px;
    padding: 12px;
}

.card-title {
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 8px;
}

.card-subtitle {
    font-size: 12px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 6px;
}

.check-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 10px;
    font-size: 12px;
}

.chk,
.rad {
    display: flex;
    gap: 8px;
    align-items: center;
    user-select: none;
}

.divider {
    grid-column: 1 / -1;
    height: 1px;
    background: #e2e2e2;
    margin: 6px 0;
}

.radio-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 12px;
}

.radio-col {
    display: grid;
    gap: 8px;
    font-size: 12px;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}
.form-grid-property {
    display: grid;
    /* Create 12 equal columns for maximum layout control */
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    align-items: end; /* Aligns the button with the inputs, not the labels */
}

.field-property {
    display: flex;
    flex-direction: column;
}
.field {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
/* Row 1: Address (span 6), Search (span 1), Parcel (span 5) */
.field-address {
    grid-column: span 6;
}
.search-btn {
    grid-column: span 1;
    margin-bottom: 2px;
} /* Small tweak for alignment */
.field-parcel {
    grid-column: span 5;
}

/* Row 2: City (span 5), State (span 2), Zip (span 2), Empty Space (span 3) */
.field-city {
    grid-column: span 5;
}
.field-state {
    grid-column: span 2;
}
.field-zip {
    grid-column: span 2;
}

/* Row 3: Bottom fields (span 6 each) */
.field-half {
    grid-column: span 6;
}
.field label {
    font-size: 11px;
    font-weight: 700;
}

.field input,
.field textarea {
    border: 1px solid #bfbfbf;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
}

.field input:focus,
.field textarea:focus {
    border-color: #5b5b5b;
}

.field.small {
    grid-column: span 1;
}
.field.xsmall {
    grid-column: span 1;
    max-width: 120px;
}

.hint {
    font-size: 11px;
    margin-top: 8px;
    color: #333;
}

.error {
    margin-top: 6px;
    font-size: 12px;
    color: #b00020;
    font-weight: 700;
}

.warning {
    border: 2px solid #111;
}

.warning-title {
    font-weight: 900;
    font-size: 13px;
}

.warning-text,
.notice {
    font-size: 11px;
    line-height: 1.35;
    margin: 6px 0 0 0;
}

.actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 14px;
}

.btn {
    border: 1px solid #111;
    background: #111;
    color: #fff;
    padding: 10px 14px;
    border-radius: 10px;
    font-weight: 800;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn.secondary {
    background: #fff;
    color: #111;
}
@media (max-width: 980px) {
    .grid-2 {
        grid-template-columns: 1fr;
    }
    .form-grid {
        grid-template-columns: 1fr;
    }
    .top-header {
        grid-template-columns: 1fr;
        text-align: left;
    }
    .page-title {
        text-align: left;
    }
    .check-grid {
        grid-template-columns: 1fr;
    }
}
.signature-container {
    display: flex; /* Activates Flexbox */
    flex-direction: row; /* Aligns items horizontally */
    gap: 390px; /* Adds space between the two cards */
    align-items: flex-start; /* Ensures they align at the top */
}

.card {
    /* Optional: prevents cards from shrinking if the screen is small */
    flex-shrink: 0;
}
</style>
