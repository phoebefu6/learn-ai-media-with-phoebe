# AI + Audio and Video - official source map and coverage

Written 2026-08-26 from primary sources. Every number below carries the URL it came from. Anything
that could not be pinned to a first-party page is in the quarantine section at the bottom and must
not reach a course page.

## The 80% bar

Each session teaches ~80% of its mapped sources' working content. Certificates stay with the
providers. Said plainly on every session page.

## READ THIS FIRST: the course is about a category that is moving under our feet

**OpenAI has exited video.** The Sora consumer app shut down **26 April 2026** and the Sora 2 API
sunsets **24 September 2026 - 29 days after this map was written** - with **no announced
replacement**. OpenAI's own deprecations page lists `sora-2`, `sora-2-pro`, all dated variants and
the Videos API itself, and the "recommended replacement" column reads `---`.
https://developers.openai.com/api/docs/deprecations

OpenAI gave no reason. Its only public statement was "We're saying goodbye to the Sora app." App
downloads had fallen from 3.3 million in November to 1.1 million by February.
https://techcrunch.com/2026/03/24/openais-sora-was-the-creepiest-app-on-your-phone-now-its-shutting-down/

**Any course, article or tutorial teaching "Sora, Veo, Runway" as the three pillars is already
wrong.** That is not a footnote. It is the spine of the currency lesson this course exists to teach.

**Three more that break the standard outline:**

1. **There is no Veo 4.** Google broke the naming sequence and launched **Gemini Omni** instead:
   "Omni can create anything from any input - starting with video."
   https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/
2. **Every Google video model is still Preview** - Veo 3.1, Veo 3.1 Lite, Gemini Omni Flash. No
   stable video model is listed. Preview models get retired: Veo 2 and Veo 3 were announced
   deprecated **15 June 2026** and shut down **30 June 2026**, fifteen days' notice.
   https://ai.google.dev/gemini-api/docs/models · https://ai.google.dev/gemini-api/docs/changelog
3. **EU AI Act Article 50 has been in force since 2 August 2026.** It moved from "upcoming" to
   "current law" three weeks before this map was written, and the grace period for systems already
   on the market expires **2 December 2026**.

## Simulator canon - VERIFIED IN-BROWSER 2026-08-25

`assets/media-live.js`. **What is real:** the 60-second audio envelope, the silence detection that
scans it, the cut points it finds, and the runtime after those cuts. An independent recheck of the
raw envelope reproduced the detector's output exactly. **What is modelled:** the retention curve,
which is a teaching model of how attention behaves, not a measurement of anyone's audience. The page
says so.

**Real detection result:** 4 stretches of dead air totalling **12.4 seconds**, found by scanning for
runs under 0.085 amplitude lasting at least 0.4s. Trimming them takes the cut from **60s to 47.6s**.

**The ladder** (share still watching at the end):

| Rung | Still watching |
|---|---|
| the raw cut | **16%** |
| + say the point in the first three seconds | **38%** |
| + cut the dead air | **52%** (runtime drops to 47.6s) |
| + burn in captions | **64%** |
| + crop for where it will play | **72%** |

**Both traps backfire from 72%:** "add more, because it feels thin" drops to **56%**; "open with a
branded intro animation" drops to **59%**, because it spends the only three seconds you are
guaranteed on something the viewer did not come for.

## Session 1 - the first three seconds

Rests on the simulator, the retention argument and the currency finding above. Sources verified.

## Session 2 - what the tools actually do, and what they cost

### Sora, while it lasts (teach it as the retirement case study, not as a tool to adopt)

Two models, `sora-2` and `sora-2-pro`. **16- and 20-second generations.** Sizes 1280x720, 1920x1080,
1080x1920 - **16:9 and 9:16 only**, and 1080p requires pro. Extension adds up to 20 seconds, "up to
six times, for a maximum total length of 120 seconds". Character uploads "work best with short 2- to
4-second clips", max two per video. https://developers.openai.com/api/docs/guides/video-generation

Pricing per second: sora-2 720p **$0.10/s**; sora-2-pro 720p **$0.30/s**, 1024p **$0.50/s**, 1080p
**$0.70/s**. Batch is half. https://developers.openai.com/api/docs/pricing

### Veo 3.1

| Model | Length | Resolutions | Ratios | Audio |
|---|---|---|---|---|
| Veo 3.1 | 4, 6 or 8 s | 720p, 1080p (8s), 4K (8s) | 16:9, 9:16 | always on |
| Veo 3.1 Fast | 4, 6, 8 s | 720p, 1080p (8s), 4K (8s) | 16:9, 9:16 | always on |
| Veo 3.1 Lite | 4, 6, 8 s | 720p, 1080p (8s), no 4K | 16:9, 9:16 | always on |

