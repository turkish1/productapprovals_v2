<template>
    <div class="backdrop" @click="closeDialog"></div>
    <dialog open>
        <header>
            <h2>{{ title }}</h2>
        </header>
        <div>
            <slot></slot>
        </div>
        <menu>
            <!-- <soft-radio class="text-black ml-auto" @click="$emit('close')" @click.left="routerNext()">Agree</soft-radio> -->
        </menu>
    </dialog>
</template>

<script>
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: ''
        }
    },

    emits: ['close'],
    methods: {
        routerNext() {
            this.$router.push('/roofsystem');
        }
    }
};
</script>

<style scoped>
.backdrop {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 10;
}

dialog {
    margin: 0;
    padding: 0;
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Open Sans',
        'Helvetica Neue',
        sans-serif;

    font-style: oblique;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    top: 10vh;
    left: calc(25% - 15rem);
    width: 1600px;
    background-color: white;
    z-index: 150;
    overflow: scroll;
}

header {
    width: 100%;
    padding: 1rem;
    background-color: rgb(16, 170, 230);
    color: white;
}

dialog div {
    padding: 1rem;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: left;
}
</style>
