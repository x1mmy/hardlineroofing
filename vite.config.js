import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions sets GITHUB_REPOSITORY=owner/repo. Project pages use /repo/; user pages
// (username.github.io repo) are served at /. Override with VITE_BASE_PATH if needed.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const baseFromRepo =
  !repo ? '/' : repo.endsWith('.github.io') ? '/' : `/${repo}/`
const base = process.env.VITE_BASE_PATH ?? baseFromRepo

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
