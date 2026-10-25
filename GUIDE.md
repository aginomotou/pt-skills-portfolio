# How to add your work to the Loading... portfolio

This guide is for **Aguilar, Cortez, Cruz and Dival**. It shows you, step by step, where your files go, where your links go and where you write your reflections.

You only ever touch **two places**, and both have your name on them:

| What | Where |
| --- | --- |
| Your PDFs (and your photo, if you want one) | `files/<your-name>/prelim/`, `files/<your-name>/midterm/`, `files/<your-name>/finals/` |
| Titles, links, YouTube videos, notes, reflections | `content/<your-name>.js` |

Your page then fills itself in. You never edit any `.html`, `.css` or `js/` file.

---

## Contents

1. [How the site is organised](#1-how-the-site-is-organised)
2. [Before you start (once only)](#2-before-you-start-once-only)
3. [Add a PDF](#3-add-a-pdf)
4. [Add a YouTube video](#4-add-a-youtube-video)
5. [Add a Canva, Google Drive or other link](#5-add-a-canva-google-drive-or-other-link)
6. [Write your reflection](#6-write-your-reflection)
7. [Add or remove performance tasks](#7-add-or-remove-performance-tasks)
8. [Your name, intro and photo](#8-your-name-intro-and-photo)
9. [Check that it worked](#9-check-that-it-worked)
10. [Rules so we do not break each other's work](#10-rules-so-we-do-not-break-each-others-work)
11. [When something goes wrong](#11-when-something-goes-wrong)
12. [Checklist for each term](#12-checklist-for-each-term)
13. [For the repo owner: publishing the site](#13-for-the-repo-owner-publishing-the-site)

---

## 1. How the site is organised

```
pt-skills-portfolio/
├── index.html              ← the landing page (do not edit)
├── aguilar.html            ← member pages (do not edit; they read content/*.js)
├── cortez.html
├── cruz.html
├── dival.html
│
├── content/
│   ├── aguilar.js          ← Aguilar edits this
│   ├── cortez.js           ← Cortez edits this
│   ├── cruz.js             ← Cruz edits this
│   └── dival.js            ← Dival edits this
│
├── files/
│   ├── aguilar/
│   │   ├── prelim/         ← Aguilar's prelim PDFs
│   │   ├── midterm/        ← Aguilar's midterm PDFs
│   │   └── finals/         ← Aguilar's finals PDFs
│   ├── cortez/  (same three folders)
│   ├── cruz/    (same three folders)
│   └── dival/   (same three folders)
│
├── css/, js/              ← design files (do not edit)
└── GUIDE.md                ← this guide
```

Every member page has the same layout: your ID badge and details at the top, then a clipboard for each term. The colored tabs (**Prelim**, **Midterm**, **Finals**) switch between the three sub-pages. Each term has three parts:

| Part | What goes in it | In your content file |
| --- | --- | --- |
| **Performance Tasks** | each graded task of the term | `performanceTasks: [ ... ]` |
| **Product** | the term's main output | `product: [ ... ]` |
| **Reflection** | your written reflection | `` reflection: `...` `` |

Until something is attached, its slot shows a paper card saying **"PDF or video goes here"**, with the folder the file belongs in, and a grey **Coming soon** chip. An empty reflection shows **"Reflection coming soon…"**.

---

## 2. Before you start (once only)

1. **Accept the invitation.** The repo owner adds you as a collaborator. Open the email from GitHub (or go to github.com/notifications) and click **Accept invitation**.
2. **Choose how you will edit.** Either way works:
   - **The GitHub website (easiest, nothing to install).** Everything in this guide can be done in the browser. The steps below use this method.
   - **GitHub Desktop or git**, if you already know them. Always **pull** before you start, then edit, **commit** and **push**.

---

## 3. Add a PDF

Example: Aguilar is adding Performance Task 1 for Prelim.

### Step 1: Name the file

Rename the PDF on your computer **before** uploading:

- lowercase letters, numbers and dashes only
- **no spaces**, no `#`, `%`, `&` or `?`
- end with `.pdf`

| Good | Bad |
| --- | --- |
| `pt1-self-introduction.pdf` | `PT 1 (final) Self Intro.pdf` |
| `prelim-product-pitch-deck.pdf` | `pitch deck #2.PDF` |

### Step 2: Upload it into your term folder

1. On the repo's GitHub page, open `files` → `aguilar` → `prelim` (your name, the right term).
2. Click **Add file** → **Upload files**.
3. Drag your PDF in.
4. At the bottom, type a short message such as `Add Aguilar prelim PT1`, keep **Commit directly to the main branch** selected, and click **Commit changes**.

> GitHub's website takes files up to **25 MB**. If your PDF is bigger, compress it first (for example with ilovepdf.com → Compress PDF, or Export → "Reduce file size" in PowerPoint and Canva).

### Step 3: Write the file's path in your content file

1. Open `content/aguilar.js` (your own file) and click the **pencil icon** (Edit this file).
2. Find the Prelim block and the task you are filling:

   ```js
   { title: "Performance Task 1", pdf: "", youtube: "", link: "", note: "" },
   ```

3. Put the path between the quotes after `pdf:`. Also give it a real title and, if you like, a one-sentence note:

   ```js
   { title: "Self-introduction speech", pdf: "files/aguilar/prelim/pt1-self-introduction.pdf", youtube: "", link: "", note: "A two-minute introduction with three slides." },
   ```

4. Click **Commit changes…** → **Commit changes**.

The path always looks like this:

```
files/<your-name>/<term>/<file-name>.pdf
```

It must match the real file **exactly**, letters and dashes included (`Task1.pdf` and `task1.pdf` count as two different files).

---

## 4. Add a YouTube video

The video plays right on your page. You only paste the link.

### Step 1: Make sure YouTube allows it

In **YouTube Studio** → **Content** → click the video → **Details**:

- **Visibility** must be **Public** or **Unlisted**. *Private videos will not play on the site.*
- Under **Show more** → **License**, keep **Allow embedding** ticked.

### Step 2: Paste the link

Any normal YouTube link works:

```
https://www.youtube.com/watch?v=aBcDeFgHiJk
https://youtu.be/aBcDeFgHiJk
https://www.youtube.com/shorts/aBcDeFgHiJk
```

Put it after `youtube:` in your content file:

```js
{ title: "Product pitch", pdf: "", youtube: "https://youtu.be/aBcDeFgHiJk", link: "", note: "Recorded in class, week 6." },
```

Commit, and the player appears in place of the "PDF or video goes here" card, with a "Watch on YouTube" button under it.

**Video and slides for the same task?** Fill in both `pdf` and `youtube`. The video is shown, and the PDF still gets its Open and Download buttons.

---

## 5. Add a Canva, Google Drive or other link

For work that lives on another site, put the link after `link:`:

```js
{ title: "Infographic", pdf: "", youtube: "", link: "https://www.canva.com/design/.../view", note: "" },
```

- **Google Drive:** Share → General access → **Anyone with the link** → Viewer.
- **Canva:** Share → **View-only link**, or Share → More → Public view link.

If you can download it as a PDF instead, do that ([section 3](#3-add-a-pdf)). A PDF shows up inside the page; a link only gets a button.

---

## 6. Write your reflection

Each term has one reflection. In your content file it looks like this:

```js
    reflection: `
`,
```

Write your text **between the two backticks** (`` ` ``, the key left of `1` on most keyboards). Leave **one empty line between paragraphs**:

```js
    reflection: `
At the start of the prelim period I was nervous about speaking in front of the class. Preparing the self-introduction showed me that practising out loud mattered more than polishing the slides.

What I still need to work on is pacing. I rushed the ending of my pitch, and next term I want to time each part of the talk before presenting.
`,
```

Rules:

- **Do not type a backtick (`` ` ``) inside your reflection.** It ends the text early. Apostrophes (`'`) and quotation marks (`"`) are fine.
- It is shown on lined notebook paper, one paragraph after another.
- You can write in Word or Google Docs first and paste it in. Check that the paste did not add backticks.

---

## 7. Add or remove performance tasks

Each term starts with **two** performance task slots and **one** product slot. You can change that.

**To add a task:** copy a whole line, from `{` to `},`, and paste it right under the last one:

```js
    performanceTasks: [
      { title: "Performance Task 1", pdf: "...", youtube: "", link: "", note: "" },
      { title: "Performance Task 2", pdf: "...", youtube: "", link: "", note: "" },
      { title: "Performance Task 3", pdf: "", youtube: "", link: "", note: "" },   // ← new line
    ],
```

**To remove one:** delete its whole line, from `{` to `},`.

Keep the **comma at the end** of every line. The "x of y in" counts update by themselves.

---

## 8. Your name, intro and photo

At the top of your content file:

```js
  fullName: "Juan Miguel Aguilar",
  intro: "Third-year BSIT student. I like building things and, this semester, learning to explain them.",
  photo: "files/aguilar/photo.jpg",
```

- `fullName` shows on your ID badge, in your Details note and on your sticky note on the landing page.
- `intro` replaces the default text on your notebook page. Leave an empty line between paragraphs if you write more than one. Its first paragraph also appears on your sticky note on the landing page.
- `photo` goes in your ID badge, and in the group badge on the landing page. Upload a **portrait (4:5)** JPG or PNG straight into `files/<your-name>/` (not into a term folder), named something like `photo.jpg`. Until you add one, the badge shows your initial and "photo coming soon".

---

## 9. Check that it worked

- **On the live site:** wait 1–2 minutes after you commit, then reload your page (Ctrl + F5 on Windows forces a fresh copy). The GitHub Pages link is in the repo's **About** box, or ask the repo owner.
- **The deploy status:** open the repo's **Actions** tab. A green check means your change is live; a red cross means the build failed, so ask the repo owner.
- **On your own computer (optional):** opening `index.html` by double-click shows everything except YouTube videos, which only play when the site is served from a web address. To preview those, open the folder in VS Code and use the **Live Server** extension, or run `npx serve` in the folder.

---

## 10. Rules so we do not break each other's work

1. **Edit only your own content file and your own `files/<your-name>/` folder.**
2. **Do not rename or move** the term folders, the content files or the `id:` line in your content file.
3. **Do not edit** the `.html` files or anything in `css/`, `js/` or `assets/`. If the design needs a change, ask the repo owner.
4. **If you use git or GitHub Desktop, pull before you edit.** That keeps you from overwriting someone else's commit.
5. **Write clear commit messages**, such as `Add Cruz midterm product` or `Write Dival finals reflection`.
6. **No huge files.** Keep each PDF under 25 MB. Videos go on YouTube, not in the repo.

---

## 11. When something goes wrong

| What you see | Most likely cause | Fix |
| --- | --- | --- |
| **Your page shows only your name, or nothing at all** | A typing mistake in your content file (a missing quote, comma or backtick) | Open your content file and compare it with the examples above. Every `"` needs a partner, every item line ends with `},`, and the reflection opens and closes with a backtick. On a computer you can press **F12** → **Console** to see the line number of the error. |
| **"PDF or video goes here" even though you uploaded the PDF** | The path in `pdf:` does not match the file | Check the spelling, the dashes, upper- and lowercase letters, the term folder and the `.pdf` ending. |
| **The PDF area is blank or says it cannot be shown** | Phones and some browsers do not show PDFs inside a page | Nothing is broken. The **Open the PDF** button works everywhere. |
| **"Video unavailable" in the player** | The video is Private, or embedding is turned off | See [section 4, step 1](#step-1-make-sure-youtube-allows-it). |
| **The YouTube player shows an error only on your computer** | You opened the page as a file, not from a web address | Check it on the live site, or use Live Server ([section 9](#9-check-that-it-worked)). |
| **Your reflection is cut off halfway** | It contains a backtick | Remove the backtick or replace it with a normal apostrophe `'`. |
| **The change does not show on the live site** | The browser is showing an old copy, or the deploy is still running | Wait 2 minutes, then press Ctrl + F5. Check the **Actions** tab. |
| **GitHub says there is a conflict** | Two people changed the same file | You should only be editing your own file, so check that you are in the right one. Ask the repo owner if it persists. |

---

## 12. Checklist for each term

Copy this into a note and tick it off:

- [ ] Each performance task: PDF uploaded to `files/<me>/<term>/` and its path written in `pdf:`, **or** its YouTube link in `youtube:`
- [ ] Each task has a real title (not "Performance Task 1"), and a note if it helps
- [ ] Product: uploaded and linked the same way
- [ ] Reflection: written between the backticks, with paragraphs separated by an empty line
- [ ] Extra task slots deleted, or missing ones added ([section 7](#7-add-or-remove-performance-tasks))
- [ ] Checked my page on the live site: no "Coming soon" chips or "PDF or video goes here" cards are left in that term

---

## 13. For the repo owner: publishing the site

Do this once, after pushing the project to GitHub:

1. Repo → **Settings** → **Collaborators** → **Add people**: invite the other three members.
2. Repo → **Settings** → **Pages** → **Build and deployment** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`. Put that link in the repo's **About** box (the gear icon on the repo's main page) so everyone can find it.

The empty `.nojekyll` file in the root tells GitHub Pages to serve the files exactly as they are. Leave it there.