One video per request. Pricing per second, audio included: Standard **$0.40/s** (720p and 1080p),
**$0.60/s** 4K; Fast **$0.10/s** 720p; Lite **$0.05/s** 720p. **No free tier for any Veo model.**
"You will only be charged if your video is successfully generated."
https://ai.google.dev/gemini-api/docs/veo · https://ai.google.dev/gemini-api/docs/pricing

**Google's own admission, and it belongs on the page:** DeepMind states that "creating videos with
natural and consistent spoken audio, particularly for shorter speech segments, remains an area of
active development." https://deepmind.google/models/veo/

### Gemini Omni Flash

**3 to 10 seconds, 720p, 24 FPS**, 9:16 and 16:9, model `gemini-omni-flash-preview`. Uploaded video
up to 10s for editing. **"Uploading audio references is unsupported."** Billing is token-based:
**5,792 tokens per second of 720p video** at $17.50 per 1M output tokens, about **$0.10 per second**.

Documented limitations, verbatim: "Video extension and video interpolation... are not supported";
"Voice editing is not supported"; and **"Editing uploaded videos is not currently available for
users in the European Economic Area (EEA), Switzerland, and the United Kingdom."**
https://ai.google.dev/gemini-api/docs/omni

All Gemini Omni video carries an imperceptible **SynthID** watermark.

### Runway, which is now largely an aggregator - itself the teachable fact

Credits per second at $0.01/credit: Gen-4 Turbo 5, Act-Two 5, **Gen-4.5 12**, **Aleph 2 28**, Veo
3.1 20 (no audio) or 40 (audio), Gemini Omni Flash 10, Seedance 2.5 20/30/68 by resolution.
https://docs.dev.runwayml.com/guides/pricing/

Plans: Free $0 (125 one-time credits, watermarked); Standard $15/mo or $12 annual (625 credits,
"52s of Gen-4.5"); Pro $35/mo (2,250); Max $95/mo (9,500). https://runway.com/pricing

**Runway publishes real rate limits, which is rare and worth showing:** "no maximum
requests-per-minute limit" within daily caps. Tier 1 is 1-2 concurrent, 50-200 generations/day,
$100 monthly spend cap; Tier 5 (after $5,000 spend) is 20 concurrent, 25,000-30,000/day.
https://docs.dev.runwayml.com/usage/tiers/

**Aleph 2.0 + Edit Studio**, 21 May 2026: "Work with up to **30s of 1080p video**", targeted edits
"keeping everything else just as it was". Edit Studio previews an edit as a still before committing
to video generation, which reduces credit burn. https://runway.com/news/introducing-aleph-2-and-edit-studio

### ElevenLabs

Free $0 (10k credits); Starter $6 (30k, commercial licence begins here); Creator $22 (121k, 1 PVC
slot); Pro $99 (600k); Scale $299 (1.8M); Business $990 (6M). 1 character = 1 credit.
https://elevenlabs.io/pricing

Model limits: **Eleven v3** 5,000 chars, 70+ languages, labelled **alpha** on the marketing page;
**Multilingual v2** 10,000 chars, 29 languages; **Flash v2.5** 40,000 chars, ~75 ms latency.
**Legacy default voices expire 31 December 2026.** https://elevenlabs.io/docs/models

### Descript, and a rename that has broken every existing tutorial

**"Overdub" no longer exists.** The word appears **zero times** across Descript's complete 398-entry
docs index. The feature is now **"AI Speech" / "AI Speaker" / custom voice clone**, and the Terms of
Service section is headed "Use of AI Speakers". Legacy Overdub blog posts are still live on the
marketing site, which is exactly why third-party courses are stale.
https://help.descript.com/llms.txt · https://www.descript.com/terms

Plans (annual/mo): Free $0 (1 hr media, 720p watermarked); Hobbyist $16 (10 hrs, 400 credits);
Creator $24 (30 hrs, 800); Business $50 (40 hrs, 1,500). **Transcription is not tier-gated** - all
four tiers get the same 25 languages. What is capped is media minutes, and **neither media minutes
nor AI credits roll over.** https://www.descript.com/pricing

## Session 3 - the constraints the marketing never mentions

**This is the session that justifies the course.** Across every vendor, the advertised feature is
never the real limit. Each of these is quotable from a vendor page.

- **Studio Sound "only works on recorded audio, not AI-generated speech"**, applies at **file level,
  not clip level**, and with extremely loud background noise "may not be able to separate the speech
  from the noise, **resulting in a silent waveform**."
  https://help.descript.com/effects-animations-transitions/studio-sound.md
