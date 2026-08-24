import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getYuanmisheBoard,
  getYuanmishePost,
  getYuanmisheUser,
  minigameConfig,
  yuanmisheAdminNotice,
  yuanmisheBoards,
  yuanmishePosts,
  yuanmisheUsers
} from "@psz/shared-data";
import { checkPassword, completePuzzle, getHint } from "@psz/puzzle-engine";
import { Avatar, ClueGrabber } from "@psz/shared-ui";
import { useGameStore } from "@psz/game-state";
import { audio } from "@psz/audio";
import { CRT, CursorFollower, Glitch, Noise, Scanline, TextCorruption } from "@psz/effects";
import "./yuanmishe.css";

const LADDER_KEY = "9F2A7B-XIONGNIANG";

function YmsShell({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    audio.startAmbient("yuanmishe");
    return () => audio.stopAmbient();
  }, []);
  return (
    <div className="yms-root">
      <CRT />
      <Scanline />
      <Noise />
      <CursorFollower />
      <div className="yms-wrap">
        <Glitch>
          <div className="yms-title">源秘社</div>
        </Glitch>
        <div className="yms-sub">YUANMISHE · 渡口 · 建于戊寅年</div>
        <div className="yms-window">
          <div className="yms-titlebar">
            <span>源秘社 · {title}</span>
            <span>── □ ×</span>
          </div>
          <div className="yms-body">
            <div className="yms-nav">
              <Link to="/yuanmishe">首页</Link>
              <Link to="/yuanmishe/enter">通行证</Link>
              <Link to="/yuanmishe/game">游戏区</Link>
              <Link to="/yuanmishe/terminal">终端</Link>
            </div>
            {children}
          </div>
        </div>
        <div className="yms-sub">本站与现实无关。如与现实相似，纯属必然。</div>
      </div>
    </div>
  );
}

function YmsHome() {
  const authed = useGameStore((s) => s.extra.yuanmisheAuthed);
  useEffect(() => {
    const store = useGameStore.getState();
    store.setFlag("enteredYuanmiShe", true);
    store.setExtra("enteredYuanmiShe", true);
  }, []);
  return (
    <YmsShell title="首页">
      <div style={{ fontSize: 13, color: "#8fa0b0", marginBottom: 12, lineHeight: 1.8 }}>
        欢迎来到源秘社。这里是渡口：人与非人，都可来往。
        <br />
        本社不回答“这是不是真的”。你自己分辨。
      </div>
      <div className="yms-window">
        <div className="yms-titlebar">公告栏</div>
        <div className="yms-body" style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.8 }}>
          {yuanmisheAdminNotice.content}
        </div>
      </div>
      <div style={{ fontWeight: 700, color: "#c8a24a", margin: "10px 0 8px" }}>版块列表</div>
      {yuanmisheBoards.map((b) => (
        <div className="yms-board" key={b.id}>
          <Link to={`/yuanmishe/board/${b.id}`}>
            <span className="name">
              {b.name} <span className="desc">— {b.description}</span>
            </span>
            {b.locked && !authed ? <span className="lock">[需要通行证]</span> : <span className="lock" style={{ color: "#5f7f6a" }}>[可访问]</span>}
          </Link>
        </div>
      ))}
      {!authed && (
        <div style={{ marginTop: 12, fontSize: 13, color: "#c8a24a" }}>
          ◈ 部分版块需要通行证。→ <Link to="/yuanmishe/enter" style={{ color: "#e8c87a" }}>获取通行证</Link>
        </div>
      )}
    </YmsShell>
  );
}

