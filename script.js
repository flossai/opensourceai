/* ── Model data ── */
const MODELS = {
  llama: {
    name: 'Llama 3.x', vendor: 'Meta', marketedAs: '"Open source"',
    osaid: { state: 'closed', note: 'Would not be certified: custom licence and undisclosed data.' },
    intents: [
      { key: 'commercial', label: 'Ship it in a commercial product',          verdict: 'caution', reason: 'Free to embed, but Meta\'s licence cuts off above ~700M users and the undisclosed data is your copyright risk to carry.' },
      { key: 'regulated',  label: 'Deploy in a public body or regulated sector', verdict: 'caution', reason: 'You can self-host (good for data residency), but there\'s no training-data summary to back an AI Act filing and the custom licence needs legal sign-off.' },
      { key: 'finetune',   label: 'Fine-tune it on your own data',             verdict: 'go',      reason: 'Weights download freely and the licence allows fine-tuning; your tuning data stays in-house.' },
      { key: 'audit',      label: 'Reproduce or audit it',                     verdict: 'stop',    reason: 'Data and training recipe are withheld, so you can\'t reproduce or independently audit it.' },
    ],
    parts: [
      { letter: 'C', label: 'Code',              state: 'partial', line: 'Inference code is public; the training recipe isn\'t.' },
      { letter: 'L', label: 'License',           state: 'partial', line: 'Custom licence with use restrictions and a big-company clause. Not OSI-free.' },
      { letter: 'E', label: 'Examples (data)',   state: 'closed',  line: 'Training corpus undisclosed.' },
      { letter: 'A', label: 'Access (weights)',  state: 'open',    line: 'Downloadable after you accept Meta\'s licence.' },
      { letter: 'R', label: 'Reproducibility',   state: 'closed',  line: 'Recipe and data withheld.' },
    ],
    bottom: 'Great for self-hosting and fine-tuning. Useless the moment you have to prove what\'s inside it.'
  },
  mistral: {
    name: 'Mistral 7B', vendor: 'Mistral AI', marketedAs: '"Open"',
    osaid: { state: 'closed', note: 'Would not be certified: training data undisclosed.' },
    intents: [
      { key: 'commercial', label: 'Ship it in a commercial product',          verdict: 'go',      reason: 'Apache-2.0: embed, sell and redistribute with no user caps.' },
      { key: 'regulated',  label: 'Deploy in a public body or regulated sector', verdict: 'caution', reason: 'Clean licence and self-hostable, but no data disclosure to back an AI Act summary or a bias review.' },
      { key: 'finetune',   label: 'Fine-tune it on your own data',             verdict: 'go',      reason: 'Fine-tune and ship the result freely under Apache-2.0.' },
      { key: 'audit',      label: 'Reproduce or audit it',                     verdict: 'stop',    reason: 'No dataset or training recipe published, so it isn\'t reproducible.' },
    ],
    parts: [
      { letter: 'C', label: 'Code',              state: 'partial', line: 'Inference code public; full training pipeline isn\'t.' },
      { letter: 'L', label: 'License',           state: 'open',    line: 'Apache-2.0: no use caps, no field restrictions.' },
      { letter: 'E', label: 'Examples (data)',   state: 'closed',  line: 'Dataset composition not disclosed.' },
      { letter: 'A', label: 'Access (weights)',  state: 'open',    line: 'Free download, safe .safetensors format.' },
      { letter: 'R', label: 'Reproducibility',   state: 'closed',  line: 'No data or training recipe.' },
    ],
    bottom: 'A clean, permissive base — as long as you never need to see the data.'
  },
  deepseek: {
    name: 'DeepSeek V3 / R1', vendor: 'DeepSeek · China', marketedAs: '"Open source"',
    osaid: { state: 'closed', note: 'Would not be certified: training data undisclosed.' },
    intents: [
      { key: 'commercial', label: 'Ship it in a commercial product',          verdict: 'go',      reason: 'MIT licence puts no limits on commercial use.' },
      { key: 'regulated',  label: 'Deploy in a public body or regulated sector', verdict: 'caution', reason: 'Licence is clean and self-hostable, but undisclosed data and provenance questions need a policy call.' },
      { key: 'finetune',   label: 'Fine-tune it on your own data',             verdict: 'go',      reason: 'MIT allows fine-tuning and redistribution.' },
      { key: 'audit',      label: 'Reproduce or audit it',                     verdict: 'stop',    reason: 'Weights only; the training pipeline is a black box.' },
    ],
    parts: [
      { letter: 'C', label: 'Code',              state: 'partial', line: 'Papers + inference code public; full training code isn\'t.' },
      { letter: 'L', label: 'License',           state: 'open',    line: 'MIT: permissive, no restrictions.' },
      { letter: 'E', label: 'Examples (data)',   state: 'closed',  line: 'Training data undisclosed.' },
      { letter: 'A', label: 'Access (weights)',  state: 'open',    line: 'MIT-licensed, free to download for anyone.' },
      { letter: 'R', label: 'Reproducibility',   state: 'closed',  line: 'Weights only; the build is a black box.' },
    ],
    bottom: 'Permissive and powerful to deploy. Opaque the moment you need to audit it.'
  },
  gpt4o: {
    name: 'GPT-4o', vendor: 'OpenAI', marketedAs: 'Closed (and says so)',
    osaid: { state: 'closed', note: 'Fails every definition of open.' },
    intents: [
      { key: 'commercial', label: 'Ship it in a commercial product',          verdict: 'caution', reason: 'Usable through a paid API, but you can\'t self-host or drop the OpenAI dependency; lock-in is the cost.' },
      { key: 'regulated',  label: 'Deploy in a public body or regulated sector', verdict: 'stop',    reason: 'API-only: your data leaves your premises and there\'s no transparency. A hard blocker for many public bodies.' },
      { key: 'finetune',   label: 'Fine-tune it on your own data',             verdict: 'caution', reason: 'Only OpenAI\'s hosted tuning; you never hold the weights.' },
      { key: 'audit',      label: 'Reproduce or audit it',                     verdict: 'stop',    reason: 'Nothing is released, so no audit or reproduction is possible.' },
    ],
    parts: [
      { letter: 'C', label: 'Code',              state: 'closed', line: 'Internal; nothing to run yourself.' },
      { letter: 'L', label: 'License',           state: 'closed', line: 'Pay-per-use API terms; no redistribution.' },
      { letter: 'E', label: 'Examples (data)',   state: 'closed', line: 'Training data undisclosed.' },
      { letter: 'A', label: 'Access (weights)',  state: 'closed', line: 'Never leaves OpenAI\'s servers.' },
      { letter: 'R', label: 'Reproducibility',   state: 'closed', line: 'Nothing is released.' },
    ],
    bottom: 'A capable black box you rent. Fine for output, impossible for control or proof.'
  },
  olmo: {
    name: 'OLMo 2', vendor: 'Allen Institute · AI2', marketedAs: '"Fully open"',
    osaid: { state: 'open', note: 'Meets it: code, weights and data are all open.' },
    intents: [
      { key: 'commercial', label: 'Ship it in a commercial product',          verdict: 'go', reason: 'Apache-2.0 across code, weights and data; use and sell without limits.' },
      { key: 'regulated',  label: 'Deploy in a public body or regulated sector', verdict: 'go', reason: 'Self-hostable, clean licence and full data disclosure to support an AI Act summary and audit.' },
      { key: 'finetune',   label: 'Fine-tune it on your own data',             verdict: 'go', reason: 'Everything is open; fine-tune and redistribute freely.' },
      { key: 'audit',      label: 'Reproduce or audit it',                     verdict: 'go', reason: 'Code, data, recipe and logs are all public, so it\'s fully reproducible.' },
    ],
    parts: [
      { letter: 'C', label: 'Code',              state: 'open', line: 'Full training and evaluation code released.' },
      { letter: 'L', label: 'License',           state: 'open', line: 'Apache-2.0 across code, weights and data.' },
      { letter: 'E', label: 'Examples (data)',   state: 'open', line: 'Training data (Dolma), recipe and logs published.' },
      { letter: 'A', label: 'Access (weights)',  state: 'open', line: 'Freely downloadable.' },
      { letter: 'R', label: 'Reproducibility',   state: 'open', line: 'Everything needed to rebuild it is public.' },
    ],
    bottom: 'The rare model you can adopt for any of these jobs without a catch.'
  }
};