- **Remove Filler Words "currently detects filler words in English transcripts only."** And its
  "Avoid harsh cuts" option deliberately skips fillers that "can't be removed without clipping into
  nearby words", so **removed count never equals detected count**.
  https://help.descript.com/script-editing/filler-words.md
- **Eye Contact is "single person only: the effect works when one clear face is in frame"**, fails on
  sideways footage and on variable frame rate video (the doc's own remedy is re-encoding in
  HandBrake). https://help.descript.com/effects-animations-transitions/eye-contact.md
- **Regenerate "currently supports English audio and video only"**, and video regeneration is
  unsupported for "Sequences, B-roll, multi-speaker recordings, and shots where the speaker's face
  isn't clearly visible." https://help.descript.com/script-editing/regenerate-overview.md
- **Adobe Generative Extend: "Video clips can be extended up to 2 seconds, while audio can be
  extended up to 10 seconds"**, cloud-only, minimum 2s of source video or 3s of audio.
  https://helpx.adobe.com/premiere-pro/using/generative-extend.html
- **Opus Clip free tier: "After 3 days, the clips will no longer be exportable."**
  https://www.opus.pro/pricing

**Also a rename:** "Premiere Pro" is now documented as **"Adobe Premiere"**. URL paths still say
`premiere-pro`. https://helpx.adobe.com/premiere-pro/using/enhance-speech.html

**And a vendor candour note worth teaching:** Descript says of ElevenLabs v3 output, "You may notice
inconsistencies in how the output from this model sounds across paragraphs. This can include shifts
in tone, volume, accent, **or even speaker identity**."
https://help.descript.com/ai-speech/tts.md

## Session 4 - captions and access, where the real obligations live

### The WCAG trap that catches almost everyone

**SC 1.2.2 Captions (Prerecorded), Level A**, verbatim: "Captions are provided for all prerecorded
audio content in synchronized media, except when the media is a media alternative for text and is
clearly labeled as such." https://www.w3.org/TR/WCAG22/#captions-prerecorded

**The trap is 1.2.3 versus 1.2.5, and W3C states it outright:** "At Level A in Success Criterion
1.2.3, authors do have the choice of providing either an audio description or a full text
alternative. If they wish to conform at Level AA, under Success Criterion 1.2.5 **authors must
provide an audio description.**"
https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html

**At Level A a transcript substitutes for audio description. At Level AA - the level every US legal
mandate points at - that escape hatch disappears.** Nearly every "we're accessible, we have
transcripts" claim is a Level A claim being presented as AA compliance. That is the highest-value
sentence in this session.

Guideline 1.2 is **unchanged from WCAG 2.0**; nothing was added in 2.1 or 2.2. WCAG 2.2 is a W3C
Recommendation of 12 December 2024. **WCAG 3.0 is still a Working Draft** whose own status text says
"It is inappropriate to cite this document as other than a work in progress" - do not teach it as a
compliance target. https://www.w3.org/TR/WCAG22/ · https://www.w3.org/TR/wcag-3.0/

### DCMP's concrete numbers

Presentation rate **not to exceed 130 wpm** (lower-level), **140 wpm** (middle), **160 wpm** (upper),
counting every word including speaker IDs and sound effects.
https://dcmp.org/learn/601-captioning-key---presentation-rate

Timing: **minimum caption duration 40 frames** (1 second 10 frames), **maximum 6 seconds**, and "it
is preferred that there are no more than two lines per caption". Background music under 5 seconds is
not captioned. https://dcmp.org/learn/597-captioning-key---text · https://dcmp.org/learn/602-captioning-key---sound-effects-and-music

**Do NOT attribute "32 characters per line" to DCMP.** A check of the complete printable Captioning
Key found **no characters-per-line rule anywhere in the document**. The 32 figure comes from the
CEA-608 broadcast caption grid, which is a different thing.

### What auto-captions actually score

**The peer-reviewed benchmark:** Kuhn, Kersken, Reuter, Egger and Zimmermann, *ACM Transactions on
Accessible Computing* 16(4). 11 commercial and open ASR services, 120 three-minute samples, **221
hours of audio, 3,840 transcriptions**. https://doi.org/10.1145/3636513 · https://arxiv.org/abs/2408.16287

Average WER: **Whisper large-v2 2.9%**, Speechmatics 3.3%, Amazon/Microsoft/Rev 4.4%, AssemblyAI
4.5%, Deepgram 8.3%, IBM 11.2%, **Google 20.1%**. **Overall average 7.0%.**

**The number that matters more than the average: per-file WER ranged from 0% to 53.8%.** "Providers
that achieve a relatively low average WER can show a high error rate for an individual sample."
Averages hide catastrophic files.

