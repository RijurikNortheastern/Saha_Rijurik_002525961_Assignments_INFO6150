// ======= Utility helpers =======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const state = {
    submissions: [],
    dynamicRequired: false,
};

// Predefined FAQs for chatbot
const faqs = {
    email: "Use your Northeastern email (example@northeastern.edu).",
    phone: "Phone number must be in the format (XXX) XXX-XXXX.",
    zip: "Zip code must be exactly 5 digits.",
    required: "All fields marked with * are required. Street Address 2 is optional.",
    address: "Street Address 2 is optional. If blank, it will show as 'N/A' in the results table.",
};

// ======= Validation regex patterns =======
const nameRegex = /^[A-Za-z]{2,20}$/; // letters only, 2-20 characters
const emailRegex = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/i;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const zipRegex = /^\d{5}$/;

// ======= DOM Elements =======
const form = $('#feedbackForm');
const submitBtn = $('#submitBtn');
const resetBtn = $('#resetBtn');
const resultsSection = $('#resultsSection');

const titleRadios = $$('input[name="title"]');
const firstName = $('#firstName');
const lastName = $('#lastName');
const emailId = $('#emailId');
const phoneNumber = $('#phoneNumber');
const address1 = $('#address1');
const address2 = $('#address2');
const addr2Counter = $('#addr2Counter');
const zipcode = $('#zipcode');
const hearSources = $('#hearSources');
const topicSelect = $('#topicSelect');
const dynamicArea = $('#dynamicArea');
const comments = $('#comments');

// Error containers
const err = {
    title: $('#err-title'),
    firstName: $('#err-firstName'),
    lastName: $('#err-lastName'),
    emailId: $('#err-emailId'),
    phoneNumber: $('#err-phoneNumber'),
    address1: $('#err-address1'),
    address2: $('#err-address2'),
    zipcode: $('#err-zipcode'),
    source: $('#err-source'),
    topic: $('#err-topic'),
    comments: $('#err-comments'),
};

// ======= Phone input masking =======
phoneNumber.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';

    if (digits.length === 0) {
        formatted = '';
    } else if (digits.length <= 3) {
        formatted = `(${digits}`;
    } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    e.target.value = formatted;
    validatePhone();
    updateSubmitState();
});

// ======= Live character counter for Address 2 =======
address2.addEventListener('input', () => {
    const used = address2.value.length;
    addr2Counter.textContent = `${used}/20 characters used`;
    if (used > 20) {
        address2.value = address2.value.slice(0, 20);
    }
    validateAddress2();
    updateSubmitState();
});

// ======= Validation Functions =======
function setValidity(el, ok, msgEl, msg) {
    if (el) {
        el.classList.remove('valid', 'invalid');
        if (ok) {
            el.classList.add('valid');
            if (msgEl) msgEl.textContent = '';
        } else {
            el.classList.add('invalid');
            if (msgEl) msgEl.textContent = msg || 'Invalid value';
        }
    }
    return ok;
}

function validateTitle() {
    const chosen = titleRadios.some(r => r.checked);
    err.title.textContent = chosen ? '' : 'Please select a title.';
    return chosen;
}

function validateName(field, errField, label) {
    const v = field.value.trim();
    if (!v) return setValidity(field, false, errField, `${label} is required.`);
    if (!nameRegex.test(v)) return setValidity(field, false, errField, `${label} must be 2-20 letters only, no spaces or special characters.`);
    return setValidity(field, true, errField);
}

function validateEmail() {
    const v = emailId.value.trim();
    if (!v) return setValidity(emailId, false, err.emailId, 'Email is required.');
    if (!emailRegex.test(v)) return setValidity(emailId, false, err.emailId, 'Must use a @northeastern.edu email address.');
    return setValidity(emailId, true, err.emailId);
}

function validatePhone() {
    const v = phoneNumber.value.trim();
    if (!v) return setValidity(phoneNumber, false, err.phoneNumber, 'Phone number is required.');
    if (!phoneRegex.test(v)) return setValidity(phoneNumber, false, err.phoneNumber, 'Format must be (XXX) XXX-XXXX.');
    return setValidity(phoneNumber, true, err.phoneNumber);
}

function validateAddress1() {
    const v = address1.value.trim();
    if (!v) return setValidity(address1, false, err.address1, 'Street Address 1 is required.');
    if (v.length < 3) return setValidity(address1, false, err.address1, 'Address must be at least 3 characters.');
    return setValidity(address1, true, err.address1);
}

function validateAddress2() {
    const v = address2.value.trim();
    if (v.length > 20) return setValidity(address2, false, err.address2, 'Maximum 20 characters allowed.');
    return setValidity(address2, true, err.address2);
}

function validateZip() {
    const v = zipcode.value.trim();
    if (!v) return setValidity(zipcode, false, err.zipcode, 'Zip code is required.');
    if (!zipRegex.test(v)) return setValidity(zipcode, false, err.zipcode, 'Zip code must be exactly 5 digits.');
    return setValidity(zipcode, true, err.zipcode);
}

