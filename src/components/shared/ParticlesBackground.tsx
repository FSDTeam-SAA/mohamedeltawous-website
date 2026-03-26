"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 360,
          links: {
            opacity: 0.4,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    particles: {
      color: {
        value: ["rgb(166,180,187)", "#657C86"],
      },
      links: {
        color: ["rgb(166,180,187)", "#A6B4BB"],
        distance: 200,
        enable: true,
        opacity: 0.5,
        width: 3,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 120,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 6, max: 8 },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: false,
    },
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-x-0 top-0 h-full w-full pointer-events-none"
      />
    );
  }

  return null;
}
