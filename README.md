# 📡 Data Pusher - Node.js Webhook Forwarder

This Express app receives JSON data per account and forwards it to configured destination webhooks.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- SQLite (via Sequelize ORM)
- Axios for HTTP forwarding

---

## 🧩 Modules

### 1. Account
- Fields: `email`, `account_name`, `website`, `app_secret_token` (auto-generated)

### 2. Destination
- Belongs to Account
- Fields: `url`, `method`, `headers` (as JSON object)

### 3. Incoming Data
- `POST /server/incoming_data`
- Requires header `CL-X-TOKEN`
- Forwards data to all destinations of the account

---

## 🔄 Setup

```bash
git clone <your-repo-url>
npm install
npm start
