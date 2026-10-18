import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

if (!existsSync(path.join(root, 'src/main.tsx')) || !existsSync(path.join(root, 'src/lib')) || !existsSync(path.join(root, 'src/components/pet'))) {
  console.log('[prepare-web] Restoring missing workspace files...');
  if (existsSync('/tmp/upstream-missing.tar.gz')) {
    execSync(`tar -xzf /tmp/upstream-missing.tar.gz -C "${root}"`, { stdio: 'inherit' });
  } else {
    execSync('git clone --depth 1 https://github.com/rajeevranjan4348-arch/grok-app.git /tmp/orig-web', { stdio: 'inherit' });
    execSync(`cp -rn /tmp/orig-web/src/* "${root}/src/" && cp -rn /tmp/orig-web/src/components/* "${root}/src/components/" && cp -rn /tmp/orig-web/vendor "${root}/" 2>/dev/null || true && rm -rf /tmp/orig-web`, { stdio: 'inherit' });
  }
  console.log('[prepare-web] Restore complete.');
}
