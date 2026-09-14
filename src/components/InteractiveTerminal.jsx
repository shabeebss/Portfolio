import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, Sparkles, Code2, Server, Cpu } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

const COMMANDS = {
  'python profile.py': {
    type: 'code',
    lang: 'python',
    output: [
      '# Initializing engineer profile runtime...',
      `class Engineer:`,
      `    name = "${PORTFOLIO_CONFIG.name}"`,
      `    role = "${PORTFOLIO_CONFIG.role}"`,
      `    primary_stack = ["Python", "Django REST", "PostgreSQL", "Next.js", "PrimeReact"]`,
      `    specialties = ["Multi-tenant ERP", "FIFO Valuation", "Computer Vision (YOLOv8)"]`,
      `    current_company = "Exouzia"`,
      `    status = "${PORTFOLIO_CONFIG.status.text}"`,
      `    location = "${PORTFOLIO_CONFIG.location}"`,
      `    contact = "${PORTFOLIO_CONFIG.email}"`
    ]
  },
  'curl /api/v1/health': {
    type: 'json',
    output: [
      `HTTP/1.1 200 OK`,
      `Content-Type: application/json; charset=utf-8`,
      `X-Response-Time: 28.4ms`,
      ``,
      `{`,
      `  "status": "healthy",`,
      `  "services": {`,
      `    "django_api": "active (sub-45ms P95 latency)",`,
      `    "postgresql_db": "connected (connection pool: 20)",`,
      `    "redis_cache": "online",`,
      `    "payment_gateway": "Razorpay verified (webhook active)",`,
      `    "vision_inference": "YOLOv8 (CUDA active, 30+ FPS)"`,
      `  },`,
      `  "uptime": "99.98%",`,
      `  "environment": "production"`,
      `}`
    ]
  },
  'python -m yolo_vision': {
    type: 'stream',
    output: [
      `[AI-VISION] Loading YOLOv8 custom weights (threat_detection.pt)...`,
      `[AI-VISION] OpenCV video capture stream initialized @ 1920x1080`,
      `[AI-VISION] TensorRT engine warmup complete. Inference batch: 1`,
      `[AI-VISION] Frame #0412: Detected 'Intrusion' (conf: 0.94) at bbox [x: 320, y: 140, w: 210, h: 480]`,
      `[AI-VISION] Event triggered: Webhook alert sent to surveillance dashboard in 18ms`,
      `[AI-VISION] Stream benchmark: 34.2 FPS on TensorRT pipeline`
    ]
  },
  'pytest erp/tests/': {
    type: 'test',
    output: [
      `rootdir: /home/shabeeb/pyerp, configfile: pytest.ini`,
      `test_inventory_fifo.py::test_automated_fifo_allocation PASSED    [ 25% ]`,
      `test_ledger_balances.py::test_balanced_debit_credit_audit PASSED [ 50% ]`,
      `test_rbac_permissions.py::test_branch_isolation_policy PASSED    [ 75% ]`,
      `test_razorpay_webhook.py::test_signature_verification PASSED    [ 100% ]`,
      ``,
      `==================== 4 passed in 0.42s ====================`
    ]
  }
};

const PRESET_BUTTONS = [
  { label: 'python profile.py', cmd: 'python profile.py', icon: Code2 },
  { label: 'curl /api/v1/health', cmd: 'curl /api/v1/health', icon: Server },
  { label: 'python -m yolo_vision', cmd: 'python -m yolo_vision', icon: Cpu },
  { label: 'pytest erp/tests/', cmd: 'pytest erp/tests/', icon: TerminalIcon }
];

export const InteractiveTerminal = () => {
  const [activeCommand, setActiveCommand] = useState('python profile.py');
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef(null);
  const intervalRef = useRef(null);

  const runCommand = (cmdKey) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const cmdData = COMMANDS[cmdKey];
    setActiveCommand(cmdKey);
    setIsTyping(true);
    setDisplayedLines([]);

    if (!cmdData) {
      setTimeout(() => {
        setDisplayedLines([
          `bash: command not found: ${cmdKey}`,
          `Available commands:`,
          `  • python profile.py`,
          `  • curl /api/v1/health`,
          `  • python -m yolo_vision`,
          `  • pytest erp/tests/`,
          `  • clear`
        ]);
        setIsTyping(false);
      }, 120);
      return;
    }

    const lines = cmdData.output || [];
    let lineIdx = 0;

    intervalRef.current = setInterval(() => {
      if (lineIdx < lines.length) {
        const nextLine = lines[lineIdx];
        setDisplayedLines((prev) => [...prev, String(nextLine ?? '')]);
        lineIdx++;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 45);
  };

  useEffect(() => {
    runCommand('python profile.py');
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    if (trimmed === 'clear') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedLines([]);
      setInputVal('');
      return;
    }
    runCommand(trimmed);
    setInputVal('');
  };

  const handleCopy = () => {
    const text = displayedLines.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-widget spotlight-card">
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">
          <TerminalIcon size={14} />
          <span>shabeeb@backend-server: ~</span>
        </div>
        <div className="terminal-actions">
          <button
            type="button"
            className="terminal-action-btn"
            onClick={handleCopy}
            title="Copy Terminal Output"
          >
            {copied ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            className="terminal-action-btn"
            onClick={() => runCommand(activeCommand)}
            title="Rerun Command"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Preset Command Quick-Pills */}
      <div className="terminal-preset-bar">
        <span className="preset-label">
          <Sparkles size={12} /> Quick Run:
        </span>
        <div className="preset-pills">
          {PRESET_BUTTONS.map((btn) => {
            const IconC = btn.icon;
            const isActive = activeCommand === btn.cmd;
            return (
              <button
                key={btn.cmd}
                type="button"
                className={`preset-pill ${isActive ? 'active' : ''}`}
                onClick={() => runCommand(btn.cmd)}
              >
                <IconC size={11} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body" ref={terminalBodyRef}>
        <div className="terminal-command-line">
          <span className="prompt-host">shabeeb@dev</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-char">$</span>
          <span className="prompt-cmd">{activeCommand}</span>
        </div>

        <div className="terminal-output">
          {displayedLines.map((line, idx) => {
            const lineStr = String(line ?? '');
            let className = 'term-line';
            if (lineStr.startsWith('#') || lineStr.startsWith('//')) className += ' term-comment';
            else if (lineStr.includes('200 OK') || lineStr.includes('PASSED') || lineStr.includes('healthy')) className += ' term-success';
            else if (lineStr.startsWith('[AI-VISION]')) className += ' term-ai';
            else if (lineStr.includes('class ') || lineStr.includes('def ')) className += ' term-keyword';
            else if (lineStr.startsWith('HTTP/1.1')) className += ' term-http';

            return (
              <div key={idx} className={className}>
                {lineStr || '\u00A0'}
              </div>
            );
          })}
          {isTyping && <span className="terminal-cursor">▋</span>}
        </div>

        {/* Input Prompt */}
        <form onSubmit={handleFormSubmit} className="terminal-input-form">
          <span className="prompt-host">shabeeb@dev</span>
          <span className="prompt-char">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command or click quick run buttons above..."
            className="terminal-input"
          />
        </form>
      </div>

      {/* Terminal Footer Status */}
      <div className="terminal-footer">
        <span className="status-indicator">
          <span className="status-dot success"></span>
          Python 3.11 • Django 5.1 • PyTorch/YOLO
        </span>
        <span className="terminal-hint">Interactive Demo</span>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
