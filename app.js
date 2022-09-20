import { sideNavItems, transactions, modalData } from "./data.js";

const sideNavContainer = document.querySelector(".other-side-nav-items");
const otherTransContainer = document.querySelector(".other-transactions");
const capsules = document.querySelectorAll(".capsule");
const input = document.getElementById("am-inp");
const btnContinue = document.querySelector(".btn-continue");
const modal = document.querySelector(".modal");
const modalAmount = document.querySelector(".modal-amount");

const renderSideNav = () => {
  let html = sideNavItems
    .map((el) => {
      return ` <div class="side-nav-item">
          <span class="side-nav-ico">${el.icon}</span>
          <div class="side-label open">${el.label}</div>
        </div>`;
    })
    .join(" ");
  sideNavContainer.innerHTML = html;
};
const renderTransactions = () => {
  let html = transactions
    .map((item) => {
      return `
            <div class="other-trans-item">
              <div class="trans-details">
                <div class="icon-box">
                  <img src="./Assets/icons/${
                    item.color === "white"
                      ? "outgoing"
                      : item.color === "green"
                      ? "incoming"
                      : "caution"
                  }.svg" width="18" alt="" />
                </div>
                <div>
                  <div class="trans-main-head">${item.title}</div>
                  <p class="trans-sub-head">${item.subText}</p>
                </div>
              </div>
              <div>
                <p class="trans-amount ${item.color}">${item.amount}</p>
                ${
                  item.failed === true
                    ? `<div class="error">
                      <img
                        src="./Assets/icons/error.svg"
                        width="15"
                        alt="failed"
                      />
                      <p class="red">Failed</p>
                    </div>`
                    : ""
                }
                
              </div>
            </div>
    `;
    })
    .join("");
  otherTransContainer.innerHTML = html;
};

const updateInput = (e) => {
  let [_, value] = e.target.innerText.split(" ");
  input.focus();
  input.value = value;
};

const renderModal = () => {
  let html = modalData
    .map((data) => {
      return `
        <div class="modal-card">
          <div class="close-btn">&times;</div>
          <div class="modal-header">
            <div class="trans-header">
              <p>Money added to wallet <br />from bank account<br /></p>
            </div>
            <div class="icon-box">
              <img
                src="./Assets/icons/incoming.svg"
                width="18"
                alt="incoming"
              />
            </div>
          </div>
          <h3 style="font-weight: 500">
            &#8377; <span class="modal-amount">${data.transactionamount}</span>
          </h3>
          <p>${data.transactiondate}</p>
          <br />
          <div class="success-alert">
            <div class="check-ico">
              <img src="./Assets/icons/check.svg" width="25" alt="" />
            </div>
            <div class="alert-details">
              <div class="alert-text">Transaction Complete</div>
              <div class="alert-sub-text">Tap to view this transaction</div>
            </div>
          </div>
          <br />
          <div class="from-to-box">
            <div class="from">
              <div>
                <div class="yellow">From</div>
                <h2>${data.senderDetails.sender}</h2>
                <p>
                  <i>${data.senderDetails.bank}, IFSC ${data.senderDetails.IFSC} <br />A/c No. ${data.senderDetails.accountno}</i>
                </p>
                <p>${data.senderDetails.transactiondate}</p>
              </div>
              <div class="sm">SM</div>
            </div>
            <br />
            <div class="to">
              <div>
                <div class="yellow">To</div>
                <h2>${data.recieverDetails.reciever}</h2>
                <p>
                  <i>${data.recieverDetails.wallet} <br />Ref No. ${data.recieverDetails.referenceno}</i>
                </p>
                <p>${data.recieverDetails.transactiondate}</p>
              </div>
              <div class="icon-box-green">
                <span class="green"> &#8377; </span>
              </div>
            </div>
            <br />
            <div class="payment-trans-container">
              <div>
                <p><span class="white">Payment Method:</span> ${data.paymentmethod}</p>
                <p>
                  <span class="white">Transaction ID:</span> ${data.transactionId}
                </p>
              </div>
              <img
                class="copy-btn"
                src="./Assets/icons/copy.svg"
                width="25"
                alt="copy"
              />
            </div>
          </div>
          <br />
          <div class="btn-group">
            <button class="btn btn-add">Help</button>
            <button class="btn btn-withdraw">Share</button>
          </div>
        </div>`;
    })
    .join(" ");
  modal.innerHTML = html;
};

const activateModal = () => {
  modal.classList.add("active");
};

const deactivateModal = () => {
  modal.classList.remove("active");
};

capsules.forEach((capsule) => {
  capsule.addEventListener("click", updateInput);
});
btnContinue.addEventListener("click", activateModal);
renderModal();
renderTransactions();
renderSideNav();
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", deactivateModal);