function YmsEnter() {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const authed = useGameStore((s) => s.extra.yuanmisheAuthed);
  const state = useGameStore.getState();
  const missing = useMemo(
    () => ["clue_username", "clue_birthday", "clue_school_27"].filter((r) => !state.discoveredClues.includes(r)),
    [state]
  );
  const missingLabels: Record<string, string> = {
    clue_username: "论坛用户名（小于的主页 @yuxiaoyu）",
    clue_birthday: "阿月的生日（个人空间）",
    clue_school_27: "校庆编号（官网“建校27周年”新闻）"
  };

  const submit = () => {
    const res = checkPassword("puzzle_017", value);
    if (res.ok) {
      completePuzzle("puzzle_017");
      setMsg({ type: "success", text: "通行证有效。欢迎，访客。请记住：不要在这里留下真名。" });
      audio.play("ui.click");
    } else if (res.reason === "locked") {
      setMsg({
        type: "error",
        text: `密码本身可能没错，但你还没有集齐拼出它的线索。还差：${missing.length ? missing.map((m) => missingLabels[m] ?? m).join("；") : "……"}`
      });
    } else {
      setMsg({ type: "error", text: "通行码错误。提示：它由三部分拼成。" });
      audio.play("glitch");
    }
  };

  return (
    <YmsShell title="通行证">
      {authed ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div className="yms-success">你已持有通行证。</div>
          <div style={{ marginTop: 10 }}>
            <Link to="/yuanmishe/board/board_possession" className="yms-btn">
              进入附身记录
            </Link>
            <span> </span>
            <Link to="/yuanmishe/board/board_death" className="yms-btn">
              死亡记录
            </Link>
            <span> </span>
            <Link to="/yuanmishe/board/board_underground" className="yms-btn">
              地下交易
            </Link>
          </div>
        </div>
      ) : (
        <div className="yms-login-box">
          <div style={{ fontSize: 14, marginBottom: 10 }}>请输入通行码：</div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="通行码"
            autoFocus
          />
          <div style={{ marginTop: 10 }}>
            <button className="yms-btn" onClick={submit}>
              验证
            </button>
          </div>
          <div style={{ fontSize: 12, color: "#5f6b75", marginTop: 12, lineHeight: 1.7 }}>
            通行码由论坛用户名、生日与校庆编号组合而成。
            <br />
            线索所在：校园论坛（用户名）· 个人空间（生日）· 学校官网（编号）。
          </div>
          {msg && <div className={msg.type === "error" ? "yms-error" : "yms-success"}>{msg.text}</div>}
          <div style={{ marginTop: 14 }}>
            <HintPanelYms />
          </div>
        </div>
      )}
    </YmsShell>
  );
}

function HintPanelYms() {
  const [level, setLevel] = useState(0);
  if (level === 0) {
    return (
      <button className="yms-btn" onClick={() => setLevel(1)}>
        需要提示？
      </button>
    );
  }
  return (
    <div style={{ fontSize: 13, color: "#c8a24a", lineHeight: 1.8 }}>
      <div>{getHint("puzzle_017", level as 1 | 2 | 3)}</div>
      {level < 3 ? (
        <button className="yms-btn" style={{ marginTop: 8 }} onClick={() => setLevel(level + 1)}>
          再提示一点（{level}/3）
        </button>
      ) : (
        <div style={{ fontSize: 12, color: "#5f6b75" }}>这已经是最大提示了。</div>
      )}
    </div>
  );
}

function YmsBoard() {
  const { boardId } = useParams();
  const board = getYuanmisheBoard(boardId ?? "");
  const authed = useGameStore((s) => s.extra.yuanmisheAuthed);
  if (!board) return <YmsNotFound />;
  if (board.locked && !authed) {
    return (
      <YmsShell title={board.name}>
        <div style={{ textAlign: "center", padding: "30px 0" }}>
          <div style={{ fontSize: 15, color: "#c8a24a", marginBottom: 12 }}>该版块需要通行证。</div>
          <Link to="/yuanmishe/enter" className="yms-btn">
            获取通行证
          </Link>
        </div>
      </YmsShell>
    );
  }
  const posts = board.postIds.map((id) => getYuanmishePost(id)!).filter(Boolean);
  return (
    <YmsShell title={board.name}>
      <div style={{ fontSize: 13, color: "#8fa0b0", marginBottom: 10 }}>{board.description}</div>
      {posts.map((p) => {
        const user = getYuanmisheUser(p.author);
        return (
          <div className="yms-thread" key={p.id}>
            <ClueGrabber clues={p.clues} flags={p.flags} extras={p.extras} />
            <Link to={`/yuanmishe/thread/${p.id}`}>{p.deleted ? "【已删除】" : ""}{p.title}</Link>
            <div className="meta">
              {user.name} · {p.timestamp}
            </div>
          </div>
        );
      })}
    </YmsShell>
  );
}

