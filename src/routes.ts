import { Route } from "./types";

export const cuboroProRoute: Route = [
    {
        coordinates: { x: 3, y: 0, z: 1 },
        rules: [
            { in: { level: 'a', side: 3 }, out: { level: 'a', side: 4 } },
            { in: { level: 'b', side: 4 }, out: { level: 'c', side: 2 } },

        ],
    },

    {
        coordinates: { x: 2, y: 0, z: 1 },
        rules: [
            { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
            { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },
            { in: { level: 'c', side: 3 }, out: { level: 'c', side: 4 } },
        ],
    },
    {
        coordinates: { x: 1, y: 0, z: 1 },
        rules: [
            { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
            { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },
            { in: { level: 'c', side: 2 }, out: { level: 'c', side: 3 } },
        ],
    },

    {
        coordinates: { x: 0, y: 0, z: 1 },
        rules: [
            { in: { level: 'a', side: 2 }, out: { level: 'b', side: 2 } },
        ],
    },
    {
        coordinates: { x: 4, y: 0, z: 0 },
        rules: [
            { in: { level: 'a', side: 4 }, out: { level: 'a', side: 3 } },

        ],
    },
    {
        coordinates: { x: 4, y: 1, z: 0 },
        rules: [
            { in: { level: 'a', side: 1 }, out: { level: 'a', side: 4 } },
            { in: { level: 'b', side: 4 }, out: { level: 'c', side: 2 } },

        ],
    },
    {
        coordinates: { x: 3, y: 1, z: 0 },
        rules: [
            { in: { level: 'a', side: 2 }, out: { level: 'a', side: 4 } },
            { in: { level: 'b', side: 2 }, out: { level: 'b', side: 4 } },

        ],
    },
    {
        coordinates: { x: 2, y: 1, z: 0 },
        rules: [
            { in: { level: 'a', side: 1 }, out: { level: 'a', side: 2 } },
            { in: { level: 'b', side: 4 }, out: { level: 'b', side: 2 } },

        ],
    },
    {
        coordinates: { x: 2, y: 0, z: 0 },
        rules: [
            { in: { level: 'a', side: 3 }, out: { level: 'a', side: 4 } },
        ],
    },
    {
        coordinates: { x: 1, y: 0, z: 0 },
        rules: [
            { in: { level: 'a', side: 2 }, out: { level: 'a', side: 3 } },
        ],
    },
    {
        coordinates: { x: 1, y: 1, z: 0 },
        rules: [
            { in: { level: 'a', side: 1 }, out: { level: 'a', side: 3 } },
            { in: { level: 'b', side: 3 }, out: { level: 'b', side: 2 } },
        ],
    },
      {
        coordinates: { x: 1, y: 2, z: 0 },
        rules: [
          { in: { level: 'a', side: 1 }, out: { level: 'b', side: 1 } },
        ],
      },
];