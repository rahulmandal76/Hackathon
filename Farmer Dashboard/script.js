// Mock data
const cropData = {
    labels: ['Wheat', 'Corn', 'Rice'],
    datasets: [{
        data: [30, 20, 15],
        backgroundColor: ['#2e7d32', '#ffa726', '#1976d2']
    }]
};

const recentSales = [
    { crop: 'Wheat', amount: '2000 kg', date: '2025-02-15' },
    { crop: 'Corn', amount: '1500 kg', date: '2025-02-10' },
    { crop: 'Rice', amount: '1000 kg', date: '2025-02-05' }
];

// Initialize Chart
function initializeChart() {
    const ctx = document.getElementById('cropChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: cropData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Populate Sales List
function populateSalesList() {
    const salesList = document.getElementById('salesList');
    salesList.innerHTML = '';

    recentSales.forEach(sale => {
        const saleItem = document.createElement('div');
        saleItem.className = 'sale-item';
        saleItem.innerHTML = `
            <div>${sale.crop}</div>
            <div><span class="chip">${sale.amount}</span></div>
            
            <div class="date">${sale.date}</div>
        `;
        salesList.appendChild(saleItem);
    });
}

// Toggle Sidebar on Mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Handle Navigation
function setupNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    populateSalesList();
    setupMobileMenu();
    setupNavigation();
});