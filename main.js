quick_draw_data_set = ['pen', 'paper', 'book', 'bottle', 'lion'];

random_number = Math.floor((Math.random() * quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);

sketch = quick_draw_data_set[random_number];

document.getElementById('draw_to_trace').innerHTML = 'Dibujo a trazar: ' + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas () {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.position(975, 500);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    if (drawn_sketch == sketch) {
        answer_holder = "set";
        score = score + 1;
        document.getElementById('punctuation').innerHTML = 'Punctuación: ' + score;
    }
    check_sketch();
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;

    document.getElementById('label').innerHTML = 'Tu dibujo: ' + drawn_sketch;

    document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';
}

function check_sketch() {
    timer_counter = timer_counter + 1;
    document.getElementById('timer').innerHTML = 'Tiempo: ' + timer_counter;
    console.log(timer_counter);
    if (timer_counter > 400) {
        timer_counter = 0;
        timer_check = "completed";
    }
    if (timer_check == "completed") {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function clearCanvas() {
    background("white");
}