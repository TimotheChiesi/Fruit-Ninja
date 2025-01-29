document.addEventListener('DOMContentLoaded', function() {
    const addFruitBtn = document.getElementById('add-fruit-btn');
    const removeFruitBtn = document.getElementById('remove-fruit-btn');
    const fruit2Group = document.getElementById('fruit2-group');
    const fruitForm = document.getElementById('fruit-form');
    const resultDiv = document.getElementById('result');

    if (!addFruitBtn || !removeFruitBtn || !fruit2Group || !fruitForm || !resultDiv) {
        console.error('One or more elements are not found in the DOM.');
        return;
    }

    addFruitBtn.addEventListener('click', function() {
        fruit2Group.style.display = 'block';
        addFruitBtn.style.display = 'none';
    });

    removeFruitBtn.addEventListener('click', function() {
        fruit2Group.style.display = 'none';
        addFruitBtn.style.display = 'inline-block';
        document.getElementById('fruit2').value = ''; // Clear the second fruit input field
    });

    fruitForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const fruit1 = document.getElementById('fruit1').value;
        const fruit2 = document.getElementById('fruit2').value;

        try {
            const response1 = await fetch(`/api/fruit?name=${fruit1}`);
            if (!response1.ok) {
                throw new Error(`Error fetching data for ${fruit1}: ${response1.statusText}`);
            }
            const data1 = await response1.json();

            resultDiv.innerHTML = formatFruitData(fruit1, data1);

            if (fruit2) {
                const response2 = await fetch(`/api/fruit?name=${fruit2}`);
                if (!response2.ok) {
                    throw new Error(`Error fetching data for ${fruit2}: ${response2.statusText}`);
                }
                const data2 = await response2.json();

                resultDiv.innerHTML += formatFruitData(fruit2, data2, data1);
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    function formatFruitData(fruitName, data, compareData = null) {
        const nutritionDiff = compareData ? calculateDifference(data.nutritions, compareData.nutritions) : {};

        return `
            <div class="fruit-result">
                <h2>${fruitName}</h2>
                <p><strong>Family:</strong> ${data.family}</p>
                <p><strong>Genus:</strong> ${data.genus}</p>
                <p><strong>Order:</strong> ${data.order}</p>
                <h3>Nutritions:</h3>
                <p><strong>Calories:</strong> ${data.nutritions.calories} <span style="color: ${nutritionDiff.caloriesColor || 'black'}">${nutritionDiff.calories || ''}</span></p>
                <p><strong>Carbohydrates:</strong> ${data.nutritions.carbohydrates} <span style="color: ${nutritionDiff.carbohydratesColor || 'black'}">${nutritionDiff.carbohydrates || ''}</span></p>
                <p><strong>Fat:</strong> ${data.nutritions.fat} <span style="color: ${nutritionDiff.fatColor || 'black'}">${nutritionDiff.fat || ''}</span></p>
                <p><strong>Protein:</strong> ${data.nutritions.protein} <span style="color: ${nutritionDiff.proteinColor || 'black'}">${nutritionDiff.protein || ''}</span></p>
                <p><strong>Sugar:</strong> ${data.nutritions.sugar} <span style="color: ${nutritionDiff.sugarColor || 'black'}">${nutritionDiff.sugar || ''}</span></p>
                <img src="${data.image_url}" alt="${fruitName}" class="fruit-image">
            </div>
        `;
    }

    function calculateDifference(nutritions1, nutritions2) {
        const diff = {};
        for (const key in nutritions1) {
            if (nutritions1.hasOwnProperty(key) && nutritions2.hasOwnProperty(key)) {
                const difference = (nutritions1[key] - nutritions2[key]).toFixed(1);
                diff[key] = difference > 0 ? `(+${difference})` : `(${difference})`;

                // Determine color based on whether the difference is good or bad
                if (key === 'fat' || key === 'sugar' || key === 'calories') {
                    diff[`${key}Color`] = difference > 0 ? 'red' : 'green'; // Less is better
                } else {
                    diff[`${key}Color`] = difference < 0 ? 'red' : 'green'; // More is better
                }
            }
        }
        return diff;
    }
});