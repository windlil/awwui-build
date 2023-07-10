import { spawn } from 'child_process'

const run = async (command:string, path:string) => {
  const [cmd, ...args] = command.split(' ')
  return new Promise((resolve, reject) => {
    const app = spawn(cmd,args,{
      cwd: path,
      stdio: 'inherit',
      shell: true
    })
    app.on('close',resolve)
  })
}

export default run