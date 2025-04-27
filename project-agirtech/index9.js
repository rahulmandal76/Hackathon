
        function switchTab(tab) {
            if (tab === 'login') {
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('signup-form').style.display = 'none';
                document.querySelectorAll('.tab')[0].classList.add('active');
                document.querySelectorAll('.tab')[1].classList.remove('active');
            } else {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('signup-form').style.display = 'block';
                document.querySelectorAll('.tab')[0].classList.remove('active');
                document.querySelectorAll('.tab')[1].classList.add('active');
            }
        }

        function showMessage(elementId, message, isError) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.className = 'message ' + (isError ? 'error' : 'success');
            element.style.display = 'block';
        }

        function login() {
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('login-message', 'Login successful! Redirecting...', false);
                    // Redirect to dashboard or home page
                    window.location.href = 'dashboard.html';
                } else {
                    showMessage('login-message', data.message, true);
                }
            })
            .catch(error => {
                showMessage('login-message', 'An error occurred. Please try again.', true);
            });
        }

        function signup() {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (password !== confirmPassword) {
                showMessage('signup-message', 'Passwords do not match!', true);
                return;
            }
            
            fetch('signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('signup-message', 'Registration successful! You can now login.', false);
                    switchTab('login');
                } else {
                    showMessage('signup-message', data.message, true);
                }
            })
            .catch(error => {
                showMessage('signup-message', 'An error occurred. Please try again.', true);
            });
        }
    