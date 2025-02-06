const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let colors = ['orange', 'cyan', 'lime', 'pink', 'teal'];
let cursorRadius = 30;
let caughtCounts = { orange: 0, cyan: 0, lime: 0, pink: 0, teal: 0 };
let totalCaught = 0;

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

let cursor = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: cursorRadius,
};

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.checkCollision();
        this.draw();
    }

    checkCollision() {
        let distX = this.x - cursor.x;
        let distY = this.y - cursor.y;
        let distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < this.radius + cursor.radius) {
            caughtCounts[this.color]++;
            totalCaught++;
            updateInfoBox();
            this.respawn();
        }
    }

    respawn() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
    }
}

function updateInfoBox() {
    document.getElementById('totalCaught').innerText = totalCaught;
}

function init() {
    for (let i = 0; i < 15; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, 20, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());

    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, cursor.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(animate);
}

init();
animate();

animate();