Also from the same study: **streaming is significantly worse than batch** (10.9% vs 9.37% English);
**custom vocabularies did not significantly improve WER** (8.61% to 8.10%, not significant) though
specialist terms and names only appeared at all when a vocabulary was supplied; and **normalisation
roughly halves reported WER** (21.83% raw to 10.16% fully normalised), **which is why vendor and
research WER figures are not comparable unless normalisation is stated** - and the FCC requires
correct punctuation and capitalisation, which normalisation discards.

**W3C's position, verbatim:** "Automatically-generated captions do not meet user needs or
accessibility requirements, unless they are confirmed to be fully accurate." Its own examples:
"4 to 5 minutes" becoming "45 minutes"; "should **not** preheat" becoming "should **know to**
preheat". https://www.w3.org/WAI/media/av/captions/

**ASR does not only mis-hear, it invents.** Koenecke et al., "Careless Whisper", ACM FAccT 2024:
roughly **1% of transcriptions contained entire hallucinated phrases with no counterpart in the
audio**, and **~38% of those carried explicit harms** - fabricated violence, invented personal
attributes, made-up authority. On a 40-minute lecture, 1% is several confidently fabricated
sentences a viewer reads as authoritative. https://arxiv.org/abs/2402.08021

### The 99% standard is industry convention, not law

It is **not** in WCAG, **not** in the FCC rules, and **not** in DCMP. The National Deaf Center
confirms the vacuum: **"Currently, there is no standard threshold that would dictate when ASR
captions are accurate enough to be used as a form of effective communication."**
https://nationaldeafcenter.org/resource-items/captioned-media/compliance-and-standards/

What IS defensible from NDC: "When automatically generated captions average at **60%-70%
accuracy**, communication cannot be reasonably assumed to be as effective or equivalent to the
audio", and poor auto-captions "can **negatively impact** students who are relying on captions."
https://nationaldeafcenter.org/resource-items/automatic-captions/

**And WER is a poor proxy for usability anyway.** Kafle and Huenerfauth, ASSETS '17, with 30 DHH
participants: given ASR outputs of *identical WER*, participants systematically preferred the one a
word-importance-weighted metric favoured. **Two caption files can score the same 95% and differ
wildly in usability, because WER treats "the" and the speaker's name as equally weighted errors.**
https://doi.org/10.1145/3132525.3132542

### The disparities, which are measured and hold across every vendor

**Koenecke et al., *PNAS* 2020, 117(14).** Five commercial ASR systems, **73 Black and 42 white
speakers**, 19.8 hours, matched on age and gender. https://doi.org/10.1073/pnas.1915768117

| System | Black speakers | White speakers |
|---|---|---|
| **Average** | **0.35** | **0.19** |
| Apple | 0.45 | 0.23 |
| Microsoft | 0.27 | 0.15 |
| IBM | 0.21 | 0.10 |
| Amazon | 0.18 | 0.08 |
| Google | 0.17 | 0.11 |

**The gap is roughly 2x and holds across all five vendors** - this is not one bad vendor. And the
controlled replication closes the obvious objection: using **206 identical short phrases** spoken by
both groups, matched on gender and age, error rates for Black speakers remained roughly double. The
cause is attributed to the acoustic model, pointing to insufficient training data.

**The bias survives newer architectures:** wav2vec 2.0, HuBERT, WavLM and XLS-R "perpetuate the bias
in performance against AAVE". https://arxiv.org/abs/2408.14262

**Accented English:** ESL WER averaged **10.2% vs 7.0%** native, a ~46% relative degradation. Worst
case Google 28.1% ESL. Whisper held at 3.3% on both. **German averaged 15.3% against English 7.0%.**

### The legal deadline moved four days before it hit

DOJ's ADA Title II web rule (89 FR 31320, 24 April 2024) adopts **WCAG 2.1 Level AA**. On **20 April
2026, four days before the first deadline**, DOJ published an Interim Final Rule extending both
dates by a year.

| Entity size | Current deadline | Passed? |
|---|---|---|
| 50,000+ persons | **26 April 2027** | No, ~8 months out |
| under 50,000 and special districts | **26 April 2028** | No |

**Any material written before April 2026 citing "April 24, 2026" is now wrong** - a live example of
why compliance dates get re-verified rather than remembered. https://www.ada.gov/resources/2024-03-08-web-rule/

**Two caveats that must travel with this.** The IFR delays only the WCAG technical conformance date;
it does **not** suspend Title II's underlying effective-communication obligations, which have
supported claims for years. And **the eCFR text of 28 CFR 35.200 still shows the original dates** -
cite ada.gov, not the CFR. Separately, **Section 508 still incorporates WCAG 2.0**, so federal
procurement is anchored a version behind. https://www.section508.gov/manage/laws-and-policies/

## Session 5 - the failure modes, measured

### Physics: the strongest numbers in the whole pack

