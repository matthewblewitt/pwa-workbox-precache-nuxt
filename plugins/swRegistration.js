export default async () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("Registered SW")
      } catch (error) {
        console.log(error)
      }
    });
  }
};
