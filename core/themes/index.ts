'use client';

import {
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
} from '@mantine/core';

const ERROR_STYLES = {
  error: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.375rem',
  },
};

// Create a utility function for checking iPhone that works on both server and client
const isIPhone = typeof window !== 'undefined' ? /iPhone|iPod/.test(navigator.userAgent) : false;

export const theme = createTheme({
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });

    if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
      return {
        ...defaultResolvedColors,
        color: 'var(--mantine-color-black)',
        hoverColor: 'var(--mantine-color-black)',
      };
    }

    if (input.variant === 'light') {
      return {
        background: rgba(parsedColor.value, 0.1),
        hover: rgba(parsedColor.value, 0.15),
        border: `${rem(1)} solid ${parsedColor.value}`,
        color: darken(parsedColor.value, 0.1),
      };
    }

    if (input.variant === 'danger') {
      return {
        background: 'var(--mantine-color-red-9)',
        hover: 'var(--mantine-color-red-8)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    }

    return defaultResolvedColors;
  },
  fontFamily: '"Roboto", sans-serif',
  headings: {
    fontFamily: 'Gotham',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
  // primaryShade: 9,
  primaryColor: 'primary',
  defaultRadius: '0.5rem',
  // black: 'black',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  colors: {
    primary: [
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
      '#006838',
    ],
    'text-color': [
      '#7E7E80',
      '#aab0b5',
      '#808991',
      '#56626c',
      '#667085',
      '#62738D',
      '#01101c',
      '#010d17',
      '#010a11',
      '#00060b',
      '#000407',
    ],
    'error-color': [
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
    ],
    'border-color': [
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
    ],
  },
  components: {
    TagsInput: {
      defaultProps: {
        radius: '8px',
      },
      styles: {
        ...ERROR_STYLES,
        label: {
          fontWeight: 500,
          fontSize: '0.75rem',
          marginBottom: '0.3rem',
        },
        input: {
          fontSize: '0.75rem',
          borderColor: '#DFE0E2 !important',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        fw: '100',
        autoContrast: true,
      },
    },
    Button: {
      defaultProps: {
        // radius: '16px',
        fontSize: '3rem',
        fw: '500',
      },
      styles: {
        root: {
          '&:active': {
            transform: 'none',
          },
          fontFamily: '"Roboto", sans-serif',
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: '8px',
        fontSize: '16px',
        //borderWidth: '3px',
      },
      styles: {
        ...ERROR_STYLES,
        label: {
          fontWeight: 400,
          color: '#3C3C3D',
          fontSize: '16px',
          marginBottom: '0.3rem',
        },
        input: {
          '&:invalid': {
            borderColor: '#fff !important',
          },
          // borderWidth: '1px',
          fontSize: isIPhone ? '1rem' : '0.75rem',
          borderColor: '#DFE0E2 !important',
        },
      },
    },

    Drawer: {
      defaultProps: {
        position: 'right',
      },
      styles: {
        body: {
          flex: 1,
          height: 'calc(100% - 60px)',
        },
        title: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      },
    },

    Select: {
      defaultProps: {
        radius: '8px',
        fontSize: '16px',
        //borderWidth: '3px',
      },
      styles: {
        ...ERROR_STYLES,
        label: {
          fontWeight: 400,
          color: '#3C3C3D',
          fontSize: '16px',
          marginBottom: '0.3rem',
        },
        input: {
          '&:invalid': {
            borderColor: '#fff !important',
          },
          // borderWidth: '1px',
          fontSize: isIPhone ? '1rem' : '0.75rem',
          borderColor: '#DFE0E2 !important',
        },
      },
    },
    Text: {
      styles: {
        root: {
          lineHeight: '24px',
          fontWeight: 400,
        },
      },
    },
    Badge: {
      defaultProps: {},
    },
  },
});
