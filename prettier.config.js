module.exports = {
  plugins: [
  
    (async () => {
      try {
        const plugin = await import("prettier-plugin-tailwindcss");
        return plugin.default || plugin; 
      } catch (error) {
        console.error('Failed to import prettier-plugin-tailwindcss:', error);
        return null; 
      }
    })(),
  ],
};
