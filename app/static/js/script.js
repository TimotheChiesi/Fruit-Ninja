document.getElementById('fruit-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const fruit = document.getElementById('fruit').value;
    const response = await fetch('/get_nutrition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({fruit}),
    });

    const resultDiv = document.getElementById('result');
    if (response.ok) {
        const data = await response.json();
        resultDiv.innerHTML = `
            <h2>Nutrition Information for ${data.name}</h2>
            <ul>
                <li>Calories: ${data.nutritions.calories}</li>
                <li>Carbohydrates: ${data.nutritions.carbohydrates}g</li>
                <li>Protein: ${data.nutritions.protein}g</li>
                <li>Fat: ${data.nutritions.fat}g</li>
                <li>Sugar: ${data.nutritions.sugar}g</li>
            </ul>`;
    } else {
        const errorData = await response.json();
        resultDiv.innerHTML = `<p style="color:red;">${errorData.error}</p>`;
    }
});
