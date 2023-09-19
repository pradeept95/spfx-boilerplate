/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { AwardLayout } from "./layout/Layout";
import { HomePage } from "./pages";
import AwardSubmissionPage from "./pages/AwardSubmission";
import { useInitializeAwardStore } from "./stores";

// const duration = 15 * 1000;
// const animationEnd = Date.now() + duration;
// const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

// function loadConfetti() {
//   return new Promise<(opts: any) => void>((resolve, reject) => {
//     if ((globalThis as any).confetti) {
//       return resolve((globalThis as any).confetti as any);
//     }
//     const script = document.createElement("script");
//     script.src =
//       "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
//     script.onload = () => resolve((globalThis as any).confetti as any);
//     script.onerror = reject;
//     document.head.appendChild(script);
//     script.remove();
//   });
// }

// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }

const AwardRoot: React.FunctionComponent<{}> = () => {
  // const shootConfetti = async () => {
  //   const confetti = await loadConfetti();

  //   const interval = setInterval(function () {
  //     const timeLeft = animationEnd - Date.now();

  //     if (timeLeft <= 0) {
  //       return clearInterval(interval);
  //     }

  //     const particleCount = 50 * (timeLeft / duration);
  //     // since particles fall down, start a bit higher than random
  //     confetti(
  //       Object.assign({}, defaults, {
  //         particleCount,
  //         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //       })
  //     );
  //     confetti(
  //       Object.assign({}, defaults, {
  //         particleCount,
  //         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  //       })
  //     );
  //   }, 250);
  //   const colors = ["#bb0000", "#ffffff"];

  //   (function frame() {
  //     confetti({
  //       particleCount: 2,
  //       angle: 60,
  //       spread: 55,
  //       origin: { x: 0 },
  //       colors: colors,
  //     });
  //     confetti({
  //       particleCount: 2,
  //       angle: 120,
  //       spread: 55,
  //       origin: { x: 1 },
  //       colors: colors,
  //     });

  //     if (Date.now() < animationEnd) {
  //       requestAnimationFrame(frame);
  //     }
  //   })();
  // };

  // React.useEffect(() => {
  //   shootConfetti();
  // }, []);

  useInitializeAwardStore();
  return (
    <>
      <section id={"my-canvas"}>
        <Routes>
          <Route path="/" element={<AwardLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/nomination/:awardId/:mode"
              element={<AwardSubmissionPage />}
            />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default AwardRoot;
