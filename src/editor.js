document.addEventListener('DOMContentLoaded', function() {
    function updateLineNumbers() {
        const code = document.getElementById('code');
        const lineNumbers = document.getElementById('lineNumbers');
        const lines = code.innerText.split('\n');
        
        lineNumbers.innerHTML = '';
        lines.forEach((_, index) => {
            lineNumbers.innerHTML += (index + 1) + '<br>';
        });
    }

    const code = document.getElementById('code');
    if (code) {
        code.addEventListener('input', updateLineNumbers);

        // Initial line numbers update
        updateLineNumbers();
    }
});