**Physics-IQ (Google DeepMind)**, against a real-world ceiling of 100.0: VideoPoet 29.5, Lumiere
23.0, Runway Gen 3 22.8, Stable Video Diffusion 14.8, Pika 1.0 13.0, **Sora 10.0**. The paper's own
summary: "the best model scoring only 29.5% out of the possible 100.0%", and the quotable finding -
physical understanding is **"severely limited, and unrelated to visual realism"**.
https://arxiv.org/abs/2501.09038

**Visual realism does not imply physical understanding.** That sentence is the session.

**VideoPhy-2:** "even the best model achieving only **22% joint performance**... on the hard
subset", with models struggling "particularly with conservation laws like mass and momentum".
https://arxiv.org/abs/2503.06800 **A 47.7% figure circulates in aggregator summaries. Use 22%.**

### Drift is a named, scored failure mode, not an edge case

**VBench-2.0** scores 18 dimensions including **Human Temporal Consistency - Identity** and,
separately, **- Clothes**. The wardrobe changing mid-shot is a formally scored defect. So is
Instance Preservation (objects must not blink in and out).

Published results: **Complex Plot scores below 12% for every model tested**; **Dynamic Spatial
Relationship below 22% for every model**. **Human Anatomy ranges 59.72% to 88.58%** - even the best
model leaves roughly one generation in nine anatomically wrong. https://arxiv.org/abs/2503.21755

