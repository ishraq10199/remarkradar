## RemarkRadar

<img width="2920" height="1735" alt="image" src="https://github.com/user-attachments/assets/980f4220-fccf-4bcc-90fe-34a63aad89b4" />
<img width="2604" height="1544" alt="image" src="https://github.com/user-attachments/assets/9233eff8-49d8-4f82-83eb-a26954779dfd" />

<img width="2610" height="1544" alt="image" src="https://github.com/user-attachments/assets/3de19f4a-bdef-4418-9e71-8ba98f0039a6" />



## What is RemarkRadar?

With RemarkRadar, you can embed a comments section on your website. Can be moderated through an admin panel. Yes, its that simple.

Visit the demo to check the comments for the site itself! (check the `Deployed version` section below).

## Notes on development
 
This project made with NextJS, using the page router. The backend uses Firebase for auth and storage. To summarize, this is a toy SaaS project involving an embeddable comments section to a website of your choice. I added three subscription tiers with Stripe.

There are some issues with the app still, as I made this a long time ago when I had much less knowledge of JS and the web overall.

If I had to remake this app now, I would make use of simple vanilla JS and any lightweight backend. If a framework was needed, I would opt for VueJS on the frontend. NextJS is probably overkill for this anyway. 🙂

> [!WARNING]  
> I have cancelled some of the paid services on GCP that used to enable some extra Firebase stuff. So the demo link may not be _fully_ functional and _may_ have bugs now

## Deployed Version

This app was deployed on [remarkradar.vercel.app](remarkradar.vercel.app)

## Running Locally 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