function validateSources() {
    const checked = $$('#hearSources input[type="checkbox"]').some(cb => cb.checked);
    err.source.textContent = checked ? '' : 'Please select at least one source.';
    return checked;
}

function validateTopic() {
    const ok = !!topicSelect.value;
    return setValidity(topicSelect, ok, err.topic, 'Please select a topic.');
}

function validateComments() {
    const v = comments.value.trim();
    if (!v) return setValidity(comments, false, err.comments, 'Comments are required.');
    if (v.length < 5) return setValidity(comments, false, err.comments, 'Please enter at least 5 characters.');
    return setValidity(comments, true, err.comments);
}

function validateDynamic() {
    if (!state.dynamicRequired) return true;
    const dynInput = $('#dynamicText');
    const dynErr = $('#err-dynamicText');
    if (!dynInput) return false;
    const v = dynInput.value.trim();
    if (!v) return setValidity(dynInput, false, dynErr, 'This field is required when the checkbox is checked.');
    if (v.length < 2) return setValidity(dynInput, false, dynErr, 'Please enter at least 2 characters.');
    return setValidity(dynInput, true, dynErr);
}

function updateSubmitState() {
    const allOk = [
        validateTitle(),
        validateName(firstName, err.firstName, 'First name'),
        validateName(lastName, err.lastName, 'Last name'),
        validateEmail(),
        validatePhone(),
        validateAddress1(),
        validateAddress2(),
        validateZip(),
        validateSources(),
        validateTopic(),
        validateComments(),
        validateDynamic(),
    ].every(Boolean);
    submitBtn.disabled = !allOk;
}

// ======= Real-time validation event listeners =======
['input', 'blur'].forEach(evt => {
    firstName.addEventListener(evt, () => {
        validateName(firstName, err.firstName, 'First name');
        updateSubmitState();
    });
    lastName.addEventListener(evt, () => {
        validateName(lastName, err.lastName, 'Last name');
        updateSubmitState();
    });
    emailId.addEventListener(evt, () => {
        validateEmail();
        updateSubmitState();
    });
    zipcode.addEventListener(evt, () => {
        validateZip();
        updateSubmitState();
    });
    address1.addEventListener(evt, () => {
        validateAddress1();
        updateSubmitState();
    });
    comments.addEventListener(evt, () => {
        validateComments();
        updateSubmitState();
    });
});

$$('input[name="title"]').forEach(r => r.addEventListener('change', () => {
    validateTitle();
    updateSubmitState();
}));

$$('#hearSources input[type="checkbox"]').forEach(cb => cb.addEventListener('change', () => {
    validateSources();
    updateSubmitState();
}));

// ======= Topic selection and dynamic field generation =======
topicSelect.addEventListener('change', () => {
    validateTopic();
    // Clear dynamic area
    dynamicArea.innerHTML = '';
    state.dynamicRequired = false;

    if (!topicSelect.value) {
        updateSubmitState();
        return;
    }

    // Create dynamic checkbox and input container
    const wrap = document.createElement('div');
    wrap.className = 'field-group';

    const label = document.createElement('label');
    label.className = 'field-label';
    label.textContent = 'Topic Detail:';

    const box = document.createElement('div');
    const cbId = 'topicDetailCk';
    box.innerHTML = `
        <label><input id="${cbId}" type="checkbox" /> Enable details for "${topicSelect.value}"</label>
        <div id="dynHost"></div>
    `;

    const errDiv = document.createElement('div');
    errDiv.className = 'error';
    errDiv.id = 'err-dynamicText';

    wrap.appendChild(label);
    wrap.appendChild(box);
    wrap.appendChild(errDiv);
    dynamicArea.appendChild(wrap);

    // Add event listener for dynamic checkbox
    const ck = $('#' + cbId);
    ck.addEventListener('change', () => {
        const host = $('#dynHost');
        host.innerHTML = '';
        state.dynamicRequired = ck.checked;

        if (ck.checked) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'dynamicText';
            input.placeholder = `Enter ${topicSelect.value} details`;
            input.maxLength = 50;

            input.addEventListener('input', () => {
                validateDynamic();
                updateSubmitState();
            });
            input.addEventListener('blur', () => {
                validateDynamic();
                updateSubmitState();
            });

            host.appendChild(input);
        }

        validateDynamic();
        updateSubmitState();
    });

    updateSubmitState();
});

// ======= Form submission handler =======
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Final validation check
    updateSubmitState();
    if (submitBtn.disabled) return;

    const selectedTitle = titleRadios.find(r => r.checked)?.value || '';
    const selectedSources = $$('#hearSources input[type="checkbox"]')
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    const dynText = $('#dynamicText')?.value?.trim() || '';

    const row = {
        title: selectedTitle,
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: emailId.value.trim(),
        phone: phoneNumber.value.trim(),
        address1: address1.value.trim(),
        address2: address2.value.trim() || 'N/A',
        zip: zipcode.value.trim(),
        sources: selectedSources.join(', '),
        topic: topicSelect.value,
        topicDetail: state.dynamicRequired ? dynText : 'N/A',
        comments: comments.value.trim(),
        submittedAt: new Date().toLocaleString(),
    };

    state.submissions.push(row);
    renderResults();

    // Clear form and reset UI state
    form.reset();
    address2.value = '';
    addr2Counter.textContent = '0/20 characters used';
    dynamicArea.innerHTML = '';
    state.dynamicRequired = false;
    Object.values(err).forEach(el => el.textContent = '');
    $$('input, select, textarea').forEach(el => el.classList.remove('valid', 'invalid'));
    submitBtn.disabled = true;
});