**Vendor documentation is currently a worse source of honest limitations than the benchmark
literature.** OpenAI's Sora 2 System Card contains no technical-limitations section at all - verified
by full extraction of the 7-page PDF - and claims the opposite direction ("more accurate physics,
sharper realism").

### Dubbing trades meaning against timing

**Isochrony-aware dubbing** (Amazon, Interspeech 2022): "Dubbing of a spoken sentence requires
transferring the content as well as the speech-pause structure of the source into the target
language to achieve audiovisual coherence." **Translation length is not free.** A faithful
translation 30% longer than the source cannot be dubbed in sync without either speeding up delivery
or cutting content. https://arxiv.org/abs/2112.08548

Lip-sync is measured with **LSE-D** (distance, lower better) and **LSE-C** (confidence, higher
better), both from a frozen SyncNet-style discriminator, hence comparable across systems.
https://arxiv.org/abs/2008.10010

### The iteration cost - handle with care, because the evidence is weak

**The one large attributable figure:** Coca-Cola's 2025 AI holiday ad, reported at **~70,000
AI-generated clips** for a spot of roughly **20 shots**, ~20 people, using Veo 3 and Sora.

**Read the caveat before using it.** The same article questions the figure and offers three
alternative readings - first-frame image generations, machine-selected pipeline iterations, or
"every micro-variation, crop, and version". The number originates in the studio's own production
credits, not an independent audit.

**If used, present it as "the studio's own stated clip count, ~70,000 for a ~20-shot spot", and say
plainly that what counts as a "clip" is undefined. Do NOT present "3,500 generations per usable
shot" as a measured ratio** - that is arithmetic on an undefined denominator. **No independent audit
of generation-to-usable-shot ratios has been published, and teaching that absence is the honest
move.** https://www.vp-land.com/p/coca-cola-s-ai-holiday-ad-how-70-000-generated-clips-built-a-familiar-yet-new-commercial

## Session 6 - disclosure, provenance and the law

### EU AI Act Article 50, in force since 2 August 2026

**The Digital Omnibus did NOT delay it.** Regulation (EU) 2026/1744 of 8 July 2026 pushed only the
**high-risk** deadlines (to December 2027 and August 2028). Article 50 stayed at 2 August 2026.
https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng

**One real carve-out:** generative systems placed on the market **before 2 August 2026** must comply
with the Article 50(2) marking obligation only from **2 December 2026**.

- **50(2), providers**, verbatim: outputs "shall be marked in a machine-readable format and
  detectable as artificially generated or manipulated", by solutions that are "effective,
  interoperable, robust and reliable as far as this is technically feasible". **Exempt: assistive
  editing that does not substantially alter the input.**
- **50(4), deployers:** anyone deploying a system producing a **deep fake** "shall disclose that the
  content has been artificially generated or manipulated" - with a **reduced obligation for work
  that is "evidently artistic, creative, satirical, fictional or analogous"**, where disclosure must
  not "hamper the display or enjoyment". https://artificialintelligenceact.eu/article/50/

The **Code of Practice on Transparency of AI-generated Content** (10 June 2026) is **voluntary**;
~190 organisations had signed by late July 2026.

### C2PA: what it proves, and what its own documents say it does not

**Current spec 2.4, April 2026.** Architecture: manifest, assertion, claim, ingredient, **hard
binding** (cryptographic hash) and **soft binding** (fingerprint or invisible watermark). Durable
Content Credentials = metadata plus watermark plus fingerprint, so provenance survives stripping.
https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html

**The strongest teaching material here comes from C2PA itself, not from critics.** From Security
Considerations: **"C2PA does not offer any protection against the complete removal of C2PA manifests
from assets."** Screenshots, re-encoding and re-rendering bypass it entirely.
https://spec.c2pa.org/specifications/specifications/2.4/security/Security_Considerations.html

From Harms Modelling: "the presence of valid manifests does not mean that anything is 'true'";
assets "can have valid C2PA manifests and still be deemed to be mis or disinformation"; and **"The
fact that any digital asset does not have Content Credentials does not mean that its contents are
not to be trusted."**
https://spec.c2pa.org/specifications/specifications/2.4/security/Harms_Modelling.html

From the spec's own scope, §1.2: C2PA "SHOULD NOT provide value judgments about whether a given set
of provenance data is 'good' or 'bad', merely whether the assertions included within can be
validated as associated with the underlying asset, correctly formed, and free from tampering."

**A Content Credential attests to a signed claim about an asset's history. It does not attest that
the content is true, accurate, or fairly presented.**

**And a platform admitting the limit in its own help docs:** YouTube on "Captured with a camera" -
"If it's missing, it doesn't mean the content has modified audio or visuals" - plus the **air-gap
attack**, where someone points a C2PA-enabled camera at a screen showing synthetic content to obtain
a genuine "captured" credential. https://support.google.com/youtube/answer/15446725

**SynthID is the complementary layer:** a soft binding embedded in pixels or samples, robust to
cropping, filters, frame-rate change and lossy compression. Over **10 billion pieces of content**
watermarked as of May 2025. https://deepmind.google/science/synthid/

### What each platform requires, verified from platform pages

| | YouTube | TikTok | Meta | LinkedIn |
|---|---|---|---|---|
| **Trigger** | AI meaningfully alters or generates **photorealistic** content | AI or significant edit showing **realistic-looking scenes or people** | **photorealistic video or realistic-sounding audio**, organic | synthetic media depicting a person **saying or doing what they didn't** |
| **Creator control** | Studio → Attributes → **"AI use"** | **AIGC label** *or* own caption/sticker/watermark | **AI-disclosure tool** | no dedicated tool found |
| **Viewer sees** | **"Made with AI"** | **"AI-generated"** / AIGC label | **"AI info"**, clickable | **C2PA panel**, no platform badge |
| **Where** | player (photorealistic) or description (animated) | on the video | on the post if AI-*generated*; in the **⋯ menu** if only AI-*edited* | next to the media |
| **C2PA** | reads v2.1+ | reads **and writes**; Steering Committee | reads C2PA + IPTC | **display-only** |

**Four exemptions worth teaching, because they surprise people.** YouTube does **not** require
disclosure for beauty filters, colour adjustment, caption creation, or **cloning your own voice for
your own dubs**. TikTok does not require it for generic text-to-speech "when the TTS isn't a
recognizable voice of a known individual". https://support.google.com/youtube/answer/14328491 ·
https://www.tiktok.com/community-guidelines/en/integrity-authenticity

**Meta renamed its label, and the reason is the lesson.** "Made with AI" became **"AI info"** on
1 July 2024 because "some content that included minor modifications using AI, such as retouching
tools, included industry standard indicators that were then labeled 'Made with AI'." Real photos
were being labelled as AI. Then on 12 September 2024 Meta split placement: AI-*generated* keeps a
visible label, AI-*edited* moves into the post menu.
https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/

**The causal chain is clean and worth drawing:** the altered Biden video → Oversight Board case
2023-029-FB-UA (5 February 2024), which called Meta's policy "incoherent, lacking in persuasive
justification and inappropriately focused on how content has been created" → Meta adopts labelling
5 April 2024 → rename 1 July → split placement 12 September. **And the video that forced it was not
AI-made at all** - it was a looped edit of real footage, which is exactly why it exposed the gap.
https://www.oversightboard.com/decision/fb-gw8by1y3/

**TikTok's scale numbers:** 1.3 billion videos labelled by November 2025, **"over 3 billion"** by
July 2026. https://newsroom.tiktok.com/helping-people-spot-and-understand-aigc-on-tiktok

**LinkedIn is the contrast case.** Its rule is a **deception-scoped** duty, not a blanket label-all
duty: disclosure is required for synthetic media misrepresenting a real person or real events, with
an explicit parody carve-out. And its "label" is not a platform badge at all - it renders a
**C2PA provenance panel** from the manifest the upstream tool signed. **No manifest, no display.**
https://www.linkedin.com/legal/professional-community-policies

### US law, primary-sourced

- **TAKE IT DOWN Act, Public Law 119-12**, signed 19 May 2025. **Both tranches now in force** - the
  platform notice-and-removal duty became live **19 May 2026**. Removal "as soon as possible, but not
  later than **48 hours**", plus reasonable efforts to find known identical copies. Enforced by the
  **FTC**. Its "digital forgery" definition explicitly covers content made "through the use of
  software, machine learning, artificial intelligence".
  https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm
- **California AI Transparency Act (SB 942, amended by AB 853)** - **operative 2 August 2026**. Over
  **1,000,000 monthly users**: free public AI detection tool with an API, optional manifest
  disclosure, mandatory **latent disclosure**. **$5,000 per violation, each day separate.** Large
  online platforms (over **2,000,000 unique monthly users**) pick up provenance duties from
  1 January 2027, capture-device makers from 1 January 2028.
  **The statute does not name C2PA** - it says "widely adopted specifications adopted by an
  established standards-setting body".
  https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB853
- **California AB 2013**, training-data transparency, duty live since **1 January 2026**. Developers
  must publish whether datasets contain copyright-, trademark- or patent-protected material, whether
  they contain personal information, and **whether synthetic data generation was used**.
- **FCC Declaratory Ruling 24-17**, in force 8 February 2024, unanimous: AI-generated and cloned
  voices are "artificial" under the TCPA, which "**makes voice cloning technology used in common
  robocall scams targeting consumers illegal**". https://docs.fcc.gov/public/attachments/DOC-400393A1.pdf
- **NO FAKES Act is still only a bill**, introduced 9 April 2025, no action since.

**The New Hampshire case, for the concrete number.** The FCC proposed and then adopted a **$6 million
forfeiture** against political consultant Steve Kramer for the 21 January 2024 robocall carrying "a
deepfake audio recording of President Biden's cloned voice telling prospective voters not to vote".
The charge was the **Truth in Caller ID Act**, not the TCPA.
https://docs.fcc.gov/public/attachments/DOC-402762A1.pdf

**Set that against the enrolment cost.** Microsoft's VALL-E synthesises "high-quality personalized
speech with only a **3-second enrolled recording** of an unseen speaker", preserving emotional tone
and acoustic environment, not just timbre. https://arxiv.org/abs/2301.02111
**Three seconds of audio against a $6 million federal forfeiture is the whole asymmetry in two
numbers.**

### Licensing, where the biggest case decided almost nothing

**Getty Images v Stability AI [2025] EWHC 2863 (Ch)**, handed down 4 November 2025. Getty **abandoned
its core claims mid-trial** - no evidence the training happened in the UK. The holding at §758(viii):
"an AI model such as Stable Diffusion which does not store or reproduce any Copyright Works (and has
never done so) is not an 'infringing copy'". And §758(ix)(c): **"I make no finding as to the number
of Visual Assets or Copyright Works used in training Stable Diffusion."** The central factual
question of the entire AI copyright debate was left undecided.
https://www.judiciary.uk/judgments/getty-images-v-stability-ai/

