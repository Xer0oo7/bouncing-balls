const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
document.getElementById("score").innerText = `Score: ${score}`;

class Ball {
    constructor() {
        this.radius = 20;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 6;
        this.dy = (Math.random() - 0.5) * 6;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ["red", "blue", "green", "yellow", "purple", "cyan"];
        return colors[Math.floor(Math.random() * colors.length)];
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

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx = -this.dx;
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

let balls = [];
for (let i = 0; i < 10; i++) {
    balls.push(new Ball());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (event) => {
    balls.forEach((ball, index) => {
        const dist = Math.hypot(ball.x - event.clientX, ball.y - event.clientY);
        if (dist < ball.radius) {
            balls.splice(index, 1);
            score++;
            document.getElementById("score").innerText = `Score: ${score}`;
        }
    });

    if (balls.length === 0) {
        for (let i = 0; i < 10; i++) {
            balls.push(new Ball());
        }
    }
});

animate();
