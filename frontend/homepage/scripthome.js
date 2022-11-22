let dropoptions = document.querySelector(".dropoptions");
let droper=document.querySelector('#droper');
let addexpensebtn = document.querySelector("#addexpensebtn");
let amount1=document.querySelector('#amount');
let category1 = document.querySelector("#category");
let description1=document.querySelector('#description');
let userdeatail=document.querySelector('.userdetail');
let expensedetails = document.querySelector(".expensedetails");
let alertpopup = document.querySelector("#alertpopup");
let ifempty=document.querySelector('.ifempty');
let logout=document.querySelector('#logout');
let dropshow=document.querySelector('#dropshow');
let subscriptionbtn=document.querySelector('#buysub');
let hidedrop = document.querySelector("#hidedrop");
let body = document.querySelector("body");
let subfeature = document.querySelector(".subfeatures");
let whitetheme=document.querySelector('#whitetheme');



addexpensebtn.addEventListener('click',(e)=>{
    let token = localStorage.getItem("token");

    e.preventDefault();
    let amount=amount1.value;
    let category=category1.value;
    let description=description1.value;


if(amount==""||category==""||description==""){
alertempty(e);
}
else{
    let obj={
        amount:amount,
        category:category,
        description:description
    }

    axios.post("http://localhost:8400/addexpense",{obj},{ headers: {"authorization" : token} })
    .then(result=>{
        console.log(result.data.result);
        getallexpenses();
        AlertItem(e);
        amount1.value="";
        category1.value="";
        description1.value="";
    })
    .catch(err=>{
        console.log(err);
    })

}

});

document.addEventListener('DOMContentLoaded',()=>{
        let token = localStorage.getItem("token");


axios.get("http://localhost:8400/getuserdata",{ headers: {"authorization" : token} })
.then(result=>{

if(result.data.suc=='yes'){

    userdeatail.innerHTML = result.data.result[0].name.split(" ")[0]; 
}
 

})
.then(err=>{
    console.log(err);
});

});
getallexpenses();


function getallexpenses(){
        let token = localStorage.getItem("token");

    axios
      .get("http://localhost:8400/getexpenses", {
        headers: { authorization: token },
      })
      .then((result) => {
        let allexp = "";
        console.log(result);

        for (let i = 0; i < result.data.result.length; i++) {
          let res = result.data.result[i];
          console.log(res.id);

          allexp += `
        <div class="singleexpense" >

        <span class="gprice">${res.amount}</span>
        <span class="gcategory">${res.category}</span>
        <span class="gdescription" style="font-size:14px;">${res.description}</span>
        <button id="${res.id}"  style="background-color:red; float:right; color:white; border:none; padding:6px; margin-top:-8px;"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        }
        expensedetails.innerHTML = allexp;
      })
      .catch((err) => {
        console.log(err);
      });
};


function AlertItem(e) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h5> your expense stored </h5>`;
  alertpopup.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2800);
}

function alertempty(e) {
  const notification = document.createElement("div");
  notification.classList.add("alertempty");
  notification.innerHTML = `<h6> please enter all the feilds </h6>`;
  alertpopup.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 4800);
}

logout.addEventListener('click',()=>{

  let result=  confirm("do you want to logout");
  if(result){
    localStorage.clear();
    location.replace('../login/login.html')
  }

});

dropshow.addEventListener('click',(e)=>{ 
dropoptions.style.display='block';
});
hidedrop.addEventListener("click", () => {
  dropoptions.style.display = "none";
});



expensedetails.addEventListener('click',(e)=>{
    let token=localStorage.getItem('token');

    if(e.target.classList.contains('fa-trash')){
      let id = e.target.parentElement.id;
      axios.delete(
          `http://localhost:8400/delete/expense/${id}
`,
          { headers: { authorization: token } }
        )
        .then((result) => {
          getallexpenses();
        })
        .catch((err) => {
          console.log(err);
        });
console.log(e.target.parentElement.id);
    }
  })
