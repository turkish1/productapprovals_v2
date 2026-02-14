<!-- PermitApplicationPage1.vue -->
<script setup>
import useMuniapp from '@/composables/Postdata/usePostMuniapp';
import { computed, reactive } from 'vue';
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

const form = reactive({
    permitRequest: {
        newPermit: false,
        permitRevision: false,
        permitRenewal: false,
        permitExtension: false,
        changeOfArchEng: false,
        changeOfOwner: false,
        changeOfContractor: false,
        privateProvider: false,
        cityProject: false,
        affordableHousing: false,
        reprievePermit: false,
        interiorNonStructural: false,
        leed: false,
        seal: false,
        phasedPermit: false,
        subPermit: false,
        roofing: false,
        electrical: false,
        mechanical: false,
        plumbing: false,
        fire: false,
        generator: false,
        tempStructure: false,
        demoYearBuilt: false,
        shopDrawings: false
    },

    propertyInformation: 'residential', // 'residential' | 'commercial'

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
        applicantType: 'contractor', // 'contractor' | 'owner' | 'architect' | 'engineer'
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

    permitType: 'building', // 'building'|'electrical'|'mechanical'|'plumbing'|'roofing'|'fire' etc (keep simple)

    timelineElection: '', // required by PDF: optIn | optOut

    work: {
        valueOfWork: '',
        areaOfWorkSqFt: '',
        newConstructionAdditions: false,
        alterationsReconfig: false,
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

const errors = reactive({ timelineElection: '' });

const isValid = computed(() => {
    return !!form.timelineElection; // PDF shows it as Required
});

function validate() {
    errors.timelineElection = form.timelineElection ? '' : 'Required: select Opt IN or Opt OUT per F.S.553.79(16).';
    return !errors.timelineElection;
}

function submit() {
    if (!validate()) return;
    // Replace with your API call:
    console.log('Permit Application Page 1 payload:', JSON.parse(JSON.stringify(form)));
    alert('Saved (demo). Wire submit() to your backend.');
}
// async function load() {
//     try {
//         loading.value = true;

//         muniProcessdata.value = muniProcess.value;
//         const addr = inputAddress.value.toUpperCase();
//         // This takes in the address as a field which lambda is expecting under the address below.
//         const url = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${addr}`;

//         await fetchData(url);

//         // enrich form
//         Object.assign(formData, {
//             // license: glAccount.licenseStat,
//             dba: glAccount.dba,
//             emails: glAccount.email,
//             muniprocessnumber: muniProcess.value,
//             phonenumber: glAccount.phone
//         });

//         const newNumber = String(resNum.value).substring(3, 19);
//         const nextNum = useToNumber(newNumber).value + 1;
//         formData.processNumber = prefix.value.concat(String(nextNum));

//         formData.muniProc = muniProcess.value;
//         formData.address = inputAddress.value;
//         Object.assign(permitAppPdf, {
//             dba: formData.contractor,
//             jobaddress: formData.address,
//             municipality: formData.muni,
//             muniprocessnumber: formData.muniProc,
//             processnumber: formData.processNumber,
//             masterpermit: formData.permit,
//             license: formData.license
//         });
//         convMB.value = checkV.value.substring(1, 2);
//         checkMB.value = useToNumber(convMB);
//         convertFolio(checkMB.value);
//         await procReceive(formData);
//         await callPermitdata(permitAppPdf);
//         saveFormToStore(); // ← use the new clean function
//     } catch (err) {
//         alert(err);
//     }
// }
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
        valueOfWork: '',
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
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.newPermit" /> New Permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.permitRevision" /> Permit Revision</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.permitRenewal" /> Permit Renewal</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.permitExtension" /> Permit Extension</label>

                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.changeOfArchEng" /> Change of Arch/Engr</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.changeOfOwner" /> Change of Owner</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.changeOfContractor" /> Change of Contractor</label>

                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.privateProvider" /> Private Provider</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.cityProject" /> City Project</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.affordableHousing" /> Affordable Housing</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.reprievePermit" /> Reprieve Permit</label>

                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.interiorNonStructural" /> Interior, Non-Structural</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.leed" /> LEED</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.seal" /> (SEAL)</label>

                    <div class="divider"></div>

                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.phasedPermit" /> Phased Permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.subPermit" /> Sub-permit</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.roofing" /> Roofing</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.electrical" /> Electrical</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.mechanical" /> Mechanical</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.plumbing" /> Plumbing</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.fire" /> Fire</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.generator" /> Generator</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.tempStructure" /> Temp Structure</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.demoYearBuilt" /> Demo year-built</label>
                    <label class="chk"><input type="checkbox" v-model="form.permitRequest.shopDrawings" /> Shop Drawings</label>
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

                <div class="hint">For more information, see attached F.S.553.79(16)</div>
            </div>
        </section>

        <!-- Property + Applicant -->
        <section class="card">
            <div class="card-title">Property Address / Identifiers</div>
            <div class="form-grid">
                <div class="field">
                    <label>Property Address</label>
                    <input v-model="form.property.propertyAddress" type="text" />
                </div>
                <div class="field small">
                    <label>Unit #</label>
                    <input v-model="form.property.unit" type="text" />
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
                    <label>Parcel/Folio Number</label>
                    <input v-model="form.property.parcelFolio" type="text" />
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
        </section>

        <section class="card">
            <div class="card-title">Applicant Information (Blue or Black Ink Only)</div>

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
                        <input v-model="form.work.valueOfWork" type="text" placeholder="This amount cannot be changed once submitted" />
                        <div class="hint">Attach a copy of the construction cost affidavit to this form</div>
                    </div>
                    <div class="field">
                        <label>Area of Work (SqFt)</label>
                        <input v-model="form.work.areaOfWorkSqFt" type="text" />
                    </div>
                </div>

                <div class="card-title" style="margin-top: 10px">Type of Work</div>
                <div class="radio-row">
                    <label class="chk"><input type="checkbox" v-model="form.work.newConstructionAdditions" /> New Construction/Additions</label>
                    <label class="chk"><input type="checkbox" v-model="form.work.alterationsReconfig" /> Alterations/Reconfig of space</label>
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
                        <label class="chk"><input type="checkbox" v-model="form.notary1.physicalPresence" /> physical presence</label>
                        <label class="chk"><input type="checkbox" v-model="form.notary1.onlineNotarization" /> online notarization</label>
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
                        <label class="chk"><input type="checkbox" v-model="form.notary2.physicalPresence" /> physical presence</label>
                        <label class="chk"><input type="checkbox" v-model="form.notary2.onlineNotarization" /> online notarization</label>
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

.field {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
</style>
