import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // 1. تحديد المسار الأساسي ليفتح الموقع على جيت هب بدون صفحة بيضاء
  base: '/School-Education/', 
  
  server: {
    host: "::",
    port: 8080,
  },
  
  plugins: [
    react(),
  ],
  
  resolve: {
    alias: {
      // 2. إعداد الاختصارات لتسهيل استدعاء الملفات داخل مجلد src
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
