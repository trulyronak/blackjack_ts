enum Decision {
  hit = 'h',
  stand = 's',
  split = 'sp',
}

export function verifyStringDecision(s: string) {
  s = s.toLowerCase();
  return (
    s === 'h' ||
    s === 'hit' ||
    s === 's' ||
    s === 'stand' ||
    s === 'p' ||
    s === 'split'
  );
}

export function decisionForString(s: string): Decision {
  s = s.toLowerCase();
  if (s.charAt(0) === 'h') {
    return Decision.hit;
  } else if (s.charAt(0) === 'p') {
    return Decision.split;
  } else {
    return Decision.stand;
  }
}

export { Decision };
