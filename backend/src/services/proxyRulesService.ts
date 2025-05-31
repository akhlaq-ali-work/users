import ProxyRule, { IProxyRule } from "../models/ProxyRule";

export const getOrCreateProxyRule = async (): Promise<IProxyRule> => {
  let rule = await ProxyRule.findOne();
  if (!rule) {
    rule = new ProxyRule();
    await rule.save();
  }
  return rule;
};

export const addToWhitelist = async (url: string): Promise<string[]> => {
  const rule = await getOrCreateProxyRule();
  if (!rule.whitelist.includes(url)) {
    rule.whitelist.push(url);
    await rule.save();
  }
  return rule.whitelist;
};

export const removeFromWhitelist = async (url: string): Promise<string[]> => {
  const rule = await getOrCreateProxyRule();
  rule.whitelist = rule.whitelist.filter((entry) => entry !== url);
  await rule.save();
  return rule.whitelist;
};

export const toggleLogging = async (enable: boolean): Promise<boolean> => {
  const rule = await getOrCreateProxyRule();
  rule.loggingEnabled = enable;
  await rule.save();
  return rule.loggingEnabled;
};

export const getLoggingStatus = async () => {
  let rule = await ProxyRule.findOne();
  if (!rule) {
    rule = await ProxyRule.create({});
  }
  return rule.loggingEnabled;
};