const ORDER = ['llama', 'mistral', 'deepseek', 'gpt4o', 'olmo'];
let active = 'llama';

/* ── Render helpers ── */
function verdictClass(v) {
  return v === 'go' ? 'go' : v === 'caution' ? 'caution' : 'stop';
}

function verdictLabel(v) {
  return v === 'go' ? 'Go' : v === 'caution' ? 'Caution' : 'No-go';
}

function stateLabel(s) {
  return s === 'open' ? 'Open' : s === 'partial' ? 'Partial' : 'Closed';
}

/* ── Chips ── */
function renderChips() {
  const container = document.getElementById('model-chips');
  container.innerHTML = ORDER.map(id => `
    <button class="chip${id === active ? ' chip--active' : ''}" data-model="${id}">
      ${MODELS[id].name}
    </button>
  `).join('');

  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      active = btn.dataset.model;
      renderChips();
      renderDecoder();
    });
  });
}

/* ── Decoder card ── */
function renderDecoder() {
  const m = MODELS[active];
  const card = document.getElementById('decoder-card');

  const intentsHTML = m.intents.map(i => `
    <div class="intent-row">
      <span class="verdict-badge verdict-badge--${verdictClass(i.verdict)}">${verdictLabel(i.verdict)}</span>
      <div class="intent-info">
        <div class="intent-info__label">${i.label}</div>
        <div class="intent-info__reason">${i.reason}</div>
      </div>
    </div>
  `).join('');

  const partsHTML = m.parts.map(p => `
    <div class="part-row">
      <div class="part-key">
        <span class="part-tile part-tile--${p.state}">${p.letter}</span>
        <span class="part-name">${p.label}</span>
      </div>
      <span class="chip-state chip-state--${p.state}">${stateLabel(p.state)}</span>
      <div class="part-line">${p.line}</div>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="decoder-card__head">
      <div class="decoder-card__model">
        <div class="decoder-card__model-name">${m.name}</div>
        <div class="decoder-card__model-sub">${m.vendor} · marketed as <em>${m.marketedAs}</em></div>
      </div>
      <div class="decoder-card__osaid">
        <div class="osaid-label">OSAID (OSI)</div>
        <span class="badge badge--${m.osaid.state === 'open' ? 'open' : 'closed'}">
          ${m.osaid.state === 'open' ? 'Meets OSAID' : 'Not certified'}
        </span>
        <div class="osaid-note">${m.osaid.note}</div>
      </div>
    </div>

    <div class="decoder-card__intents">
      <div class="intents-label">CLEAR verdict, by what you actually want to do</div>
      ${intentsHTML}
    </div>

    <div class="decoder-card__parts">
      <div class="parts-label">The five facts behind the verdict</div>
      ${partsHTML}
      <p class="decoder-card__bottom">${m.bottom}</p>
    </div>
  `;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderChips();
  renderDecoder();
});
