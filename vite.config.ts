import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default () => {
  return defineConfig({
    envPrefix: 'APP_',
    css: {
      modules: {
        generateScopedName: '[name]__[local]_[hash:base64:5]',
      },
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  });
};
