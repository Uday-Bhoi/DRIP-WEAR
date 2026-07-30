// DripWear Design Tokens derived from Stitch Design System Strategy ("The Digital Aurora")
export const stitchTokens = {
  colors: {
    // Nocturnal Base & Glass Hierarchy
    background: '#0e0e12',
    surfaceContainerLow: '#131317',
    surfaceContainer: '#19191e',
    surfaceContainerHigh: '#1f1f25',
    surfaceContainerHighest: '#25252b',
    surfaceBright: '#2c2b32',

    // Chromatic Luminescence Accents
    primary: '#c59aff',
    primaryDim: '#9547f7',
    primaryGlow: 'rgba(197, 154, 255, 0.3)',
    primaryGradient: 'linear-gradient(135deg, #c59aff 0%, #9547f7 100%)',
    
    tertiaryCyan: '#8ff5ff',
    tertiaryGlow: 'rgba(143, 245, 255, 0.25)',

    // Text & Metadata
    onSurface: '#fcf8fe',
    onSurfaceVariant: '#acaab0',
    outlineVariant: 'rgba(72, 71, 76, 0.3)',
    
    // Status
    emeraldClean: '#10B981',
    error: '#ff6e84',
  },
  
  borderRadius: {
    pill: '9999px',
    container: '1rem',
    card: '1.25rem',
  },

  effects: {
    glassBlur: 'backdrop-blur-xl bg-[#19191e]/60 border border-white/5',
    ambientGlow: 'shadow-[0_0_30px_rgba(197,154,255,0.2)]',
    hoverRising: 'transition-all duration-300 hover:-translate-y-1 hover:bg-[#25252b]',
  }
};
