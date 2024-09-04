export default async function getAddress() {
    const enteredAddr = address;

    const baseURL = 'https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1';

    const address = enteredAddr.value;
    const url = `${baseURL}&myAddress=${encodeURIComponent(address)}&to=200`;
    const response = await fetch(url);
    console.log(response);
    // const dt = ref('')
    const data = await response.json();

    return { data };
}
