const fs = require('fs');
let data = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

data = data.replace('const { user, logout } = useUser();', `const { user, logout } = useUser();

  const handleLaunchGame = async (gameName: string) => {
    if (!user) {
      toast.error("Please login to play games!");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
      toast.loading('Launching ' + gameName + '...');
      const res = await fetch(\`\${API_URL}/games/launch/\${encodeURIComponent(gameName)}\`, {
        method: "POST",
        headers: { Authorization: \`Bearer \${token}\` }
      });
      toast.dismiss();
      if (res.ok) {
        const data = await res.json();
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          toast.success('Game ' + gameName + ' launched!');
        }
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to launch game");
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Error launching game");
    }
  };`);

data = data.replace(/className=\{\`aspect-\[3\/4\] \$\{game\.img\} rounded-xl relative overflow-hidden flex flex-col shadow-\[0_0_10px_rgba\(255,11,11,0\.4\)\] group cursor-pointer border border-\[\#ff0b0b\]\`\}/g, `onClick={() => handleLaunchGame(game.name)}\n                className={\`aspect-[3/4] \${game.img} rounded-xl relative overflow-hidden flex flex-col shadow-[0_0_10px_rgba(255,11,11,0.4)] group cursor-pointer border border-[#ff0b0b]\`}`);

fs.writeFileSync('src/components/HomeScreen.tsx', data);
