<script setup lang="ts">
import { useGeolocation } from '@vueuse/core';

const { coords, locatedAt, error, resume, pause } = useGeolocation();
</script>

<template>
    <div>
        <pre lang="json">{{
            JSON.stringify(
                {
                    coords: {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    },
                    locatedAt,
                    error: error ? error.message : error
                },
                null,
                2
            )
        }}</pre>
        <button @click="pause">Pause watch</button>
        <button @click="resume">Start watch</button>
    </div>
</template>
