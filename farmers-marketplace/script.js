// Market Data
const marketData = {
    trends: {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            rice: [42, 45, 43, 47, 46, 48, 45],
            wheat: [32, 34, 33, 35, 36, 35, 34],
            corn: [38, 39, 40, 41, 40, 39, 38]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            rice: [42, 44, 46, 45],
            wheat: [32, 34, 35, 34],
            corn: [38, 39, 40, 39]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            rice: [42, 45, 47, 46],
            wheat: [32, 34, 36, 35],
            corn: [38, 40, 41, 40]
        }
    }
};

// Initialize Market Trends Chart
function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const data = marketData.trends.week;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Rice',
                    data: data.rice,
                    borderColor: '#2e7d32',
                    tension: 0.1
                },
                {
                    label: 'Wheat',
                    data: data.wheat,
                    borderColor: '#f57c00',
                    tension: 0.1
                },
                {
                    label: 'Corn',
                    data: data.corn,
                    borderColor: '#1976d2',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (₹/kg)'
                    }
                }
            }
        }
    });
}

// Handle Trend Filter Changes
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Update chart data based on selected period
        // This would be implemented when we add chart update functionality
    });
});

// Handle Crop Selection
document.querySelectorAll('.crop-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.crop-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Handle Image Upload
const imageUpload = document.querySelector('.image-upload');
imageUpload.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();
    
    input.addEventListener('change', (e) => {
        const files = e.target.files;
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
        
        imageUpload.parentNode.insertBefore(preview, imageUpload.nextSibling);
    });
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    initTrendChart();
    
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}); 