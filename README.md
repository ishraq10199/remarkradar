# 💬 RemarkRadar — Embed Comments, Made Simple

## ✨ What is RemarkRadar?

**RemarkRadar** lets you embed a comments section on your website with ease — complete with moderation through an admin panel.  
Yes, it really *is* that simple.

> This was inspired by Lee Robinson's NextJS [course](https://masteringnextjs.com/), which was published in 2020

  <img width="100%" alt="RemarkRadar Desktop View" src="https://github.com/user-attachments/assets/980f4220-fccf-4bcc-90fe-34a63aad89b4" />
  <img width="50%" alt="RemarkRadar Admin Panel" src="https://github.com/user-attachments/assets/9233eff8-49d8-4f82-83eb-a26954779dfd" />
  <img width="49.5%" alt="RemarkRadar Mobile View" src="https://github.com/user-attachments/assets/3de19f4a-bdef-4418-9e71-8ba98f0039a6" />

🔍 **Tip:** Visit the demo to check the comments on the site itself  
(see the **Deployed Version** section below).

---

## 🛠️ Notes on Development

This project was built with:

- ⚛️ **Next.js** (Page Router)
- ⚡ **Chakra UI** for the UI components
- 🔐 **Firebase** for authentication and data storage
- 💳 **Stripe** for subscriptions (3 tiers)

In short, this is a **toy SaaS project** that provides an embeddable comments system for any website.

⚠️ **Important note:**  
This app was created a long time ago, when I had far less experience with JavaScript and web development. As a result, there are known issues and design decisions I would not make today.

### 🔄 If I Were to Rebuild This Today

- Use **vanilla JavaScript** for the embed script
- Pick a **lightweight backend**
- Prefer **Vue.js** for the frontend if a framework is needed
- Avoid **Next.js**, which is likely overkill for this use case 🙂

> [!WARNING]  
> Some paid GCP services used by Firebase have been cancelled.  
> As a result, the demo **may not be fully functional** and **may contain bugs**.

---

## 🚀 Deployed Version

The app was deployed at:

👉 **https://remarkradar.vercel.app**

---

## 🧑‍💻 Running Locally

First, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open your browser and navigate to:

👉 **http://localhost:3000**

---

## 📌 Summary

- 💬 Embeddable comments section
- 🛡️ Admin moderation panel
- 💳 Subscription tiers with Stripe
- 🧪 Built as a learning / experimental SaaS project
