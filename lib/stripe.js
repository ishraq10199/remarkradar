import { loadStripe } from "@stripe/stripe-js";
import { functions } from "@/lib/firebase";
import { httpsCallable } from "firebase/functions";
let stripePromise;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const goToBillingPortal = async () => {
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-xswq-createPortalLink"
  );

  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/account`,
  });
  window.location.assign(data.url);
};

export { getStripe, goToBillingPortal };
