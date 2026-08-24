@echo off
setlocal
set "NODE_BIN=C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "PNPM=C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"
set "PATH=%NODE_BIN%;%PATH%"
echo ============================================
echo   Ping Shun Zhen  -  game server
echo   open http://localhost:5173 in browser
echo   press Ctrl+C to stop
echo ============================================
call "%PNPM%" --filter @psz/portal dev
endlocal