**Music:** Udio substantially settled with UMG; **Warner settled with Suno in late 2025 while UMG and
Sony continue litigating**. ⚠️ **Do not conflate** the **$1.5bn Anthropic settlement** (the authors'
book-piracy case) with the **separate, still-live** music-publishers lyrics case.

**Sora went opt-out to opt-in in about three days.** Launched 30 September 2025 permitting
copyrighted characters by default; by 3 October Sam Altman said rightsholders would get "more
granular control". **Likeness, though, was opt-in from launch** - the system card describes "explicit
opt-in consent and controls for the use of likeness through cameos".
https://copyrightlately.com/openai-backtracks-sora-opt-out-copyright-policy/

## Official learning paths to map coverage against

**The finding that justifies this course existing:** the credentialed platforms have largely
abandoned this category. **edX has no course on AI video or audio generation at all** - verified by
fetching its topic hubs, with the video-production hub returning a 404. **Udacity has nothing for
non-engineers. DeepLearning.AI has nothing on making video or audio.** **OpenAI Academy has no
Sora, video or audio content whatsoever.** **ElevenLabs has no academy at all** - docs and a help
centre only, no course, no path, no certificate, for a category leader.

What does exist, verified live:

- Coursera **"AI Video Generation: A Comprehensive guide"** - 3 hours, 6 modules, HeyGen and Trupeer
- Coursera **"Create Your First AI Video"** - 2 hours, hands-on Veo 3
- Coursera **"AI Sound Generation for Business Communication"** - 5 hours, ElevenLabs. The strongest
  audience-matched audio course found anywhere
