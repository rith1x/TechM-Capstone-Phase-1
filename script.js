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
fetch('http://localhost:3000/plans')
    .then(res => res.json())
    .then(plans => {
        plansObj = plans
        let count = 0;
        const clrs = {
            0: {
                "bg": "#E8F5E9",
                "l1": "#C8E6C9",
                "l2": "#A5D6A7",
                "tc": "#1B5E20",
                "ix": "A5D6A7/1B5E20"
            },
            1: {
                "bg": "#F3E5F5",
                "l1": "#E1BEE7",
                "l2": "#CE93D8",
                "tc": "#4A148C",
                "ix": "CE93D8/4A148C"
            },
            2: {
                "bg": "#FFF3E0",
                "l1": "#FFE0B2",
                "l2": "#FFB74D",
                "tc": "#E65100",
                "ix": "FFE0B2/E65100"
            }
        }
        let cl = 0;
        for (let plan in plans) {
            if (plans[plan].isRecommended != (true)) {
                continue;
            }
            count++
            if (count > 3) break

            let color = randomBG()

            document.getElementById('homePlans').innerHTML += `
             <div class="col-md-4 col-sm-6 p-3 d-flex" id="card${count}">
                    <div class="card rounded-0 overflow-hidden border-0 w-100 p-2 d-flex flex-column h-100" style="background:${clrs[cl].bg};border-radius:21px !important; scale: ${cl == 1 ? '1' : '0.9'}">
                        <img src="https://placehold.jp/${clrs[cl].ix}/500x200.png?text=₹${plansObj[plan].price}" 
                             class="card-img-top" style="border-radius:15px" alt="${plansObj[plan].name}"> 
                        <div class="card-body rounded-pill d-flex flex-column align-items-start justify-content-between flex-grow-1">
                            <span class="badge rounded-0 p-2 bg-danger" style="border-radius:0 0 0 11px !important; position:absolute; top:0;right:0" >${plansObj[plan].tag}</span>
                            <h5 class="card-title mt-2">${plansObj[plan].name}</h5>
                            <ul class=" list-group mb-3 flex-grow-1">
                                ${getLiElems(plansObj[plan].features, clrs[cl].l2)}
                            </ul>
                            <div class="mt-auto d-flex gap-2 mb-0">
                                <button class="btn rounded-pill px-4 fw-bold" style="background:${clrs[cl].l2};color:${clrs[cl].tc}" onclick="showPlan('${plan}')">Recharge</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            cl++;
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

function getLiElems(list, clr) {
    result = ''
    for (item in list) {
        result += `<li class="list-group-item"style="background:transparent !important; border-color:${clr};border-radius:0px !important;border-inline:none !important;">${list[item]}</li>`
    }
    return result
}