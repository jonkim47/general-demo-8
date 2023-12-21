// Add Listeners for header navigation clicks to then create Page calls
function addHeaderNavClickListeners() {
  HEADER_NAV_CONFIG.forEach((navItem) =>
    document
      .getElementById(navItem.htmlId)
      .addEventListener("click", () => analytics.page(navItem.pageName))
  );
}

// Create an Action Card
function generateActionCard(action, index) {
  const actionCard = document.createElement("div");
  actionCard.setAttribute("id", index);
  actionCard.classList.add("col-md-4", "mb-4");

  actionCard.innerHTML = `
            <div class="card mb-4 h-100 d-flex flex-column justify-content-between">
                <div class="card-body">
                    <h2>${action.title}</h2>
                    <p>${action.description}</p>
                </div>
                <div class="card-footer text-center">
                    <a href="#" class="btn btn-primary btn-learn-more" data-action-id="${index}"
                        data-bs-toggle="modal" data-bs-target="#actionModal">Learn More</a>
                </div>
            </div>
        `;

  return actionCard;
}

// Initiate creating the 6 Action Cards that are on the main page bottom section
function generateActionCards() {
  const actionRow = getElById("actionRow");
  ACTIONS.forEach((action, index) => {
    const actionCard = generateActionCard(action, index); // Pass both action and index
    actionRow.appendChild(actionCard);
  });
}

// Within an Action Modal, get the dynamic created properties for your track events
function getDynamicProperties() {
  const dynamicProperties = {};
  const propertyInputs = document.querySelectorAll(
    "#actionModal input.form-control"
  );
  const propertyNames = document.querySelectorAll(".seg-property-name");

  for (let i = 0; i < propertyInputs.length; i++) {
    const input = propertyInputs[i];
    const propertyValue = input.value;
    const propName = normalizePropertyName(propertyNames[i].textContent);
    dynamicProperties[propName] = propertyValue;
  }

  // propertyInputs.forEach((input) => {
  //   const propertyName = normalizePropertyName(
  //     input.getAttribute("data-property-name")
  //   );
  //   const propertyValue = input.value;
  //   dynamicProperties[propertyName] = propertyValue;
  // });

  return dynamicProperties;
}

// Function to update the live code preview
function updateLiveCodePreview() {
  const liveCodeBlock = getElById("liveCodeBlock");
  const titleElement = getElById("actionModalLabel");
  const descriptionElement = getElById("actionModalDescription");

  const updatedTrackEvent = {
    title: titleElement.textContent, // Use textContent instead of value
    description: descriptionElement.textContent, // Use textContent instead of value
    ...getDynamicProperties(),
  };

  const liveCodeContent = liveCodeBlock.querySelector("code");
  liveCodeContent.textContent = `analytics.track('${
    updatedTrackEvent.title
  }', ${JSON.stringify(updatedTrackEvent, null, 2)});`;

  // Trigger highlight.js syntax highlighting
  hljs.highlightElement(liveCodeContent);
}

function addLiveCodePreviewTriggers() {
  const titleInput = getElById("actionModalLabel");
  titleInput.addEventListener("input", updateLiveCodePreview);

  const descriptionInput = getElById("actionModalDescription");
  descriptionInput.addEventListener("input", updateLiveCodePreview);

  // Add a change event listenter to each key value input
  const propertyInputs = document.querySelectorAll(
    "#actionModal input.form-control"
  );
  propertyInputs.forEach((input) => {
    input.addEventListener("change", updateLiveCodePreview);
  });

  // Add an input event listener to each property name field
  const propertyNameInputs = document.querySelectorAll(
    "#actionModal .col-md-4[contenteditable='true']"
  );
  propertyNameInputs.forEach((input) => {
    input.addEventListener("input", updateLiveCodePreview);
  });

  //run the code Preview for the first time
  updateLiveCodePreview();
}

function generatePropertyRow(property) {
  const propertyRow = document.createElement("div");
  propertyRow.classList.add("row", "mb-3", "align-items-center"); // Add align-items-center and adjust margin

  const propertyNameCol = document.createElement("div");
  propertyNameCol.classList.add("col-md-4", "fw-bold", "text-end"); // Left-justify the label
  propertyNameCol.contentEditable = "true"; // Editable Property Name

  const propertyName = document.createElement("span");
  propertyName.classList.add("seg-property-name"); //<<<<<<<<<<<<-added this to test>>>>>
  propertyName.textContent = property.name;

  propertyNameCol.appendChild(propertyName);

  const propertyValueCol = document.createElement("div");
  propertyValueCol.classList.add("col-md-8"); // Use the rest of the space

  const propertyValueInput = document.createElement("input");
  propertyValueInput.type = property.type;
  propertyValueInput.id = property.id;
  propertyValueInput.value = property.value;
  propertyValueInput.setAttribute("data-property-name", property.name); // Add data attribute
  propertyValueInput.classList.add("form-control"); // Apply Bootstrap styling

  propertyValueCol.appendChild(propertyValueInput);

  propertyRow.appendChild(propertyNameCol);
  propertyRow.appendChild(propertyValueCol);

  return propertyRow;
}