- Coursera **"AI for Content Creation"** (Google) - 2 hours, 227,777 enrolled
- **Runway AI Academy** - free, the only vendor with a real generative-video curriculum: AI for
  Advertising (10 modules), Visual Effects (6), Video Transformation with Aleph (5), Custom Workflows
  (3). **Durations not published.** https://academy.runwayml.com/
- **TikTok Academy** - free, the only platform with real AI-video courses, tightly scoped to its own
  Symphony Creative Studio. Certification exam is **110 minutes, proctored, valid 2 years**
- **Content Credentials Foundations** (CAI) - **3 modules, 10 lessons, 1h 37m, free, no certificate**.
  The only real provenance course found anywhere. https://learn.contentauthenticity.org/

**Where the credentials actually live is accessibility, and it is disconnected from all of the
above.** W3C/W3Cx "Introduction to Web Accessibility" is ~16-20 hours, free to audit, **$99 verified
certificate**. **DCMP is free and CEU-bearing**, funded by the US Dept of Education: Post-Production
Captioning **2 hours, 0.2 RID CEUs**; Let's Describe 0.2 RID CEUs plus 2 hrs ACVREP. Deque's
"Multimedia, Animations, and Motion: The Basics" is 1h 15m for **1.25 IAAP credits**.

⚠️ **YouTube Creator Academy is dead** - creatoracademy.youtube.com 301-redirects to a channel.
**There is no official YouTube course on AI creation or disclosure anywhere**, only help-centre pages.

**The open position, stated plainly: nobody teaches AI video creation and AI disclosure together.**
The vendor academies teach their own tools. The accessibility bodies award the credentials. Neither
touches the other. That intersection is this course.

**Currency is the sharpest filter in this category and belongs on the page.** LinkedIn Learning's
"AI in Video Production and Post" is from **2019** and still enrollable. "Video Without Cameras" is
from March 2024 and teaches a tool landscape that no longer exists. Also note that LinkedIn
Learning's "Applying Generative AI as a Creative Professional" path and Adobe's "Essential Skills in
Generative AI for Creatives" are **image-only** despite their names.

## Quarantine - do NOT put these on a course page

- **Any Adobe price.** The pricing URLs return 404 or empty shells. No Adobe USD figure appears
  anywhere in this map, deliberately.
- **Runway per-model duration limits** for Gen-4.5, Gen-4 Turbo and Act-Two. Client-side rendered;
  only Aleph 2.0's "up to 30s of 1080p" is first-party confirmed.
- **Sora rate limits.** No video-specific tier entries exist on OpenAI's rate-limits page.
- **ElevenLabs' "voice-captcha 10-second timeframe"** and its **Voice Library payout rate**. Widely
  repeated, on no first-party page.
- ⚠️ **ElevenLabs' own blog says Scribe has "the lowest automated transcription word error rate in
  Italian (98.7%), English (96.7%)".** Those are **accuracy** figures mislabelled as WER in the
  vendor's own copy. Usable only as an example of benchmark hygiene, never as a WER number.
- **All 3Play Media accuracy figures** (99.6% measured, competitors 84.7-94.4%). Marketing pages, no
  published methodology. Its useful contribution is the teaching device: "For a sentence of 8 words,
  a 95% accuracy rate means there will be an average of 2.5 errors in every sentence."
- **"Comprehension drops sharply below 95% accuracy."** No peer-reviewed study exists; the citation
  trail dead-ends at a marketing redirect. **Industry folklore.**
- **C2PA's ISO status** and camera-maker adoption (Leica, Sony, Nikon, Canon, Fujifilm), Adobe,
  Microsoft and Cloudflare adoption - none first-party verified. **Only TikTok, YouTube, Meta and
  OpenAI/Sora are verified.**
- **A claimed OpenAI "~90% reduction in temporal artifacts" for Sora 2.** Not in the system card,
  which was extracted in full. **Unsupported.**
- **Tidy iteration ratios** ("3 generations per usable shot", "$315-$750 per finished minute"). All
  traced to one vendor content-marketing domain with no underlying study.
- **The exact in-app TikTok label string in 2026.** Its help pages are JavaScript-only. Verified
  strings are "AI-generated" (Newsroom) and "AIGC label" (Community Guidelines).

## The four things most likely to make this course wrong within six months

1. **The Sora 2 API dies 24 September 2026** with no successor. Any Sora-based lesson has a hard
   expiry date, and the course should say the date out loud.
2. **Every Google video model is still Preview.** Veo 2 and Veo 3 were shut down with 15 days' notice.
3. **"Veo 4" does not exist.** Any roadmap predicting it is wrong.
4. **EU AI Act Article 50 marking bites for everyone on 2 December 2026**, when the grace period for
   pre-existing systems expires.
