let mobileNav = document.getElementById("navMobile");
let closeIcone = document.getElementById("iconNav");


// -- MENU --
function handleMenu(){
    mobileNav.classList.toggle("nav-mobile-close")
    closeIcone.classList.toggle("fa-xmark")
}

document.getElementById('check-btn').addEventListener('click', checkWebsite);
        
        async function checkWebsite() {
            const url = document.getElementById('url').value.trim();
            const resultDiv = document.getElementById('result');
            const loadingDiv = document.getElementById('loading');
            
            if (!url) {
                alert('Please enter a website address');
                return;
            }
            
            // إظهار حالة التحميل
            loadingDiv.classList.remove('hidden');
            resultDiv.classList.add('hidden');
            
            try {
                const response = await fetch('http://localhost:3000/check-website', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data from server');
                }
                
                const data = await response.json();
                
                // عرض النتائج
                document.getElementById('url-info').innerHTML = `<strong>Web Site: </strong> ${data.url}`;
                document.getElementById('ip-info').innerHTML = `<strong>IP Address: </strong> ${data.ip || 'غير معروف'}`;
                
                if (data.isSafe) {
                    resultDiv.className = 'result safe';
                    document.getElementById('safety-info').innerHTML = '<strong>Status: </strong> <span style="color:green">Secure</span>';
                    document.getElementById('threats-info').innerHTML = '<strong>Threats: </strong> There are no known threats.';
                } else {
                    resultDiv.className = 'result unsafe';
                    document.getElementById('safety-info').innerHTML = '<strong>Status: </strong> <span style="color:red">Insecure!</span>';
                    document.getElementById('threats-info').innerHTML = `<strong>Threats: </strong> ${data.threats.join(', ')}`;
                }
                
                document.getElementById('last-checked').innerHTML = `<strong>Last check: </strong> ${new Date(data.lastChecked).toLocaleString()}`;
                resultDiv.style.display = 'block';
                
            } catch (error) {
                alert(`An error occurred: ${error.message}`);
                console.error('Error:', error);
            } finally {
                resultDiv.classList.remove('hidden');
            }
        }
        
        // السماح بالضغط على Enter في حقل الإدخال
        document.getElementById('url').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkWebsite();
            }
        });