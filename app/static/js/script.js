document.addEventListener('DOMContentLoaded', function() {
    const fruitForm = document.getElementById('fruit-form');
    const fruitFields = document.getElementById('fruit-fields');
    const addFruitBtn = document.getElementById('add-fruit-btn');

    // Add another fruit input field dynamically
    addFruitBtn.addEventListener('click', () => {
        const fruitGroup = document.createElement('div');
        fruitGroup.classList.add('fruit-group');
        fruitGroup.innerHTML = `
            <label for="fruit">Look for another fruit:</label>
            <input type="text" class="fruit-input" name="fruit" required>
            <button type="button" class="remove-fruit-btn">➖</button>
        `;
        fruitFields.appendChild(fruitGroup);

        // Attach event listener to the new remove button
        const removeBtn = fruitGroup.querySelector('.remove-fruit-btn');
        removeBtn.addEventListener('click', () => {
            fruitGroup.remove();
        });
    });

    // Remove fruit input field
    fruitFields.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-fruit-btn')) {
            const fruitGroup = event.target.parentElement;
            fruitGroup.remove();
        }
    });

    // Submit the form and handle multiple fruits
    fruitForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const fruitInputs = document.querySelectorAll('.fruit-input');
        const fruits = Array.from(fruitInputs).map(input => input.value);

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ''; // Clear previous results

        for (const fruit of fruits) {
            try {
                const response = await fetch('/get_nutrition', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ fruit }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const nutritionInfo = `
                        <div class="fruit-result">
                            <h2>${data.name}</h2>
                            <ul>
                                <li>Calories: ${data.nutritions.calories}</li>
                                <li>Carbohydrates: ${data.nutritions.carbohydrates}g</li>
                                <li>Protein: ${data.nutritions.protein}g</li>
                                <li>Fat: ${data.nutritions.fat}g</li>
                                <li>Sugar: ${data.nutritions.sugar}g</li>
                            </ul>
                            <img src="${data.image_url}" alt="Image of ${data.name}" />
                        </div>
                    `;
                    resultDiv.innerHTML += nutritionInfo;
                } else {
                    const errorData = await response.json();
                    resultDiv.innerHTML += `<p style="color:red;">Error for ${fruit}: ${errorData.error}</p>`;
                }
            } catch (error) {
                resultDiv.innerHTML += `<p style="color:red;">An error occurred for ${fruit}.</p>`;
            }
        }
    });
});