// Action MODAL Display Functionality
function generateActionModalContent(action) {
  const modalTitle = getElById("actionModalLabel");
  modalTitle.textContent = action.title;

  const modalImage = document.querySelector(".modal-body .modal-image");
  modalImage.src = action.image;
  modalImage.alt = action.title;

  const modalDescription = document.querySelector(
    ".modal-body .modal-description"
  );
  modalDescription.textContent = action.description;

  const modalForm = document.querySelector("#actionModal .action-content");
  modalForm.innerHTML = ""; // Clear previous fields

  if (action.properties.length > 0) {
    const propertiesContainer = document.createElement("div");
    propertiesContainer.classList.add("mt-4"); // Add margin-top for separation

    action.properties.forEach((property) => {
      const propertyRow = generatePropertyRow(property);
      propertiesContainer.appendChild(propertyRow);
    });

    modalForm.appendChild(propertiesContainer);
  } else {
    const noPropertiesMessage = document.createElement("p");
    noPropertiesMessage.textContent = "No properties available.";
    modalForm.appendChild(noPropertiesMessage);
  }

  addLiveCodePreviewTriggers();
}

// ACTION -LEARN MORE- MODAL FUNCTIONALITY
function addModalTriggerListeners() {
  const actionUsModal = new bootstrap.Modal(getElById("actionModal"));
  const modalTriggerButtons = document.querySelectorAll(".btn-learn-more");
  modalTriggerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const actionIndex = parseInt(button.getAttribute("data-action-id"));
      const actionInfo = ACTIONS[actionIndex];
      generateActionModalContent(actionInfo);

      actionUsModal.show();

      // Set the action index for the Segment button
      const segmentButton = getElById("segmentButton");
      segmentButton.setAttribute("data-action-id", actionIndex);
    });
  });
}

// Add a click event listener to the Segment button outside the modal's shown.bs.modal event
function addSegmentBtnListener() {
  const segmentButton = getElById("segmentButton"); // Move it here
  segmentButton.addEventListener("click", () => {
    // Get the Title and Description from the Modal
    const titleInput = getElById("actionModalLabel");
    const descriptionInput = getElById("actionModalDescription");

    // Get the action info
    const actionIndex = parseInt(segmentButton.getAttribute("data-action-id"));
    const actionInfo = ACTIONS[actionIndex];

    // Create the track event object with computed property names
    const trackEvent = {
      title: titleInput.textContent,
      description: descriptionInput.textContent,
      ...getDynamicProperties(), // Spread the dynamic properties into the event payload
    };

    // Track the event using Segment with the computed property names
    analytics.track(actionInfo.eventName, trackEvent);
  });
}

// CONTACT US Submit Button functionality
function addContactUsBtnListener() {
  const contactForm = getElById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("begin Contact Us Functionality");
    const name = getElById("contactName").value;
    const email = getElById("contactEmail").value;
    const companyName = getElById("contactCompanyName").value;
    const companySize = getElById("contactCompanySize").value;
    const role = getElById("contactRole").value;

    // Here, you can send the form data to your server or perform any other necessary actions

    // Track the form submission event
    analytics.track("Contact Form Submitted", {
      name: name,
      email: email,
      companyName: companyName,
      companySize: companySize,
      role: role,
    });

    analytics.identify(email, {
      name: name,
      email: email,
    });
  });
}

// Update button states based on login status
function updateButtonStates() {
  const loggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
  const loginButton = getElById("loginButton");
  const logoutButton = getElById("logoutButton");

  if (loggedIn) {
    loginButton.setAttribute("disabled", "true");
    logoutButton.removeAttribute("disabled");
  } else {
    loginButton.removeAttribute("disabled");
    logoutButton.setAttribute("disabled", "true");
  }
}

// Login Functionality
function addLogin() {
  document
    .querySelector("#loginModal form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const userEmail = getElById("login-email").value;

      // Identify the user using the email address as the ID
      analytics.identify(userEmail, {
        email: userEmail,
      });

      // Track the "User Logged In" event
      analytics.track("User Logged In", {
        email: userEmail,
      });

      // Set user as logged in and update button states
      localStorage.setItem(LOGGED_IN_KEY, "true");
      updateButtonStates();
    });
}

function addLogout() {
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      // You can also track a "User Logged Out" event if needed
      analytics.track("User Logged Out");

      // Clear user information
      analytics.reset();

      // Set user as logged out and update button states
      localStorage.setItem(LOGGED_IN_KEY, "false");
      updateButtonStates();
    });
}

function addJumboCards() {
  const jumboCardContainer = document.querySelector(
    ".features .container .row"
  );

  JUMBO_CARDS.forEach(
    (card) =>
      (jumboCardContainer.innerHTML += `
      <div class="col-md-6">
        <div class="feature card h-100">
          <div
            class="card-body d-flex flex-column align-items-stretch h-100"
          >      
            <h2 class="feature-title">${card.title}</h2>
            <img
              src="${card.image}"
              alt="Feature Image"
              class="feature-image"
            />
            <p class="feature-description">
              ${card.description}
            </p>
          </div>
        </div>
      </div>
    `)
  );
}

document.addEventListener("DOMContentLoaded", function () {
  addJumboCards();
  addHeaderNavClickListeners();
  generateActionCards();
  addModalTriggerListeners();
  addSegmentBtnListener();
  addContactUsBtnListener();
  addLogin();
  addLogout();
  // Initial update of button states
  updateButtonStates();
});
