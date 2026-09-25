const fs = require('fs');
let content = fs.readFileSync('src/components/AuthScreen.tsx', 'utf8');

// Add new imports and state
content = content.replace(
  'import { Eye, EyeOff, Gamepad2, ShieldCheck, Lock, Smartphone, Gift, X } from "lucide-react";',
  'import { Eye, EyeOff, Gamepad2, ShieldCheck, Lock, Smartphone, Gift, X } from "lucide-react";\nimport { toast } from "react-hot-toast";'
);

content = content.replace(
  'const [agreed, setAgreed] = useState(true);',
  'const [agreed, setAgreed] = useState(true);\n  const [phone, setPhone] = useState("");\n  const [password, setPassword] = useState("");\n  const [confirmPassword, setConfirmPassword] = useState("");\n  const [loading, setLoading] = useState(false);\n\n  const handleSubmit = async () => {\n    if (!agreed) return toast.error("Please agree to the User Agreement");\n    if (!phone || !password) return toast.error("Please fill in all fields");\n    if (activeTab === "register" && password !== confirmPassword) return toast.error("Passwords do not match");\n    \n    setLoading(true);\n    try {\n      const endpoint = activeTab === "register" ? "/api/auth/register" : "/api/auth/login";\n      const res = await fetch(endpoint, {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ phone, username: phone, password }),\n      });\n      const data = await res.json();\n      if (!res.ok) throw new Error(data.error || "Something went wrong");\n      toast.success(data.message);\n      if (onLogin) onLogin();\n    } catch (err: any) {\n      toast.error(err.message);\n    } finally {\n      setLoading(false);\n    }\n  };'
);

// Bind inputs
content = content.replace(
  '<input type="text" placeholder="Please enter the phone number"',
  '<input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Please enter the phone number"'
);

content = content.replace(
  '<input \n                  type={showPassword ? "text" : "password"} \n                  placeholder="*Enter password"',
  '<input \n                  type={showPassword ? "text" : "password"} \n                  value={password} onChange={e => setPassword(e.target.value)} \n                  placeholder="*Enter password"'
);

content = content.replace(
  '<input \n                  type={showConfirmPassword ? "text" : "password"} \n                  placeholder="*Enter password again"',
  '<input \n                  type={showConfirmPassword ? "text" : "password"} \n                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} \n                  placeholder="*Enter password again"'
);

// Bind button
content = content.replace(
  '<button onClick={onLogin} className="w-full bg-[#ffdf00]',
  '<button onClick={handleSubmit} disabled={loading} className="w-full bg-[#ffdf00]'
);

content = content.replace(
  '{activeTab === "register" ? "Register" : "Login"}',
  '{loading ? "Please wait..." : (activeTab === "register" ? "Register" : "Login")}'
);

fs.writeFileSync('src/components/AuthScreen.tsx', content);
console.log('Patched successfully');
