const fs = require('fs');
let code = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

code = code.replace(
  /const \[isMenuOpen, setIsMenuOpen\] = useState\(false\);/,
  'const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const [isDepositMenuOpen, setIsDepositMenuOpen] = useState(false);'
);

const oldDeposit = `              {/* Deposit Button */}
              <div className="relative shrink-0 ml-1">
                <div className="absolute -top-1.5 -right-1.5 bg-[#ff0b0b] text-white text-[9px] font-bold px-1 rounded-sm z-10 shadow-md transform rotate-12">
                  +3%
                </div>
                <button onClick={() => window.location.href = '/deposit'} className="bg-[#66df2f] hover:bg-[#55cc25] text-black px-2.5 rounded-lg text-[13px] font-bold min-w-[80px] flex items-center justify-center gap-1 shadow-[0_2px_10px_rgba(102,223,47,0.3)] transition-colors h-[32px]">
                  Deposit
                  <svg className="w-3 h-3 opacity-80 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>`;

const newDeposit = `              {/* Deposit Button */}
              <div className="relative shrink-0 ml-1">
                <div className="absolute -top-1.5 -right-1.5 bg-[#ff0b0b] text-white text-[9px] font-bold px-1 rounded-sm z-10 shadow-md transform rotate-12">
                  +3%
                </div>
                <div className="relative">
                  <div className="flex bg-[#66df2f] hover:bg-[#55cc25] text-black rounded-lg shadow-[0_2px_10px_rgba(102,223,47,0.3)] transition-colors h-[32px]">
                    <button onClick={() => window.location.href = '/deposit'} className="px-2.5 text-[13px] font-bold h-full flex items-center justify-center rounded-l-lg border-r border-black/10">
                      Deposit
                    </button>
                    <button onClick={() => setIsDepositMenuOpen(!isDepositMenuOpen)} className="px-1.5 h-full flex items-center justify-center rounded-r-lg">
                      <svg className="w-3.5 h-3.5 opacity-80 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>
                  {isDepositMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDepositMenuOpen(false)} />
                      <div className="absolute top-full right-0 mt-1.5 w-32 bg-[#1a1a1a] border border-[#ffdf00]/30 rounded-lg shadow-xl overflow-hidden z-50">
                        <button onClick={() => window.location.href = '/withdraw'} className="w-full text-left px-3 py-2 text-[13px] text-white hover:bg-neutral-800 transition-colors font-medium flex items-center gap-2">
                          <span className="text-xl">💰</span> Withdraw
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>`;

code = code.replace(oldDeposit, newDeposit);
fs.writeFileSync('src/components/HomeScreen.tsx', code);
console.log('Done!');
