export const hexToRgba = (hex: string, alpha = 1) => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const colors = {
  purple: '#d184ff',
  cyan: '#69eaff',
  purpleAlt: '#a855f7',
  indigo: '#8b5cf6',
  primary: '#d184ff',
  white: '#ffffff',
  black: '#000000',
};

export const gradients = {
  ia: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.cyan} 100%)`,
  iaReverse: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.purple} 100%)`,
  background: `radial-gradient(circle at 50% 50%, ${hexToRgba(colors.purple, 0.1)} 0%, transparent 70%)`,
  backgroundCyan: `radial-gradient(circle at 50% 50%, ${hexToRgba(colors.cyan, 0.1)} 0%, transparent 70%)`,
  subtle: `linear-gradient(180deg, ${hexToRgba(colors.purple, 0.05)} 0%, transparent 100%)`,
};

export default colors;
