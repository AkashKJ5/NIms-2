/* ----------------------------------------------
-                                               |
-                                               |
-                                               |
-          REGISTERING THE SERVICE              |
-                  WORKER                       |
-                                               |
-                                               |
------------------------------------------------|
*/
export default function swDev() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/ws.js").then((registration) => {
        console.log("ServiceWorker registered: ", registration);
      }).catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
    });
  }
}

