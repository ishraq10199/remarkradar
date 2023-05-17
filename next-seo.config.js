const title = "Remark Radar – Comment, interact, engage!";
const description = "Heavily inspired by Lee Robinson's Fast Feedback";

const SEO = {
  title,
  description,
  canonical: "https://remarkradar.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://remarkradar.com",
    title,
    description,
    images: [
      {
        url: "https://remarkradar.com/logo.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
