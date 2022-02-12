export const shuffle = (o) => {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

export const JAR = {
  id: 1,
  name: "Class Marble Jar",
  palette: [
    "#3E9651",
    "#CC2529",
    "#E36E90",
    "#396AB1",
    "#6B4C9A",
    "#E36E90",
    "#6B4C9A",
    "#396AB1",
    "#3E9651",
    "#CCAA55",
    "#DA7C30",
    "#CC2529",
    "#82A3DB",
    "#94CA6B",
    "#DCD280",
    "#F1A75C",
    "#E36E90",
    "#B087C7",
    "#909595",
    "#535154",
    "#B68570",
    "#922428",
  ],
  rad: [12, 18, 24],
  kids: [
    { color: 0, l: 4, m: 8, s: 16 },
    { color: 1, l: 4, m: 8, s: 16 },
    { color: 2, l: 4, m: 8, s: 16 },
    { color: 3, l: 4, m: 8, s: 16 },
    { color: 4, l: 4, m: 8, s: 16 },
  ],
};

export const jarStyle = {
  isStatic: true,
  render: {
    lineWidth: 1,
    strokeStyle: "transparent",
    fillStyle: "transparent",
  },
};

export const CANDIES_LIMIT = 390;

export const CANDIES_PER_INTERVAL = 80;
