const fs = require('fs');
let content = fs.readFileSync('src/components/AuthScreen.tsx', 'utf8');

// Add useUser hook import and usage
if (!content.includes('useUser')) {
  content = content.replace(
    'import { Eye, EyeOff, Gamepad2, ShieldCheck, Lock, Smartphone, Gift, X } from "lucide-react";',
    'import { Eye, EyeOff, Gamepad2, ShieldCheck, Lock, Smartphone, Gift, X } from "lucide-react";\nimport { useUser } from "@/context/UserContext";'
  );

  content = content.replace(
    'export default function AuthScreen({ onLogin, onClose }: { onLogin?: () => void, onClose?: () => void }) {',
    'export default function AuthScreen({ onLogin, onClose }: { onLogin?: () => void, onClose?: () => void }) {\n  const { login } = useUser();'
  );
  
  content = content.replace(
    'if (onLogin) onLogin();',
    'login(data.token, data.user);\n      if (onLogin) onLogin();'
  );
  
  fs.writeFileSync('src/components/AuthScreen.tsx', content);
  console.log('Patched AuthScreen');
}
