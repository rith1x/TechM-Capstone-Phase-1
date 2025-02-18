document.addEventListener("DOMContentLoaded", function () {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector("#navbarSupportedContent");

    navbarToggler.addEventListener("click", function () {
        var isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
        navbarToggler.setAttribute("aria-expanded", !isExpanded);
        navbarCollapse.classList.toggle("show");
    });
});
let plansObj;
fetch('./plans.json')
    .then(res => res.json())
    .then(plans => {
        plansObj = plans
        let count = 0;
        for (let plan in plans) {
            if (plans[plan].tag != ("POPULAR")) {
                continue;
            }
            count++
            if (count > 6) break

            let color = randomBG()

            document.getElementById('homePlans').innerHTML += `
            <div class="col-md-4 col-sm-6 p-3 d-flex">
              <div class="card bg-secondary rounded-4 overflow-hidden border-0 w-100 d-flex flex-column h-100">
                
                <img src="https://placehold.jp/${color}/200x100.png?text=₹${plans[plan].price}" 
                     class="card-img-top rounded-4" 
                     alt="${plans[plan].name}">
          
                <div class="card-body rounded-pill flex-grow-1 flex-column">
                  <span class="badge rounded-pill bg-dark">${plans[plan].tag}</span>
                  
                  <h5 class="card-title mt-2">${plans[plan].name}</h5>
                  
                  <ul class="mb-3 flex-grow-1">
                    ${getLiElems(plans[plan].features)}
                  </ul>
          
                  <div class="mt-auto d-flex gap-2" style="display-flex; align-self:end !important;">
                    <button class="btn btn-primary w-100" onclick="showPlan('${plan}')">Recharge</button>
                    <button class="btn text-primary w-100">View Details</button>
                  </div>
                </div>
          
              </div>
            </div>`;

        }

    })



function randomBG() {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    const hexCode = r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

    let lightHex = hexCode
    const hex = lightHex.replace('#', '');
    const rx = parseInt(hex.substring(0, 2), 16);
    const gx = parseInt(hex.substring(2, 4), 16);
    const bx = parseInt(hex.substring(4, 6), 16);
    const darkR = Math.max(0, rx - 160);
    const darkG = Math.max(0, gx - 160);
    const darkB = Math.max(0, bx - 160);
    const darkHex = darkR.toString(16).padStart(2, '0') +
        darkG.toString(16).padStart(2, '0') +
        darkB.toString(16).padStart(2, '0');
    return `${lightHex}/${darkHex}`;
}

function validateMobile() {
    let mobileInput = document.getElementById("mobileNumber");
    let mobile = mobileInput.value.trim();
    let mobilePattern = /^[6-9]\d{9}$/;

    if (mobilePattern.test(mobile)) {
        mobileInput.classList.remove("is-invalid");
        document.getElementById("mobileSection").style.display = "none";
        document.getElementById("otpSection").style.display = "block";
        document.getElementById('toastBody').innerText = "OTP has been sent to registered mobile number"
        document.querySelector('.toast').classList.add('bg-success')
        let toastElement = new bootstrap.Toast(document.getElementById('toaster'), { delay: 5000 });
        toastElement.show();


    } else {
        mobileInput.classList.add("is-invalid");
        document.getElementById('toastBody').innerText = "Invalid Mobile Number"
        document.querySelector('.toast').classList.add('bg-danger')
        let toastElement = new bootstrap.Toast(document.getElementById('toaster'), { delay: 5000 });
        toastElement.show();

    }
}
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let otpInput = document.getElementById("otp");
        let otp = otpInput.value.trim();
        let otpPattern = /^\d{6}$/;

        if (otpPattern.test(otp)) {
            otpInput.classList.remove("is-invalid");
            window.location.href = 'dashboard.html'
        } else {
            otpInput.classList.add("is-invalid");
            document.getElementById('toastBody').innerText = "Invalid OTP format"
            document.querySelector('.toast').classList.add('bg-danger')
            let toastElement = new bootstrap.Toast(document.getElementById('toaster'), { delay: 5000 });
            toastElement.show();
        }
    });
}
function showPlan(id) {
    console.log(plansObj[id])
    window.location.href = `./recharge.html?planid=${id}`
}

function getLiElems(list) {
    result = ''
    for (item in list) {
        result += `<li>${list[item]}</li>`
    }
    return result
}