function saveToLocal(event) {
	event.preventDefault();
	const name = event.target.name.value;
	const email = event.target.email.value;

	const obj = {
		name,
		email,
	};

	// Fucniton check user comes here
	if (obj.email in localStorage) {
		console.log("Already present");

		// Decalaring function to remove the user from UI
		removeUser(obj.email);
	}

	axios
		.post(
			"https://crudcrud.com/api/89cd0a5573b34268bf72bf694fe4e7d4/userDetails",
			obj
		)
		.then((response) => {
			getUserList(response.data);
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});

	// Assigning details

	// localStorage.setItem(email, JSON.stringify(obj));

	// // Getting details
	// let getItems = JSON.parse(localStorage.getItem(email));

	// console.log(getItems);
	// getUserList(getItems);
}
function getUserList(user) {
	const userList = document.getElementById("userList");
	listArr = Object.values(user);

	// creating li to display on the UI
	const li = document.createElement("li");
	li.id = `${user.email}`;
	li.appendChild(document.createTextNode(`${user.name}, ${user.email}`));
	userList.appendChild(li);

	// creating edit button
	let editbtn = document.createElement("button");
	editbtn.id = "edit";
	editbtn.appendChild(document.createTextNode("edit"));
	editbtn.onclick = function () {
		console.log("edit clicked");
		editUser(user.email, user.name);
	};
	li.appendChild(editbtn);
	// userList.appendChild(li);

	// creating delete button
	let delBtn = document.createElement("button");
	delBtn.id = "delete";
	delBtn.appendChild(document.createTextNode("delete"));
	delBtn.onclick = function () {
		deleteUser(user.email);
	};
	// delBtn.setAttribute("onclick", deleteUser(`${user.email}`));
	li.appendChild(delBtn);
	userList.appendChild(li);

	// delBtn.addEventListener("click", deleteUser(user.email));
	// let delUser = document.getElementById("delete");
	// delUser.addEventListener("click", deleteUser(user.email));

	// document.getElementById("userList").appendChild(li);
}

// function userDelBtn(email) {
// 	localStorage.removeItem(email);
// 	alert("Deleted successfully");
// }

function editUser(email, name) {
	console.log("edit invoked");
	document.getElementById("email").value = email;
	document.getElementById("Name").value = name;
	deleteUser(email);
}

function deleteUser(emailId) {
	console.log("delete invoked");
	localStorage.removeItem(emailId);
	removeUser(emailId);
}

function removeUser(email) {
	let ul = document.getElementById("userList");
	let li = document.getElementById(email);
	ul.removeChild(li);
	// let arrLi = Array.from(li);
	// arrLi.forEach(function(li.ch)){
	// 	if(li.)
	// }
	// console.log(arrLi);.
}

window.addEventListener("DOMContentLoaded", () => {
	axios
		.get(
			"https://crudcrud.com/api/89cd0a5573b34268bf72bf694fe4e7d4/userDetails"
		)
		.then((response) => {
			for (let i = 0; i < response.length; i++) {
				const key = response[i];
				const userDetailsObj = JSON.parse(key.data);
				getUserList(userDetailsObj);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
