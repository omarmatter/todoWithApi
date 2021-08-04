const btn = document.querySelector("#add");
const text = document.querySelector("#itam");
const list = document.querySelector("#list");

const url = "https://610990bad71b6700176399bd.mockapi.io/todos";

getAllTodo();
function getAllTodo() {
  fetch(url)
    .then(function (re) {
      return re.json();
    })
    .then(function (data) {
      let html = "";
      data.forEach((element) => {
        html += `<li  class=${element.complete ? "complete" : ""} >${
          element.title
        }
        <button class="btn btn-danger " data-id=${
          element.id
        }  id="delete"><i class="fa fa-trash-alt"></i></button>
        <button class="btn btn-success  "  data-id=${
          element.id
        } id="complete"><i class="fa fa-check"></i></button>
        </li>`;
      });

      list.innerHTML = html;
    });
}

btn.addEventListener("click", function () {
  let item =text.value
  if (item !=''){
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title:item ,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        alert("succsess");

        return response.json();
      }
    })
    .then(function (data) {
      let html = "";

      html += `<li  class=${data.complete ? "complete" : ""} >${data.title}
<button class="btn btn-danger " data-id=${
        data.id
      }  id="delete"><i class="fa fa-trash-alt"></i></button>
<button class="btn btn-success  "  data-id=${
        data.id
      } id="complete"><i class="fa fa-check"></i></button>
</li>`;
      list.innerHTML = html + list.innerHTML;
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
  }else{
  
  alert('Enter item')
  }
});


list.addEventListener("click", function (e) {
  console.log(e.target);
  e.preventDefault();
  let id = e.target.getAttribute("data-id");
  if (e.target.id == "delete") {
    fetch(url + "/" + id, {
      method: "Delete",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          alert("succsess");
          e.target.parentElement.remove();
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
  } else {
    fetch(url + "/" + id, {
      method: "put",
      body: JSON.stringify({
        complete: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          alert("succsess");
          e.target.parentElement.classList.add("complete");
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
  }
});
