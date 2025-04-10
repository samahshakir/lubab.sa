import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-MF47D740J2"); // Replace with your Measurement ID
};

export const trackPageView = () => {
  ReactGA.send("pageview");
};
