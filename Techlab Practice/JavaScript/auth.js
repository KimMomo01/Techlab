
const SUPABASE_URL = "https://rnzkyjsxdyhoseiovnbr.supabase.co";
const SUPABASE_KEY = "sb_publishable_VB4fsfX5YFgM3TmWXby-Pg_YwoKwhdH";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function registerUser() {
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (!emailInput || !passwordInput) {
        message.style.color = "#fca5a5";
        message.textContent = "Please fill in all fields.";
        return;
    }

    message.style.color = "#94a3b8";
    message.textContent = "Registering account...";

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: emailInput,
            password: passwordInput
        });

        if (error) throw error;

        message.style.color = "#86efac";
        message.textContent = "Registration successful! Check your email to confirm.";
        
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

    } catch (err) {
        message.style.color = "#fca5a5";
        message.textContent = err.message || "Registration failed.";
    }
}

// Login Function
async function loginUser() {
    const emailInput = document.getElementById('loginEmail').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');

    if (!emailInput || !passwordInput) {
        message.style.color = "#fca5a5";
        message.textContent = "Please enter email and password.";
        return;
    }

    message.style.color = "#94a3b8";
    message.textContent = "Logging in...";

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput
        });

        if (error) throw error;

        message.style.color = "#86efac";
        message.textContent = "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (err) {
        message.style.color = "#fca5a5";
        message.textContent = err.message || "Login failed.";
    }
}

// Logout Function
async function logoutUser() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
    window.location.href = "login.html";
}

// Protected Page Guard for Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    if (supabaseClient) {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                window.location.href = "login.html";
            } else {
                const welcomeMsg = document.getElementById('welcomeMessage');
                if (welcomeMsg) {
                    welcomeMsg.textContent = `Welcome, ${session.user.email}!`;
                }
            }
        });
    }
}