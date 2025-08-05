async function fetchXRPPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd,eur');
        const data = await response.json();
        return {
            usd: data.ripple.usd,
            eur: data.ripple.eur
        };
    } catch (error) {
        showError('Error fetching XRP price. Please try again later.');
        return null;
    }
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError() {
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

async function calculateValue() {
    clearError();
    const xrpAmount = parseFloat(document.getElementById('xrp-amount').value);
    
    if (isNaN(xrpAmount) || xrpAmount <= 0) {
        showError('Please enter a valid XRP amount.');
        return;
    }

    const prices = await fetchXRPPrice();
    if (!prices) return;

    const usdValue = (xrpAmount * prices.usd).toFixed(2);
    const eurValue = (xrpAmount * prices.eur).toFixed(2);

    document.getElementById('usd-value').textContent = usdValue;
    document.getElementById('eur-value').textContent = eurValue;
}

async function calculateXRPNeeded() {
    clearError();
    const targetAmount = parseFloat(document.getElementById('target-amount').value);
    const currency = document.getElementById('currency-select').value;

    if (isNaN(targetAmount) || targetAmount <= 0) {
        showError('Please enter a valid target amount.');
        return;
    }

    const prices = await fetchXRPPrice();
    if (!prices) return;

    const xrpNeeded = currency === 'usd' 
        ? (targetAmount / prices.usd).toFixed(2)
        : (targetAmount / prices.eur).toFixed(2);

    document.getElementById('xrp-needed').textContent = xrpNeeded;
}