// ======= Reset button handler =======
resetBtn.addEventListener('click', () => {
    setTimeout(() => {
        addr2Counter.textContent = '0/20 characters used';
        dynamicArea.innerHTML = '';
        state.dynamicRequired = false;
        Object.values(err).forEach(el => el.textContent = '');
        $$('input, select, textarea').forEach(el => el.classList.remove('valid', 'invalid'));
        submitBtn.disabled = true;
    }, 0);
});

// ======= Render results table =======
function renderResults() {
    if (!state.submissions.length) {
        resultsSection.innerHTML = '';
        return;
    }

    const headers = [
        'Title', 'First Name', 'Last Name', 'Email', 'Phone',
        'Address 1', 'Address 2', 'Zip', 'Heard From',
        'Topic', 'Topic Detail', 'Comments', 'Submitted At'
    ];

    // Build HTML with data-label attributes for responsive design
    const html = [`
        <h2>Submission Results</h2>
        <table class="results">
            <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
    `];

    for (const r of state.submissions) {
        const values = [
            r.title, r.firstName, r.lastName, r.email, r.phone,
            r.address1, r.address2, r.zip, r.sources, r.topic,
            r.topicDetail, r.comments, r.submittedAt
        ];

        html.push('<tr>');
        values.forEach((v, i) => {
            html.push(`<td data-label="${headers[i]}">${escapeHtml(v)}</td>`);
        });
        html.push('</tr>');
    }

    html.push('</tbody></table>');
    resultsSection.innerHTML = html.join('');
}

// ======= HTML escaping for security =======
function escapeHtml(s = '') {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return String(s).replace(/[&<>"']/g, c => map[c]);
}

// ======= Chatbot functionality =======
const aiBtn = $('#aiAssistantBtn');
const chat = $('#aiChat');
const chatLog = $('#chatLog');
const chatQ = $('#chatQuestion');
const chatSend = $('#sendChat');
const chatClose = $('#closeChat');

// Toggle chatbot visibility
aiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = chat.hasAttribute('hidden');

    if (isHidden) {
        // Open the chat
        chat.removeAttribute('hidden');
        aiBtn.setAttribute('aria-expanded', 'true');
        chatQ.focus();

        // Add welcome message if first time
        if (chatLog.children.length === 0) {
            addMsg('bot', 'Hello! I can help you with questions about the form. Ask me about email, phone, zip, required fields, or address requirements.');
        }
    } else {
        // Close the chat
        chat.setAttribute('hidden', '');
        aiBtn.setAttribute('aria-expanded', 'false');
    }
});

chatClose.addEventListener('click', (e) => {
    e.stopPropagation();
    chat.setAttribute('hidden', '');
    aiBtn.setAttribute('aria-expanded', 'false');
});

// Add message to chat log
function addMsg(who, text) {
    const div = document.createElement('div');
    div.className = `msg ${who}`;
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Generate chatbot response
function replyTo(q) {
    const t = q.toLowerCase();
    const responses = [
        { keywords: ['email', 'mail', '@'], answer: faqs.email },
        { keywords: ['phone', 'number', 'format'], answer: faqs.phone },
        { keywords: ['zip', 'code', 'postal'], answer: faqs.zip },
        { keywords: ['required', 'mandatory', 'optional', 'asterisk', '*'], answer: faqs.required },
        { keywords: ['address', 'street', 'apt', 'suite'], answer: faqs.address },
        { keywords: ['hello', 'hi', 'hey'], answer: "Hello! How can I help you with the form?" },
        { keywords: ['thank', 'thanks'], answer: "You're welcome! Let me know if you need anything else." },
        { keywords: ['help'], answer: "I can help you with: email format, phone format, zip codes, required fields, and address requirements. What would you like to know?" },
        { keywords: ['submit', 'button'], answer: "The Submit button will be enabled once all required fields are filled correctly." },
        { keywords: ['reset', 'clear'], answer: "The Reset button will clear all form fields. You'll need to start over." },
    ];

    const match = responses.find(r => r.keywords.some(k => t.includes(k)));
    return match ? match.answer : "I can help with questions about email format, phone format, zip codes, required fields, and address requirements. What would you like to know?";
}

// Send chat message
function sendChat() {
    const q = chatQ.value.trim();
    if (!q) return;

    addMsg('user', q);
    const a = replyTo(q);

    // Simulate typing delay
    setTimeout(() => {
        addMsg('bot', a);
    }, 300);

    chatQ.value = '';
    chatQ.focus();
}

chatSend.addEventListener('click', sendChat);
chatQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendChat();
    }
});

// ======= Initialize form state on load =======
updateSubmitState();