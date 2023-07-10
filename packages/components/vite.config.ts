import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
export default defineConfig({
  build: {
    outDir: "es",
    target: "modules",
    minify: true,
    rollupOptions: {
      external: ["vue",/\.less/],
      input: ["index.ts"],
      output: [
        {
          format: "es",
          entryFileNames(chunkInfo){
            console.log(chunkInfo.name)
            if (chunkInfo.name && chunkInfo.name.includes('.vue')) {
              chunkInfo.name = chunkInfo.name.replace('.vue','')
            }
            console.log(chunkInfo.name)
            return chunkInfo.name + '.mjs'
          },
          // entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: "named",
          dir: "../awwui/es",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "../awwui/lib",
        },
      ],
    },
    lib: {
      entry: "./index.ts",
      name: 'awwui',
      formats: ['es', "cjs"]
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outputDir: ["../awwui/es/src", "../awwui/lib/src"],
      tsConfigFilePath: "../../tsconfig.json",
      cleanVueFileName: true,
    }),
    {
      name: "style",
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);

        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件

          this.emitFile({
            type: "asset",
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.less/g, ".css"),
          });
        }
      },
    },
  ],
});



