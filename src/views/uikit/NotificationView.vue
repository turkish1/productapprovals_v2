<template>
    <user-alert v-if="alertIsVisible" :title="alertTitle" @close="hideAlert">
        <div class="modal-body">
            <div class="py-3 text-center">
                <code>
                    <div>
                        <p class="typingEffect__line1" style="color: black">It is the applicant's responsiblity to complete this application correctly.</p>
                    </div>
                </code>

                <code>
                    <div>
                        <p class="typingEffect__line2" style="color: black">Failure to provide valid permitting information can result in failed inspections and/or cancelation of the permit by the Authority Having Jurisdiction (AHJ).</p>
                    </div>
                </code>
                <code>
                    <div>
                        <p class="typingEffect__line3" style="color: black">Double permit fees plus a fine determined by the AHJ issuing the permit, can be required for work without a permit.</p>
                    </div>
                </code>
                <code>
                    <div>
                        <p class="typingEffect__line4" style="color: black">Refunds will not be provided by the AHJ issuing the permit, due to errors on the applicant's part.</p>
                    </div>
                </code>
                <code>
                    <div>
                        <p class="typingEffect__line5" style="color: black">Any deviations from an approved permit package will require a permit revision.</p>
                    </div>
                </code>
                <code>
                    <div>
                        <p class="typingEffect__line6" style="color: black">This application is only valid for residential roof permits, either standalone or tied to a master building permit.</p>
                    </div>
                </code>

                <code>
                    <div>
                        <p class="typingEffect__line7" style="color: black">The permit applicant agrees to comply with these terms of use requirements when obtaining this permit electronically.</p>
                    </div>
                </code>
            </div>
        </div>
    </user-alert>
    <div></div>
</template>
<script>
import { ref } from 'vue';
import useAlert from '../../composables/alerts.js';
import UserAlert from './ecommerce/products/components/ePermitAlert.vue';
export default {
    components: {
        UserAlert
    },

    setup() {
        const alertTitle = ref("System's Terms of Use   🚧   👷🏼  🚧  👷🏼   🚧   👷🏼  🚧   👷🏼  🚧 High Velocity Hurricane Zone (HZHZ)");

        const [alertIsVisible, showAlert, hideAlert] = useAlert(true);

        return {
            alertIsVisible,
            showAlert,
            hideAlert,
            alertTitle
        };
    }
};
</script>
<style scoped>
.modal-body {
    max-width: 1100px;
}

code {
    background-color: white;
    border-radius: 2px;
    font-style: italic;

    padding: 20px;
    height: 15px;
    color: rgb(169, 31, 31);
    display: flex;
    margin: 0 auto;
    align-items: left;
    width: 1050px;
}

/* div {
  background-color: white;
  border-radius: 2px;
  font-style: italic;

  padding: 20px;
  height: 15px;
  color: rgb(169, 31, 31);
  display: flex;
  margin: 0 auto;
  align-items: left;
  width: 1050px;
} */

code div {
    display: inline-block;
}

code p {
    width: 0;
    margin-right: 2px;
    overflow: hidden;
    border-right: 1px solid transparent;
    white-space: nowrap;
}

div p {
    width: 0;
    margin-right: 2px;
    overflow: hidden;
    border-right: 1px solid transparent;
    white-space: nowrap;
}

/* The typing animation */
.typingEffect__line1 {
    animation:
        typing 2s steps(30) forwards,
        blink 1s 3;
}

.typingEffect__line2 {
    animation:
        typing 2.5s steps(40) 3s forwards,
        blink 1s 1s 1;
}

.typingEffect__line3 {
    animation:
        typing 3s steps(45) 6s forwards,
        blink 1s 4s 1;
}

.typingEffect__line4 {
    animation:
        typing 4.5s steps(55) 9s forwards,
        blink 1s 7s 1;
}

.typingEffect__line5 {
    animation:
        typing 5s steps(70) 14s forwards,
        blink 1s 10s 1;
}

.typingEffect__line6 {
    animation:
        typing 5.8s steps(80) 18s forwards,
        blink 1s 14s 1;
}

.typingEffect__line7 {
    animation:
        typing 6.8s steps(90) 24s forwards,
        blink 1s 19s 1;
}

/* .typingEffect__line10 {
  animation: typing 0s 32s forwards, blink 1s 10s infinite;
} */

@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes blink {
    0%,
    45% {
        border-color: transparent;
    }

    50%,
    100% {
        border-color: white;
    }
}
</style>