function YmsThread() {
  const { postId } = useParams();
  const post = getYuanmishePost(postId ?? "");
  if (!post) return <YmsNotFound />;
  const user = getYuanmisheUser(post.author);
  return (
    <YmsShell title={post.title}>
      <ClueGrabber clues={post.clues} flags={post.flags} extras={post.extras} />
      <div className="yms-post">
        <h1>{post.title}</h1>
        <div className="yms-user">
          {user.name}（{`@${user.username}`}）· <span className="kind">[身份：{user.kind === "human" ? "人" : user.kind === "ghost" ? "非人" : "未知"}]</span> · {post.timestamp}
        </div>
        <div className="body">
          {post.weird ? <TextCorruption text={post.content} trigger maxRatio={0.12} /> : post.content}
        </div>
      </div>
      <Link to={`/yuanmishe/user/${user.id}`} style={{ color: "#7fa8c8", fontSize: 12 }}>
        查看用户档案 →
      </Link>
    </YmsShell>
  );
}

function YmsUser() {
  const { userId } = useParams();
  const user = yuanmisheUsers.find((u) => u.id === userId);
  if (!user) return <YmsNotFound />;
  return (
    <YmsShell title={user.name}>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
        <Avatar spec={user.avatar} size={56} />
        <div>
          <div style={{ fontSize: 17, color: "#c8d6e4" }}>{user.name}</div>
          <div className="yms-user">
            {`@${user.username}`} · 加入于 {user.joined} · 身份：{user.kind === "human" ? "人" : user.kind === "ghost" ? "非人" : "未知"}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#aab8c4", marginBottom: 14 }}>{user.bio}</div>
      <div style={{ fontSize: 12, color: "#5f6b75", marginBottom: 6 }}>该用户最近的帖子：</div>
      {yuanmishePosts
        .filter((p) => p.author === user.id)
        .map((p) => (
          <div className="yms-thread" key={p.id}>
            <Link to={`/yuanmishe/thread/${p.id}`}>{p.title}</Link>
            <div className="meta">{p.timestamp}</div>
          </div>
        ))}
    </YmsShell>
  );
}

function YmsTerminal() {
  const [lines, setLines] = useState<string[]>([
    "小骨：哟，活人！",
    "小骨：我是小骨。这社里最聪明的存在。",
    "小骨：有什么想问的？输入 help 看看。"
  ]);
  const [input, setInput] = useState("");
  const responses: Record<string, string> = {
    help: "小骨：命令有：name（告诉我你的名字）、ladder（梯子）、bet（打赌）、who（我是谁）、joke（笑话）、bye（再见）。",
    name: "小骨：别！别告诉我你的名字！——不对，快告诉我！我拿你的名字去登记，能换一顿香火。",
    ladder: "小骨：梯子？那是通往更深处的钥匙。我有一把，但只输给能跑过 3000 的活人。",
    bet: "小骨：想赌？去游戏区，骷髅跳跳。跑到 2000 我找你。",
    who: "小骨：我是小骨。以前也是活人。现在嘛……你猜。",
    joke: "小骨：为什么纸人从来不笑？——因为烧了。哈。哈。哈。",
    bye: "小骨：再见。别在门口站太久，风大。"
  };
  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const key = Object.keys(responses).find((k) => cmd === k || cmd.startsWith(k + " ") || cmd.startsWith(k));
    if (cmd === "game") {
      setLines((l) => [...l, "> " + raw, "小骨：走，游戏区见。→ /yuanmishe/game"]);
      return;
    }
    if (key) {
      setLines((l) => [...l, "> " + raw, responses[key]]);
      return;
    }
    if (cmd.startsWith("name") || cmd.startsWith("名字")) {
      setLines((l) => [...l, "> " + raw, "小骨：收到！你的名字我收下了——骗你的，我开玩笑的。我记性不好。"]);
      return;
    }
    setLines((l) => [...l, "> " + raw, "小骨：听不懂。输入 help。"]);
  };
  return (
    <YmsShell title="终端">
      <div className="yms-terminal">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        <div>
          <span className="prompt">小骨@源秘社:~$ </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            autoFocus
          />
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: "#5f6b75" }}>试试：help · name · ladder · bet · who · joke · bye</div>
    </YmsShell>
  );
}

function YmsGame() {
  return (
    <YmsShell title="骷髅跳跳">
      <ClueGrabber />
      <SkeletonGame />
    </YmsShell>
  );
}

