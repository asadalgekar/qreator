const optionsDiv = document.querySelector(".options");
const widthDetailsDiv = document.querySelector(".width-details");
const option1 = optionsDiv.querySelector(".option-1");
const bars = optionsDiv.querySelectorAll(".bar");
const generateBtn = document.getElementById('generate-button');
const pngBtn = document.getElementById('png-button');
const svgBtn = document.getElementById('svg-button');


optionsDiv.addEventListener("click", function() {
    option1.classList.toggle("active");
    widthDetailsDiv.classList.toggle("active");

});

optionsDiv.addEventListener("click", () => {
    bars.forEach(bar => {
        bar.classList.toggle("active");
    });
});

generateBtn.addEventListener('click', () => {
    pngBtn.disabled = false;
    svgBtn.disabled = false;
});