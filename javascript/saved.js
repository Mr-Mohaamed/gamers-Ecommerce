let html = document.documentElement;
let page = document.querySelector(".page");
let viewHeight = html.clientHeight;
let pageScroll = html.scrollTop;

window.addEventListener("scroll", () => {
	let pageHeight = page.offsetHeight;
	let pageBottomToTop = page.offsetTop;
	let pageTop = pageBottomToTop - pageHeight;
	let scrollInPage = pageScroll - pageTop;
	let PageScrollPerc = (scrollInPage / pageHeight) * 100;
	html.style.setProperty("--scroll", Math.min(PageScrollPerc, 100));
});

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

//$$$$$$$$$$$$$$$$$$$****************** Down List ******************$$$$$$$$$$$$$$$$$

let downList = document.querySelectorAll(".down-list");
let list = document.querySelectorAll(".down-list .list");
downList.forEach((e) => {
	e.addEventListener("mouseover", () => {
		e.classList.add("active");
	});
	e.addEventListener("mouseleave", () => {
		e.classList.remove("active");
	});
});

// $$$$$$$$$$$$$********* Form Validation ************$$$$$$$$$$$$$$$$$$$$$$$$$$

let form = document.querySelector(".myform");
let signIn = document.querySelector(".signin");
let email = document.querySelector("#email");
let user = document.querySelector("#user");
let pass = document.querySelector("#pass");
let btns = document.querySelector(".btns");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (/[^a-zA-Z0-9]/.test(user.value)) {
		alert("Username shouldn't contain special characters");
		e.preventDefault();
		return;
	}
	if (user.value.length <= 5 || user.value.length >= 15) {
		alert("Username should contain between 5 to 15 letter");
		e.preventDefault();
		return;
	}
	if (!/[0-9]/.test(pass.value)) {
		alert("Password should contain atleast one number ");
		e.preventDefault();
		return;
	}
	if (pass.value.length <= 5 || pass.value.length >= 15) {
		alert("Password should contain between 5 to 15 number ");
		e.preventDefault();
		return;
	}
});
// *****************$$$$$$$$ Fetch Data $$$$$$$$$****************

//%%%%%%%%%%%%%%%%%%%%%% $  Get Request  $ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let myData = [];
let fetchData = async function () {
	await fetch("http://localhost:3000/user")
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return res.json();
		})
		.then((data) => {
			myData = data;
			return data;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
fetchData();

// Second method $$$$$$$$$$$$$$$$$$$$$$$

// form.addEventListener("submit", async (e) => {
// 	e.preventDefault();

// 	try {
// 		const response = await fetch("../db.json");

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}
// 		const responseData = await response.json();
// 		data = responseData;
// 	} catch (error) {
// 		console.error("Error:", error);
// 	}
// });
//%%%%%%%%%%%%%%%%%%%%%% $  Post Request  $ %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
let formm = document.querySelector(".myform");

const formData = new FormData(formm);
const data = Object.fromEntries(formData);

fetch("../db.json", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(data),
});
// ********************* Random Pages *********************
// Random Function
let myImg = "";
let myImgName = "";
let imgs = document.querySelectorAll("img");
let animals = document.querySelectorAll("span.animal-name");
let imgsArray = [
	{
		imageName: "Pengien",
		image: "/png/2.png",
	},
	{
		imageName: "Dog",
		image: "/png/3.png",
	},
];
setInterval(() => {
	let randomNum = Math.random();
	let randomValue = parseInt(randomNum * imgsArray.length);
	myImg = imgsArray[randomValue].image;
	myImgName = imgsArray[randomValue].imageName;
	console.log(myImg);
	imgs.forEach((img) => {
		img.setAttribute("src", myImg);
	});
	animals.forEach((animal) => {
		animal.innerHTML = myImgName;
	});
}, 4000);
