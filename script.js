document.addEventListener("DOMContentLoaded", function () {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector("#navbarSupportedContent");

    navbarToggler.addEventListener("click", function () {
        var isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
        navbarToggler.setAttribute("aria-expanded", !isExpanded);
        navbarCollapse.classList.toggle("show");
    });
});


const plans = [
    {
        tag: "SUPER SAVER",
        name: "Basic Plan",
        features: [
            "Unlimited Data",
            "10GB High-speed Data",
            "Unlimited Local Calls",
            "Free SMS"
        ],
        price: 199, // Change the price as needed
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹199`
    },
    {
        tag: "POCKET FRIENDLY",
        name: "Standard Plan",
        features: [
            "Unlimited Data",
            "20GB High-speed Data",
            "Unlimited Local & STD Calls",
            "Free SMS & Roaming"
        ],
        price: 299,
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹299`
    },
    {
        tag: "INTERNATIONAL ROAMING",
        name: "Premium Plan",
        features: [
            "Unlimited Data",
            "50GB High-speed Data",
            "Unlimited Local & STD Calls",
            "Free SMS, Roaming & International Calls"
        ],
        price: 499,
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹499`
    },
    {
        tag: "UNLIMITED",
        name: "Ultra Plan",
        features: [
            "Unlimited Data",
            "100GB High-speed Data",
            "Unlimited Local & STD Calls",
            "Free SMS, Roaming, and International Calls",
            "Access to Premium Streaming Services"
        ],
        price: 799,
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹799`
    },
    {
        tag: "POPULAR",
        name: "Super Plan",
        features: [
            "Unlimited Data",
            "200GB High-speed Data",
            "Unlimited Local & STD Calls",
            "Free SMS, Roaming, International Calls, and Data Sharing",
            "VIP Support"
        ],
        price: 999,
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹999`
    },
    {
        tag: "HIGH SPEED",
        name: "Max Plan",
        features: [
            "Unlimited Data",
            "500GB High-speed Data",
            "Unlimited Local & STD Calls",
            "Free SMS, Roaming, International Calls, Data Sharing & Family Plans",
            "Exclusive Premium Support and Priority Services"
        ],
        price: 1499,
        image: `https://placehold.jp/0047ab/ffffff/400x200.png?text=₹1499`
    }
];
plans.forEach(plan => {
    let color = randomBG()
    document.getElementById('homePlans').innerHTML +=
        `
     <div class="col-md-4 col-sm-6 mb-4">
        <div class=" rounded-4 overflow-hidden card">

                            <img src="${`https://placehold.jp/${color}/400x200.png?text=₹${plan.price}`}" class="card-img-top rounded-4"
                                alt="Plan 6">
                            <div class="card-body">
                                <span class="badge rounded-2 bg-dark ml-2">${plan.tag}</span>

                                <h5 class="card-title">${plan.name}</h5>
                                <ul>
                                    ${plan.features.map(feature => `<li>${feature}</li>`).join("")}
                                </ul>
                                <button class="btn btn-primary">Recharge</button>
                                <button class="btn text-primary">View Details</button>
                            </div>
                        </div>
                    </div>
    `
})


const faqs = [
    {
        question: "What is Mobicomm?",
        answer: "Mobicomm is a leading mobile network provider offering a variety of plans to suit your needs."
    },
    {
        question: "How can I get a new SIM card?",
        answer: "You can order a SIM card online through our website or visit the nearest Mobicomm store."
    },
    {
        question: "Does Mobicomm support 5G?",
        answer: "Yes! Mobicomm offers high-speed 5G connectivity in select cities."
    },
    {
        question: "What are the recharge options available?",
        answer: "We offer multiple recharge options including monthly, quarterly, and annual plans."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach our 24/7 customer support through the Mobicomm app, website, or by calling our helpline."
    }
];

const faqContainer = document.getElementById("faqAccordion");

faqs.forEach((faq, index) => {
    faqContainer.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" 
                    type="button" data-bs-toggle="collapse" 
                    data-bs-target="#collapse${index}" 
                    aria-expanded="${index === 0 ? 'true' : 'false'}" 
                    aria-controls="collapse${index}">
                    ${faq.question}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    ${faq.answer}
                </div>
            </div>
        </div>
    `;
});



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