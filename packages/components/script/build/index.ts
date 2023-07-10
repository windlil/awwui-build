import delPath from "../utils/delpath";
import { series, parallel, src, dest } from "gulp";
import { packagePath, componetPath } from "../utils/paths";
import autoPrefixer from "gulp-autoprefixer";
import less from 'gulp-less'
import run from "../utils/run";
//删除easyest

export const removeDist = () => {
  return delPath(`${packagePath}/awwui`);
};

export const buildStyle = () => {
  return src(`${componetPath}/src/**/style/**.less`).pipe(less())
  .pipe(autoPrefixer())
  .pipe(dest(`${packagePath}/awwui/lib/src`))
  .pipe(dest(`${packagePath}/awwui/es/src`))
}

export const buildComponents = () => {
  run('pnpm run build',componetPath)
}

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponents()
  )
);
