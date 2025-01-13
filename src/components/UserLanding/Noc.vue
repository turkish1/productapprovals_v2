<template>
    <div id="hacker-screen">
        <!-- Header Section -->
        <div class="header">
            <h1>System Dashboard</h1>
        </div>

        <!-- Main Grid Layout -->
        <div class="main-grid">
            <!-- Panel: System Logs -->
            <div class="panel">
                <div class="panel-title">System Logs</div>
                <div class="panel-content">
                    <p v-for="(log, index) in systemLogs" :key="'log-' + index">{{ log }}</p>
                </div>
            </div>

            <!-- Panel: Active Processes -->
            <div class="panel">
                <div class="panel-title">Active Processes</div>
                <div class="panel-content">
                    <p v-for="(process, index) in activeProcesses" :key="'process-' + index">{{ process }}</p>
                </div>
            </div>

            <!-- Chart Panel -->
            <div class="chart-panel">
                <div class="panel-title">CPU Usage</div>
                <LineChart :chart-data="cpuChartData" :chart-options="chartOptions" />
            </div>

            <!-- Chart Panel -->
            <div class="chart-panel">
                <div class="panel-title">Network Traffic</div>
                <LineChart :chart-data="networkChartData" :chart-options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { onMounted, ref } from 'vue';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Dynamic data for logs and charts
const systemLogs = ref([]);
const activeProcesses = ref([]);
const cpuChartData = ref({
    labels: ['0s', '1s', '2s', '3s', '4s'],
    datasets: [
        {
            label: 'CPU Usage (%)',
            data: [10, 30, 50, 40, 60],
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            tension: 0.4
        }
    ]
});
const networkChartData = ref({
    labels: ['0s', '1s', '2s', '3s', '4s'],
    datasets: [
        {
            label: 'Network Speed (Mbps)',
            data: [20, 40, 30, 60, 50],
            borderColor: 'rgba(255, 165, 0, 1)',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            tension: 0.4
        }
    ]
});
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#00ff00'
            }
        }
    },
    scales: {
        x: {
            ticks: { color: '#00ff00' }
        },
        y: {
            ticks: { color: '#00ff00' }
        }
    }
};

// Dynamic updates
onMounted(() => {
    // Add new logs and chart data dynamically
    const updateLogs = () => {
        systemLogs.value.push(`[LOG] New event at ${new Date().toLocaleTimeString()}`);
        if (systemLogs.value.length > 10) systemLogs.value.shift();
    };

    const updateProcesses = () => {
        activeProcesses.value.push(`Process ${Math.random().toFixed(4)} is running.`);
        if (activeProcesses.value.length > 10) activeProcesses.value.shift();
    };

    const updateCharts = () => {
        cpuChartData.value.datasets[0].data.push(Math.random() * 100);
        cpuChartData.value.labels.push(`${cpuChartData.value.labels.length}s`);
        if (cpuChartData.value.datasets[0].data.length > 10) {
            cpuChartData.value.datasets[0].data.shift();
            cpuChartData.value.labels.shift();
        }

        networkChartData.value.datasets[0].data.push(Math.random() * 100);
        networkChartData.value.labels.push(`${networkChartData.value.labels.length}s`);
        if (networkChartData.value.datasets[0].data.length > 10) {
            networkChartData.value.datasets[0].data.shift();
            networkChartData.value.labels.shift();
        }
    };

    setInterval(updateLogs, 1000);
    setInterval(updateProcesses, 1500);
    setInterval(updateCharts, 2000);
});
</script>

<style>
/* Hacker screen styling */
#hacker-screen {
    background-color: black;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

/* Header styling */
.header {
    text-align: center;
    font-size: 1.5rem;
    text-shadow: 0 0 10px #00ff00;
    margin-bottom: 10px;
}

/* Main grid layout */
.main-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    flex: 1;
}

/* Panels styling */
.panel,
.chart-panel {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #00ff00;
    box-shadow: 0 0 10px #00ff00;
    padding: 10px;
    position: relative;
    overflow: hidden;
}

.panel-title {
    background: #002200;
    color: #00ff00;
    font-weight: bold;
    text-align: center;
    padding: 5px 0;
    box-shadow: 0 2px 5px #00ff00;
    margin-bottom: 10px;
}

/* Dynamic content styling */
.panel-content p {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
}

/* Chart container */
.chart-panel {
    height: 250px;
}
</style>
