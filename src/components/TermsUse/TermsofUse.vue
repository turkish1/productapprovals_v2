<template>
    <!-- Stand‑alone page (no modal) -->
    <div class="min-h-screen bg-cover bg-center flex items-start justify-center py-10" style="background-image: url('/demo/images/officepaper.jpeg')">
        <section class="prose mx-auto max-w-4xl p-6">
            <h1 class="text-3xl font-bold mb-6 text-center">mEPermit – End‑User License Agreement</h1>

            <!-- EULA text -->
            <article v-html="termsHtml" />

            <!-- Accept / Decline controls -->
            <form class="mt-10 flex flex-col items-center space-y-4" @submit.prevent="handleAccept">
                <fieldset class="flex items-center space-x-6">
                    <label class="inline-flex items-center space-x-2">
                        <input type="radio" value="accept" v-model="selection" class="h-5 w-5 text-primary-600" />
                        <span>I <span class="font-semibold">ACCEPT</span></span>
                    </label>
                    <label class="inline-flex items-center space-x-2">
                        <input type="radio" value="decline" v-model="selection" class="h-5 w-5 text-primary-600" />
                        <span>I <span class="font-semibold">DECLINE</span></span>
                    </label>
                </fieldset>
                <button type="submit" :disabled="selection !== 'accept'" class="px-8 py-3 rounded-lg bg-teal-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed" @click="sendRegistration">Continue</button>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
/**
 * Non‑modal Terms‑of‑Use component.
 * Emits `accepted` when the user selects **Accept** and clicks Continue.
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits<{ (e: 'accepted'): void }>();
const selection = ref('');
const router = useRouter();

function handleAccept() {
    if (selection.value === 'accept') emit('accepted');
}

function sendRegistration() {
    router.push('/registration');
}
const termsHtml = ref(`
  <!-- ===== START OF EMBEDDED LEGAL TEXT ===== -->
  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">READ CAREFULLY</h2>
  <p>PLEASE READ THE FOLLOWING TERMS AND CONDITIONS BEFORE PRESSING \"ACCEPTED AND AGREED\" AT THE END OF THIS AGREEMENT. THIS END-USER LICENSE AGREEMENT (\"EULA\") IS A LEGAL AGREEMENT BETWEEN YOU (EITHER AN INDIVIDUAL OR A SINGLE ENTITY), THE END USER, AND DIGITAL ROOF SOLUTIONS INC., ITS AFFILIATES, SUBSIDIARIES, SUCCESSORS, AND ASSIGNEES, FOR THE MEPERMIT SYSTEM, AS DEFINED HEREIN. BY INSTALLING, COPYING, ACCESSING OR OTHERWISE USING THE MEPERMIT SYSTEM, YOU AGREE TO BE BOUND BY THE TERMS OF THIS EULA. IF YOU DO NOT AGREE TO THE TERMS OF THIS EULA, YOU MAY NOT INSTALL, ACCESS, COPY, DOWNLOAD OR USE THE MEPERMIT SYSTEM. IF YOU DO NOT AGREE, CLICK \"DISAGREE/DECLINE.\" YOU AGREE THAT YOUR USE OF THE MEPERMIT SYSTEM ACKNOWLEDGES THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">1. Ownership</h2>
  <p>Digital Roof Solutions Inc. (\"Licensor\") is and shall remain the exclusive owner of all right, title and interest in and to the mEPermit System, regardless of media or delivery mechanism. No ownership rights are transferred to you. All rights not expressly granted are reserved to Licensor.</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">2. General</h2>
  <p>The mEPermit System is licensed, not sold. It is protected by applicable intellectual-property laws. This EULA governs any software updates provided by Licensor that replace or supplement the original system, unless a separate license accompanies such updates.</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">3. Definition – “mEPermit System”</h2>
  <p>The term <strong>mEPermit System</strong> collectively refers to:</p>
  <ul class=\"list-disc ml-6\">
    <li>All underlying software, infrastructure, databases and code (the \"Software\");</li>
    <li>The mEPermit portal, application and website (the \"Portal\");</li>
    <li>Any content, components, media and code delivered to the End User (the \"Content\");</li>
    <li>Images, graphics, fonts and other artistic works (the \"Artwork\");</li>
    <li>All explanatory materials and documentation (the \"Documentation\"); and</li>
    <li>Any future upgrades, updates or additions (the \"Upgrades\").</li>
  </ul>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">4. Grant of License & Restrictions</h2>
  <p>Licensor grants you a non-exclusive, non-transferable right to use the mEPermit System through the Portal. Except as explicitly allowed in writing:</p>
  <ul class=\"list-disc ml-6\">
    <li>You may not copy, modify, distribute, transfer or create derivative works of the mEPermit System.</li>
    <li>You may not reverse-engineer, decompile or otherwise attempt to derive source code.</li>
    <li>You may not sublicense, assign or transfer the mEPermit System or this EULA.</li>
  </ul>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">5. Conditions of Use</h2>
  <p>You must:</p>
  <ol class=\"list-decimal ml-6\">
    <li>Be a licensed contractor in the State of Florida.</li>
    <li>Maintain current proof of liability and worker’s-compensation insurance.</li>
    <li>Supply accurate project information and documentation. Licensor disclaims any responsibility for inaccuracies you provide.</li>
  </ol>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">6. Term & Termination</h2>
  <p>This EULA is effective until terminated. You may terminate by deleting your account and ceasing all use. Licensor may terminate at any time with notice (email on file). Upon termination you must stop using and destroy all copies of the mEPermit System (except permit documents generated for your own projects).</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">7. Limitation of Liability</h2>
  <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, LICENSOR SHALL NOT BE LIABLE FOR ANY SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES, EVEN IF ADVISED OF THE POSSIBILITY. LICENSOR’S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU ACTUALLY PAID FOR THE RELEVANT PERMIT REVIEW.</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">8. Indemnification</h2>
  <p>You agree to indemnify, defend and hold harmless Licensor and its affiliates against all claims arising from your use of the mEPermit System or violation of this EULA.</p>

  <h2 class=\"text-2xl font-semibold mt-8 mb-4\">9. Miscellaneous</h2>
  <ul class=\"list-disc ml-6\">
    <li><strong>Governing Law:</strong> State of Florida; venue Miami-Dade County.</li>
    <li><strong>Severability:</strong> If any provision is unenforceable, the remainder remains in force.</li>
    <li><strong>Entire Agreement:</strong> This EULA constitutes the entire agreement between the parties.</li>
    <li><strong>Headings:</strong> For convenience only; do not affect interpretation.</li>
  </ul>

  <p class=\"mt-12 text-center italic\">© Digital Roof Solutions Inc. All rights reserved.</p>
  <!-- ===== END OF EMBEDDED LEGAL TEXT ===== -->
  `);
</script>

<style scoped>
.prose {
    max-width: 65ch;
}
</style>