type Obstacle = {
  x: number;
  w: number;
  h: number;
  kind: string;
  passed: boolean;
};

type SpriteState = {
  playing: boolean;
  score: number;
  speed: number;
  y: number;
  vy: number;
  obstacles: Obstacle[];
  dist: number;
  betStage: 0 | 1 | 2 | 3 | 4;
  target: number;
  fired: Set<string>;
  dead: boolean;
  last: number;
};

function SkeletonGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [overlay, setOverlay] = useState<null | { type: "start" | "event" | "bet1" | "bet2" | "dead" | "win"; text?: string; score?: number }>({ type: "start" });
  const [keyRevealed, setKeyRevealed] = useState(false);
  const stateRef = useRef<SpriteState>({
    playing: false,
    score: 0,
    speed: minigameConfig.baseSpeed,
    y: 0,
    vy: 0,
    obstacles: [],
    dist: 0,
    betStage: 0,
    target: 0,
    fired: new Set<string>(),
    dead: false,
    last: 0
  });
  const navigate = useNavigate();

  const reset = () => {
    const s = stateRef.current;
    s.playing = true;
    s.score = 0;
    s.speed = minigameConfig.baseSpeed;
    s.y = 0;
    s.vy = 0;
    s.obstacles = [];
    s.dist = 0;
    s.betStage = 0;
    s.target = 0;
    s.fired = new Set<string>();
    s.dead = false;
    s.last = 0;
    setOverlay(null);
    const store = useGameStore.getState();
    store.setFlag("skeletonGameStarted", true);
    store.setExtra("skeletonGameStarted", true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 760;
    const H = 300;
    const GROUND = 250;
    const PLAYER = { x: 70, w: 26, h: 40 };
    const sprite = stateRef.current;
    let raf = 0;
    let running = true;

    const stageOf = (score: number) => {
      if (score >= 3000) return 4;
      if (score >= 2000) return 3;
      if (score >= 1314) return 2;
      if (score >= 666) return 1;
      return 0;
    };

    const drawBackground = (stage: number) => {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      const palettes = [
        ["#2a3240", "#171d26"],
        ["#1c2620", "#0d1410"],
        ["#14161c", "#080a0e"],
        ["#24182a", "#0e0a12"],
        ["#050508", "#0c0508"]
      ];
      const [c1, c2] = palettes[stage];
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      if (stage >= 1) {
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        for (let i = 0; i < 14; i++) {
          const x = (i * 73 + Math.floor(sprite.dist / 3)) % W;
          const treeH = 60 + ((i * 37) % 60);
          ctx.fillRect(W - x - 6, GROUND - treeH, 10, treeH);
        }
      }
      if (stage >= 3) {
        for (let i = 0; i < 5; i++) {
          const x = (i * 160 + Math.floor(sprite.dist / 2)) % W;
          ctx.fillStyle = "rgba(150,130,160,0.25)";
          ctx.fillRect(W - x - 5, GROUND - 26, 26, 30);
          ctx.fillRect(W - x - 2, GROUND - 40, 20, 14);
        }
      }
      if (stage >= 4) {
        ctx.fillStyle = "rgba(255,60,60,0.05)";
        ctx.fillRect(0, 0, W, H);
      }
      if (stage >= 2) {
        const ax = W * 0.72;
        ctx.fillStyle = "rgba(10,10,16,0.85)";
        ctx.beginPath();
        ctx.arc(ax, GROUND - 96, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(ax - 12, GROUND - 84, 24, 60);
        ctx.fillRect(ax - 16, GROUND - 26, 32, 6);
        ctx.fillStyle = "rgba(220,230,255,0.18)";
        ctx.font = "11px serif";
        ctx.fillText("……", ax - 24, GROUND - 108);
      }
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(0, GROUND + 2, W, H - GROUND);
    };

    const drawPlayer = () => {
      const gx = PLAYER.x;
      const gy = GROUND - PLAYER.h - sprite.y;
      const ghost = sprite.fired.has("ayue_shadow");
      ctx.fillStyle = ghost ? "#e6ecf2" : "#cfd6dc";
      ctx.beginPath();
      ctx.arc(gx + 13, gy + 8, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ghost ? "#8a93a0" : "#24262e";
      ctx.fillRect(gx + 4, gy + 18, 18, 20);
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(gx + 5, gy + 19 + i * 6, 16, 2);
      }
      ctx.fillStyle = ghost ? "#e6ecf2" : "#cfd6dc";
      ctx.fillRect(gx + 2, gy + 36, 6, 4);
      ctx.fillRect(gx + 18, gy + 36, 6, 4);
      ctx.fillStyle = "#10131a";
      ctx.fillRect(gx + 10, gy + 6, 3, 3);
      ctx.fillRect(gx + 15, gy + 6, 3, 3);
      if (ghost) {
        ctx.fillStyle = "rgba(230,236,242,0.25)";
        ctx.beginPath();
        ctx.moveTo(gx, gy + 40);
        ctx.lineTo(gx + 26, gy + 40);
        ctx.lineTo(gx + 19, gy + 52);
        ctx.lineTo(gx + 13, gy + 44);
        ctx.lineTo(gx + 7, gy + 52);
        ctx.closePath();
        ctx.fill();
      }
    };

    const spawn = () => {
      const kinds = ["coffin", "ghostfire", "paperman", "tombstone"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const spec: Record<string, [number, number]> = {
        coffin: [42, 34],
        ghostfire: [24, 40],
        paperman: [22, 46],
        tombstone: [30, 38]
      };
      const [w, h] = spec[kind];
      sprite.obstacles.push({ x: W + 40, w, h, kind, passed: false });
    };

    const drawObstacle = (o: Obstacle) => {
      const gy = GROUND - o.h;
      if (o.kind === "coffin") {
        ctx.fillStyle = "#5a4433";
        ctx.fillRect(o.x, gy, o.w, o.h);
        ctx.strokeStyle = "#2f2419";
        ctx.strokeRect(o.x + 3, gy + 3, o.w - 6, o.h - 6);
      } else if (o.kind === "ghostfire") {
        ctx.fillStyle = "rgba(120,255,140,0.5)";
        ctx.beginPath();
        ctx.arc(o.x + o.w / 2, gy + o.h / 2, o.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(200,255,210,0.8)";
        ctx.beginPath();
        ctx.arc(o.x + o.w / 2, gy + o.h / 2 - 4, o.w / 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (o.kind === "paperman") {
        ctx.fillStyle = "#d8d0c0";
        ctx.fillRect(o.x + 6, gy, 10, o.h);
        ctx.beginPath();
        ctx.arc(o.x + 11, gy + 5, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#a09080";
        ctx.fillRect(o.x + 8, gy + 18, 6, 8);
        ctx.fillRect(o.x + 4, gy + 16, 4, 8);
        ctx.fillRect(o.x + 14, gy + 16, 4, 8);
      } else {
        ctx.fillStyle = "#7d8590";
        ctx.fillRect(o.x + 4, gy, o.w - 8, o.h);
        ctx.beginPath();
        ctx.moveTo(o.x + 4, gy);
        ctx.lineTo(o.x + 14, gy - 14);
        ctx.lineTo(o.x + o.w - 4, gy);
        ctx.closePath();
        ctx.fill();
      }
    };

    const winGame = () => {
      sprite.playing = false;
      sprite.dead = false;
      audio.play("minigame.win");
      const store = useGameStore.getState();
      store.setFlag("skeletonGameWon", true);
      store.setFlag("ladderObtained", true);
      store.setExtra("skeletonGameWon", true);
      store.setExtra("ladderObtained", true);
      completePuzzle("puzzle_019");
      setKeyRevealed(true);
      setOverlay({ type: "win", score: Math.floor(sprite.score) });
    };

    const die = () => {
      sprite.dead = true;
      sprite.playing = false;
      audio.play("minigame.death");
      setOverlay({ type: "dead", score: Math.floor(sprite.score) });
    };

    const fireEvent = (ev: (typeof minigameConfig.events)[number]) => {
      sprite.fired.add(ev.event);
      if (ev.event === "ghost_appears") {
        audio.play("whisper");
        setOverlay({ type: "event", text: "背景开始变化……" });
        setTimeout(() => setOverlay((o) => (o?.type === "event" ? null : o)), 1400);
      } else if (ev.event === "ayue_shadow") {
        audio.play("whisper");
        setOverlay({ type: "event", text: "山路尽头站着一个女孩。她没有回头。" });
        setTimeout(() => setOverlay((o) => (o?.type === "event" ? null : o)), 2000);
      } else if (ev.event === "betting_available" && sprite.betStage === 0) {
        sprite.playing = false;
        audio.play("glitch");
        setOverlay({ type: "bet1" });
      } else if (ev.event === "ladder_win") {
        winGame();
      }
    };

    const step = (dt: number) => {
      if (!sprite.playing || sprite.dead) return;
      const f = Math.min(dt, 0.033) * 60;
      sprite.speed = Math.min(minigameConfig.maxSpeed, sprite.speed + minigameConfig.speedStep * f);
      sprite.dist += sprite.speed * f;
      sprite.score += (sprite.speed * f) / 5;

      for (const ev of minigameConfig.events) {
        if (!sprite.fired.has(ev.event) && sprite.score >= ev.score) {
          if (ev.event === "ladder_win") {
            if (sprite.betStage === 2 || sprite.betStage === 4) {
              fireEvent(ev);
            }
          } else {
            fireEvent(ev);
          }
          if (!sprite.playing) break;
        }
      }
      if (!sprite.playing) return;

      if (sprite.betStage === 4 && sprite.score >= 3500) {
        winGame();
        return;
      }

      sprite.y += sprite.vy * f;
      sprite.vy -= minigameConfig.gravity * f * 0.45;
      if (sprite.y < 0) {
        sprite.y = 0;
        sprite.vy = 0;
      }

      const last = sprite.obstacles[sprite.obstacles.length - 1];
      if (!last || last.x < W - (minigameConfig.obstacleGapMin + Math.random() * (minigameConfig.obstacleGapMax - minigameConfig.obstacleGapMin))) {
        spawn();
      }

      for (const o of sprite.obstacles) {
        o.x -= sprite.speed * f;
      }
      sprite.obstacles = sprite.obstacles.filter((o) => o.x > -60);

      const px = PLAYER.x;
      const py = GROUND - PLAYER.h - sprite.y;
      for (const o of sprite.obstacles) {
        const overlap = px + PLAYER.w - 4 > o.x + 4 && px + 4 < o.x + o.w && py + PLAYER.h - 4 > GROUND - o.h && py + 4 < GROUND;
        if (overlap) {
          die();
          return;
        }
      }

      if (sprite.betStage === 1 && sprite.score >= 3000) {
        sprite.playing = false;
        setOverlay({ type: "bet2" });
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      const dt = sprite.last ? (t - sprite.last) / 1000 : 0.016;
      sprite.last = t;
      step(dt);
      drawBackground(stageOf(sprite.score));
      for (const o of sprite.obstacles) drawObstacle(o);
      drawPlayer();
      ctx.fillStyle = "#c8d6e4";
      ctx.font = "16px monospace";
      ctx.fillText(`SCORE ${Math.floor(sprite.score)}`, 16, 26);
      const stage = stageOf(sprite.score);
      const labels = ["荒野", "阴森山林", "山洞", "墓地", "无法解释的空间"];
      ctx.fillStyle = "rgba(200,214,228,0.45)";
      ctx.font = "12px monospace";
      ctx.fillText(labels[stage], W - 130, 26);
      raf = requestAnimationFrame(loop);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!sprite.playing) return;
        if (sprite.y <= 0) {
          sprite.vy = minigameConfig.jumpVelocity;
          audio.play("minigame.jump");
        }
      }
    };
    const onPointer = () => {
      if (!sprite.playing) return;
      if (sprite.y <= 0) {
        sprite.vy = minigameConfig.jumpVelocity;
        audio.play("minigame.jump");
      }
    };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);
    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const acceptBet1 = () => {
    const s = stateRef.current;
    s.betStage = 2;
    s.target = 3000;
    s.playing = true;
    setOverlay(null);
    audio.play("ui.click");
  };
  const declineBet1 = () => {
    const s = stateRef.current;
    s.betStage = 1;
    s.playing = true;
    setOverlay(null);
  };
  const acceptBet2 = () => {
    const s = stateRef.current;
    s.betStage = 4;
    s.target = 3500;
    s.playing = true;
    setOverlay(null);
  };
  const declineBet2 = () => {
    const s = stateRef.current;
    s.betStage = 3;
    s.playing = true;
    setOverlay(null);
  };

  return (
    <div className="yms-game-wrap">
      <canvas ref={canvasRef} width={760} height={300} className="yms-game" />
      <div className="yms-hint">
        空格 / 点击起跳。躲避棺材、鬼火、纸人与墓碑。背景会在 666、1314 分后变化。
        <button className="yms-btn" style={{ marginLeft: 10 }} onClick={reset}>
          重新开始
        </button>
      </div>
      {overlay?.type === "start" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner" style={{ textAlign: "center" }}>
            <div className="q">
              骷髅跳跳
              <br />
              小骨：「来啊，活人。让我看看你能跑多远。」
            </div>
            <div className="yms-dialog-btns">
              <button
                className="yms-btn"
                onClick={() => {
                  reset();
                  setOverlay(null);
                }}
              >
                开始游戏
              </button>
            </div>
          </div>
        </div>
      )}
      {overlay?.type === "event" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner" style={{ textAlign: "center" }}>
            <TextCorruption text={overlay.text ?? ""} trigger maxRatio={0.25} />
          </div>
        </div>
      )}
      {overlay?.type === "bet1" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner">
            <div className="q">
              小骨从屏幕边探出半个身子：
              <br />
              「喂，活人。赌一把？你跑到 3000，我把我的梯子给你。跑不到，名字归我。」
            </div>
            <div className="yms-dialog-btns">
              <button className="yms-btn" onClick={acceptBet1}>
                接受赌约
              </button>
              <button className="yms-btn" onClick={declineBet1}>
                拒绝
              </button>
            </div>
          </div>
        </div>
      )}
      {overlay?.type === "bet2" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner">
            <div className="q">
              小骨：「刚才的赌约还作数。跑到 3500，梯子给你。怎么样？」
            </div>
            <div className="yms-dialog-btns">
              <button className="yms-btn" onClick={acceptBet2}>
                接受
              </button>
              <button className="yms-btn" onClick={declineBet2}>
                不了
              </button>
            </div>
          </div>
        </div>
      )}
      {overlay?.type === "dead" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner" style={{ textAlign: "center" }}>
            <div className="q">
              得分：{overlay.score}
              <br />
              小骨：「哈！名字归我——骗你的，我没那么无聊。再来一次？」
            </div>
            <button className="yms-btn" onClick={reset}>
              再来一次
            </button>
          </div>
        </div>
      )}
      {overlay?.type === "win" && (
        <div className="yms-dialog">
          <div className="yms-dialog-inner" style={{ textAlign: "center" }}>
            <div className="q">
              得分：{overlay.score}
              <br />
              小骨：「……输了。梯子归你。走好，活人。别走错门。」
            </div>
            {keyRevealed && (
              <div>
                <div style={{ fontSize: 12, color: "#8fa0b0" }}>梯子密钥（点击全选复制）：</div>
                <div className="yms-key">{LADDER_KEY}</div>
                <div className="yms-dialog-btns">
                  <button className="yms-btn" onClick={() => navigator.clipboard?.writeText(LADDER_KEY)}>
                    复制
                  </button>
                  <button className="yms-btn" onClick={() => navigate(`/underworld/entry?key=${LADDER_KEY}`)}>
                    通过梯子前往
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function YmsNotFound() {
  return (
    <YmsShell title="404">
      <div className="yms-404">该地址不属于阳间。</div>
    </YmsShell>
  );
}

export function YmsHomePage() {
  return <YmsHome />;
}

export function YmsEnterPage() {
  return <YmsEnter />;
}

export function YmsBoardPage() {
  return <YmsBoard />;
}

export function YmsThreadPage() {
  return <YmsThread />;
}

export function YmsUserPage() {
  return <YmsUser />;
}

export function YmsGamePage() {
  return <YmsGame />;
}

export function YmsTerminalPage() {
  return <YmsTerminal />;
}

export function YmsNotFoundPage() {
  return <YmsNotFound />;
}

const YuanmisheApp = { YmsHomePage, YmsEnterPage, YmsBoardPage, YmsThreadPage, YmsUserPage, YmsGamePage, YmsTerminalPage, YmsNotFoundPage };
export default YuanmisheApp;
