import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  decodeHex,
  encodedTexts,
  garbledFor,
  hexBytesFor,
  isPoem,
  getUnderworldRecord,
  underworldRecords,
  underworldSections
} from "@psz/shared-data";
import { applyRewards, checkFinalQuiz, completePuzzle, requirementsMet } from "@psz/puzzle-engine";
import { ClueGrabber, TextBlock } from "@psz/shared-ui";
import { useGameStore } from "@psz/game-state";
import { audio } from "@psz/audio";
import { CRT, CursorFollower, Glitch, Noise, Scanline, TextCorruption } from "@psz/effects";
import "./underworld.css";

const LADDER_KEY = "9F2A7B-XIONGNIANG";

function UnderworldShell({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    audio.startAmbient("underworld");
    return () => audio.stopAmbient();
  }, []);
  return (
    <div className="uw-root">
      <CRT />
      <Scanline />
      <Noise />
      <CursorFollower />
      <div className="uw-wrap">
        <div className="uw-boot">
          <span className="ok">&gt; 幽冥通讯系统 v9.31</span>
          <br />
          <span className="warn">&gt; 校验访问者身份……</span>
          <br />
          <span className="ok">&gt; 身份：持梯者</span>
        </div>
        <Glitch intensity={0.5}>
          <div className="uw-title">阴间内部网站</div>
        </Glitch>
        <div className="uw-sub">YINJIAN · pingshun-yinjian.net · 与现实无关</div>
        <div className="uw-nav">
          {underworldSections.map((s) => (
            <Link key={s.path} to={s.path}>
              {s.name}
            </Link>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#33485c", marginBottom: 8 }}>当前位置：{title}</div>
        {children}
      </div>
    </div>
  );
}

const sectionKinds: Record<string, string[]> = {
  notice: ["notice"],
  ghost_post: ["ghost_post", "blog"],
  death_record: ["death_record"],
  ritual: ["ritual"],
  trade: ["trade"],
  chat: ["chat"],
  system_log: ["system_log"],
  blog: ["blog"]
};

function UnderworldGate() {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const keyParam = params.get("key");

  useEffect(() => {
    if (keyParam && keyParam.trim().toUpperCase() === LADDER_KEY) {
      unlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyParam]);

  const unlock = () => {
    const store = useGameStore.getState();
    store.setFlag("enteredUnderworld", true);
    store.setExtra("enteredUnderworld", true);
    audio.play("underworld.enter");
    navigate("/underworld/home", { replace: true });
  };

  const submit = () => {
    if (value.trim().toUpperCase() === LADDER_KEY) {
      unlock();
    } else {
      setMsg("密钥错误。或者，你还没有梯子。");
      audio.play("glitch");
    }
  };

  return (
    <div className="uw-root">
      <CRT />
      <Noise />
      <div className="uw-wrap">
        <div className="uw-gate">
          <h1>此地址不属于阳间</h1>
          <div style={{ marginTop: 12 }}>
            你没有访问权限。
            <br />
            <span style={{ fontSize: 12 }}>（如果你持有梯子，请输入密钥。）</span>
          </div>
          <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="梯子密钥" />
          </div>
          <div>
            <button className="uw-btn" onClick={submit}>
              验证密钥
            </button>
          </div>
          {msg && <div style={{ color: "#c86a6a", marginTop: 10 }}>{msg}</div>}
          <div style={{ marginTop: 30, fontSize: 12, color: "#2c4254" }}>此亡者不存在。请原路返回。</div>
        </div>
      </div>
    </div>
  );
}

function UnderworldEntry() {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const keyParam = params.get("key");

  useEffect(() => {
    if (keyParam && keyParam.trim().toUpperCase() === LADDER_KEY) {
      unlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyParam]);

  const unlock = () => {
    const store = useGameStore.getState();
    store.setFlag("enteredUnderworld", true);
    store.setExtra("enteredUnderworld", true);
    audio.play("underworld.enter");
    navigate("/underworld/home", { replace: true });
  };

  const submit = () => {
    if (value.trim().toUpperCase() === LADDER_KEY) {
      unlock();
    } else {
      setMsg("密钥错误。检查大小写与连字符。");
    }
  };

  return (
    <UnderworldShell title="梯子入口">
      <div className="uw-gate" style={{ border: "1px solid #152432" }}>
        <h1>梯子密钥验证</h1>
        <div style={{ marginTop: 10 }}>把从小骨那里赢来的密钥交给门。</div>
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="9F2A7B-XXXXXXX" />
        </div>
        <div>
          <button className="uw-btn" onClick={submit}>
            验证并进入
          </button>
        </div>
        {msg && <div style={{ color: "#c86a6a", marginTop: 10 }}>{msg}</div>}
        <div style={{ fontSize: 12, color: "#2c4254", marginTop: 20 }}>梯子有使用期限。过期作废。</div>
      </div>
    </UnderworldShell>
  );
}

function UnderworldHome() {
  const visits = useGameStore((s) => s.visits["/underworld/home"] ?? 0);
  useEffect(() => {
    const store = useGameStore.getState();
    store.recordVisit("/underworld/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const featured = underworldRecords.filter((r) => ["underworld_sys_001", "underworld_ghost_001", "underworld_death_001", "underworld_chat_001", "underworld_sys_002", "underworld_ghost_009"].includes(r.id));
  return (
    <UnderworldShell title="总览">
      <div style={{ fontSize: 13, color: "#5f8fb0", marginBottom: 12, lineHeight: 1.8 }}>
        欢迎，来访者。
        {visits > 1 && <span style={{ color: "#d0a85f" }}> 这是你第 {visits} 次回来。档案记得你。</span>}
      </div>
      <div className="uw-section-title">最近动态</div>
      {featured.map((r) => (
        <RecordRow key={r.id} id={r.id} />
      ))}
      <div className="uw-section-title">提示</div>
      <div style={{ fontSize: 12, color: "#33485c", lineHeight: 1.8 }}>
        乱码档案需要解码（/underworld/decode）。解码后即可进入终局档案与新人登记。
      </div>
    </UnderworldShell>
  );
}

function RecordRow({ id }: { id: string }) {
  const r = getUnderworldRecord(id);
  if (!r) return null;
  return (
    <div className="uw-record">
      <ClueGrabber clues={r.clues} flags={r.flags} extras={r.extras} />
      <Link to={`/underworld/record/${r.id}`}>{r.title ?? r.id}</Link>
      <div className="meta">
        {r.author ?? "系统"} · {r.timestamp ?? ""} · {r.section}
      </div>
    </div>
  );
}

function UnderworldSection() {
  const { section } = useParams();
  const kinds = sectionKinds[section ?? ""];
  if (!kinds) return <UnderworldNotFound />;
  const records = underworldRecords.filter((r) => kinds.includes(r.kind));
  const title = underworldSections.find((s) => s.path === `/underworld/section/${section}`)?.name ?? section ?? "记录";
  return (
    <UnderworldShell title={title}>
      <div className="uw-section-title">{title}</div>
      {records.map((r) => (
        <RecordRow key={r.id} id={r.id} />
      ))}
    </UnderworldShell>
  );
}

function UnderworldRecordPage() {
  const { id } = useParams();
  const record = getUnderworldRecord(id ?? "");
  if (!record) return <UnderworldNotFound />;
  return (
    <UnderworldShell title={record.title ?? "记录"}>
      <ClueGrabber clues={record.clues} flags={record.flags} extras={record.extras} />
      <div className="uw-detail">
        <h1>{record.title}</h1>
        <div className="meta" style={{ color: "#3d5568", fontSize: 12 }}>
          {record.author ?? "系统"} · {record.timestamp ?? ""} · {record.section}
        </div>
        <div className="body">
          {record.garbled ? <TextCorruption text={record.content} trigger maxRatio={0.25} /> : record.terminal ? <span className="ok">{record.content}</span> : <TextBlock text={record.content} />}
        </div>
      </div>
    </UnderworldShell>
  );
}

function DecodePage() {
  const [hex, setHex] = useState("");
  const [showHex, setShowHex] = useState(false);
  const [encoding, setEncoding] = useState<"gbk" | "utf-8" | "gb2312">("gbk");
  const [result, setResult] = useState<{ ok: boolean; text: string; note?: string; error?: string } | null>(null);
  const [solved, setSolved] = useState(false);
  const text = encodedTexts[0];
  const garbled = garbledFor(text.original);
  const hexAll = hexBytesFor(text.original);

  const decode = () => {
    const res = decodeHex(hex || hexAll, encoding);
    setResult(res);
    if (res.ok && isPoem(res.text)) {
      if (!useGameStore.getState().decodedUnderworld) {
        applyRewards(["decodedUnderworld"]);
        completePuzzle("puzzle_021");
      }
      setSolved(true);
      audio.play("ui.click");
    }
  };

  return (
    <UnderworldShell title="乱码档案">
      <div style={{ fontSize: 13, color: "#5f8fb0", lineHeight: 1.8 }}>
        档案 001 的编码似乎出了问题。它显示为乱码。
        <br />
        档案标注：<span style={{ color: "#d0a85f" }}>第一层确认</span>。
      </div>
      <div className="uw-moji">{garbled}</div>
      <div style={{ fontSize: 12, color: "#3d5568", lineHeight: 1.7 }}>
        档案原始编码：UTF-8。站点曾按 GBK 误读。
        <br />
        还原步骤：把乱码还原为字节序列，再以正确编码解码。
        <br />
        提示：字节序列（十六进制）藏在网页源代码里。
      </div>
      <button className="uw-btn" onClick={() => setShowHex((v) => !v)}>
        {showHex ? "隐藏原始字节" : "查看原始字节（十六进制）"}
      </button>
      {showHex && <div className="uw-moji" style={{ color: "#7fb0d0", fontSize: 13 }}>{hexAll}</div>}
      <div className="uw-decode-tool">
        <div style={{ marginBottom: 8 }}>
          <label>字节序列（十六进制）：</label>
          <input value={hex} onChange={(e) => setHex(e.target.value)} placeholder="粘贴字节序列，或点击下方自动填入" />
          <button className="uw-btn" onClick={() => setHex(hexAll)} style={{ marginTop: 4 }}>
            自动填入
          </button>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>解码方式：</label>
          <select value={encoding} onChange={(e) => setEncoding(e.target.value as typeof encoding)}>
            <option value="gbk">GBK</option>
            <option value="gb2312">GB2312</option>
            <option value="utf-8">UTF-8</option>
          </select>
        </div>
        <button className="uw-btn" onClick={decode}>
          解码
        </button>
        {result && (
          <div className="uw-result" style={{ color: result.ok ? (solved ? "#5fd08a" : "#9cc8e0") : "#c86a6a" }}>
            {result.error ? result.error : result.ok ? `解码结果：${result.text}` : "无法解码"}
            {result.ok && encoding === "gbk" && !solved && <div style={{ fontSize: 12, color: "#d0a85f" }}>与页面乱码一致——档案确实曾按 GBK 被误读。</div>}
            {result.ok && encoding === "gb2312" && <div style={{ fontSize: 12, color: "#d0a85f" }}>与页面乱码一致——GB2312 也能读出同样的乱码。</div>}
          </div>
        )}
        {solved && (
          <div className="uw-result" style={{ color: "#5fd08a", marginTop: 12 }}>
            ＞ 身份确认：来人可解此语，视为可接待之客。
            <br />
            ＞ 解锁：终局档案、新人登记。
            <Link to="/underworld/final" className="uw-btn">
              进入终局档案 →
            </Link>
          </div>
        )}
      </div>
    </UnderworldShell>
  );
}

function FinalPuzzlePage() {
  const state = useGameStore.getState();
  const required = ["ladderObtained", "decodedUnderworld", "discoveredAyuePlan", "reconstructedTimeline"];
  const canSolve = requirementsMet(state, required);
  const missing = required.filter((r) => !requirementsMet(state, [r]));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string[]>([]);
  const navigate = useNavigate();

  const questions = [
    {
      id: "q1",
      text: "第一问：阿月为什么死？",
      options: [
        { value: "design", label: "她主动设计了自己的死亡，把它作为对抗熊娘嘎婆的一步" },
        { value: "despair", label: "她绝望自杀了" },
        { value: "killed", label: "她被熊娘嘎婆杀死了" },
        { value: "accident", label: "这是一场意外" }
      ]
    },
    {
      id: "q2",
      text: "第二问：阿月到底在对抗什么？",
      options: [
        { value: "bear_grandma", label: "熊娘嘎婆——会学亲近之人说话、怕火与盐的存在" },
        { value: "mental", label: "自己的心理疾病" },
        { value: "haunt", label: "校园里某个普通的鬼魂" },
        { value: "rumor", label: "一个被夸大的网络传说" }
      ]
    },
    {
      id: "q3",
      text: "第三问：她为什么留下这些信息？",
      options: [
        { value: "leave_route", label: "为了把对抗的路线留给下一个看到的人" },
        { value: "remember", label: "为了让别人记住她" },
        { value: "explain", label: "为了解释自己不是疯子" },
        { value: "warn", label: "为了警告大家不要去后山" }
      ]
    }
  ];

  const submit = () => {
    const res = checkFinalQuiz(answers);
    if (res.ok) {
      applyRewards(["finalPuzzleSolved"]);
      completePuzzle("puzzle_022");
      navigate("/underworld/ending");
    } else {
      setWrong(res.wrong);
    }
  };

  return (
    <UnderworldShell title="终局档案">
      <div style={{ fontSize: 13, color: "#5f8fb0", lineHeight: 1.8, marginBottom: 12 }}>
        档案要求：综合论坛、官网、个人空间、源秘社与此处的信息，回答三个问题。
        <br />
        答案不在别处。在你已经看过的东西里。
      </div>
      {!canSolve && (
        <div style={{ color: "#c86a6a", fontSize: 13, lineHeight: 1.8, border: "1px dashed #3a2020", padding: 12, marginBottom: 12 }}>
          证据不足，无法作答。还缺少：
          <br />
          {missing.map((m) => {
            if (m === "ladderObtained") return <div key={m}>· 梯子（源秘社小游戏）</div>;
            if (m === "decodedUnderworld") return <div key={m}>· 乱码档案解码</div>;
            if (m === "discoveredAyuePlan") return <div key={m}>· 阿月的计划（死亡记录 / 聊天记录）</div>;
            if (m === "reconstructedTimeline") return <div key={m}>· 时间线（个人空间）</div>;
            return <div key={m}>· {m}</div>;
          })}
        </div>
      )}
      {canSolve &&
        questions.map((q) => (
          <div className="uw-final-q" key={q.id} style={wrong.includes(q.id) ? { borderColor: "#6a2a2a" } : undefined}>
            <div className="q">{q.text}</div>
            {q.options.map((o) => (
              <label key={o.value}>
                <input
                  type="radio"
                  name={q.id}
                  value={o.value}
                  checked={answers[q.id] === o.value}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                />
                {o.label}
              </label>
            ))}
          </div>
        ))}
      {canSolve && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button className="uw-btn" onClick={submit}>
            提交答案
          </button>
          {wrong.length > 0 && <div style={{ color: "#c86a6a", fontSize: 12, marginTop: 8 }}>有 {wrong.length} 个问题答错了。再想想。</div>}
        </div>
      )}
    </UnderworldShell>
  );
}

function EndingPage() {
  const [showRestart, setShowRestart] = useState(false);
  useEffect(() => {
    const store = useGameStore.getState();
    if (store.finalPuzzleSolved) {
      store.setEnding("normal");
      audio.play("minigame.win");
    }
  }, []);
  const playerName = useGameStore((s) => s.playerName);
  const solved = useGameStore((s) => s.finalPuzzleSolved);
  if (!solved) {
    return (
      <UnderworldShell title="终局">
        <div className="uw-gate">
          <h1>终局档案未解锁</h1>
          <div>请先在「终局档案」回答三个问题。</div>
          <Link to="/underworld/final" className="uw-btn">
            前往终局档案
          </Link>
        </div>
      </UnderworldShell>
    );
  }
  return (
    <UnderworldShell title="终局">
      <div className="uw-ending">
        <h1>她留下的路线</h1>
        <p>
          现在你知道了：
          <br />
          · 阿月是谁——一个被熊娘嘎婆盯上、却始终没有放弃的高中女生。
          <br />
          · 小于是谁——她的朋友，一个有恐惧、有盲区、还活着的人。
          <br />
          · 熊娘嘎婆是什么——不是故事。它真实存在，会学亲近之人的声音。
          <br />
          · 阿月为什么死亡——不是绝望，而是设计。她把自己和它绑在一起，制造了一道裂缝。
          <br />
          · 阿月留下了什么——经验、方法，和一条继续对抗的路线。
          <br />
          · 源秘社是什么——渡口。人和非人都在这里。
          <br />
          · 阴间网站是什么——你自己决定相信什么。游戏不替你回答。
        </p>
        <p style={{ color: "#9cc8e0" }}>
          阿月没有白死。
          <br />
          她留下的资料正在引导你——也许，从你打开第一篇帖子的那一刻起，她就已经知道你会来。
        </p>
        <p style={{ textAlign: "center", color: "#5fd08a" }}>＞ 普通结局 · 完成 ＜</p>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link to="/forum/thread/post_forum_005" className="uw-btn">
            再去旧网页看看（{playerName || "访客"}）
          </Link>
          <button
            className="uw-btn"
            style={{ marginLeft: 8 }}
            onClick={() => {
              useGameStore.getState().reset();
              setShowRestart(true);
            }}
          >
            重新开始
          </button>
        </div>
        {showRestart && <div style={{ textAlign: "center", color: "#5fd08a", marginTop: 12 }}>存档已清除。去 <Link to="/">入口</Link> 重新开始。</div>}
      </div>
    </UnderworldShell>
  );
}

function RegisterPage() {
  const hiddenStarted = useGameStore((s) => s.hiddenEndingStarted);
  const registered = useGameStore((s) => s.extra.registered);
  const playerName = useGameStore((s) => s.playerName);
  const [name, setName] = useState(playerName || "无名访客");

  if (!hiddenStarted) {
    return (
      <UnderworldShell title="新人登记">
        <div className="uw-gate">
          <h1>登记处暂未开放</h1>
          <div>此亡者不存在。请原路返回。</div>
          <div style={{ fontSize: 12, marginTop: 12 }}>（如需登记，请先完成阿月的路线。）</div>
        </div>
      </UnderworldShell>
    );
  }

  const submit = () => {
    const store = useGameStore.getState();
    store.setExtra("registered", true);
    store.setEnding("hidden");
    audio.play("underworld.enter");
  };

  return (
    <UnderworldShell title="新人登记">
      {!registered ? (
        <div className="uw-register">
          <div style={{ color: "#9cc8e0", fontSize: 15 }}>新人登记</div>
          <div style={{ fontSize: 12, color: "#3d5568", marginTop: 6 }}>登记姓名，方可进入。登记后不得随意变更。姓名是很重的东西。</div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <button className="uw-btn" onClick={submit}>
              登记
            </button>
          </div>
        </div>
      ) : (
        <div className="uw-ending">
          <h1>登记完成</h1>
          <p style={{ textAlign: "center" }}>
            「{name}」，欢迎来到阴间内部网站。
            <br />
            你也是计划的一部分。
            <br />
            <br />
            阿月留下的路线，由你继续。
            <br />
            她的死亡是她留下的最后一次反击。
            <br />
            她没有白死。
          </p>
          <p style={{ textAlign: "center", color: "#d0a85f" }}>＞ 隐藏结局 · 完成 ＜</p>
          <div style={{ textAlign: "center" }}>
            <button className="uw-btn" onClick={() => useGameStore.getState().reset()}>
              清除存档，重新开始
            </button>
          </div>
        </div>
      )}
    </UnderworldShell>
  );
}

function UnderworldNotFound() {
  return (
    <UnderworldShell title="404">
      <div className="uw-404">
        <div style={{ fontSize: 22, color: "#5f8fb0" }}>此亡者不存在</div>
        <div style={{ marginTop: 10 }}>该地址没有对应记录。你可能走错了门。</div>
      </div>
    </UnderworldShell>
  );
}

export function UnderworldGuard({ children }: { children: ReactNode }) {
  const ladder = useGameStore((s) => s.ladderObtained);
  const entered = useGameStore((s) => s.enteredUnderworld);
  if (!ladder && !entered) {
    return <UnderworldGate />;
  }
  return <>{children}</>;
}

export function UnderworldHomePage() {
  return <UnderworldHome />;
}

export function UnderworldEntryPage() {
  return <UnderworldEntry />;
}

export function UnderworldSectionPage() {
  return <UnderworldSection />;
}

export function UnderworldRecordPagePage() {
  return <UnderworldRecordPage />;
}

export function UnderworldDecodePage() {
  return <DecodePage />;
}

export function UnderworldFinalPage() {
  return <FinalPuzzlePage />;
}

export function UnderworldEndingPage() {
  return <EndingPage />;
}

export function UnderworldRegisterPage() {
  return <RegisterPage />;
}

export function UnderworldNotFoundPage() {
  return <UnderworldNotFound />;
}

const UnderworldApp = {
  UnderworldGuard,
  UnderworldHomePage,
  UnderworldEntryPage,
  UnderworldSectionPage,
  UnderworldRecordPagePage,
  UnderworldDecodePage,
  UnderworldFinalPage,
  UnderworldEndingPage,
  UnderworldRegisterPage,
  UnderworldNotFoundPage
};
export default UnderworldApp;
