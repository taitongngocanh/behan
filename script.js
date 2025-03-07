(function() {
    const numOfFlowers = 4; // Số lượng hoa mỗi lần gọi growGarden
    let hasClickedFirst = false;

    // Lấy phần tử audio
    const audio = document.getElementById("background-music");

    // Hàm phát nhạc tự động
    const playMusic = () => {
        if (audio.paused) {
            audio.play().catch(() => {
                console.log("Tự động phát nhạc bị chặn, yêu cầu người dùng tương tác.");
            });
        }
    };

    // Phát nhạc khi trang tải xong
    window.addEventListener("DOMContentLoaded", playMusic);

    // Hàm tạo hoa ngẫu nhiên
    const growGarden = () => {
        function getRandomArbitrary(min, max) {
            return Math.round(Math.random() * (max - min)) + min;
        }

        let positions = [];

        function getNum() {
            let pos = getRandomArbitrary(0, 100);
            for (let x = 0; x < positions.length; x++) {
                if (pos > positions[x] - 3 && pos < positions[x] + 3) {
                    return false;
                }
            }
            positions.push(pos);
        }

        while (positions.length < numOfFlowers) {
            getNum();
        }

        let more = setInterval(function() {
            let flwr = document.createElement('div');
            let dim = getRandomArbitrary(30, 80);
            let leftPos = positions[0];
            positions.shift();

            flwr.classList.add('sunflwr');
            flwr.innerHTML = `
                <div class="sunflwr__leaf--left"></div>
                <div class="sunflwr__leaf--right"></div>
                <div class="sunflwr__stem"></div>
                <div class="sunflwr__center"></div>
                ${Array.from({ length: 12 }, (_, i) => `<div class="sunflwr__pedal--${i + 1}"></div>`).join('')}
            `;

            flwr.style.left = `${leftPos}vw`;
            flwr.style.height = `${dim}vmin`;
            flwr.style.width = `${dim}vmin`;
            flwr.style.zIndex = 100 - dim;
            flwr.style.filter = `saturate(${getRandomArbitrary(70, 100)}%) brightness(${getRandomArbitrary(80, 150)}%)`;

            document.body.appendChild(flwr);
        }, 150);

        setTimeout(() => clearInterval(more), numOfFlowers * 150);
    };

    // Khi nhấn vào bông hoa đầu tiên
    document.getElementById('first-sunflower').addEventListener('click', () => {
        if (!hasClickedFirst) {
            hasClickedFirst = true;

            // Hiện thiệp chúc mừng
            document.getElementById('greeting-card').classList.add('show');

            // Phát nhạc nếu chưa phát
            playMusic();

            // Tự động tạo hoa 10 lần
            let flowerCount = 0;
            const flowerInterval = setInterval(() => {
                growGarden();
                flowerCount++;
                if (flowerCount >= 30) {
                    clearInterval(flowerInterval); // Dừng sau 10 lần
                }
            }, numOfFlowers * 150 + 100);
        }
    });
})();
