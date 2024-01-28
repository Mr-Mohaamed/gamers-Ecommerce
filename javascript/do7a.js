// snap scroll ............%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ********* by Wheel ************
const slider = document.querySelector(".scroll-bar");

slider.addEventListener("wheel", (e) => {
	e.preventDefault();
	slider.scrollLeft += e.deltaY;
});

// Scroll by Draging.....................

let isDown = false;
let startX;
let scrollX;

slider.addEventListener("mousedown", (e) => {
	e.preventDefault();
	isDown = true;
	slider.classList.add("active");
	startX = e.pageX - slider.offsetLeft;
	scrollX = slider.scrollLeft;
	console.log(startX, scrollX);
});
slider.addEventListener("mouseleave", () => {
	isDown = false;
	slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
	isDown = false;
	slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 2;
	slider.scrollLeft = scrollX - walk;
});

// pop up.....................

let games = document.querySelectorAll(".game");
games.forEach((game) => {
	game.addEventListener("click", (e) => {
		let popImg = game.children[0].children[0].src;
		let popPrice = game.children[1].children[1].innerHTML;
		let popName = game.children[1].children[0].innerHTML;
		let popUp = document.createElement("div");
		popUp.className = "pop-up";
		popUp.innerHTML = `
		<div class='pop-box'>
			<div class='left'>
				<img src='${popImg}' />
			</div>
			<div class='right'>
				<p class='name'>Game Name :${popName}</p>
				<p class='price'>Game Price :${popPrice}</p>
				<button>Buy Now</button>
			</div>
			<span class="close-btn">x</span>
		</div>`;
		// popUp.style.backgroundImage = `url('${popImg}')`;
		let popLayout = document.createElement("div");
		popLayout.className = "pop-layout";
		// popCloseBtn.addEventListener("click", () => {

		// });
		popLayout.addEventListener("click", () => {
			popUp.remove();
		});

		popUp.appendChild(popLayout);
		document.body.appendChild(popUp);
		let popCloseBtn = document.querySelector(".pop-box .close-btn");
		console.log(popCloseBtn);
		popCloseBtn.addEventListener("click", () => {
			popUp.remove();
		});
	});
});
