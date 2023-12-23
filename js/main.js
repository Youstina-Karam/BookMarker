var siteNameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var deleteBtn;
var VisitBtn;
var bookMarkList = [];
if (localStorage.getItem("bookMarkList")) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"));
}
showData();

submitBtn.addEventListener("click", submit);

function submit() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    var bookMark = {
      siteName: siteNameInput.value,
      url: urlInput.value,
    };

    bookMarkList.push(bookMark);
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
    showData();
    clearForm();
    siteNameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `
        <h5>Site Name or Url is not valid,Please follow the rules below </h5>
        <p> <i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 characters</p>
        <p> <i class="fa-regular fa-circle-right"></i> Site URL must be a valid one</p>
   `,
    });
  }
}

function showData() {
  var bookData = "";
  for (var i = 0; i < bookMarkList.length; i++) {
    bookData += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookMarkList[i].siteName}</td>
        <td>
            <button class="btn btn-success btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</button>
        </td>
        <td>
            <button class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button>
        </td>
       </tr>
        `;
  }
  document.getElementById("tbodyId").innerHTML = bookData;
  deleteBtn = document.querySelectorAll(".btn-delete");
  if (deleteBtn) {
    for (var i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function () {
        deleteItem(i - 1);
      });
    }
  }
  VisitBtn = document.querySelectorAll(".btn-visit");
  if (VisitBtn) {
    for (var i = 0; i < VisitBtn.length; i++) {
      VisitBtn[i].addEventListener("click", function (e) {
        visitUrl(i - 1);
      });
    }
  }
}

function clearForm() {
  document.getElementById("bookmarkName").value = "";
  document.getElementById("bookmarkURL").value = "";
}

function deleteItem(index) {
  bookMarkList.splice(index, 1);
  localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
  showData();
}

function visitUrl(index) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookMarkList[index].url)) {
    open(bookMarkList[index].url);
  } else {
    open(`https://${bookMarkList[index].url}`);
  }
}

/// validation
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteNameInput.addEventListener("input", function () {
  validation(siteNameInput, nameRegex);
});
urlInput.addEventListener("input", function () {
  validation(urlInput, urlRegex);
});

function validation(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
