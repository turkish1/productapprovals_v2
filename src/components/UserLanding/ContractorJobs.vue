<template>
    <div class="cia-noc">
        <header class="header">
            <div class="user-info">
                <h2>{{ user.clientname }}</h2>
                <p>Address: {{ user.address }}</p>
            </div>
        </header>
        <section class="task">
            <h3>Current Task</h3>
            <div class="task-details">
                <h4>{{ task.title }}</h4>
                <p>{{ task.status }}</p>
                <p><strong>Due:</strong> {{ task.due }}</p>
            </div>
            <button @click="markComplete">Mark Complete</button>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
    clientname: 'Evelyn Salt',
    address: '7400 sw 98 st'
});

const task = ref({
    title: 'Shingle Roof',
    status: 'Pending',
    due: '2025-07-15 22:00'
});

function markComplete() {
    alert('Task marked as complete!');
}
</script>

<style scoped>
.cia-noc {
    position: relative;
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background:
        linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
        url('/mnt/data/AdobeStock_1069096266_Preview.jpeg') center/cover no-repeat;
    color: #e0e0e0;
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    font-family: 'Roboto', sans-serif;
}

.header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    border: 2px solid #10bda7;
}

.user-info h2 {
    margin: 0;
    font-size: 1.6rem;
}

.task h3 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
}

.task-details {
    background: rgba(30, 30, 30, 0.6);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

button {
    background: #10bda7;
    color: #fff;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background: #0e9a8d;
}
</style>
