import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
// ✅ Compatible avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/shared/components'),
            '@pages': path.resolve(__dirname, 'src/features/site/pages'),
            '@admin': path.resolve(__dirname, 'src/features/admin'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@lib': path.resolve(__dirname, 'src/lib'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@auth': path.resolve(__dirname, 'src/features/auth/pages'),
            '@entities': path.resolve(__dirname, 'src/domain/entities'),
            '@repositories': path.resolve(__dirname, 'src/core/repositories'),
            '@usecases': path.resolve(__dirname, 'src/domain/usecases'),
            '@interactor': path.resolve(__dirname, 'src/domain/interactor'),
            '@data': path.resolve(__dirname, 'src/data/repositories'),
        },
    },
});
