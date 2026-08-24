export function domainForPath(pathname: string): string {
  if (pathname.startsWith("/forum")) return "bbs.pingshunzhongxue.com";
  if (pathname.startsWith("/school")) return "www.pingshunhs.edu.cn";
  if (pathname.startsWith("/social")) return "space.pingshunzhongxue.com";
  if (pathname.startsWith("/yuanmishe")) return "www.yuanmishe.net";
  if (pathname.startsWith("/underworld")) return "pingshun-yinjian.net";
  if (pathname.startsWith("/dev")) return "debug.pingshun.local";
  return "www.pingshunlife.com";
}

export function pathFromInput(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/")) return trimmed;
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    return url.pathname + url.search;
  } catch {
    return null;
  }
}
