import { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import Styles from "./Loading.module.css";
const particlesOptions = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#fff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 3,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 20,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    twinkle: {
      particles: {
        enable: true,
        color: "#fff",
        frequency: 0.05,
        opacity: 1,
      },
      lines: {
        enable: true,
        color: "#fff",
        frequency: 0.005,
        opacity: 1,
      },
    },
  },
  interactivity: {
    events: {
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 1,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "#000",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};
// const particlesOptions = {
//   fullScreen: {
//     enable: true,
//     zIndex: 1,
//   },
//   detectRetina: true,
//   fpsLimit: 120,
//   interactivity: {
//     events: {
//       onClick: {
//         enable: true,
//         mode: "push",
//       },
//       onDiv: {
//         elementId: "repulse-div",
//         enable: false,
//         mode: "repulse",
//       },
//       onHover: {
//         enable: true,
//         mode: "connect",
//         parallax: {
//           enable: false,
//           force: 60,
//           smooth: 20,
//         },
//       },
//       resize: true,
//     },
//     modes: {
//       bubble: {
//         distance: 400,
//         duration: 2,
//         opacity: 0.8,
//         size: 40,
//         speed: 1,
//       },
//       connect: {
//         distance: 80,
//         lineLinked: {
//           opacity: 0.5,
//         },
//         radius: 60,
//       },
//       grab: {
//         distance: 400,
//         lineLinked: {
//           opacity: 1,
//         },
//       },
//       push: {
//         quantity: 3,
//       },
//       remove: {
//         quantity: 2,
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4,
//       },
//     },
//   },
//   particles: {
//     color: {
//       value: "random",
//     },
//     lineLinked: {
//       blink: false,
//       color: "#ffffff",
//       consent: false,
//       distance: 150,
//       enable: false,
//       opacity: 1,
//       width: 1,
//     },
//     move: {
//       attract: {
//         enable: false,
//         rotate: {
//           x: 600,
//           y: 1200,
//         },
//       },
//       bounce: false,
//       direction: "none",
//       enable: true,
//       outMode: "out",
//       random: false,
//       speed: 2,
//       straight: false,
//     },
//     number: {
//       density: {
//         enable: true,
//         area: 800,
//       },
//       limit: 200,
//       value: 100,
//     },
//     opacity: {
//       animation: {
//         enable: false,
//         minimumValue: 0.1,
//         speed: 1,
//         sync: false,
//       },
//       random: false,
//       value: 0.5,
//     },
//     shape: {
//       type: "circle",
//     },
//     size: {
//       animation: {
//         enable: false,
//         minimumValue: 0.1,
//         speed: 40,
//         sync: false,
//       },
//       random: true,
//       value: 5,
//     },
//   },
//   polygon: {
//     draw: {
//       enable: false,
//       lineColor: "#ffffff",
//       lineWidth: 0.5,
//     },
//     move: {
//       radius: 10,
//     },
//     scale: 1,
//     type: "none",
//     url: "",
//   },
//   background: {
//     color: "#000000",
//     image: "",
//     position: "50% 50%",
//     repeat: "no-repeat",
//     size: "cover",
//   },
// };
function Loading({ loading }) {
  const [showParticles, setShowParticles] = useState(loading);
  const container = useRef();
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  useEffect(() => {
    const ticker = setTimeout(() => {
      if (!loading) {
        container.current.classList.add(Styles.zIndex_1);
        setShowParticles(false);
      } else {
        container.current.classList.remove(Styles.zIndex_1);
      }
    }, 500);
    return () => {
      clearTimeout(ticker);
    };
  });
  useEffect(() => {
    setShowParticles(true);
  }, []);
  return (
    <>
      <div
        ref={container}
        className={`${Styles.loading_container} -z-60 flex flex-col ${
          loading ? "" : Styles.opacity_none
        }`}
      >
        {showParticles && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
        )}
        <h1
          className={`text-white font-mono text-5xl mb-10 text-center font-extrabold z-10 ${Styles.headerText}`}
        >
          Welcom to ANIMELOVE!
        </h1>
        {
          <img
            className="z-10"
            alt="banner"
            width="100px"
            height="200px"
            src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669691905/kurumimaster_ycc808.gif"
          />
        }
        <h1 className="mt-5 text-sm font-medium font-mono text-white z-10">
          Loading...
        </h1>
      </div>
    </>
  );
}

export default Loading;
